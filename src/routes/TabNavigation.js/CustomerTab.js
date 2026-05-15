


import * as React from 'react'
import { useState, useEffect } from 'react'
import { Keyboard, View, StyleSheet, Text } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
// import { createNativeStackNavigator } from '@react-navigation/stack'
import { createStackNavigator } from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { useSelector } from 'react-redux'

import CustomerHomeScreen from '../../screens/CustomerFlow/CustomerHome/CustomerHome'
import ReportAccidentScreen from '../../screens/CustomerFlow/CustomerHome/ReportAccidentScreen'
import AccidentRequestSubmittedScreen from '../../screens/CustomerFlow/CustomerHome/AccidentRequestSubmittedScreen'
import SelectInsuranceTypeScreen from '../../screens/CustomerFlow/CustomerHome/Insurance/SelectInsuranceTypeScreen'
import MotorInsuranceFormScreen from '../../screens/CustomerFlow/CustomerHome/Insurance/MotorInsuranceFormScreen'
import MotorInsuranceThankYouScreen from '../../screens/CustomerFlow/CustomerHome/Insurance/MotorInsuranceThankYouScreen'
import HealthInsuranceFormScreen from '../../screens/CustomerFlow/CustomerHome/Insurance/HealthInsuranceFormScreen'
import HealthInsuranceThankYouScreen from '../../screens/CustomerFlow/CustomerHome/Insurance/HealthInsuranceThankYouScreen'
import TravelInsuranceFormScreen from '../../screens/CustomerFlow/CustomerHome/Insurance/TravelInsuranceFormScreen'
import TravelInsuranceThankYouScreen from '../../screens/CustomerFlow/CustomerHome/Insurance/TravelInsuranceThankYouScreen'
import MyCasesScreen from '../../screens/CustomerFlow/MyCases/MyCases'
import CustomerProfileScreen from '../../screens/CustomerFlow/CustomerProfile/CustomerProfile'
import LiveTowTrackingScreen from '../../screens/CustomerFlow/LiveTracking/LiveTracking'
import TowingAssistanceScreen from '../../screens/CustomerFlow/CustomerHome/TowAssistance/TowAssistance'
import VehicleDetailsScreen from '../../screens/CustomerFlow/CustomerHome/TowAssistance/VehicleDetail'
import CaptureVehiclePhotosScreen from '../../screens/CustomerFlow/CustomerHome/TowAssistance/CaptureVehiclePhoto'
import SelectCraneTypeScreen from '../../screens/CustomerFlow/CustomerHome/TowAssistance/SelectTowType'
import SelectTowingOptionScreen from '../../screens/CustomerFlow/CustomerHome/TowAssistance/SelectTowingOptions'
import ReviewDetailsScreen from '../../screens/CustomerFlow/CustomerHome/TowAssistance/ReviewDetial'
import DriverFoundScreen from '../../screens/CustomerFlow/CustomerHome/TowAssistance/DriverFound'
import PersonalInfoScreen from '../../screens/CustomerFlow/CustomerProfile/PersonalInformation'
import SearchingNearbyCranesScreen from '../../screens/CustomerFlow/CustomerHome/TowAssistance/SearchingNearbyCranes'
import TrackRequestsScreen from '../../screens/CustomerFlow/LiveTracking/TrackRequestsScreen'
import EVEntryScreen from '../../screens/CustomerFlow/CustomerHome/EVCharging/EVEntryScreen'
import EVOptionsListScreen from '../../screens/CustomerFlow/CustomerHome/EVCharging/EVOptionsListScreen'
import EVScanScreen from '../../screens/CustomerFlow/CustomerHome/EVCharging/EVScanScreen'
import EVDirectionDetailScreen from '../../screens/CustomerFlow/CustomerHome/EVCharging/EVDirectionDetailScreen'
import EVNavigationScreen from '../../screens/CustomerFlow/CustomerHome/EVCharging/EVNavigationScreen'
import EVChargingHubScreen from '../../screens/CustomerFlow/CustomerHome/EVCharging/EVChargingHubScreen'
import EVConfirmPayScreen from '../../screens/CustomerFlow/CustomerHome/EVCharging/EVConfirmPayScreen'
import EVChargeModeScreen from '../../screens/CustomerFlow/CustomerHome/EVCharging/EVChargeModeScreen'
import EVChargingSessionScreen from '../../screens/CustomerFlow/CustomerHome/EVCharging/EVChargingSessionScreen'
import EVChargingStoppedScreen from '../../screens/CustomerFlow/CustomerHome/EVCharging/EVChargingStoppedScreen'

const Tab = createBottomTabNavigator()
// const Stack = createNativeStackNavigator()
const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        statusBarTranslucent: false,
        statusBarStyle: 'dark',
        statusBarColor: '#FFFFFF',
      }}
    >
      <Stack.Screen
        name="CustomerHomeMain"
        component={CustomerHomeScreen}
      />
        <Stack.Screen
          name="ReportAccidentScreen"
          component={ReportAccidentScreen}
        />
        <Stack.Screen
          name="AccidentRequestSubmittedScreen"
          component={AccidentRequestSubmittedScreen}
        />
      <Stack.Screen
        name="SelectInsuranceTypeScreen"
        component={SelectInsuranceTypeScreen}
      />
      <Stack.Screen
        name="MotorInsuranceFormScreen"
        component={MotorInsuranceFormScreen}
      />
      <Stack.Screen
        name="MotorInsuranceThankYouScreen"
        component={MotorInsuranceThankYouScreen}
      />
      <Stack.Screen
        name="HealthInsuranceFormScreen"
        component={HealthInsuranceFormScreen}
      />
      <Stack.Screen
        name="HealthInsuranceThankYouScreen"
        component={HealthInsuranceThankYouScreen}
      />
      <Stack.Screen
        name="TravelInsuranceFormScreen"
        component={TravelInsuranceFormScreen}
      />
      <Stack.Screen
        name="TravelInsuranceThankYouScreen"
        component={TravelInsuranceThankYouScreen}
      />
      <Stack.Screen
        name="TowingAssistanceScreen"
        component={TowingAssistanceScreen}
      />
       <Stack.Screen
        name="VehicleDetailsScreen"
        component={VehicleDetailsScreen}
      />
        <Stack.Screen
        name="CaptureVehiclePhotosScreen"
        component={CaptureVehiclePhotosScreen}
      />
        <Stack.Screen
        name="SelectCraneTypeScreen"
        component={SelectCraneTypeScreen}
      />
          <Stack.Screen
        name="SelectTowingOptionScreen"
        component={SelectTowingOptionScreen}
      />

    <Stack.Screen
        name="SearchingNearbyCranesScreen"
        component={SearchingNearbyCranesScreen}
      />
      

         <Stack.Screen
        name="ReviewDetailsScreen"
        component={ReviewDetailsScreen}
      />

        <Stack.Screen
        name="DriverFoundScreen"
        component={DriverFoundScreen}
        options={{ gestureEnabled: false }}
      />

        <Stack.Screen
          name="EVEntryScreen"
          component={EVEntryScreen}
        />
        <Stack.Screen
          name="EVOptionsListScreen"
          component={EVOptionsListScreen}
        />
        <Stack.Screen
          name="EVScanScreen"
          component={EVScanScreen}
        />
        <Stack.Screen
          name="EVDirectionDetailScreen"
          component={EVDirectionDetailScreen}
        />
        <Stack.Screen
          name="EVNavigationScreen"
          component={EVNavigationScreen}
        />
        <Stack.Screen
          name="EVChargingHubScreen"
          component={EVChargingHubScreen}
        />
        <Stack.Screen
          name="EVConfirmPayScreen"
          component={EVConfirmPayScreen}
        />
        <Stack.Screen
          name="EVChargeModeScreen"
          component={EVChargeModeScreen}
        />
        <Stack.Screen
          name="EVChargingSessionScreen"
          component={EVChargingSessionScreen}
        />
        <Stack.Screen
          name="EVChargingStoppedScreen"
          component={EVChargingStoppedScreen}
        />
      
    </Stack.Navigator>
  )
}

function ProfileStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        statusBarTranslucent: false,
        statusBarStyle: 'dark',
        statusBarColor: '#FFFFFF',
      }}
    >
        <Stack.Screen
        name="CustomerProfileScreen"
        component={CustomerProfileScreen}
      />
      <Stack.Screen
        name="PersonalInfoScreen"
        component={PersonalInfoScreen}
      />
     
      
    </Stack.Navigator>
  )
}

function TrackStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        statusBarTranslucent: false,
        statusBarStyle: 'dark',
        statusBarColor: '#FFFFFF',
      }}
    >
      <Stack.Screen
        name="TrackRequestsScreen"
        component={TrackRequestsScreen}
      />
      <Stack.Screen
        name="LiveTowTrackingScreen"
        component={LiveTowTrackingScreen}
      />
    </Stack.Navigator>
  )
}

// ─── Gradient glow tab icon wrapper ───────────────────────────────────────────
const TabIconWrapper = ({ focused, children }) => {
  if (!focused) {
    return <View style={styles.iconWrapper}>{children}</View>
  }
  return (
    <View style={styles.activeIconOuter}>
      {/* Bottom glow reflection — the "light spill" under the icon */}
      <LinearGradient
        colors={['rgba(220, 60, 40, 0.0)', 'rgba(220, 60, 40, 0.55)', 'rgba(220, 60, 40, 0.0)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        // style={styles.glowBar}
      />
      {/* Top spotlight glow behind the icon */}
      <LinearGradient
        colors={['rgba(220, 60, 40, 0.18)', 'rgba(220, 60, 40, 0.0)']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.glowSpot}
      />
      <View style={styles.iconWrapper}>{children}</View>
    </View>
  )
}



// ─── Main Tab Navigator ───────────────────────────────────────────────────────
function TabNavigation() {
  const [keyboardVisible, setKeyboardVisible] = useState(false)
  const { isDarkMode } = useSelector(state => state.theme)

  useEffect(() => {
    const show = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true))
    const hide = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false))
    return () => { show.remove(); hide.remove() }
  }, [])

  return (
    <Tab.Navigator
      initialRouteName="CustomerHomeScreen"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#111111',
          height: 75,
          borderTopWidth: 0,
          elevation: 24,
          shadowColor: '#C0392B',
          shadowOpacity: 0.3,
          //  borderRadius:10,
          // marginHorizontal: 10,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: -4 },
          display: keyboardVisible ? 'none' : 'flex',
          overflow: 'visible',  // to ensure shadows and glows don't get cut off
        },
        tabBarBackground: () => (
          // Very subtle top border glow on the whole bar
          <View style={StyleSheet.absoluteFill}>
            <LinearGradient
              colors={['rgba(192,57,43,0.18)', 'transparent']}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              style={{ height: 3, width: '100%' }}
            />
            <View style={{ flex: 1, backgroundColor: '#111111' }} />
          </View>
        ),
      }}
    >

      {/* ── HOME ──────────────────────────────────────── */}
      <Tab.Screen
        name="CustomerHomeScreen"
        component={HomeStack}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabLabelText label="Home" focused={focused} />
          ),
          tabBarIcon: ({ focused }) => (
            <TabIconWrapper focused={focused}>
              <Ionicons
                name={focused ? 'home' : 'home-outline'}
                size={24}
                color={focused ? '#FF5733' : '#6B7280'}
              />
            </TabIconWrapper>
          ),
        }}
      />

      {/* ── MY CASES ──────────────────────────────────── */}
      <Tab.Screen
        name="MyCases"
        component={MyCasesScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabLabelText label="My Cases" focused={focused} />
          ),
          tabBarIcon: ({ focused }) => (
            <TabIconWrapper focused={focused}>
              <MaterialCommunityIcons
                name={focused ? 'clipboard-text' : 'clipboard-text-outline'}
                size={24}
                color={focused ? '#FF5733' : '#6B7280'}
              />
            </TabIconWrapper>
          ),
        }}
      />

      {/* ── TRACK (center pill button) ────────────────── */}
      <Tab.Screen
        name="Track"
        component={TrackStack}
         options={{
          tabBarLabel: ({ focused }) => (
            <TabLabelText label="Track" focused={focused} />
          ),
          tabBarIcon: ({ focused }) => (
            <TabIconWrapper focused={focused}>
              <MaterialCommunityIcons
                name={focused ? 'map-marker-path' : 'map-marker-path'}
                size={24}
                color={focused ? '#FF5733' : '#6B7280'}
              />
            </TabIconWrapper>
          ),
        }}
      />

      {/* ── PROFILE ───────────────────────────────────── */}
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabLabelText label="Profile" focused={focused} />
          ),
          tabBarIcon: ({ focused }) => (
            <TabIconWrapper focused={focused}>
              <Ionicons
                name={focused ? 'person' : 'person-outline'}
                size={22}
                color={focused ? '#FF5733' : '#6B7280'}
              />
            </TabIconWrapper>
          ),
        }}
      />

    </Tab.Navigator>
  )
}

// ─── Tab Label Text Component ─────────────────────────────────────────────────
const TabLabelText = ({ label, focused }) => (
  <View style={{ marginBottom: 6 }}>
    {/* We can't do gradient text in RN without extra lib, so we use color */}
    <TabLabelTextInner label={label} focused={focused} />
  </View>
)

const TabLabelTextInner = ({ label, focused }) => {
  // For gradient text, we use a trick: render text over a gradient, clip to text
  // Simple approach: colored text
  return (
    <View>
      {focused ? (
        // <LinearGradient
        //   colors={['#FF6B35', '#C0392B']}
        //   start={{ x: 0, y: 0 }}
        //   end={{ x: 1, y: 0 }}
        //   style={styles.labelGradientPill}
        // >
          <LabelText label={label} color="#FFFFFF" />
        // </LinearGradient>
      ) : (
        <LabelText label={label} color="#6B7280" />
      )}
    </View>
  )
}

const LabelText = ({ label, color }) => (
  <Text style={{ color, fontSize: 10, fontWeight: '600', letterSpacing: 0.3 }}>
    {label}
  </Text>
)

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  // Active icon glow container
  activeIconOuter: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: 60,
    height: 44,
    marginTop: 4,
  },
  // The horizontal glow bar at the very top of the tab bar (under the icon)
  glowBar: {
    position: 'absolute',
    top: -4,           // flush with top of tab bar
    left: '50%',
    transform: [{ translateX: -30 }],
    width: 60,
    height: 3,
    borderRadius: 2,
  },
  // Soft radial-ish glow behind the icon
  glowSpot: {
    position: 'absolute',
    top: 0,
    left: '50%',
    transform: [{ translateX: -28 }],
    width: 56,
    height: 40,
    borderRadius: 28,
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
  },

  // Label gradient pill background (active state)
  labelGradientPill: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  labelGradientBg: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
  },

  // Track / center circle button
  trackOuter: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -8,   // lift it slightly above the bar
  },
  trackCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: '#FF5733',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    overflow: 'hidden',
  },
  trackGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 26,
  },
  trackRingGlow: {
    position: 'absolute',
    width: 62,
    height: 62,
    borderRadius: 31,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 87, 51, 0.4)',
    top: -5,
  },
})

export default TabNavigation