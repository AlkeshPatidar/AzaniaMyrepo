import React, { useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Image,
  Platform,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Feather from 'react-native-vector-icons/Feather'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useSelector } from 'react-redux'
import { useIsFocused } from '@react-navigation/native'

import { FONTS_FAMILY } from '../../assets/Fonts'
import { App_Primary_color } from '../../common/Colors/colors'
import IMG from '../../assets/Images'
import { SafeAreaView } from 'react-native-safe-area-context'

// ─── Mock Data ────────────────────────────────────────────────────────────────
const MEETINGS = [
  { id: '1', title: 'Townhall Meeting', time: '01:30 AM - 02:00 AM' },
  { id: '2', title: 'Townhall Meeting', time: '01:30 AM - 02:00 AM' },
]

const TASKS = [
  {
    id: '1',
    title: 'Wiring Dashboard Analytics',
    status: 'In Progress',
    priority: 'High',
    progress: 0.72,
    date: '27 April',
    comments: 2,
  },
  {
    id: '2',
    title: 'Wiring Dashboard Analytics',
    status: 'In Progress',
    priority: 'High',
    progress: 0.72,
    date: '27 April',
    comments: 2,
  },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

const HeaderIconBtn = ({ name, IconLib = Feather, onPress }) => (
  <TouchableOpacity style={styles.headerIconBtn} onPress={onPress} activeOpacity={0.75}>
    <IconLib name={name} size={18} color={App_Primary_color} />
  </TouchableOpacity>
)

const MeetingCard = ({ item, onJoin }) => (
  <View style={styles.meetingCard}>
    {/* Row 1: icon + title + time */}
    <View style={styles.meetingRow}>
      <View style={styles.meetingIconWrap}>
        <Ionicons name="videocam" size={16} color="#fff" />
      </View>
      <Text style={styles.meetingTitle}>{item.title}</Text>
      <View style={styles.meetingTimeWrap}>
        <Feather name="clock" size={12} color="#999" style={{ marginRight: 4 }} />
        <Text style={styles.meetingTime}>{item.time}</Text>
      </View>
    </View>

    {/* Row 2: avatars + join button */}
    <View style={styles.meetingFooter}>
      <View style={styles.avatarStack}>
        <View style={[styles.avatarCircle, { zIndex: 3 }]}>
          <Text style={styles.avatarEmoji}>👩‍🦱</Text>
        </View>
        <Text style={styles.plusMore}>+3</Text>
      </View>
      <TouchableOpacity style={styles.joinBtn} onPress={onJoin} activeOpacity={0.8}>
        <LinearGradient
          colors={[App_Primary_color, '#4B0082']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.joinBtnGradient}
        >
          <Text style={styles.joinBtnText}>Join Meet</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  </View>
)

const TaskCard = ({ item }) => (
  <View style={styles.taskCard}>
    {/* Row 1: icon + title */}
    <View style={styles.taskTitleRow}>
      <View style={styles.taskIconWrap}>
        <Ionicons name="flash" size={16} color="#fff" />
      </View>
      <Text style={styles.taskTitle}>{item.title}</Text>
    </View>

    {/* Row 2: badges */}
    <View style={styles.badgeRow}>
      <View style={styles.badgeInProgress}>
        <View style={styles.badgeDot} />
        <Text style={styles.badgeInProgressText}>{item.status}</Text>
      </View>
      <View style={styles.badgeHigh}>
        <Text style={styles.badgeHighText}>🚩 {item.priority}</Text>
      </View>
    </View>

    {/* Progress bar */}
    <View style={styles.progressTrack}>
      <LinearGradient
        colors={[App_Primary_color, '#8B80F9']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.progressFill, { width: `${item.progress * 100}%` }]}
      />
    </View>

    {/* Row 3: avatar + date + comments */}
    <View style={styles.taskFooter}>
      <View style={styles.avatarCircle}>
        <Text style={styles.avatarEmoji}>👩‍🦱</Text>
      </View>
      <View style={styles.taskMeta}>
        <View style={styles.taskMetaItem}>
          <Feather name="calendar" size={13} color="#999" style={{ marginRight: 4 }} />
          <Text style={styles.taskMetaText}>{item.date}</Text>
        </View>
        <View style={styles.taskMetaItem}>
          <Ionicons name="chatbubble-outline" size={13} color="#999" style={{ marginRight: 4 }} />
          <Text style={styles.taskMetaText}>{item.comments}</Text>
        </View>
      </View>
    </View>
  </View>
)

// ─── Main Screen ──────────────────────────────────────────────────────────────

const EmployeeHome = ({ navigation }) => {
  const isFocused = useIsFocused()
  const { isDarkMode } = useSelector(state => state.theme)

  return (
    <SafeAreaView style={styles.container}>
      {isFocused && (
        <StatusBar barStyle="dark-content" backgroundColor="white"  />
      )}

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Header ── */}
        <View style={styles.header}>
          {/* Avatar + Name */}
          <View style={styles.headerLeft}>
            <View style={styles.profileImgWrap}>
              {/* Replace with actual user image */}
              <View style={styles.profileImgFallback}>
                <Feather name="user" size={22} color="#fff" />
              </View>
            </View>
            <View style={{ marginLeft: 12 }}>
              <View style={styles.nameRow}>
                <Text style={styles.userName}>Tonald Drump</Text>
                <MaterialIcons name="verified" size={18} color={App_Primary_color} style={{ marginLeft: 4 }} />
              </View>
              <Text style={styles.userRole}>Junior Full Stack Developer</Text>
            </View>
          </View>

          {/* Icons */}
          <View style={styles.headerIcons}>
            <HeaderIconBtn name="search" onPress={() => {}} />
            <HeaderIconBtn name="message-square" onPress={() => {}} />
            <HeaderIconBtn name="bell" onPress={() => {}} />
          </View>
        </View>

        {/* ── Work Summary Banner ── */}
        <LinearGradient
          colors={['#6C63FF', '#5448E4']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.banner}
        >
          <View style={styles.bannerTextWrap}>
            <Text style={styles.bannerTitle}>My Work Summary</Text>
            <Text style={styles.bannerSubtitle}>Today task & presence activity</Text>
          </View>
          {/* Decorative camera illustration area */}
          <View style={styles.bannerIllustration}>
            <Text style={styles.sparkle}>✦</Text>
            <Text style={[styles.sparkle, { top: 10, right: 30, fontSize: 10 }]}>✦</Text>
            <Text style={[styles.sparkle, { top: 30, right: 8, fontSize: 8 }]}>✦</Text>
            <View style={styles.cameraBox}>
              <Ionicons name="camera" size={36} color="rgba(255,255,255,0.9)" />
            </View>
          </View>
        </LinearGradient>

        {/* ── Today Meeting ── */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Today Meeting</Text>
            <View style={styles.countBadge}>
              <Text style={styles.countBadgeText}>{MEETINGS.length}</Text>
            </View>
          </View>
          <Text style={styles.sectionSubtitle}>Your schedule for the day</Text>

          {MEETINGS.map(item => (
            <MeetingCard
              key={item.id}
              item={item}
              onJoin={() => {}}
            />
          ))}
        </View>

        {/* ── Today Task ── */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Today Task</Text>
            <View style={styles.countBadge}>
              <Text style={styles.countBadgeText}>{TASKS.length}</Text>
            </View>
          </View>
          <Text style={styles.sectionSubtitle}>The Task Assigned to you for today</Text>

          {TASKS.map(item => (
            <TaskCard key={item.id} item={item} />
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F8',
  },
  scroll: { flex: 1 },
  scrollContent: {
    paddingBottom: 40,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? 20 : 54,
    paddingBottom: 16,
    backgroundColor: '#F4F4F8',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImgWrap: {
    width: 52,
    height: 52,
    borderRadius: 26,
    overflow: 'hidden',
  },
  profileImgFallback: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: App_Primary_color,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111',
    fontFamily: FONTS_FAMILY?.Natosans_Bold || undefined,
  },
  userRole: {
    fontSize: 12,
    color: App_Primary_color,
    marginTop: 2,
    fontFamily: FONTS_FAMILY?.Natosans_Regular || undefined,
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 8,
  },
  headerIconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EBEBF5',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Banner
  banner: {
    marginHorizontal: 16,
    borderRadius: 18,
    paddingVertical: 22,
    paddingHorizontal: 22,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    marginBottom: 16,
    minHeight: 100,
  },
  bannerTextWrap: { flex: 1 },
  bannerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    fontFamily: FONTS_FAMILY?.Natosans_Bold || undefined,
    marginBottom: 4,
  },
  bannerSubtitle: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.85)',
    fontFamily: FONTS_FAMILY?.Natosans_Regular || undefined,
  },
  bannerIllustration: {
    width: 90,
    height: 80,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sparkle: {
    position: 'absolute',
    top: 0,
    right: 0,
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  cameraBox: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Section
  section: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111',
    fontFamily: FONTS_FAMILY?.Natosans_Bold || undefined,
  },
  countBadge: {
    backgroundColor: '#EBEBF5',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  countBadgeText: {
    fontSize: 12,
    color: App_Primary_color,
    fontWeight: '600',
    fontFamily: FONTS_FAMILY?.Poppins_SemiBold || undefined,
  },
  sectionSubtitle: {
    fontSize: 12,
    color: '#999',
    marginBottom: 14,
    fontFamily: FONTS_FAMILY?.Natosans_Regular || undefined,
  },

  // Meeting Card
  meetingCard: {
    borderWidth: 1,
    borderColor: '#EBEBF5',
    borderRadius: 14,
    padding: 10,
    marginBottom: 10,
  },
  meetingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 10,
  },
  meetingIconWrap: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: App_Primary_color,
    alignItems: 'center',
    justifyContent: 'center',
  },
  meetingTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#111',
    fontFamily: FONTS_FAMILY?.Natosans_Medium || undefined,
  },
  meetingTimeWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  meetingTime: {
    fontSize: 11,
    color: '#999',
    fontFamily: FONTS_FAMILY?.Natosans_Regular || undefined,
  },
  meetingFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  avatarStack: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  avatarCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#EDE9FF',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#fff',
  },
  avatarEmoji: { fontSize: 18 },
  plusMore: {
    fontSize: 13,
    color: '#555',
    fontFamily: FONTS_FAMILY?.Poppins_Regular || undefined,
  },
  joinBtn: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  joinBtnGradient: {
    paddingHorizontal: 18,
    paddingVertical: 9,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  joinBtnText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
    fontFamily: FONTS_FAMILY?.Poppins_SemiBold || undefined,
  },

  // Task Card
  taskCard: {
    borderWidth: 1,
    borderColor: '#EBEBF5',
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
  },
  taskTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  taskIconWrap: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: App_Primary_color,
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#111',
    fontFamily: FONTS_FAMILY?.Natosans_Medium || undefined,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  badgeInProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    gap: 5,
  },
  badgeDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#999',
  },
  badgeInProgressText: {
    fontSize: 11,
    color: '#666',
    fontFamily: FONTS_FAMILY?.Poppins_Regular || undefined,
  },
  badgeHigh: {
    backgroundColor: '#FF4757',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeHighText: {
    fontSize: 11,
    color: '#fff',
    fontWeight: '600',
    fontFamily: FONTS_FAMILY?.Poppins_SemiBold || undefined,
  },
  progressTrack: {
    height: 6,
    backgroundColor: '#EBEBF5',
    borderRadius: 3,
    marginBottom: 12,
    overflow: 'hidden',
  },
  progressFill: {
    height: 6,
    borderRadius: 3,
  },
  taskFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskMeta: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 16,
  },
  taskMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskMetaText: {
    fontSize: 12,
    color: '#999',
    fontFamily: FONTS_FAMILY?.Poppins_Regular || undefined,
  },
})

export default EmployeeHome