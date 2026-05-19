// import React, { useState } from 'react'
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   StatusBar,
//   Platform,
//   ScrollView,
//   Modal,
// } from 'react-native'
// import LinearGradient from 'react-native-linear-gradient'
// import MapView, { Circle, Marker } from 'react-native-maps'
// import Feather from 'react-native-vector-icons/Feather'
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
// import Ionicons from 'react-native-vector-icons/Ionicons'
// import { useIsFocused } from '@react-navigation/native'

// import { FONTS_FAMILY } from '../../../assets/Fonts/index'
// import { App_Primary_color } from '../../../common/Colors/colors'

// // ─── Clock-In Success Modal ───────────────────────────────────────────────────
// const ClockInSuccessModal = ({ visible, onGoToPage }) => (
//   <Modal visible={visible} transparent animationType="fade">
//     <View style={modal.overlay}>
//       <View style={modal.card}>
//         {/* Icon */}
//         <View style={modal.iconWrap}>
//           <Feather name="user" size={32} color="#fff" />
//         </View>

//         <Text style={modal.title}>Clock-In Successful!</Text>
//         <Text style={modal.subtitle}>
//           You're all set! Your clock-in was successful. Head over to your dashboard to see your assigned tasks.
//         </Text>

//         <TouchableOpacity onPress={onGoToPage} activeOpacity={0.85} style={modal.btnWrap}>
//           <LinearGradient
//             colors={[App_Primary_color, '#4B0082']}
//             start={{ x: 0, y: 0 }}
//             end={{ x: 1, y: 0 }}
//             style={modal.btn}
//           >
//             <Text style={modal.btnText}>Go To Clock In Page</Text>
//           </LinearGradient>
//         </TouchableOpacity>
//       </View>
//     </View>
//   </Modal>
// )

// // ─── Main Screen ──────────────────────────────────────────────────────────────
// const ClockInAreaScreen = ({ navigation }) => {
//   const isFocused = useIsFocused()
//   const [showSuccess, setShowSuccess] = useState(false)

//   const handleClockIn = () => setShowSuccess(true)
//   const handleGoToPage = () => {
//     setShowSuccess(false)
//     navigation?.navigate('Attendance')
//   }

//   return (
//     <View style={styles.container}>
//       {isFocused && (
//         <StatusBar barStyle="dark-content" backgroundColor="#fff" />
//       )}

//       {/* ── Top bar ── */}
//       <View style={styles.topBar}>
//         <TouchableOpacity
//           style={styles.backBtn}
//           onPress={() => navigation?.goBack()}
//           activeOpacity={0.7}
//         >
//           <Feather name="chevron-left" size={22} color="#333" />
//         </TouchableOpacity>
//         <Text style={styles.topBarTitle}>Clock In Area</Text>
//         <View style={{ width: 36 }} />
//       </View>

//       {/* ── Map ── */}
//       <View style={styles.mapContainer}>
//         <MapView
//           style={styles.map}
//           initialRegion={{
//             latitude: -6.1754,
//             longitude: 106.8272,
//             latitudeDelta: 0.01,
//             longitudeDelta: 0.01,
//           }}
//         >
//           {/* Geofence circle */}
//           <Circle
//             center={{ latitude: -6.1754, longitude: 106.8272 }}
//             radius={300}
//             fillColor="rgba(108, 99, 255, 0.15)"
//             strokeColor="rgba(108, 99, 255, 0.5)"
//             strokeWidth={2}
//           />
//           {/* User marker */}
//           <Marker coordinate={{ latitude: -6.1754, longitude: 106.8272 }}>
//             <View style={styles.markerWrap}>
//               <View style={styles.markerAvatar}>
//                 <Feather name="user" size={18} color="#fff" />
//               </View>
//             </View>
//           </Marker>
//         </MapView>

//         {/* "You are in clock-in area" banner overlay */}
//         <View style={styles.areaBannerWrap}>
//           <LinearGradient
//             colors={[App_Primary_color, '#5448E4']}
//             start={{ x: 0, y: 0 }}
//             end={{ x: 1, y: 0 }}
//             style={styles.areaBanner}
//           >
//             <View style={{ flex: 1 }}>
//               <Text style={styles.areaBannerTitle}>You are in the clock-in area!</Text>
//               <Text style={styles.areaBannerSub}>Now you can press clock in in this area</Text>
//             </View>
//             <View style={styles.areaBannerIllustration}>
//               <Text style={styles.sparkle}>✦</Text>
//               <Text style={[styles.sparkle, { top: 8, right: 4, fontSize: 8 }]}>✦</Text>
//               <View style={styles.clockCircle}>
//                 <Ionicons name="time-outline" size={22} color="#fff" />
//               </View>
//             </View>
//           </LinearGradient>
//         </View>
//       </View>

//       {/* ── Bottom sheet ── */}
//       <ScrollView
//         style={styles.bottomSheet}
//         contentContainerStyle={{ paddingBottom: 24 }}
//         showsVerticalScrollIndicator={false}
//       >
//         {/* My Profile */}
//         <Text style={styles.sectionLabel}>MY PROFILE</Text>
//         <View style={styles.profileCard}>
//           <View style={styles.profileAvatar}>
//             <Feather name="user" size={22} color="#fff" />
//           </View>
//           <View style={{ flex: 1, marginLeft: 12 }}>
//             <View style={styles.nameRow}>
//               <Text style={styles.profileName}>Tonald Drump</Text>
//               <MaterialIcons name="verified" size={16} color={App_Primary_color} style={{ marginLeft: 4 }} />
//             </View>
//             <Text style={styles.profileDate}>29 September 2024</Text>
//             <View style={styles.locationRow}>
//               <Feather name="map-pin" size={11} color={App_Primary_color} style={{ marginRight: 3 }} />
//               <Text style={styles.locationText}>Lat 45.43534 Long 97897.576</Text>
//             </View>
//           </View>
//         </View>

//         {/* Schedule */}
//         <Text style={styles.sectionLabel}>SCHEDULE</Text>
//         <View style={styles.scheduleCard}>
//           <View style={styles.scheduleBlock}>
//             <Text style={styles.scheduleLabel}>CLOCK IN</Text>
//             <Text style={styles.scheduleTime}>09:00</Text>
//           </View>
//           <View style={styles.scheduleDivider} />
//           <View style={styles.scheduleBlock}>
//             <Text style={styles.scheduleLabel}>CLOCK OUT</Text>
//             <Text style={styles.scheduleTime}>05:00</Text>
//           </View>
//         </View>
//       </ScrollView>

//       {/* ── Clock In Button ── */}
//       <View style={styles.clockBtnContainer}>
//         <TouchableOpacity onPress={handleClockIn} activeOpacity={0.85} style={styles.clockBtnWrap}>
//           <LinearGradient
//             colors={[App_Primary_color, '#4B0082']}
//             start={{ x: 0, y: 0 }}
//             end={{ x: 1, y: 0 }}
//             style={styles.clockBtn}
//           >
//             <Text style={styles.clockBtnText}>Clock In</Text>
//           </LinearGradient>
//         </TouchableOpacity>
//       </View>

//       {/* ── Success Modal ── */}
//       <ClockInSuccessModal visible={showSuccess} onGoToPage={handleGoToPage} />
//     </View>
//   )
// }

// // ─── Modal Styles ─────────────────────────────────────────────────────────────
// const modal = StyleSheet.create({
//   overlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.45)',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingHorizontal: 28,
//   },
//   card: {
//     backgroundColor: '#fff',
//     borderRadius: 24,
//     padding: 28,
//     alignItems: 'center',
//     width: '100%',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 8 },
//     shadowOpacity: 0.15,
//     shadowRadius: 20,
//     elevation: 12,
//   },
//   iconWrap: {
//     width: 72,
//     height: 72,
//     borderRadius: 36,
//     backgroundColor: App_Primary_color,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: 20,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: '700',
//     color: '#111',
//     fontFamily: FONTS_FAMILY?.Natosans_Bold || undefined,
//     marginBottom: 10,
//     textAlign: 'center',
//   },
//   subtitle: {
//     fontSize: 13,
//     color: '#888',
//     textAlign: 'center',
//     lineHeight: 20,
//     fontFamily: FONTS_FAMILY?.Natosans_Regular || undefined,
//     marginBottom: 24,
//   },
//   btnWrap: {
//     width: '100%',
//     borderRadius: 30,
//     overflow: 'hidden',
//   },
//   btn: {
//     height: 50,
//     borderRadius: 30,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   btnText: {
//     color: '#fff',
//     fontSize: 15,
//     fontWeight: '700',
//     fontFamily: FONTS_FAMILY?.Poppins_SemiBold || undefined,
//   },
// })

// // ─── Screen Styles ────────────────────────────────────────────────────────────
// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#fff' },

//   // Top bar
//   topBar: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 16,
//     paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 24) + 8 : 54,
//     paddingBottom: 12,
//     backgroundColor: '#fff',
//   },
//   backBtn: {
//     width: 36,
//     height: 36,
//     borderRadius: 18,
//     backgroundColor: '#F4F4F8',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   topBarTitle: {
//     fontSize: 16,
//     fontWeight: '700',
//     color: '#111',
//     fontFamily: FONTS_FAMILY?.Natosans_Bold || undefined,
//   },

//   // Map
//   mapContainer: {
//     height: 280,
//     position: 'relative',
//   },
//   map: { width: '100%', height: '100%' },
//   markerWrap: {
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   markerAvatar: {
//     width: 44,
//     height: 44,
//     borderRadius: 22,
//     backgroundColor: App_Primary_color,
//     borderWidth: 3,
//     borderColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   areaBannerWrap: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     paddingHorizontal: 12,
//     paddingBottom: 10,
//   },
//   areaBanner: {
//     borderRadius: 14,
//     paddingHorizontal: 16,
//     paddingVertical: 14,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   areaBannerTitle: {
//     fontSize: 13,
//     fontWeight: '700',
//     color: '#fff',
//     fontFamily: FONTS_FAMILY?.Natosans_Bold || undefined,
//     marginBottom: 3,
//   },
//   areaBannerSub: {
//     fontSize: 11,
//     color: 'rgba(255,255,255,0.85)',
//     fontFamily: FONTS_FAMILY?.Natosans_Regular || undefined,
//   },
//   areaBannerIllustration: {
//     width: 50,
//     height: 44,
//     position: 'relative',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   sparkle: {
//     position: 'absolute',
//     top: 0,
//     right: 0,
//     fontSize: 11,
//     color: 'rgba(255,255,255,0.8)',
//   },
//   clockCircle: {
//     width: 38,
//     height: 38,
//     borderRadius: 19,
//     backgroundColor: 'rgba(255,255,255,0.2)',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },

//   // Bottom sheet
//   bottomSheet: {
//     flex: 1,
//     backgroundColor: '#fff',
//     paddingHorizontal: 16,
//     paddingTop: 16,
//   },
//   sectionLabel: {
//     fontSize: 11,
//     fontWeight: '700',
//     color: '#aaa',
//     letterSpacing: 0.8,
//     marginBottom: 10,
//     marginTop: 4,
//     fontFamily: FONTS_FAMILY?.Poppins_SemiBold || undefined,
//   },

//   // Profile card
//   profileCard: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#FAFAFA',
//     borderRadius: 14,
//     padding: 14,
//     marginBottom: 16,
//     borderWidth: 1,
//     borderColor: '#F0F0F5',
//   },
//   profileAvatar: {
//     width: 48,
//     height: 48,
//     borderRadius: 24,
//     backgroundColor: App_Primary_color,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   nameRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   profileName: {
//     fontSize: 15,
//     fontWeight: '700',
//     color: '#111',
//     fontFamily: FONTS_FAMILY?.Natosans_Bold || undefined,
//   },
//   profileDate: {
//     fontSize: 11,
//     color: App_Primary_color,
//     marginTop: 2,
//     fontFamily: FONTS_FAMILY?.Natosans_Regular || undefined,
//   },
//   locationRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 3,
//   },
//   locationText: {
//     fontSize: 11,
//     color: '#999',
//     fontFamily: FONTS_FAMILY?.Natosans_Regular || undefined,
//   },

//   // Schedule card
//   scheduleCard: {
//     flexDirection: 'row',
//     backgroundColor: '#FAFAFA',
//     borderRadius: 14,
//     borderWidth: 1,
//     borderColor: '#F0F0F5',
//     overflow: 'hidden',
//     marginBottom: 16,
//   },
//   scheduleBlock: {
//     flex: 1,
//     paddingVertical: 16,
//     alignItems: 'center',
//   },
//   scheduleDivider: {
//     width: 1,
//     backgroundColor: '#EBEBF5',
//     marginVertical: 12,
//   },
//   scheduleLabel: {
//     fontSize: 10,
//     color: '#aaa',
//     letterSpacing: 0.6,
//     fontWeight: '600',
//     fontFamily: FONTS_FAMILY?.Poppins_SemiBold || undefined,
//     marginBottom: 6,
//   },
//   scheduleTime: {
//     fontSize: 22,
//     fontWeight: '700',
//     color: '#111',
//     fontFamily: FONTS_FAMILY?.Natosans_Bold || undefined,
//   },

//   // Clock button
//   clockBtnContainer: {
//     paddingHorizontal: 16,
//     paddingBottom: Platform.OS === 'ios' ? 32 : 20,
//     paddingTop: 10,
//     backgroundColor: '#fff',
//   },
//   clockBtnWrap: {
//     borderRadius: 30,
//     overflow: 'hidden',
//     shadowColor: App_Primary_color,
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.35,
//     shadowRadius: 8,
//     elevation: 5,
//   },
//   clockBtn: {
//     height: 52,
//     borderRadius: 30,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   clockBtnText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '700',
//     fontFamily: FONTS_FAMILY?.Poppins_SemiBold || undefined,
//   },
// })

// export default ClockInAreaScreen




import React, { useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Platform,
  ScrollView,
  Modal,
  Image,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Feather from 'react-native-vector-icons/Feather'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useIsFocused } from '@react-navigation/native'

import { FONTS_FAMILY } from '../../../assets/Fonts/index'
import { App_Primary_color } from '../../../common/Colors/colors'

// ─── Static Map Placeholder ───────────────────────────────────────────────────
// Replace <Image source={require('...')} /> with actual static map image if available
// or integrate react-native-maps later when configured

const StaticMapView = () => (
  <View style={mapStyle.container}>
    {/* Map grid lines background */}
    <View style={mapStyle.mapBg}>
      {/* Horizontal roads */}
      {[60, 110, 160, 210, 250].map((top, i) => (
        <View key={`h${i}`} style={[mapStyle.road, mapStyle.roadH, { top }]} />
      ))}
      {/* Vertical roads */}
      {[50, 120, 190, 260, 320].map((left, i) => (
        <View key={`v${i}`} style={[mapStyle.road, mapStyle.roadV, { left }]} />
      ))}

      {/* Street labels */}
      <Text style={[mapStyle.streetLabel, { top: 48, left: 130 }]}>Jalan Veteran</Text>
      <Text style={[mapStyle.streetLabel, { top: 98, left: 60 }]}>Masjid Istiqlal</Text>
      <Text style={[mapStyle.streetLabel, { top: 18, left: 110 }]}>Pasar Baru</Text>

      {/* Green area blocks */}
      <View style={[mapStyle.block, { top: 130, left: 10, width: 80, height: 60, backgroundColor: '#D4EDDA' }]} />
      <View style={[mapStyle.block, { top: 70, left: 210, width: 100, height: 50, backgroundColor: '#D4EDDA' }]} />
      <View style={[mapStyle.block, { top: 170, left: 200, width: 70, height: 40, backgroundColor: '#E8F5E9' }]} />

      {/* Building blocks */}
      <View style={[mapStyle.block, { top: 30, left: 130, width: 55, height: 35, backgroundColor: '#E8E8F0' }]} />
      <View style={[mapStyle.block, { top: 80, left: 130, width: 50, height: 25, backgroundColor: '#EEEEF5' }]} />
      <View style={[mapStyle.block, { top: 130, left: 130, width: 45, height: 25, backgroundColor: '#E8E8F0' }]} />
      <View style={[mapStyle.block, { top: 180, left: 10, width: 45, height: 30, backgroundColor: '#EEEEF5' }]} />
      <View style={[mapStyle.block, { top: 30, left: 260, width: 60, height: 35, backgroundColor: '#E8E8F0' }]} />

      {/* Geofence circle */}
      <View style={mapStyle.geofenceOuter}>
        <View style={mapStyle.geofenceInner} />
      </View>

      {/* User avatar pin */}
      <View style={mapStyle.pinWrap}>
        <View style={mapStyle.pinAvatar}>
          <Feather name="user" size={18} color="#fff" />
        </View>
        <View style={mapStyle.pinTail} />
      </View>
    </View>
  </View>
)

const mapStyle = StyleSheet.create({
  container: { width: '100%', height: '100%', overflow: 'hidden' },
  mapBg: {
    flex: 1,
    backgroundColor: '#F0EFE9',
    position: 'relative',
    overflow: 'hidden',
  },
  road: { position: 'absolute', backgroundColor: '#fff' },
  roadH: { left: 0, right: 0, height: 10 },
  roadV: { top: 0, bottom: 0, width: 10 },
  block: { position: 'absolute', borderRadius: 4 },
  streetLabel: {
    position: 'absolute',
    fontSize: 9,
    color: '#666',
    fontWeight: '500',
    zIndex: 2,
  },
  geofenceOuter: {
    position: 'absolute',
    top: 85,
    left: 130,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(108, 99, 255, 0.12)',
    borderWidth: 1.5,
    borderColor: 'rgba(108, 99, 255, 0.45)',
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ translateX: -60 }, { translateY: -60 }],
    marginLeft: 60,
    marginTop: 60,
  },
  geofenceInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(108, 99, 255, 0.08)',
  },
  pinWrap: {
    position: 'absolute',
    top: 118,
    left: 158,
    alignItems: 'center',
    zIndex: 10,
  },
  pinAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: App_Primary_color,
    borderWidth: 3,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
  pinTail: {
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: App_Primary_color,
    marginTop: -1,
  },
})

// ─── Clock-In Success Modal ───────────────────────────────────────────────────
const ClockInSuccessModal = ({ visible, onGoToPage }) => (
  <Modal visible={visible} transparent animationType="fade">
    <View style={modal.overlay}>
      <View style={modal.card}>
        <View style={modal.iconWrap}>
          <Feather name="user" size={32} color="#fff" />
        </View>
        <Text style={modal.title}>Clock-In Successful!</Text>
        <Text style={modal.subtitle}>
          You're all set! Your clock-in was successful. Head over to your dashboard to see your assigned tasks.
        </Text>
        <TouchableOpacity onPress={onGoToPage} activeOpacity={0.85} style={modal.btnWrap}>
          <LinearGradient
            colors={[App_Primary_color, '#4B0082']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={modal.btn}
          >
            <Text style={modal.btnText}>Go To Clock In Page</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
)

// ─── Main Screen ──────────────────────────────────────────────────────────────
const ClockInAreaScreen = ({ navigation }) => {
  const isFocused = useIsFocused()
  const [showSuccess, setShowSuccess] = useState(false)

  const handleClockIn = () => setShowSuccess(true)
  const handleGoToPage = () => {
    setShowSuccess(false)
    navigation?.navigate('EmployeeTabNavigation',{screen:'AttendantTab'})
  }

  return (
    <View style={styles.container}>
      {isFocused && (
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      )}

      {/* ── Top bar ── */}
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation?.goBack()}
          activeOpacity={0.7}
        >
          <Feather name="chevron-left" size={22} color="#333" />
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>Clock In Area</Text>
        <View style={{ width: 36 }} />
      </View>

      {/* ── Static Map ── */}
      <View style={styles.mapContainer}>
        <StaticMapView />

        {/* "You are in clock-in area" banner overlay */}
     
      </View>

      {/* ── Bottom sheet ── */}
      <ScrollView
        style={styles.bottomSheet}
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >

           <View style={styles.areaBannerWrap}>
          <LinearGradient
            colors={[App_Primary_color, '#5448E4']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.areaBanner}
          >
            <View style={{ flex: 1 }}>
              <Text style={styles.areaBannerTitle}>You are in the clock-in area!</Text>
              <Text style={styles.areaBannerSub}>Now you can press clock in in this area</Text>
            </View>
            <View style={styles.areaBannerIllustration}>
              <Text style={styles.sparkle}>✦</Text>
              <Text style={[styles.sparkle, { top: 8, right: 4, fontSize: 8 }]}>✦</Text>
              <View style={styles.clockCircle}>
                <Ionicons name="time-outline" size={22} color="#fff" />
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* My Profile */}
        <Text style={styles.sectionLabel}>MY PROFILE</Text>
        <View style={styles.profileCard}>
          <View style={styles.profileAvatar}>
            <Feather name="user" size={22} color="#fff" />
          </View>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <View style={styles.nameRow}>
              <Text style={styles.profileName}>Tonald Drump</Text>
              <MaterialIcons name="verified" size={16} color={App_Primary_color} style={{ marginLeft: 4 }} />
            </View>
            <Text style={styles.profileDate}>29 September 2024</Text>
            <View style={styles.locationRow}>
              <Feather name="map-pin" size={11} color={App_Primary_color} style={{ marginRight: 3 }} />
              <Text style={styles.locationText}>Lat 45.43534 Long 97897.576</Text>
            </View>
          </View>
        </View>

        {/* Schedule */}
        <Text style={styles.sectionLabel}>SCHEDULE</Text>
        <View style={styles.scheduleCard}>
          <View style={styles.scheduleBlock}>
            <Text style={styles.scheduleLabel}>CLOCK IN</Text>
            <Text style={styles.scheduleTime}>09:00</Text>
          </View>
          <View style={styles.scheduleDivider} />
          <View style={styles.scheduleBlock}>
            <Text style={styles.scheduleLabel}>CLOCK OUT</Text>
            <Text style={styles.scheduleTime}>05:00</Text>
          </View>
        </View>
      </ScrollView>

      {/* ── Clock In Button ── */}
      <View style={styles.clockBtnContainer}>
        <TouchableOpacity onPress={handleClockIn} activeOpacity={0.85} style={styles.clockBtnWrap}>
          <LinearGradient
            colors={[App_Primary_color, '#4B0082']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.clockBtn}
          >
            <Text style={styles.clockBtnText}>Clock In</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* ── Success Modal ── */}
      <ClockInSuccessModal visible={showSuccess} onGoToPage={handleGoToPage} />
    </View>
  )
}

// ─── Modal Styles ─────────────────────────────────────────────────────────────
const modal = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 28,
    alignItems: 'center',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 12,
  },
  iconWrap: {
    width: 62,
    height: 62,
    borderRadius: 10,
    backgroundColor: App_Primary_color,
    alignItems: 'center',
    justifyContent: 'center',
    // marginBottom: 20,
    position:'absolute',
    top:-40
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111',
    fontFamily: FONTS_FAMILY?.Natosans_Bold || undefined,
    marginVertical: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 13,
    color: '#888',
    textAlign: 'center',
    lineHeight: 20,
    fontFamily: FONTS_FAMILY?.Natosans_Regular || undefined,
    marginBottom: 24,
  },
  btnWrap: {
    width: '100%',
    borderRadius: 30,
    overflow: 'hidden',
  },
  btn: {
    height: 50,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
    fontFamily: FONTS_FAMILY?.Poppins_SemiBold || undefined,
  },
})

// ─── Screen Styles ────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 24) + 8 : 54,
    paddingBottom: 12,
    backgroundColor: '#fff',
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F4F4F8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topBarTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111',
    fontFamily: FONTS_FAMILY?.Natosans_Bold || undefined,
  },

  mapContainer: {
    height: 280,
    position: 'relative',
    backgroundColor: '#F0EFE9',
  },

  areaBannerWrap: {
    // position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    // paddingHorizontal: 12,
    paddingBottom: 10,
  },
  areaBanner: {
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  areaBannerTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#fff',
    fontFamily: FONTS_FAMILY?.Natosans_Bold || undefined,
    marginBottom: 3,
  },
  areaBannerSub: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.85)',
    fontFamily: FONTS_FAMILY?.Natosans_Regular || undefined,
  },
  areaBannerIllustration: {
    width: 50,
    height: 44,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sparkle: {
    position: 'absolute',
    top: 0,
    right: 0,
    fontSize: 11,
    color: 'rgba(255,255,255,0.8)',
  },
  clockCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  bottomSheet: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 16,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#aaa',
    letterSpacing: 0.8,
    marginBottom: 10,
    marginTop: 4,
    fontFamily: FONTS_FAMILY?.Poppins_SemiBold || undefined,
  },

  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    borderRadius: 14,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F0F0F5',
  },
  profileAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: App_Primary_color,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameRow: { flexDirection: 'row', alignItems: 'center' },
  profileName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111',
    fontFamily: FONTS_FAMILY?.Natosans_Bold || undefined,
  },
  profileDate: {
    fontSize: 11,
    color: App_Primary_color,
    marginTop: 2,
    fontFamily: FONTS_FAMILY?.Natosans_Regular || undefined,
  },
  locationRow: { flexDirection: 'row', alignItems: 'center', marginTop: 3 },
  locationText: {
    fontSize: 11,
    color: '#999',
    fontFamily: FONTS_FAMILY?.Natosans_Regular || undefined,
  },

  scheduleCard: {
    flexDirection: 'row',
    backgroundColor: '#FAFAFA',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#F0F0F5',
    overflow: 'hidden',
    marginBottom: 16,
  },
  scheduleBlock: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
  },
  scheduleDivider: {
    width: 1,
    backgroundColor: '#EBEBF5',
    marginVertical: 12,
  },
  scheduleLabel: {
    fontSize: 10,
    color: '#aaa',
    letterSpacing: 0.6,
    fontWeight: '600',
    fontFamily: FONTS_FAMILY?.Poppins_SemiBold || undefined,
    marginBottom: 6,
  },
  scheduleTime: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111',
    fontFamily: FONTS_FAMILY?.Natosans_Bold || undefined,
  },

  clockBtnContainer: {
    paddingHorizontal: 16,
    paddingBottom: Platform.OS === 'ios' ? 32 : 20,
    paddingTop: 10,
    backgroundColor: '#fff',
  },
  clockBtnWrap: {
    borderRadius: 30,
    overflow: 'hidden',
    shadowColor: App_Primary_color,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 5,
  },
  clockBtn: {
    height: 52,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clockBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    fontFamily: FONTS_FAMILY?.Poppins_SemiBold || undefined,
  },
})

export default ClockInAreaScreen