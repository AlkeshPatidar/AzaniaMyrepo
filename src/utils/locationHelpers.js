import { PermissionsAndroid, Platform } from 'react-native'
import Geolocation from '@react-native-community/geolocation'

import { apiGet, apiPut, getItem, setItem } from './Apis'

// export const GOOGLE_MAPS_API_KEY = 'AIzaSyB2EqOAK4aCg6nMiKuI7puHTKt4XPse9Wo'
export const GOOGLE_MAPS_API_KEY = 'AIzaSyCeHNra_jeU0_PSrNejwMcS35KC-iKudoI'


const LOCATION_CACHE_KEYS = {
  Customer: 'customerCurrentLocation',
  Vendor: 'vendorCurrentLocation',
}

const LOCATION_ENDPOINTS = {
  Customer: '/api/user/UpdateLocation',
  Vendor: '/api/vendor/UpdateLocation',
}

const DRIVER_ASSIGNED_CRANE_ENDPOINT = '/api/driver/UpdateAssignedCraneLocation'
const VENDOR_CRANE_ENDPOINT_PREFIX = '/api/vendor/UpdateCraneLocation/'

const normalizeUserType = (userType) => String(userType ?? '').toLowerCase() === 'vendor' ? 'Vendor' : 'Customer'

const isMeaningfulText = (value) => {
  const text = String(value ?? '').trim()
  if (!text) return false

  const normalized = text.toLowerCase()
  return !['unknown', 'current location', 'currentlocation', 'n/a', 'na'].includes(normalized)
}

const formatCoordinateFallback = (coordinates) => {
  const latitude = Number(coordinates?.latitude)
  const longitude = Number(coordinates?.longitude)
  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return 'Selected location'

  return `Lat ${latitude.toFixed(5)}, Lng ${longitude.toFixed(5)}`
}

const isValidCoordinates = (coordinates) => {
  const latitude = Number(coordinates?.latitude)
  const longitude = Number(coordinates?.longitude)

  return Number.isFinite(latitude) && Number.isFinite(longitude)
}

export const buildPointLocationPayload = (coordinates) => {
  if (!isValidCoordinates(coordinates)) {
    throw new Error('Invalid coordinates for location update')
  }

  return {
    Location: {
      type: 'Point',
      coordinates: [Number(coordinates.longitude), Number(coordinates.latitude)],
    },
  }
}

export const requestLocationPermission = async () => {
  if (Platform.OS !== 'android') return true

  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Permission',
        message: 'RoadResQ needs your location to keep your live position updated.',
        buttonPositive: 'Allow',
        buttonNegative: 'Deny',
      }
    )

    return granted === PermissionsAndroid.RESULTS.GRANTED
  } catch {
    return false
  }
}

const mapGeolocationError = (error) => {
  const code = Number(error?.code)

  // iOS/Android codes from @react-native-community/geolocation:
  // 1: PERMISSION_DENIED, 2: POSITION_UNAVAILABLE, 3: TIMEOUT
  if (code === 1) return new Error('Location permission denied')
  if (code === 2) return new Error('Location unavailable')
  if (code === 3) return new Error('Location request timed out')

  const message = String(error?.message ?? '').trim()
  return new Error(message || 'Unable to fetch location')
}

export const getCurrentDeviceLocation = async (options = {}) => {
  const {
    resolveAddress = true,
    enableHighAccuracy = false,
    timeout = 8000,
    maximumAge = 120000,
  } = options

  if (Platform.OS === 'ios' && typeof Geolocation?.requestAuthorization === 'function') {
    try {
      // Triggers the iOS permission prompt (when needed). Actual authorization
      // result still comes via getCurrentPosition error codes.
      Geolocation.requestAuthorization?.('whenInUse')
    } catch {
      // Ignore and rely on getCurrentPosition fallback.
    }
  }

  const hasPermission = await requestLocationPermission()
  if (!hasPermission) {
    throw new Error('Location permission denied')
  }

  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      async (position) => {
        const latitude = Number(position?.coords?.latitude)
        const longitude = Number(position?.coords?.longitude)
        const fallbackCoordinates = { latitude, longitude }
        const coordinateLabel = formatCoordinateFallback(fallbackCoordinates)

        if (!resolveAddress) {
          resolve({
            address: coordinateLabel,
            city: '',
            coordinates: fallbackCoordinates,
          })
          return
        }

        try {
          const place = await reverseGeocode(latitude, longitude)
          resolve({
            address: isMeaningfulText(place?.address) ? place.address : coordinateLabel,
            city: isMeaningfulText(place?.city) ? place.city : '',
            coordinates: place?.coordinates ?? fallbackCoordinates,
          })
        } catch {
          resolve({
            address: coordinateLabel,
            city: '',
            coordinates: fallbackCoordinates,
          })
        }
      },
      (error) => reject(mapGeolocationError(error)),
      { enableHighAccuracy, timeout, maximumAge }
    )
  })
}

export const getStoredLocationForRole = async (userType) => {
  const normalizedUserType = normalizeUserType(userType)
  const storageKey = LOCATION_CACHE_KEYS[normalizedUserType]
  return getItem(storageKey)
}

export const persistLocationForRole = async (userType, location) => {
  const normalizedUserType = normalizeUserType(userType)
  const storageKey = LOCATION_CACHE_KEYS[normalizedUserType]
  await setItem(storageKey, location)
  return location
}

export const updateLocationForRole = async (userType, location) => {
  const normalizedUserType = normalizeUserType(userType)
  const endpoint = LOCATION_ENDPOINTS[normalizedUserType]
  const coordinates = location?.coordinates ?? location
  const payload = buildPointLocationPayload(coordinates)
  const response = await apiPut(endpoint, payload)

  const nextLocation = {
    address: isMeaningfulText(location?.address) ? location.address : formatCoordinateFallback(coordinates),
    city: isMeaningfulText(location?.city) ? location.city : '',
    coordinates: {
      latitude: Number(coordinates.latitude),
      longitude: Number(coordinates.longitude),
    },
  }

  await persistLocationForRole(normalizedUserType, nextLocation)

  return {
    response,
    payload,
    location: nextLocation,
  }
}

export const syncCurrentLocationForRole = async (userType) => {
  const currentLocation = await getCurrentDeviceLocation()
  return updateLocationForRole(userType, currentLocation)
}

const buildCraneLocationPayload = (location) => {
  const coordinates = location?.coordinates ?? location
  if (!isValidCoordinates(coordinates)) {
    throw new Error('Invalid coordinates for crane location update')
  }

  const latitude = Number(coordinates.latitude)
  const longitude = Number(coordinates.longitude)
  const address = isMeaningfulText(location?.address) ? location.address : ''
  const city = isMeaningfulText(location?.city) ? location.city : ''

  return {
    // Keep backward compatibility with current driver API shape.
    coordinates: [longitude, latitude],
    // Also include rich point payload for endpoints that expect Location object.
    Location: {
      type: 'Point',
      coordinates: [longitude, latitude],
      City: city,
      Address: address,
    },
    City: city,
    Address: address,
  }
}

const normalizeLocationResult = (location) => {
  const coordinates = location?.coordinates ?? location
  const latitude = Number(coordinates?.latitude)
  const longitude = Number(coordinates?.longitude)

  return {
    address: isMeaningfulText(location?.address) ? location.address : formatCoordinateFallback({ latitude, longitude }),
    city: isMeaningfulText(location?.city) ? location.city : '',
    coordinates: { latitude, longitude },
  }
}

const resolveVendorCraneId = async () => {
  const response = await apiGet('/api/vendor/GetAllMyCrane')
  const cranes = Array.isArray(response?.data) ? response.data : []
  const prioritizedCrane = cranes.find((item) => item?.isActive) ?? cranes[0]
  return prioritizedCrane?._id ?? null
}

export const updateDriverAssignedCraneLocation = async (location) => {
  const payload = buildCraneLocationPayload(location)
  const response = await apiPut(DRIVER_ASSIGNED_CRANE_ENDPOINT, payload)
  return {
    response,
    payload,
    location: normalizeLocationResult(location),
  }
}

export const updateVendorCraneLocation = async ({ craneId, location }) => {
  const resolvedCraneId = craneId || await resolveVendorCraneId()
  if (!resolvedCraneId) {
    throw new Error('No crane found for vendor location sync')
  }

  const payload = buildCraneLocationPayload(location)
  const response = await apiPut(`${VENDOR_CRANE_ENDPOINT_PREFIX}${resolvedCraneId}`, payload)
  return {
    response,
    payload,
    craneId: resolvedCraneId,
    location: normalizeLocationResult(location),
  }
}

export const syncCurrentCraneLocationForRole = async ({ role, vendorCraneId } = {}) => {
  const normalizedRole = String(role ?? '').toLowerCase()
  const currentLocation = await getCurrentDeviceLocation()

  if (normalizedRole === 'driver') {
    return updateDriverAssignedCraneLocation(currentLocation)
  }

  if (normalizedRole === 'vendor') {
    return updateVendorCraneLocation({ craneId: vendorCraneId, location: currentLocation })
  }

  throw new Error('Unsupported role for crane location sync')
}

export const startAutoCraneLocationSync = ({
  role,
  getVendorCraneId,
  intervalMs = 30000,
  onSynced,
  onError,
} = {}) => {
  let timer = null
  let stopped = false
  let inFlight = false

  const tick = async () => {
    if (stopped || inFlight) return
    inFlight = true

    try {
      const vendorCraneId = typeof getVendorCraneId === 'function' ? await getVendorCraneId() : undefined
      const result = await syncCurrentCraneLocationForRole({ role, vendorCraneId })
      onSynced?.(result)
    } catch (error) {
      onError?.(error)
    } finally {
      inFlight = false
    }
  }

  tick()
  timer = setInterval(tick, Math.max(10000, Number(intervalMs) || 30000))

  return () => {
    stopped = true
    if (timer) clearInterval(timer)
  }
}

const normalizeResult = (result) => {
  const latitude = Number(result?.geometry?.location?.lat)
  const longitude = Number(result?.geometry?.location?.lng)
  const address = result?.formatted_address ?? result?.description ?? ''

  let city = ''
  const components = Array.isArray(result?.address_components) ? result.address_components : []
  for (const component of components) {
    const types = component?.types ?? []
    if (types.includes('locality') || types.includes('administrative_area_level_2')) {
      city = component?.long_name ?? ''
      break
    }
  }

  if (!city) {
    const addressParts = address.split(',').map((part) => part.trim()).filter(Boolean)
    city = addressParts.length > 1 ? addressParts[addressParts.length - 3] ?? addressParts[addressParts.length - 2] ?? '' : ''
  }

  return {
    address,
    city: city || '',
    coordinates: Number.isFinite(latitude) && Number.isFinite(longitude)
      ? { latitude, longitude }
      : null,
  }
}

export const formatCoordinatesForApi = (coordinates) => {
  if (!coordinates) return ''
  return `${coordinates.longitude.toFixed(6)},${coordinates.latitude.toFixed(6)}`
}

export const calculateDistanceKm = (start, end) => {
  if (!start || !end) return 0

  const toRad = (value) => (value * Math.PI) / 180
  const earthRadiusKm = 6371

  const deltaLatitude = toRad(end.latitude - start.latitude)
  const deltaLongitude = toRad(end.longitude - start.longitude)

  const value =
    Math.sin(deltaLatitude / 2) * Math.sin(deltaLatitude / 2) +
    Math.cos(toRad(start.latitude)) * Math.cos(toRad(end.latitude)) *
    Math.sin(deltaLongitude / 2) * Math.sin(deltaLongitude / 2)

  const arc = 2 * Math.atan2(Math.sqrt(value), Math.sqrt(1 - value))
  return Number((earthRadiusKm * arc).toFixed(2))
}

const buildDirectionsUrl = (origin, destination, waypoints = []) => {
  const originLatitude = Number(origin?.latitude)
  const originLongitude = Number(origin?.longitude)
  const destinationLatitude = Number(destination?.latitude)
  const destinationLongitude = Number(destination?.longitude)

  if (
    !Number.isFinite(originLatitude) ||
    !Number.isFinite(originLongitude) ||
    !Number.isFinite(destinationLatitude) ||
    !Number.isFinite(destinationLongitude)
  ) {
    return null
  }

  const serializedWaypoints = waypoints
    .map((point) => {
      const latitude = Number(point?.latitude)
      const longitude = Number(point?.longitude)
      if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return null
      return `${latitude},${longitude}`
    })
    .filter(Boolean)

  const waypointQuery = serializedWaypoints.length
    ? `&waypoints=${encodeURIComponent(serializedWaypoints.join('|'))}`
    : ''

  return `https://maps.googleapis.com/maps/api/directions/json?origin=${originLatitude},${originLongitude}&destination=${destinationLatitude},${destinationLongitude}&mode=driving${waypointQuery}&key=${GOOGLE_MAPS_API_KEY}`
}

const decodePolyline = (encoded) => {
  if (!encoded) return []

  let index = 0
  let latitude = 0
  let longitude = 0
  const coordinates = []

  while (index < encoded.length) {
    let shift = 0
    let result = 0
    let byte = null

    do {
      byte = encoded.charCodeAt(index++) - 63
      result |= (byte & 0x1f) << shift
      shift += 5
    } while (byte >= 0x20)

    const latitudeChange = (result & 1) ? ~(result >> 1) : (result >> 1)
    latitude += latitudeChange

    shift = 0
    result = 0

    do {
      byte = encoded.charCodeAt(index++) - 63
      result |= (byte & 0x1f) << shift
      shift += 5
    } while (byte >= 0x20)

    const longitudeChange = (result & 1) ? ~(result >> 1) : (result >> 1)
    longitude += longitudeChange

    coordinates.push({
      latitude: latitude / 1e5,
      longitude: longitude / 1e5,
    })
  }

  return coordinates
}

export const fetchRouteMetrics = async (origin, destination) => {
  const url = buildDirectionsUrl(origin, destination)
  if (!url) {
    return null
  }

  try {
    const response = await fetch(url)
    const payload = await response.json()
    const firstRoute = Array.isArray(payload?.routes) ? payload.routes[0] : null
    const firstLeg = Array.isArray(firstRoute?.legs) ? firstRoute.legs[0] : null
    const meters = Number(firstLeg?.distance?.value)
    const seconds = Number(firstLeg?.duration?.value)

    if (!Number.isFinite(meters) || meters <= 0) return null

    return {
      distanceKm: Number((meters / 1000).toFixed(2)),
      durationMinutes: Number.isFinite(seconds) && seconds > 0
        ? Math.max(1, Math.round(seconds / 60))
        : null,
    }
  } catch (error) {
    console.log('fetchRouteMetrics error:', error)
    return null
  }
}

export const fetchRoutePolyline = async (origin, destination, options = {}) => {
  const { waypoints = [] } = options
  const url = buildDirectionsUrl(origin, destination, waypoints)
  if (!url) {
    return []
  }

  try {
    const response = await fetch(url)
    const payload = await response.json()
    const firstRoute = Array.isArray(payload?.routes) ? payload.routes[0] : null
    const encodedPoints = firstRoute?.overview_polyline?.points

    if (!encodedPoints) return []
    return decodePolyline(encodedPoints)
  } catch (error) {
    console.log('fetchRoutePolyline error:', error)
    return []
  }
}

export const searchPlacePredictions = async (query) => {
  const text = String(query ?? '').trim()
  if (!text) return []

  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(text)}&components=country:in&language=en&key=${GOOGLE_MAPS_API_KEY}`
  const response = await fetch(url)
  const payload = await response.json()

  const predictions = Array.isArray(payload?.predictions) ? payload.predictions : []
  return predictions.map((item) => ({
    placeId: item.place_id,
    title: item.structured_formatting?.main_text ?? item.description,
    subtitle: item.structured_formatting?.secondary_text ?? '',
    description: item.description,
  }))
}

export const fetchPlaceDetails = async (placeId) => {
  if (!placeId) return null

  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(placeId)}&fields=formatted_address,geometry,address_components&key=${GOOGLE_MAPS_API_KEY}`
  const response = await fetch(url)
  const payload = await response.json()

  if (!payload?.result) return null
  return normalizeResult(payload.result)
}

export const reverseGeocode = async (latitude, longitude) => {
  const lat = Number(latitude)
  const lng = Number(longitude)
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null

  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}`
  const response = await fetch(url)
  const payload = await response.json()

  if (payload?.status && payload.status !== 'OK') {
    console.warn('[reverseGeocode] API error:', payload.status, payload?.error_message ?? '')
  }

  const firstResult = Array.isArray(payload?.results) ? payload.results[0] : null
  if (!firstResult) return null

  return normalizeResult(firstResult)
}