import React, { useState } from 'react'
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, StatusBar, Platform,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useIsFocused } from '@react-navigation/native'
import { App_Primary_color } from '../../../common/Colors/colors'
import { FONTS_FAMILY } from '../../../assets/Fonts'
 
// ─── Mock Data ────────────────────────────────────────────────────────────────
const LEAVE_BALANCE = [
  { type: 'Annual',    total: 18, used: 6,  color: '#7B6FF0', icon: 'sunny-outline' },
  { type: 'Sick',      total: 10, used: 2,  color: '#FF6B81', icon: 'medical-outline' },
  { type: 'Casual',   total: 6,  used: 3,  color: '#FFA502', icon: 'cafe-outline' },
  { type: 'WFH',      total: 12, used: 4,  color: '#2ED573', icon: 'home-outline' },
]
 
const LEAVE_HISTORY = [
  { id: '1', type: 'Annual Leave',  from: '10 Apr 2025', to: '12 Apr 2025', days: 3,  status: 'Approved',  reason: 'Family vacation' },
  { id: '2', type: 'Sick Leave',    from: '02 Mar 2025', to: '03 Mar 2025', days: 2,  status: 'Approved',  reason: 'Fever & cold' },
  { id: '3', type: 'Casual Leave',  from: '18 Feb 2025', to: '18 Feb 2025', days: 1,  status: 'Rejected',  reason: 'Personal work' },
  { id: '4', type: 'Annual Leave',  from: '05 Jan 2025', to: '07 Jan 2025', days: 3,  status: 'Pending',   reason: 'Travel' },
  { id: '5', type: 'WFH',          from: '28 Jan 2025', to: '28 Jan 2025', days: 1,  status: 'Approved',  reason: 'Home repair' },
]
 
const FILTERS = ['All', 'Approved', 'Pending', 'Rejected']
 
const STATUS_STYLE = {
  Approved: { bg: '#E8FAF0', text: '#2ED573' },
  Pending:  { bg: '#FFF3E0', text: '#FFA502' },
  Rejected: { bg: '#FFF0F3', text: '#FF4757' },
}
 
// ─── Balance Card ─────────────────────────────────────────────────────────────
const BalanceCard = ({ item }) => {
  const remaining = item.total - item.used
  const pct = (item.used / item.total) * 100
  return (
    <View style={leaveHomeStyles.balCard}>
      <View style={[leaveHomeStyles.balIconWrap, { backgroundColor: item.color + '22' }]}>
        <Ionicons name={item.icon} size={18} color={item.color} />
      </View>
      <Text style={leaveHomeStyles.balType}>{item.type}</Text>
      <Text style={leaveHomeStyles.balRemaining}>{remaining}</Text>
      <Text style={leaveHomeStyles.balLabel}>remaining</Text>
      <View style={leaveHomeStyles.balTrack}>
        <View style={[leaveHomeStyles.balFill, { width: `${pct}%`, backgroundColor: item.color }]} />
      </View>
      <Text style={leaveHomeStyles.balMeta}>{item.used}/{item.total} used</Text>
    </View>
  )
}
 
// ─── History Card ─────────────────────────────────────────────────────────────
const HistoryCard = ({ item, onPress }) => {
  const s = STATUS_STYLE[item.status]
  return (
    <TouchableOpacity activeOpacity={0.82} style={leaveHomeStyles.histCard} onPress={onPress}>
      <View style={leaveHomeStyles.histLeft}>
        <View style={leaveHomeStyles.histIconWrap}>
          <Ionicons name="calendar-outline" size={18} color={App_Primary_color} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={leaveHomeStyles.histType}>{item.type}</Text>
          <Text style={leaveHomeStyles.histDate}>{item.from} → {item.to}</Text>
          <Text style={leaveHomeStyles.histReason} numberOfLines={1}>{item.reason}</Text>
        </View>
      </View>
      <View style={leaveHomeStyles.histRight}>
        <View style={[leaveHomeStyles.statusBadge, { backgroundColor: s.bg }]}>
          <Text style={[leaveHomeStyles.statusTxt, { color: s.text }]}>{item.status}</Text>
        </View>
        <Text style={leaveHomeStyles.histDays}>{item.days}d</Text>
      </View>
    </TouchableOpacity>
  )
}
 
// ─── Screen ───────────────────────────────────────────────────────────────────
const LeaveHomeScreen = ({ navigation }) => {
  const isFocused = useIsFocused()
  const [filter, setFilter] = useState('All')
 
  const filtered = filter === 'All'
    ? LEAVE_HISTORY
    : LEAVE_HISTORY.filter(l => l.status === filter)
 
  return (
    <View style={leaveHomeStyles.container}>
      {isFocused && <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />}
 
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
 
        {/* ── Purple Header ── */}
        <LinearGradient colors={['#7B6FF0', '#5B4DE8']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={leaveHomeStyles.header}>
          <View style={{ height: Platform.OS === 'android' ? (StatusBar.currentHeight || 24) + 8 : 54 }} />
 
          {/* Title row */}
          <View style={leaveHomeStyles.headerRow}>
            <View style={{ flex: 1 }}>
              <Text style={leaveHomeStyles.headerTitle}>My Leaves</Text>
              <Text style={leaveHomeStyles.headerSub}>Track & manage your time off</Text>
            </View>
            {/* Illustration */}
            <View style={leaveHomeStyles.illustWrap}>
              <Text style={[leaveHomeStyles.sp, { top: 0, right: 8, fontSize: 13 }]}>✦</Text>
              <Text style={[leaveHomeStyles.sp, { top: 20, right: 0, fontSize: 9 }]}>✦</Text>
              <View style={leaveHomeStyles.illCircle}>
                <Ionicons name="umbrella-outline" size={26} color="#fff" />
              </View>
            </View>
          </View>
 
          {/* ── Summary mini-card ── */}
          <View style={leaveHomeStyles.summaryCard}>
            <Text style={leaveHomeStyles.summaryTitle}>Leave Balance Overview</Text>
            <Text style={leaveHomeStyles.summarySub}>Current year 2025</Text>
            <View style={leaveHomeStyles.summaryRow}>
              {[
                { label: 'Total',     val: 46, icon: 'layers-outline',          color: App_Primary_color },
                { label: 'Used',      val: 15, icon: 'checkmark-circle-outline', color: '#FF6B81' },
                { label: 'Remaining', val: 31, icon: 'time-outline',             color: '#2ED573' },
              ].map((s, i, arr) => (
                <React.Fragment key={s.label}>
                  <View style={leaveHomeStyles.summaryBlock}>
                    <View style={[leaveHomeStyles.summaryIconWrap, { backgroundColor: s.color + '18' }]}>
                      <Ionicons name={s.icon} size={13} color={s.color} />
                    </View>
                    <Text style={leaveHomeStyles.summaryLabel}>{s.label}</Text>
                    <Text style={leaveHomeStyles.summaryVal}>{s.val}</Text>
                  </View>
                  {i < arr.length - 1 && <View style={leaveHomeStyles.summaryDivider} />}
                </React.Fragment>
              ))}
            </View>
          </View>
        </LinearGradient>
 
        {/* ── Balance Cards (horizontal scroll) ── */}
        <Text style={leaveHomeStyles.sectionHeading}>Leave Balances</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={leaveHomeStyles.balRow}>
          {LEAVE_BALANCE.map(b => <BalanceCard key={b.type} item={b} />)}
        </ScrollView>
 
        {/* ── Filter Tabs ── */}
        <View style={leaveHomeStyles.filterWrap}>
          {FILTERS.map(f => {
            const isActive = f === filter
            return (
              <TouchableOpacity key={f} onPress={() => setFilter(f)} activeOpacity={0.75}
                style={[leaveHomeStyles.filterBtn, isActive && leaveHomeStyles.filterBtnActive]}>
                <Text style={[leaveHomeStyles.filterTxt, isActive && leaveHomeStyles.filterTxtActive]}>{f}</Text>
              </TouchableOpacity>
            )
          })}
        </View>
 
        {/* ── History List ── */}
        <View style={leaveHomeStyles.histList}>
          {filtered.map(item => (
            <HistoryCard
              key={item.id}
              item={item}
              onPress={() => navigation?.navigate('LeaveDetailsScreen', { leave: item })}
            />
          ))}
        </View>
      </ScrollView>
 
      {/* ── FAB: Apply Leave ── */}
      <View style={leaveHomeStyles.fabWrap}>
        <TouchableOpacity activeOpacity={0.85} onPress={() => navigation?.navigate('ApplyLeave')} style={leaveHomeStyles.fabTouch}>
          <LinearGradient colors={[App_Primary_color, '#4B0082']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={leaveHomeStyles.fab}>
            <Ionicons name="add-circle-outline" size={20} color="#fff" style={{ marginRight: 8 }} />
            <Text style={leaveHomeStyles.fabTxt}>Apply Leave</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  )
}
 
const leaveHomeStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0F0F8' },
 
  // Header
  header: { paddingHorizontal: 20, paddingBottom: 28, borderBottomLeftRadius: 28, borderBottomRightRadius: 28 },
  headerRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 20, marginTop: 4 },
  headerTitle: { fontSize: 24, fontWeight: '700', color: '#fff', fontFamily: FONTS_FAMILY.NatoSans_SemiBold || undefined, marginBottom: 4 },
  headerSub: { fontSize: 13, color: 'rgba(255,255,255,0.85)', fontFamily: FONTS_FAMILY.NatoSans_Regular || undefined },
  illustWrap: { width: 80, height: 68, position: 'relative', alignItems: 'center', justifyContent: 'center' },
  sp: { position: 'absolute', color: 'rgba(255,255,255,0.85)' },
  illCircle: { width: 52, height: 52, borderRadius: 26, backgroundColor: 'rgba(255,255,255,0.22)', alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: 'rgba(255,255,255,0.4)' },
 
  // Summary card
  summaryCard: { backgroundColor: '#fff', borderRadius: 18, padding: 18, elevation: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.08, shadowRadius: 12 },
  summaryTitle: { fontSize: 15, fontWeight: '700', color: '#111', fontFamily: FONTS_FAMILY.NatoSans_SemiBold || undefined, marginBottom: 2 },
  summarySub: { fontSize: 11, color: '#aaa', marginBottom: 16, fontFamily: FONTS_FAMILY.NatoSans_Regular || undefined },
  summaryRow: { flexDirection: 'row', backgroundColor: '#FAFAFA', borderRadius: 12, borderWidth: 1, borderColor: '#EBEBF5', overflow: 'hidden' },
  summaryBlock: { flex: 1, paddingVertical: 14, paddingHorizontal: 10, alignItems: 'flex-start' },
  summaryIconWrap: { width: 22, height: 22, borderRadius: 11, alignItems: 'center', justifyContent: 'center', marginBottom: 6 },
  summaryLabel: { fontSize: 10, color: '#888', fontFamily: FONTS_FAMILY.NatoSans_Regular || undefined, marginBottom: 2 },
  summaryVal: { fontSize: 22, fontWeight: '700', color: '#111', fontFamily: FONTS_FAMILY.NatoSans_SemiBold || undefined },
  summaryDivider: { width: 1, backgroundColor: '#EBEBF5', marginVertical: 10 },
 
  // Balance cards
  sectionHeading: { fontSize: 15, fontWeight: '700', color: '#111', fontFamily: FONTS_FAMILY.NatoSans_SemiBold || undefined, marginLeft: 20, marginTop: 22, marginBottom: 12 },
  balRow: { paddingHorizontal: 20, gap: 12 },
  balCard: { backgroundColor: '#fff', borderRadius: 16, padding: 16, width: 120, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 },
  balIconWrap: { width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  balType: { fontSize: 11, color: '#888', fontFamily: FONTS_FAMILY.NatoSans_Regular || undefined, marginBottom: 4 },
  balRemaining: { fontSize: 26, fontWeight: '700', color: '#111', fontFamily: FONTS_FAMILY.NatoSans_SemiBold || undefined },
  balLabel: { fontSize: 10, color: '#aaa', fontFamily: FONTS_FAMILY.NatoSans_Regular || undefined, marginBottom: 10 },
  balTrack: { height: 4, backgroundColor: '#EBEBF5', borderRadius: 2, overflow: 'hidden', marginBottom: 6 },
  balFill: { height: 4, borderRadius: 2 },
  balMeta: { fontSize: 10, color: '#aaa', fontFamily: FONTS_FAMILY.NatoSans_Regular || undefined },
 
  // Filters
  filterWrap: { flexDirection: 'row', marginHorizontal: 20, marginTop: 20, marginBottom: 12, backgroundColor: '#fff', borderRadius: 30, padding: 5, gap: 4, elevation: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4 },
  filterBtn: { flex: 1, alignItems: 'center', paddingVertical: 7, borderRadius: 25 },
  filterBtnActive: { backgroundColor: App_Primary_color },
  filterTxt: { fontSize: 12, fontWeight: '600', color: '#888', fontFamily: FONTS_FAMILY.NatoSans_SemiBold || undefined },
  filterTxtActive: { color: '#fff' },
 
  // History list
  histList: { paddingHorizontal: 20, gap: 10 },
  histCard: { backgroundColor: '#fff', borderRadius: 16, padding: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 },
  histLeft: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  histIconWrap: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#EDE9FF', alignItems: 'center', justifyContent: 'center' },
  histType: { fontSize: 13, fontWeight: '700', color: '#111', fontFamily: FONTS_FAMILY.NatoSans_SemiBold || undefined, marginBottom: 2 },
  histDate: { fontSize: 11, color: '#888', fontFamily: FONTS_FAMILY.NatoSans_Regular || undefined, marginBottom: 2 },
  histReason: { fontSize: 11, color: '#bbb', fontFamily: FONTS_FAMILY.NatoSans_Regular || undefined },
  histRight: { alignItems: 'flex-end', gap: 6 },
  statusBadge: { borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4 },
  statusTxt: { fontSize: 10, fontWeight: '700', fontFamily: FONTS_FAMILY.NatoSans_SemiBold || undefined },
  histDays: { fontSize: 13, fontWeight: '700', color: App_Primary_color, fontFamily: FONTS_FAMILY.NatoSans_SemiBold || undefined },
 
  // FAB
  fabWrap: { position: 'absolute', bottom: 0, left: 0, right: 0, paddingHorizontal: 20, paddingBottom: Platform.OS === 'ios' ? 36 : 20, paddingTop: 12, backgroundColor: 'white' },
  fabTouch: { borderRadius: 30, overflow: 'hidden', shadowColor: App_Primary_color, shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.4, shadowRadius: 12, elevation: 8 },
  fab: { height: 54, borderRadius: 30, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' },
  fabTxt: { color: '#fff', fontSize: 16, fontWeight: '700', letterSpacing: 0.3, fontFamily: FONTS_FAMILY.NatoSans_SemiBold || undefined },
})

export default LeaveHomeScreen
 