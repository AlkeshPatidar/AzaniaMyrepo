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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useIsFocused } from '@react-navigation/native'

import { App_Primary_color } from '../../../common/Colors/colors'
import { FONTS_FAMILY } from '../../../assets/Fonts'

// ─── Mock Data ────────────────────────────────────────────────────────────────
const SUMMARY = {
  period: 'Period 1 Jan 2024 - 30 Dec 2024',
  total: '$1010',
  review: '$455',
  approved: '$555',
}

const ALL_EXPENSES = [
  { id: '1', date: '27 September 2024', type: 'E-Learning',   amount: '$55',  filter: 'Review'   },
  { id: '2', date: '27 September 2024', type: 'E-Learning',   amount: '$55',  filter: 'Review'   },
  { id: '3', date: '27 September 2024', type: 'E-Learning',   amount: '$55',  filter: 'Review'   },
  { id: '4', date: '15 October 2024',   type: 'Travel',        amount: '$120', filter: 'Approved' },
  { id: '5', date: '02 November 2024',  type: 'Medical',       amount: '$200', filter: 'Approved' },
  { id: '6', date: '10 November 2024',  type: 'Equipment',     amount: '$80',  filter: 'Rejected' },
  { id: '7', date: '20 November 2024',  type: 'Meal Allowance',amount: '$45',  filter: 'Rejected' },
]

const FILTERS = [
  { key: 'Review',   label: 'Review',   count: 3 },
  { key: 'Approved', label: 'Approved', count: 2 },
  { key: 'Rejected', label: 'Rejected', count: 2 },
]

const STATUS_COLOR = {
  Review:   { dot: '#FFA502', text: '#FFA502', bg: '#FFF3E0' },
  Approved: { dot: '#2ED573', text: '#2ED573', bg: '#E8FAF0' },
  Rejected: { dot: '#FF4757', text: '#FF4757', bg: '#FFF0F0' },
}

// ─── Expense Card ─────────────────────────────────────────────────────────────
const ExpenseCard = ({ item }) => {
  const s = STATUS_COLOR[item.filter] || STATUS_COLOR.Review
  return (
    <View style={styles.expenseCard}>
      {/* Date Row */}
      <View style={styles.expenseDateRow}>
        <MaterialCommunityIcons name="calendar-month-outline" size={15} color={App_Primary_color} />
        <Text style={styles.expenseDateTxt}>{item.date}</Text>
      </View>

      <View style={styles.expenseDivider} />

      {/* Info Row */}
      <View style={styles.expenseInfoRow}>
        <View style={{ flex: 1 }}>
          <Text style={styles.expenseInfoLabel}>Type</Text>
          <Text style={styles.expenseInfoVal}>{item.type}</Text>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={styles.expenseInfoLabel}>Total Expense</Text>
          <Text style={styles.expenseInfoVal}>{item.amount}</Text>
        </View>
      </View>

      {/* Status badge */}
      <View style={[styles.statusBadge, { backgroundColor: s.bg }]}>
        <View style={[styles.statusDot, { backgroundColor: s.dot }]} />
        <Text style={[styles.statusTxt, { color: s.text }]}>{item.filter}</Text>
      </View>
    </View>
  )
}

// ─── Main Screen ──────────────────────────────────────────────────────────────
const EmployeePayrollScreen = ({ navigation }) => {
  const isFocused = useIsFocused()
  const [activeFilter, setActiveFilter] = useState('Review')

  const filtered = ALL_EXPENSES.filter(e => e.filter === activeFilter)

  return (
    <View style={styles.container}>
      {isFocused && <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />}

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Purple Header ── */}
        <LinearGradient
          colors={['#7B6FF0', '#5B4DE8']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <View style={{ height: Platform.OS === 'android' ? (StatusBar.currentHeight || 24) + 8 : 54 }} />

          {/* Title + Illustration */}
          <View style={styles.headerRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.headerTitle}>Payroll Summary</Text>
              <Text style={styles.headerSub}>Claim Your Expense here.</Text>
            </View>

            {/* Same clock-wings illustration as Tasks */}
            <View style={styles.illustWrap}>
              <Text style={[styles.sp, { top: 0, right: 10, fontSize: 13 }]}>✦</Text>
              <Text style={[styles.sp, { top: 18, right: 0,  fontSize: 9  }]}>✦</Text>
              <Text style={[styles.sp, { top: 4,  right: 36, fontSize: 8  }]}>✦</Text>
              <Text style={styles.wingLeft}>〜</Text>
              <Text style={styles.wingRight}>〜</Text>
              <View style={styles.illCircle}>
                <Ionicons name="wallet-outline" size={26} color="#fff" />
              </View>
            </View>
          </View>

          {/* ── Summary Card ── */}
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Total Expense</Text>
            <Text style={styles.summaryPeriod}>{SUMMARY.period}</Text>

            <View style={styles.statsRow}>
              {/* Total */}
              <View style={styles.statBlock}>
                <View style={styles.statLabelRow}>
                  <View style={[styles.statIconWrap, { backgroundColor: '#EDE9FF' }]}>
                    <MaterialCommunityIcons name="wallet-outline" size={13} color={App_Primary_color} />
                  </View>
                  <Text style={styles.statLabel}>Total</Text>
                </View>
                <Text style={styles.statVal}>{SUMMARY.total}</Text>
              </View>

              <View style={styles.statDivider} />

              {/* Review */}
              <View style={styles.statBlock}>
                <View style={styles.statLabelRow}>
                  <View style={[styles.statIconWrap, { backgroundColor: '#FFF3E0' }]}>
                    <Ionicons name="time-outline" size={13} color="#FFA502" />
                  </View>
                  <Text style={styles.statLabel}>Review</Text>
                </View>
                <Text style={styles.statVal}>{SUMMARY.review}</Text>
              </View>

              <View style={styles.statDivider} />

              {/* Approved */}
              <View style={styles.statBlock}>
                <View style={styles.statLabelRow}>
                  <View style={[styles.statIconWrap, { backgroundColor: '#E8FAF0' }]}>
                    <Ionicons name="checkmark-circle-outline" size={13} color="#2ED573" />
                  </View>
                  <Text style={styles.statLabel}>Approved</Text>
                </View>
                <Text style={styles.statVal}>{SUMMARY.approved}</Text>
              </View>
            </View>
          </View>
        </LinearGradient>

        {/* ── Filter Tabs ── */}
        <View style={styles.filterWrap}>
          {FILTERS.map(f => {
            const isActive = f.key === activeFilter
            return (
              <TouchableOpacity
                key={f.key}
                onPress={() => setActiveFilter(f.key)}
                activeOpacity={0.75}
                style={[styles.filterBtn, isActive && styles.filterBtnActive]}
              >
                <Text style={[styles.filterTxt, isActive && styles.filterTxtActive]}>
                  {f.label}
                </Text>
                <View style={[styles.filterCountWrap, isActive && styles.filterCountWrapActive]}>
                  <Text style={[styles.filterCountTxt, isActive && styles.filterCountTxtActive]}>
                    {f.count}
                  </Text>
                </View>
              </TouchableOpacity>
            )
          })}
        </View>

        {/* ── Expense List ── */}
        <View style={styles.expenseList}>
          {filtered.length === 0 ? (
            <View style={styles.emptyState}>
              <MaterialCommunityIcons name="receipt" size={44} color="#C0C0D8" />
              <Text style={styles.emptyTxt}>No expenses found</Text>
            </View>
          ) : (
            filtered.map(item => <ExpenseCard key={item.id} item={item} />)
          )}
        </View>

        {/* Bottom padding for fixed button */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* ── Fixed Bottom Button ── */}
      <View style={styles.bottomBtnWrap}>
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => navigation?.navigate('SubmitExpenseScreen')}
          style={styles.submitBtnTouch}
        >
          <LinearGradient
            colors={[App_Primary_color, '#4B0082']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.submitBtn}
          >
            <Text style={styles.submitBtnTxt}>Submit Expense</Text>
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

  // ── Header ──
  header: {
    paddingHorizontal: 20,
    paddingBottom: 28,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
    marginTop: 4,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    fontFamily: FONTS_FAMILY.NatoSans_SemiBold || undefined,
    marginBottom: 4,
  },
  headerSub: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.85)',
    fontFamily: FONTS_FAMILY.NatoSans_Regular || undefined,
  },

  // Illustration (same as Tasks screen)
  illustWrap: {
    width: 90,
    height: 72,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sp: {
    position: 'absolute',
    color: 'rgba(255,255,255,0.85)',
  },
  wingLeft: {
    position: 'absolute',
    left: 4,
    top: 22,
    fontSize: 18,
    color: 'rgba(255,255,255,0.7)',
    transform: [{ scaleY: -1 }, { rotate: '-20deg' }],
  },
  wingRight: {
    position: 'absolute',
    right: 4,
    top: 22,
    fontSize: 18,
    color: 'rgba(255,255,255,0.7)',
    transform: [{ scaleY: -1 }, { rotate: '20deg' }],
  },
  illCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(255,255,255,0.22)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.4)',
  },

  // ── Summary Card ──
  summaryCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 18,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
  },
  summaryTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111',
    fontFamily: FONTS_FAMILY.NatoSans_SemiBold || undefined,
    marginBottom: 2,
  },
  summaryPeriod: {
    fontSize: 11,
    color: '#aaa',
    fontFamily: FONTS_FAMILY.NatoSans_Regular || undefined,
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
    backgroundColor: '#FAFAFA',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EBEBF5',
    overflow: 'hidden',
  },
  statBlock: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 10,
  },
  statLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 8,
  },
  statIconWrap: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statLabel: {
    fontSize: 10,
    color: '#888',
    fontFamily: FONTS_FAMILY.NatoSans_Regular || undefined,
  },
  statVal: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
    fontFamily: FONTS_FAMILY.NatoSans_SemiBold || undefined,
  },
  statDivider: {
    width: 1,
    backgroundColor: '#EBEBF5',
    marginVertical: 10,
  },

  // ── Filter Tabs ──
  filterWrap: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginVertical: 14,
    backgroundColor: '#fff',
    borderRadius: 30,
    padding: 4,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  filterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 30,
  },
  filterBtnActive: {
    backgroundColor: App_Primary_color,
  },
  filterTxt: {
    fontSize: 13,
    fontWeight: '600',
    color: '#888',
    fontFamily: FONTS_FAMILY.NatoSans_SemiBold || undefined,
  },
  filterTxtActive: { color: '#fff' },
  filterCountWrap: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#EBEBF5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterCountWrapActive: {
    backgroundColor: 'rgba(255,255,255,0.28)',
  },
  filterCountTxt: {
    fontSize: 10,
    fontWeight: '700',
    color: '#888',
  },
  filterCountTxtActive: { color: '#fff' },

  // ── Expense Cards ──
  expenseList: {
    paddingHorizontal: 16,
    gap: 12,
  },
  expenseCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  expenseDateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    marginBottom: 12,
  },
  expenseDateTxt: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
    fontFamily: FONTS_FAMILY.NatoSans_SemiBold || undefined,
  },
  expenseDivider: {
    height: 1,
    backgroundColor: '#F0F0F8',
    marginBottom: 12,
  },
  expenseInfoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  expenseInfoLabel: {
    fontSize: 11,
    color: '#aaa',
    fontFamily: FONTS_FAMILY.NatoSans_Regular || undefined,
    marginBottom: 3,
  },
  expenseInfoVal: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111',
    fontFamily: FONTS_FAMILY.NatoSans_SemiBold || undefined,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    gap: 5,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusTxt: {
    fontSize: 11,
    fontWeight: '600',
    fontFamily: FONTS_FAMILY.NatoSans_SemiBold || undefined,
  },

  // Empty State
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
    gap: 10,
  },
  emptyTxt: {
    fontSize: 14,
    color: '#aaa',
    fontFamily: FONTS_FAMILY.NatoSans_Regular || undefined,
  },

  // ── Fixed Bottom Button ──
  bottomBtnWrap: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === 'ios' ? 36 : 20,
    paddingTop: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F5',
  },
  submitBtnTouch: {
    borderRadius: 30,
    overflow: 'hidden',
    shadowColor: App_Primary_color,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  submitBtn: {
    height: 54,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitBtnTxt: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
    fontFamily: FONTS_FAMILY.NatoSans_SemiBold || undefined,
  },
})

export default EmployeePayrollScreen