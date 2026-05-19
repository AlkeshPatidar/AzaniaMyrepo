import React, { useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Platform,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useIsFocused } from '@react-navigation/native'
import { useSelector } from 'react-redux'

import { App_Primary_color } from '../../../common/Colors/colors'
import { FONTS_FAMILY } from '../../../assets/Fonts'

// ─── Mock Data ────────────────────────────────────────────────────────────────
const ATTENDANCE_LOGS = [
  {
    id: '1',
    date: '27 September 2024',
    totalHours: '08:00:00 hrs',
    clockIn: '09:00 AM',
    clockOut: '05:00 PM',
  },
  {
    id: '2',
    date: '27 September 2024',
    totalHours: '08:00:00 hrs',
    clockIn: '09:00 AM',
    clockOut: '05:00 PM',
  },
  {
    id: '3',
    date: '27 September 2024',
    totalHours: '08:00:00 hrs',
    clockIn: '09:00 AM',
    clockOut: '05:00 PM',
  },
]

// ─── Attendance Log Card ──────────────────────────────────────────────────────
const AttendanceCard = ({ item }) => (
  <View style={styles.attCard}>
    {/* Date header row */}
    <View style={styles.attDateRow}>
      <Feather name="calendar" size={14} color={App_Primary_color} style={{ marginRight: 6 }} />
      <Text style={styles.attDate}>{item.date}</Text>
    </View>

    {/* Divider */}
    <View style={styles.attDivider} />

    {/* Hours row */}
    <View style={styles.attInfoRow}>
      <View style={styles.attInfoBlock}>
        <Text style={styles.attInfoLabel}>Total Hours</Text>
        <Text style={styles.attInfoValue}>{item.totalHours}</Text>
      </View>
      <View style={styles.attInfoBlock}>
        <Text style={styles.attInfoLabel}>Clock in & Out</Text>
        <Text style={styles.attInfoValue}>
          {item.clockIn}
          <Text style={styles.attDash}> — </Text>
          {item.clockOut}
        </Text>
      </View>
    </View>
  </View>
)

// ─── Main Screen ──────────────────────────────────────────────────────────────
const EmployeeAttendanceScreen = ({ navigation }) => {
  const isFocused = useIsFocused()
  const [isClockedIn, setIsClockedIn] = useState(false)

  return (
    <View style={styles.container}>
      {isFocused && (
        <StatusBar barStyle="light-content" backgroundColor="white" translucent />
      )}

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Purple Header Section ── */}
        <LinearGradient
          colors={['#7B6FF0', '#5B4DE8']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          {/* Status bar space */}
          <View style={{ height: Platform.OS === 'android' ? StatusBar.currentHeight + 8 : 54 }} />

          {/* Title row */}
          <View style={styles.headerTitleRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.headerTitle}>Let's Clock-In!</Text>
              <Text style={styles.headerSubtitle}>Don't miss your clock in schedule</Text>
            </View>
            {/* Clock illustration */}
            <View style={styles.clockIllustration}>
              <Text style={styles.sparkle}>✦</Text>
              <Text style={[styles.sparkle, { top: 12, right: 6, fontSize: 9 }]}>✦</Text>
              <Text style={[styles.sparkle, { top: 2, right: 28, fontSize: 8 }]}>✦</Text>
              <View style={styles.clockCircle}>
                <Ionicons name="time-outline" size={32} color="#fff" />
              </View>
              {/* Wing sparkles */}
              <Text style={styles.wings}>✦✦</Text>
            </View>
          </View>

          {/* ── Working Hour Card ── */}
          <View style={styles.workingCard}>
            <Text style={styles.workingCardTitle}>Total Working Hour</Text>
            <Text style={styles.workingCardPeriod}>Paid Period 1 Sept 2024 - 30 Sept 2024</Text>

            {/* Today + Pay Period */}
            <View style={styles.hoursRow}>
              <View style={styles.hoursBlock}>
                <View style={styles.hoursLabelRow}>
                  <View style={[styles.statusDot, { backgroundColor: '#BBBBBB' }]} />
                  <Text style={styles.hoursLabel}>Today</Text>
                </View>
                <Text style={styles.hoursValue}>00:00 Hrs</Text>
              </View>

              <View style={styles.hoursDivider} />

              <View style={styles.hoursBlock}>
                <View style={styles.hoursLabelRow}>
                  <View style={[styles.statusDot, { backgroundColor: App_Primary_color }]} />
                  <Text style={styles.hoursLabel}>This Pay Period</Text>
                </View>
                <Text style={styles.hoursValue}>32:00 Hrs</Text>
              </View>
            </View>

            {/* Clock In Button */}
            <TouchableOpacity
              activeOpacity={0.85}
            //   onPress={() => setIsClockedIn(v => !v)}
            onPress={()=>navigation.navigate('ClockInAreaScreen')}
              style={styles.clockBtnWrap}
            >
              <LinearGradient
                colors={[App_Primary_color, '#4B0082']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.clockBtn}
              >
                <Text style={styles.clockBtnText}>
                  {isClockedIn ? 'Clock Out' : 'Clock In'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

        </LinearGradient>

        {/* ── Attendance Logs ── */}
        <View style={styles.logsSection}>
          {ATTENDANCE_LOGS.map(item => (
            <AttendanceCard key={item.id} item={item} />
          ))}
        </View>

      </ScrollView>
    </View>
  )
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F8',
  },
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: 40 },

  // Header
  header: {
    paddingHorizontal: 18,
    // paddingBottom: 28,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    height:260
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
    marginTop: 4,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
    fontFamily: FONTS_FAMILY.NatoSans_SemiBold || undefined,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.85)',
    fontFamily: FONTS_FAMILY.NatoSans_Regular || undefined,
  },
  clockIllustration: {
    width: 80,
    height: 70,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sparkle: {
    position: 'absolute',
    top: 0,
    right: 0,
    fontSize: 13,
    color: 'rgba(255,255,255,0.85)',
  },
  clockCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  wings: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 4,
  },

  // Working Card
  workingCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    // top:40
  },
  workingCardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111',
    fontFamily: FONTS_FAMILY.NatoSans_SemiBold || undefined,
    marginBottom: 2,
  },
  workingCardPeriod: {
    fontSize: 11,
    color: '#999',
    fontFamily: FONTS_FAMILY.NatoSans_SemiBold || undefined,
    marginBottom: 16,
  },
  hoursRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#EBEBF5',
    borderRadius: 12,
    padding: 12,
    backgroundColor: '#FAFAFC',
  },
  hoursBlock: {
    flex: 1,
  },
  hoursLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 4,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  hoursLabel: {
    fontSize: 12,
    color: '#999',
    fontFamily: FONTS_FAMILY.NatoSans_SemiBold || undefined,
  },
  hoursValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111',
    fontFamily: FONTS_FAMILY.NatoSans_SemiBold || undefined,
  },
  hoursDivider: {
    width: 1,
    height: 44,
    backgroundColor: '#EBEBF5',
    marginHorizontal: 16,
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
    height: 50,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clockBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.4,
    fontFamily: FONTS_FAMILY.NatoSans_SemiBold || undefined,
  },

  // Logs
  logsSection: {
    paddingHorizontal: 16,
    paddingTop: 130,
    gap: 6,
  },
  attCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    marginBottom: 4,
  },
  attDateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  attDate: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
    fontFamily: FONTS_FAMILY.NatoSans_SemiBold || undefined,
  },
  attDivider: {
    height: 1,
    backgroundColor: '#F0F0F5',
    marginBottom: 12,
  },
  attInfoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  attInfoBlock: {
    flex: 1,
  },
  attInfoLabel: {
    fontSize: 11,
    color: '#999',
    marginBottom: 4,
    fontFamily: FONTS_FAMILY.NatoSans_SemiBold || undefined,
  },
  attInfoValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#222',
    fontFamily: FONTS_FAMILY.NatoSans_SemiBold || undefined,
  },
  attDash: {
    color: '#999',
    fontWeight: '400',
  },
})

export default EmployeeAttendanceScreen