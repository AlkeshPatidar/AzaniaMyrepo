import React, { useEffect, useMemo, useState } from 'react'
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { FONTS_FAMILY } from '../../assets/Fonts'
import { App_Primary_color, white } from '../../common/Colors/colors'
import {
  fetchPlaceDetails,
  getCurrentDeviceLocation,
  searchPlacePredictions,
} from '../../utils/locationHelpers'

export default function LocationSearchModal({
  visible,
  title,
  initialQuery,
  onClose,
  onSelect,
}) {
  const [query, setQuery] = useState(initialQuery ?? '')
  const [results, setResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [isResolving, setIsResolving] = useState(false)
  const [isFetchingCurrent, setIsFetchingCurrent] = useState(false)

  useEffect(() => {
    if (!visible) return
    setQuery(initialQuery ?? '')
  }, [visible, initialQuery])

  useEffect(() => {
    if (!visible) return

    const trimmedQuery = String(query ?? '').trim()
    if (trimmedQuery.length < 2) {
      setResults([])
      return
    }

    const timeoutId = setTimeout(async () => {
      try {
        setIsSearching(true)
        const predictions = await searchPlacePredictions(trimmedQuery)
        setResults(predictions)
      } catch (error) {
        console.log('Location search error:', error)
        setResults([])
      } finally {
        setIsSearching(false)
      }
    }, 350)

    return () => clearTimeout(timeoutId)
  }, [query, visible])

  const emptyLabel = useMemo(() => {
    if (isSearching) return 'Searching places...'
    if (String(query ?? '').trim().length < 2) return 'Type at least 2 characters'
    return 'No places found'
  }, [isSearching, query])

  const handleSelect = async (item) => {
    try {
      setIsResolving(true)
      const detail = await fetchPlaceDetails(item?.placeId)
      if (detail?.coordinates) {
        onSelect?.(detail)
        return
      }
      Alert.alert('Location not available', 'Could not fetch coordinates for this place. Please try another place or use current location.')
    } catch (error) {
      console.log('Place detail error:', error)
      Alert.alert('Location error', 'Unable to fetch place details right now. Please try again.')
    } finally {
      setIsResolving(false)
    }
  }

  const handleUseCurrentLocation = async () => {
    try {
      setIsFetchingCurrent(true)
      const location = await getCurrentDeviceLocation({
        resolveAddress: true,
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 180000,
      })
      if (location?.coordinates) {
        onSelect?.(location)
        return
      }
      Alert.alert('Location not available', 'Could not fetch your current location. Please search for a place instead.')
    } catch (error) {
      console.log('Current location fetch error:', error)
      Alert.alert('Location error', String(error?.message ?? 'Unable to fetch current location. Please try again.'))
    } finally {
      setIsFetchingCurrent(false)
    }
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <View style={styles.card}>
          <View style={styles.headerRow}>
            <Text style={styles.title}>{title || 'Search Location'}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn} activeOpacity={0.8}>
              <Ionicons name="close" size={18} color="#666" />
            </TouchableOpacity>
          </View>

          <View style={styles.searchRow}>
            <MaterialCommunityIcons name="map-search-outline" size={18} color="#666" />
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Search place, area or landmark"
              placeholderTextColor="#999"
              style={styles.searchInput}
              autoFocus
            />
            {!!String(query ?? '').length && !isSearching && (
              <TouchableOpacity
                style={styles.clearBtn}
                onPress={() => setQuery('')}
                activeOpacity={0.8}
              >
                <Ionicons name="close" size={14} color="#666" />
              </TouchableOpacity>
            )}
            {isSearching && <ActivityIndicator size="small" color={App_Primary_color} />}
          </View>

          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.currentLocationBtn}
            onPress={handleUseCurrentLocation}
            disabled={isFetchingCurrent || isResolving}
          >
            <View style={styles.currentLocationIconWrap}>
              <Ionicons name="locate" size={15} color={App_Primary_color} />
            </View>
            <Text style={styles.currentLocationText}>
              {isFetchingCurrent ? 'Fetching current location...' : 'Use Current Location'}
            </Text>
            {isFetchingCurrent && <ActivityIndicator size="small" color={App_Primary_color} />}
          </TouchableOpacity>

          <FlatList
            data={results}
            keyExtractor={(item) => item.placeId}
            style={styles.resultsList}
            contentContainerStyle={results.length ? null : styles.emptyWrap}
            ListEmptyComponent={<Text style={styles.emptyText}>{emptyLabel}</Text>}
            renderItem={({ item }) => (
              <TouchableOpacity activeOpacity={0.82} style={styles.resultItem} onPress={() => handleSelect(item)}>
                <Ionicons name="location" size={16} color={App_Primary_color} style={{ marginTop: 2 }} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.resultTitle}>{item.title}</Text>
                  {item.subtitle ? <Text style={styles.resultSubtitle}>{item.subtitle}</Text> : null}
                </View>
                <Ionicons name="chevron-forward" size={15} color="#888" />
              </TouchableOpacity>
            )}
          />

          {isResolving && (
            <View style={styles.resolvingOverlay}>
              <ActivityIndicator size="small" color={App_Primary_color} />
              <Text style={styles.resolvingText}>Fetching coordinates...</Text>
            </View>
          )}
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  card: {
    minHeight: '55%',
    maxHeight: '82%',
    backgroundColor: white,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    color: '#111',
    fontFamily: FONTS_FAMILY.Poppins_Bold,
  },
  closeBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F2F2F2',
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: '#E1E1E1',
    borderRadius: 12,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    color: '#111',
    fontFamily: FONTS_FAMILY.Poppins_Regular,
    fontSize: 13,
  },
  clearBtn: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EEEEEE',
  },
  currentLocationBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: 'rgba(192,57,43,0.22)',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 9,
    marginBottom: 8,
    backgroundColor: 'rgba(192,57,43,0.04)',
  },
  currentLocationIconWrap: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(192,57,43,0.1)',
  },
  currentLocationText: {
    flex: 1,
    color: '#1A1A1A',
    fontSize: 12,
    fontFamily: FONTS_FAMILY.Poppins_SemiBold,
  },
  resultsList: {
    flex: 1,
  },
  resultItem: {
    flexDirection: 'row',
    gap: 8,
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F1F1',
  },
  resultTitle: {
    color: '#222',
    fontSize: 13,
    fontFamily: FONTS_FAMILY.Poppins_Medium,
  },
  resultSubtitle: {
    color: '#777',
    fontSize: 11,
    fontFamily: FONTS_FAMILY.Poppins_Regular,
    marginTop: 1,
  },
  emptyWrap: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    color: '#777',
    fontSize: 12,
    fontFamily: FONTS_FAMILY.Poppins_Regular,
  },
  resolvingOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 10,
    backgroundColor: 'rgba(255,255,255,0.94)',
  },
  resolvingText: {
    color: '#444',
    fontSize: 12,
    fontFamily: FONTS_FAMILY.Poppins_Medium,
  },
})