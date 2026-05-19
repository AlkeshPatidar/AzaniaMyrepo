// import React, { useState, useRef } from 'react'
// import {
//   View,
//   Text,
//   ScrollView,
//   TouchableOpacity,
//   StyleSheet,
//   StatusBar,
//   Platform,
//   Image,
//   Dimensions,
//   FlatList,
// } from 'react-native'
// import LinearGradient from 'react-native-linear-gradient'
// import Feather from 'react-native-vector-icons/Feather'
// import Ionicons from 'react-native-vector-icons/Ionicons'
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
// import { useIsFocused } from '@react-navigation/native'

// import { App_Primary_color } from '../../../common/Colors/colors'
// import { FONTS_FAMILY } from '../../../assets/Fonts'

// const { width: SCREEN_WIDTH } = Dimensions.get('window')
// const MAIN_IMAGE_HEIGHT = 210

// // ─── Mock Data ────────────────────────────────────────────────────────────────
// const TASK_DETAIL = {
//   id: '1',
//   title: 'Create On Boarding Screen',
//   createdAt: 'Created 27 Sept 2024',
//   status: 'In Progress',
//   priority: 'High',
//   description:
//     'Create on boarding page based on pic, pixel perfect, with the user story of i want to know what kind of apps is this so i need to view onboarding screen to leverage my knowledge so that i know what kind of apps is this',
//   images: [
//     'https://placehold.co/300x300/png',
//     'https://placehold.co/300x300/png',
//     'https://placehold.co/300x300/png',
//   ],
//   progress: 0.45,
//   dueDate: '30 Sept 2024',
//   comments: 5,
//   assignee: {
//     name: 'Sarah Johnson',
//     role: 'UI Designer',
//   },
// }

// const PRIORITY_COLOR = { High: '#FF4757', Medium: '#FFA502', Low: '#2ED573' }

// // ─── Image Carousel ───────────────────────────────────────────────────────────
// const ImageCarousel = ({ images }) => {
//   const [activeIndex, setActiveIndex] = useState(0)
//   const [thumbIndex, setThumbIndex] = useState(0)
//   const flatRef = useRef(null)

//   const onScroll = (e) => {
//     const idx = Math.round(e.nativeEvent.contentOffset.x / (SCREEN_WIDTH - 40))
//     setActiveIndex(idx)
//     setThumbIndex(idx)
//   }

//   const goToImage = (idx) => {
//     flatRef.current?.scrollToIndex({ index: idx, animated: true })
//     setActiveIndex(idx)
//     setThumbIndex(idx)
//   }

//   return (
//     <View>
//       {/* Main Image Slider */}
//       <View style={styles.mainImageWrap}>
//         <FlatList
//           ref={flatRef}
//           data={images}
//           horizontal
//           pagingEnabled
//           showsHorizontalScrollIndicator={false}
//           onScroll={onScroll}
//           scrollEventThrottle={16}
//           keyExtractor={(_, i) => String(i)}
//           renderItem={({ item }) => (
//             <Image
//               source={{ uri: item }}
//               style={styles.mainImage}
//               resizeMode="cover"
//             />
//           )}
//         />
//         {/* Dot Indicators */}
//         <View style={styles.dotRow}>
//           {images.map((_, i) => (
//             <View
//               key={i}
//               style={[styles.dot, i === activeIndex && styles.dotActive]}
//             />
//           ))}
//         </View>
//       </View>

//       {/* Thumbnails */}
//       <View style={styles.thumbRow}>
//         {images.map((uri, i) => (
//           <TouchableOpacity
//             key={i}
//             activeOpacity={0.8}
//             onPress={() => goToImage(i)}
//             style={[styles.thumbWrap, i === thumbIndex && styles.thumbWrapActive]}
//           >
//             <Image source={{ uri }} style={styles.thumbImage} resizeMode="cover" />
//           </TouchableOpacity>
//         ))}
//       </View>
//     </View>
//   )
// }

// // ─── Info Row ─────────────────────────────────────────────────────────────────
// const InfoRow = ({ icon, label, value, iconBg, iconColor }) => (
//   <View style={styles.infoRow}>
//     <View style={[styles.infoIconWrap, { backgroundColor: iconBg }]}>
//       <Ionicons name={icon} size={14} color={iconColor} />
//     </View>
//     <Text style={styles.infoLabel}>{label}</Text>
//     <Text style={styles.infoValue}>{value}</Text>
//   </View>
// )

// // ─── Main Screen ──────────────────────────────────────────────────────────────
// const TaskDetailsScreen = ({ navigation, route }) => {
//   const isFocused = useIsFocused()
//   const task = route?.params?.task || TASK_DETAIL

//   return (
//     <View style={styles.container}>
//       {isFocused && (
//         <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
//       )}

//       {/* ── Purple Header ── */}
//       <LinearGradient
//         colors={['#7B6FF0', '#5B4DE8']}
//         start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 1 }}
//         style={styles.header}
//       >
//         <View style={{ height: Platform.OS === 'android' ? (StatusBar.currentHeight || 24) + 8 : 54 }} />

//         <View style={styles.headerRow}>
//           <TouchableOpacity
//             style={styles.backBtn}
//             onPress={() => navigation?.goBack()}
//             activeOpacity={0.75}
//           >
//             <Ionicons name="chevron-back" size={20} color="#fff" />
//           </TouchableOpacity>
//           <Text style={styles.headerTitle}>Task Details</Text>
//           {/* Spacer to balance back button */}
//           <View style={{ width: 38 }} />
//         </View>
//       </LinearGradient>

//       <ScrollView
//         style={styles.scroll}
//         contentContainerStyle={styles.scrollContent}
//         showsVerticalScrollIndicator={false}
//       >
//         {/* ── Main Card ── */}
//         <View style={styles.mainCard}>

//           {/* Task Title + Status Badge */}
//           <View style={styles.titleRow}>
//             <View style={{ flex: 1 }}>
//               <Text style={styles.taskTitle}>{task.title}</Text>
//               <Text style={styles.taskCreated}>{task.createdAt}</Text>
//             </View>
//             <View style={styles.statusBadge}>
//               <View style={styles.statusDot} />
//               <Text style={styles.statusTxt}>{task.status}</Text>
//             </View>
//           </View>

//           {/* Image Carousel */}
//           <ImageCarousel images={task.images} />

//           {/* Description */}
//           <View style={styles.descriptionBox}>
//             <Text style={styles.descriptionLabel}>Description</Text>
//             <Text style={styles.descriptionTxt}>{task.description}</Text>
//           </View>

//           {/* Badges Row */}
//           <View style={styles.badgeRow}>
//             <View style={styles.badgeInProgress}>
//               <View style={styles.badgeDot} />
//               <Text style={styles.badgeInProgressTxt}>{task.status}</Text>
//             </View>
//             <View
//               style={[
//                 styles.badgePriority,
//                 { backgroundColor: PRIORITY_COLOR[task.priority] || '#FF4757' },
//               ]}
//             >
//               <Text style={styles.badgePriorityTxt}>🚩 {task.priority}</Text>
//             </View>
//           </View>
//         </View>

//         {/* ── Progress Card ── */}
//         <View style={styles.sectionCard}>
//           <View style={styles.sectionHeader}>
//             <View style={[styles.sectionIconWrap, { backgroundColor: '#EDE9FF' }]}>
//               <MaterialCommunityIcons name="chart-line" size={14} color={App_Primary_color} />
//             </View>
//             <Text style={styles.sectionTitle}>Task Progress</Text>
//             <Text style={styles.progressPct}>{Math.round(task.progress * 100)}%</Text>
//           </View>
//           <View style={styles.progressTrack}>
//             <LinearGradient
//               colors={[App_Primary_color, '#A89CF7']}
//               start={{ x: 0, y: 0 }}
//               end={{ x: 1, y: 0 }}
//               style={[styles.progressFill, { width: `${task.progress * 100}%` }]}
//             />
//           </View>
//         </View>

//         {/* ── Details Card ── */}
//         <View style={styles.sectionCard}>
//           <Text style={styles.sectionTitle2}>Task Info</Text>

//           <InfoRow
//             icon="calendar-outline"
//             label="Due Date"
//             value={task.dueDate}
//             iconBg="#FFF3E0"
//             iconColor="#FFA502"
//           />
//           <View style={styles.infoDivider} />
//           <InfoRow
//             icon="chatbubble-outline"
//             label="Comments"
//             value={`${task.comments} Comments`}
//             iconBg="#E8FAF0"
//             iconColor="#2ED573"
//           />
//           <View style={styles.infoDivider} />
//           <InfoRow
//             icon="person-outline"
//             label="Assignee"
//             value={task.assignee.name}
//             iconBg="#EDE9FF"
//             iconColor={App_Primary_color}
//           />
//           <View style={styles.infoDivider} />
//           <InfoRow
//             icon="briefcase-outline"
//             label="Role"
//             value={task.assignee.role}
//             iconBg="#FFF0F3"
//             iconColor="#FF4757"
//           />
//         </View>

//         {/* Bottom padding for floating button */}
//         <View style={{ height: 90 }} />
//       </ScrollView>

//       {/* ── Floating Mark as Done Button ── */}
//       <View style={styles.floatingBtnWrap}>
//         <TouchableOpacity
//           activeOpacity={0.85}
//           onPress={() => {}}
//           style={styles.floatingBtnTouch}
//         >
//           <LinearGradient
//             colors={[App_Primary_color, '#4B0082']}
//             start={{ x: 0, y: 0 }}
//             end={{ x: 1, y: 0 }}
//             style={styles.floatingBtn}
//           >
//             <Ionicons name="checkmark-circle-outline" size={20} color="#fff" style={{ marginRight: 8 }} />
//             <Text style={styles.floatingBtnTxt}>Mark as Done</Text>
//           </LinearGradient>
//         </TouchableOpacity>
//       </View>
//     </View>
//   )
// }

// // ─── Styles ───────────────────────────────────────────────────────────────────
// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#F0F0F8' },
//   scroll: { flex: 1 },
//   scrollContent: { paddingBottom: 20 },

//   // ── Header ──
//   header: {
//     paddingHorizontal: 20,
//     paddingBottom: 20,
//     borderBottomLeftRadius: 28,
//     borderBottomRightRadius: 28,
//   },
//   headerRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginTop: 4,
//   },
//   backBtn: {
//     width: 38,
//     height: 38,
//     borderRadius: 19,
//     backgroundColor: 'rgba(255,255,255,0.22)',
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderWidth: 1.5,
//     borderColor: 'rgba(255,255,255,0.35)',
//   },
//   headerTitle: {
//     fontSize: 18,
//     fontWeight: '700',
//     color: '#fff',
//     fontFamily: FONTS_FAMILY.NatoSans_SemiBold || undefined,
//   },

//   // ── Main Card ──
//   mainCard: {
//     backgroundColor: '#fff',
//     borderRadius: 20,
//     marginHorizontal: 16,
//     marginTop: 16,
//     padding: 16,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.07,
//     shadowRadius: 12,
//     elevation: 3,
//   },

//   // Title row
//   titleRow: {
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//     marginBottom: 14,
//     gap: 10,
//   },
//   taskTitle: {
//     fontSize: 17,
//     fontWeight: '700',
//     color: '#111',
//     fontFamily: FONTS_FAMILY.NatoSans_SemiBold || undefined,
//     marginBottom: 3,
//   },
//   taskCreated: {
//     fontSize: 12,
//     color: '#aaa',
//     fontFamily: FONTS_FAMILY.NatoSans_Regular || undefined,
//   },
//   statusBadge: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#EDE9FF',
//     borderRadius: 20,
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     gap: 5,
//     alignSelf: 'flex-start',
//   },
//   statusDot: {
//     width: 7,
//     height: 7,
//     borderRadius: 4,
//     backgroundColor: App_Primary_color,
//   },
//   statusTxt: {
//     fontSize: 11,
//     color: App_Primary_color,
//     fontWeight: '600',
//     fontFamily: FONTS_FAMILY.NatoSans_SemiBold || undefined,
//   },

//   // Image Carousel
//   mainImageWrap: {
//     borderRadius: 14,
//     overflow: 'hidden',
//     marginBottom: 10,
//     height: MAIN_IMAGE_HEIGHT,
//   },
//   mainImage: {
//     width: SCREEN_WIDTH - 64,
//     height: MAIN_IMAGE_HEIGHT,
//   },
//   dotRow: {
//     position: 'absolute',
//     bottom: 10,
//     left: 0,
//     right: 0,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     gap: 5,
//   },
//   dot: {
//     width: 6,
//     height: 6,
//     borderRadius: 3,
//     backgroundColor: 'rgba(255,255,255,0.5)',
//   },
//   dotActive: {
//     backgroundColor: '#fff',
//     width: 16,
//   },

//   // Thumbnails
//   thumbRow: {
//     flexDirection: 'row',
//     gap: 8,
//     marginBottom: 14,
//   },
//   thumbWrap: {
//     width: 68,
//     height: 52,
//     borderRadius: 10,
//     overflow: 'hidden',
//     borderWidth: 2,
//     borderColor: 'transparent',
//   },
//   thumbWrapActive: {
//     borderColor: App_Primary_color,
//   },
//   thumbImage: {
//     width: '100%',
//     height: '100%',
//   },

//   // Description
//   descriptionBox: {
//     backgroundColor: '#FAFAFA',
//     borderRadius: 12,
//     padding: 14,
//     borderWidth: 1,
//     borderColor: '#EBEBF5',
//     marginBottom: 14,
//   },
//   descriptionLabel: {
//     fontSize: 13,
//     fontWeight: '700',
//     color: '#111',
//     fontFamily: FONTS_FAMILY.NatoSans_SemiBold || undefined,
//     marginBottom: 6,
//   },
//   descriptionTxt: {
//     fontSize: 13,
//     color: '#555',
//     lineHeight: 20,
//     fontFamily: FONTS_FAMILY.NatoSans_Regular || undefined,
//   },

//   // Badges
//   badgeRow: {
//     flexDirection: 'row',
//     gap: 8,
//   },
//   badgeInProgress: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#F2F2F2',
//     borderRadius: 20,
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     gap: 5,
//   },
//   badgeDot: {
//     width: 7,
//     height: 7,
//     borderRadius: 4,
//     backgroundColor: '#BBBBBB',
//   },
//   badgeInProgressTxt: {
//     fontSize: 11,
//     color: '#666',
//     fontFamily: FONTS_FAMILY.NatoSans_Regular || undefined,
//   },
//   badgePriority: {
//     borderRadius: 20,
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//   },
//   badgePriorityTxt: {
//     fontSize: 11,
//     color: '#fff',
//     fontWeight: '700',
//     fontFamily: FONTS_FAMILY.NatoSans_SemiBold || undefined,
//   },

//   // ── Section Cards ──
//   sectionCard: {
//     backgroundColor: '#fff',
//     borderRadius: 20,
//     marginHorizontal: 16,
//     marginTop: 12,
//     padding: 16,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.05,
//     shadowRadius: 8,
//     elevation: 2,
//   },
//   sectionHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//     marginBottom: 12,
//   },
//   sectionIconWrap: {
//     width: 26,
//     height: 26,
//     borderRadius: 13,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   sectionTitle: {
//     flex: 1,
//     fontSize: 14,
//     fontWeight: '700',
//     color: '#111',
//     fontFamily: FONTS_FAMILY.NatoSans_SemiBold || undefined,
//   },
//   sectionTitle2: {
//     fontSize: 14,
//     fontWeight: '700',
//     color: '#111',
//     fontFamily: FONTS_FAMILY.NatoSans_SemiBold || undefined,
//     marginBottom: 14,
//   },
//   progressPct: {
//     fontSize: 14,
//     fontWeight: '700',
//     color: App_Primary_color,
//     fontFamily: FONTS_FAMILY.NatoSans_SemiBold || undefined,
//   },
//   progressTrack: {
//     height: 8,
//     backgroundColor: '#EBEBF5',
//     borderRadius: 4,
//     overflow: 'hidden',
//   },
//   progressFill: {
//     height: 8,
//     borderRadius: 4,
//   },

//   // Info Rows
//   infoRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 10,
//     paddingVertical: 6,
//   },
//   infoIconWrap: {
//     width: 28,
//     height: 28,
//     borderRadius: 14,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   infoLabel: {
//     flex: 1,
//     fontSize: 13,
//     color: '#888',
//     fontFamily: FONTS_FAMILY.NatoSans_Regular || undefined,
//   },
//   infoValue: {
//     fontSize: 13,
//     fontWeight: '600',
//     color: '#111',
//     fontFamily: FONTS_FAMILY.NatoSans_SemiBold || undefined,
//   },
//   infoDivider: {
//     height: 1,
//     backgroundColor: '#F2F2F7',
//     marginVertical: 2,
//   },

//   // ── Floating Button ──
//   floatingBtnWrap: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     paddingHorizontal: 20,
//     paddingBottom: Platform.OS === 'ios' ? 36 : 20,
//     paddingTop: 12,
//     backgroundColor: 'white',
//   },
//   floatingBtnTouch: {
//     borderRadius: 30,
//     overflow: 'hidden',
//     shadowColor: App_Primary_color,
//     shadowOffset: { width: 0, height: 6 },
//     shadowOpacity: 0.4,
//     shadowRadius: 12,
//     elevation: 8,
//   },
//   floatingBtn: {
//     height: 54,
//     borderRadius: 30,
//     alignItems: 'center',
//     justifyContent: 'center',
//     flexDirection: 'row',
//   },
//   floatingBtnTxt: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '700',
//     letterSpacing: 0.3,
//     fontFamily: FONTS_FAMILY.NatoSans_SemiBold || undefined,
//   },
// })

// export default TaskDetailsScreen


import React, { useState, useRef } from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Platform,
  Image,
  Dimensions,
  FlatList,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useIsFocused } from '@react-navigation/native'

import { App_Primary_color } from '../../../common/Colors/colors'
import { FONTS_FAMILY } from '../../../assets/Fonts'

const { width: SCREEN_WIDTH } = Dimensions.get('window')

// ─── Layout constants (must be consistent everywhere) ─────────────────────────
// mainCard: marginHorizontal 16 + padding 16 on each side
const CARD_H_MARGIN = 16
const CARD_PADDING  = 16
// The exact pixel width available inside the card for images
const IMAGE_WIDTH   = SCREEN_WIDTH - CARD_H_MARGIN * 2 - CARD_PADDING * 2
const IMAGE_HEIGHT  = 210

// ─── Mock Data ────────────────────────────────────────────────────────────────
const TASK_DETAIL = {
  id: '1',
  title: 'Create On Boarding Screen',
  createdAt: 'Created 27 Sept 2024',
  status: 'In Progress',
  priority: 'High',
  description:
    'Create on boarding page based on pic, pixel perfect, with the user story of i want to know what kind of apps is this so i need to view onboarding screen to leverage my knowledge so that i know what kind of apps is this',
  images: [
    'https://picsum.photos/seed/task1/800/500',
    'https://picsum.photos/seed/task2/800/500',
    'https://picsum.photos/seed/task3/800/500',
  ],
  progress: 0.45,
  dueDate: '30 Sept 2024',
  comments: 5,
  assignee: {
    name: 'Sarah Johnson',
    role: 'UI Designer',
  },
}

const PRIORITY_COLOR = { High: '#FF4757', Medium: '#FFA502', Low: '#2ED573' }

// ─── Image Carousel ───────────────────────────────────────────────────────────
const ImageCarousel = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const flatRef = useRef(null)

  // Use onMomentumScrollEnd for reliable index detection after paging
  const onMomentumScrollEnd = (e) => {
    const idx = Math.round(e.nativeEvent.contentOffset.x / IMAGE_WIDTH)
    setActiveIndex(idx)
  }

  const goToImage = (idx) => {
    flatRef.current?.scrollToIndex({ index: idx, animated: true })
    setActiveIndex(idx)
  }

  return (
    <View>
      {/* Main Slider */}
      <View style={styles.mainImageWrap}>
        <FlatList
          ref={flatRef}
          data={images}
          horizontal
          pagingEnabled
          bounces={false}
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={onMomentumScrollEnd}
          scrollEventThrottle={16}
          // getItemLayout is required for scrollToIndex to work correctly
          getItemLayout={(_, index) => ({
            length: IMAGE_WIDTH,
            offset: IMAGE_WIDTH * index,
            index,
          })}
          keyExtractor={(_, i) => String(i)}
          renderItem={({ item }) => (
            // Wrap in View with explicit width = IMAGE_WIDTH for reliable paging
            <View style={{ width: IMAGE_WIDTH, height: IMAGE_HEIGHT }}>
              <Image
                source={{ uri: item }}
                style={{ width: IMAGE_WIDTH, height: IMAGE_HEIGHT }}
                resizeMode="cover"
              />
            </View>
          )}
        />

        {/* Dot Indicators */}
        <View style={styles.dotRow}>
          {images.map((_, i) => (
            <View key={i} style={[styles.dot, i === activeIndex && styles.dotActive]} />
          ))}
        </View>
      </View>

      {/* Thumbnails */}
      <View style={styles.thumbRow}>
        {images.map((uri, i) => (
          <TouchableOpacity
            key={i}
            activeOpacity={0.8}
            onPress={() => goToImage(i)}
            style={[styles.thumbWrap, i === activeIndex && styles.thumbWrapActive]}
          >
            <Image source={{ uri }} style={styles.thumbImage} resizeMode="cover" />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}

// ─── Info Row ─────────────────────────────────────────────────────────────────
const InfoRow = ({ icon, label, value, iconBg, iconColor }) => (
  <View style={styles.infoRow}>
    <View style={[styles.infoIconWrap, { backgroundColor: iconBg }]}>
      <Ionicons name={icon} size={14} color={iconColor} />
    </View>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
)

// ─── Main Screen ──────────────────────────────────────────────────────────────
const TaskDetailsScreen = ({ navigation, route }) => {
  const isFocused = useIsFocused()
  const task = route?.params?.task || TASK_DETAIL

  return (
    <View style={styles.container}>
      {isFocused && (
        <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      )}

      {/* ── Purple Header ── */}
      <LinearGradient
        colors={['#7B6FF0', '#5B4DE8']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={{ height: Platform.OS === 'android' ? (StatusBar.currentHeight || 24) + 8 : 54 }} />
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation?.goBack()}
            activeOpacity={0.75}
          >
            <Ionicons name="chevron-back" size={20} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Task Details</Text>
          <View style={{ width: 38 }} />
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        // Prevent ScrollView from consuming horizontal swipes inside FlatList
        nestedScrollEnabled
      >
        {/* ── Main Card ── */}
        {/* overflow: 'hidden' so the FlatList doesn't bleed outside card */}
        <View style={styles.mainCard}>

          {/* Title + Status */}
          <View style={styles.titleRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.taskTitle}>{task.title}</Text>
              <Text style={styles.taskCreated}>{task.createdAt}</Text>
            </View>
            <View style={styles.statusBadge}>
              <View style={styles.statusDot} />
              <Text style={styles.statusTxt}>{task.status}</Text>
            </View>
          </View>

          {/* Carousel */}
          <ImageCarousel images={task.images} />

          {/* Description */}
          <View style={styles.descriptionBox}>
            <Text style={styles.descriptionLabel}>Description</Text>
            <Text style={styles.descriptionTxt}>{task.description}</Text>
          </View>

          {/* Badges */}
          <View style={styles.badgeRow}>
            <View style={styles.badgeInProgress}>
              <View style={styles.badgeDot} />
              <Text style={styles.badgeInProgressTxt}>{task.status}</Text>
            </View>
            <View style={[styles.badgePriority, { backgroundColor: PRIORITY_COLOR[task.priority] || '#FF4757' }]}>
              <Text style={styles.badgePriorityTxt}>🚩 {task.priority}</Text>
            </View>
          </View>
        </View>

        {/* ── Progress Card ── */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <View style={[styles.sectionIconWrap, { backgroundColor: '#EDE9FF' }]}>
              <MaterialCommunityIcons name="chart-line" size={14} color={App_Primary_color} />
            </View>
            <Text style={styles.sectionTitle}>Task Progress</Text>
            <Text style={styles.progressPct}>{Math.round(task.progress * 100)}%</Text>
          </View>
          <View style={styles.progressTrack}>
            <LinearGradient
              colors={[App_Primary_color, '#A89CF7']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[styles.progressFill, { width: `${task.progress * 100}%` }]}
            />
          </View>
        </View>

        {/* ── Info Card ── */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle2}>Task Info</Text>

          <InfoRow icon="calendar-outline"    label="Due Date"   value={task.dueDate}               iconBg="#FFF3E0" iconColor="#FFA502" />
          <View style={styles.infoDivider} />
          <InfoRow icon="chatbubble-outline"   label="Comments"  value={`${task.comments} Comments`} iconBg="#E8FAF0" iconColor="#2ED573" />
          <View style={styles.infoDivider} />
          <InfoRow icon="person-outline"       label="Assignee"  value={task.assignee.name}          iconBg="#EDE9FF" iconColor={App_Primary_color} />
          <View style={styles.infoDivider} />
          <InfoRow icon="briefcase-outline"    label="Role"      value={task.assignee.role}          iconBg="#FFF0F3" iconColor="#FF4757" />
        </View>

        <View style={{ height: 90 }} />
      </ScrollView>

      {/* ── Floating Button ── */}
      <View style={styles.floatingBtnWrap}>
        <TouchableOpacity activeOpacity={0.85} onPress={() => {}} style={styles.floatingBtnTouch}>
          <LinearGradient
            colors={[App_Primary_color, '#4B0082']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.floatingBtn}
          >
            <Ionicons name="checkmark-circle-outline" size={20} color="#fff" style={{ marginRight: 8 }} />
            <Text style={styles.floatingBtnTxt}>Mark as Done</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  )
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container:     { flex: 1, backgroundColor: '#F0F0F8' },
  scroll:        { flex: 1 },
  scrollContent: { paddingBottom: 20 },

  // Header
  header: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  backBtn: {
    width: 38, height: 38, borderRadius: 19,
    backgroundColor: 'rgba(255,255,255,0.22)',
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.35)',
  },
  headerTitle: {
    fontSize: 18, fontWeight: '700', color: '#fff',
    fontFamily: FONTS_FAMILY.NatoSans_SemiBold || undefined,
  },

  // Main Card — overflow hidden so FlatList stays clipped
  mainCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    marginHorizontal: CARD_H_MARGIN,
    marginTop: 16,
    padding: CARD_PADDING,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 12,
    elevation: 3,
    overflow: 'hidden',
  },

  titleRow: {
    flexDirection: 'row', alignItems: 'flex-start',
    marginBottom: 14, gap: 10,
  },
  taskTitle: {
    fontSize: 17, fontWeight: '700', color: '#111',
    fontFamily: FONTS_FAMILY.NatoSans_SemiBold || undefined,
    marginBottom: 3,
  },
  taskCreated: {
    fontSize: 12, color: '#aaa',
    fontFamily: FONTS_FAMILY.NatoSans_Regular || undefined,
  },
  statusBadge: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#EDE9FF', borderRadius: 20,
    paddingHorizontal: 10, paddingVertical: 5,
    gap: 5, alignSelf: 'flex-start',
  },
  statusDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: App_Primary_color },
  statusTxt: {
    fontSize: 11, color: App_Primary_color, fontWeight: '600',
    fontFamily: FONTS_FAMILY.NatoSans_SemiBold || undefined,
  },

  // ── Carousel ──
  mainImageWrap: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    borderRadius: 14,
    overflow: 'hidden',        // clips images to rounded corners
    marginBottom: 10,
    backgroundColor: '#EBEBF5', // visible while image loads
  },
  dotRow: {
    position: 'absolute', bottom: 10,
    left: 0, right: 0,
    flexDirection: 'row', justifyContent: 'center', gap: 5,
  },
  dot: {
    width: 6, height: 6, borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.55)',
  },
  dotActive: { backgroundColor: '#fff', width: 16 },

  thumbRow: { flexDirection: 'row', gap: 8, marginBottom: 14 },
  thumbWrap: {
    width: 68, height: 52, borderRadius: 10,
    overflow: 'hidden', borderWidth: 2,
    borderColor: 'transparent',
    backgroundColor: '#EBEBF5',
  },
  thumbWrapActive: { borderColor: App_Primary_color },
  thumbImage: { width: '100%', height: '100%' },

  // Description
  descriptionBox: {
    backgroundColor: '#FAFAFA', borderRadius: 12,
    padding: 14, borderWidth: 1, borderColor: '#EBEBF5', marginBottom: 14,
  },
  descriptionLabel: {
    fontSize: 13, fontWeight: '700', color: '#111',
    fontFamily: FONTS_FAMILY.NatoSans_SemiBold || undefined, marginBottom: 6,
  },
  descriptionTxt: {
    fontSize: 13, color: '#555', lineHeight: 20,
    fontFamily: FONTS_FAMILY.NatoSans_Regular || undefined,
  },

  // Badges
  badgeRow: { flexDirection: 'row', gap: 8 },
  badgeInProgress: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#F2F2F2', borderRadius: 20,
    paddingHorizontal: 10, paddingVertical: 5, gap: 5,
  },
  badgeDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: '#BBBBBB' },
  badgeInProgressTxt: {
    fontSize: 11, color: '#666',
    fontFamily: FONTS_FAMILY.NatoSans_Regular || undefined,
  },
  badgePriority: { borderRadius: 20, paddingHorizontal: 10, paddingVertical: 5 },
  badgePriorityTxt: {
    fontSize: 11, color: '#fff', fontWeight: '700',
    fontFamily: FONTS_FAMILY.NatoSans_SemiBold || undefined,
  },

  // Section cards
  sectionCard: {
    backgroundColor: '#fff', borderRadius: 20,
    marginHorizontal: 16, marginTop: 12, padding: 16,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05, shadowRadius: 8, elevation: 2,
  },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  sectionIconWrap: {
    width: 26, height: 26, borderRadius: 13,
    alignItems: 'center', justifyContent: 'center',
  },
  sectionTitle: {
    flex: 1, fontSize: 14, fontWeight: '700', color: '#111',
    fontFamily: FONTS_FAMILY.NatoSans_SemiBold || undefined,
  },
  sectionTitle2: {
    fontSize: 14, fontWeight: '700', color: '#111',
    fontFamily: FONTS_FAMILY.NatoSans_SemiBold || undefined, marginBottom: 14,
  },
  progressPct: {
    fontSize: 14, fontWeight: '700', color: App_Primary_color,
    fontFamily: FONTS_FAMILY.NatoSans_SemiBold || undefined,
  },
  progressTrack: { height: 8, backgroundColor: '#EBEBF5', borderRadius: 4, overflow: 'hidden' },
  progressFill:  { height: 8, borderRadius: 4 },

  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 6 },
  infoIconWrap: { width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  infoLabel:  { flex: 1, fontSize: 13, color: '#888', fontFamily: FONTS_FAMILY.NatoSans_Regular || undefined },
  infoValue:  { fontSize: 13, fontWeight: '600', color: '#111', fontFamily: FONTS_FAMILY.NatoSans_SemiBold || undefined },
  infoDivider: { height: 1, backgroundColor: '#F2F2F7', marginVertical: 2 },

  // Floating button
  floatingBtnWrap: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === 'ios' ? 36 : 20,
    paddingTop: 12, backgroundColor: 'white',
  },
  floatingBtnTouch: {
    borderRadius: 30, overflow: 'hidden',
    shadowColor: App_Primary_color,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4, shadowRadius: 12, elevation: 8,
  },
  floatingBtn: {
    height: 54, borderRadius: 30,
    alignItems: 'center', justifyContent: 'center', flexDirection: 'row',
  },
  floatingBtnTxt: {
    color: '#fff', fontSize: 16, fontWeight: '700',
    letterSpacing: 0.3,
    fontFamily: FONTS_FAMILY.NatoSans_SemiBold || undefined,
  },
})

export default TaskDetailsScreen