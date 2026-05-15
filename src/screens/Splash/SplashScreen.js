import React, { useEffect } from 'react'
import {
  View,
  Image,
} from 'react-native'
import IMG from '../../assets/Images'
import { apiGet, getItem } from '../../utils/Apis'
import { useLoginCheck } from '../../utils/Context'
import { useDispatch } from 'react-redux'
import { setUser } from '../../redux/reducer/user'
import { syncCurrentLocationForRole } from '../../utils/locationHelpers'

const SplashScreen = ({ navigation }) => {
  const { loggedInby, setloggedInby } = useLoginCheck()
  const dispatch = useDispatch()

  useEffect(() => {
    // initializeTheme()
    // loginCheck()
    setTimeout(() => {
      navigation.navigate('Login')
    }, 2000)
  }, [])

  const loginCheck = async () => {
    try {
      const token    = await getItem('token')
      const userType = (await getItem('UserType')) || 'Customer'

      console.log('Splash — token:', token)
      console.log('Splash — userType:', userType)

      if (!token) {
        navigation.replace('Onboarding')
        return
      }

      // Customer-only app flow
      setloggedInby('Customer')
      await getUserProfile('/api/user/GetUserProfile', 'CustomerTab')
    } catch (error) {
      console.log('Splash loginCheck error:', error)
      navigation.replace('Onboarding')
    }
  }

  const getUserProfile = async (endpoint, tabScreen) => {
    try {
      const response = await apiGet(endpoint)
      // console.log('Splash getUserProfile:', JSON.stringify(response, null, 2))

      if (response?.data) {
        dispatch(setUser(JSON.stringify(response?.data)))
        syncCurrentLocationForRole('Customer').catch((error) => {
          console.log('Splash location sync error:', error)
        })
        navigation.replace(tabScreen)
      } else {
        // Token invalid ya expired
        navigation.replace('Onboarding')
      }
    } catch (error) {
      console.log('Splash getUserProfile error:', error)
      navigation.replace('Onboarding')
    }
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image
        source={IMG.AzaniaLogo}
        style={{ height: 200, width: 200 }}
        resizeMode="contain"
      />
    </View>
  )
}

export default SplashScreen