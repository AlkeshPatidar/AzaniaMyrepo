import React from 'react'
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
 
const MOCK_LEAVE = {
  id: '1',
  type: 'Annual Leave',
  from: '10 Apr 2025',
  to: '12 Apr 2025',
  days: 3,
  dayType: 'Full Day',
  status: 'Approved',
  reason: 'Family vacation trip to Goa',
  contact: '+91 98765 43210',
  appliedOn: '07 Apr 2025',
  approvedBy: 'Rajesh Kumar (Manager)',
  approvedOn: '08 Apr 2025',
  remarks: 'Approved. Please ensure handover before leave.',
  attachment: null,
}
 
const STATUS_STYLE = {
  Approved: { bg: '#E8FAF0', text: '#2ED573', icon: 'checkmark-circle' },
  Pending:  { bg: '#FFF3E0', text: '#FFA502', icon: 'time' },
  Rejected: { bg: '#FFF0F3', text: '#FF4757', icon: 'close-circle' },
}
 
// ─── Info Row ─────────────────────────────────────────────────────────────────
const InfoRow = ({ icon, label, value, iconBg, iconColor }) => (
  <View style={detailStyles.infoRow}>
    <View style={[detailStyles.infoIcon, { backgroundColor: iconBg }]}>
      <Ionicons name={icon} size={14} color={iconColor} />
    </View>
    <Text style={detailStyles.infoLabel}>{label}</Text>
    <Text style={detailStyles.infoValue}>{value}</Text>
  </View>
)
 
// ─── Screen ───────────────────────────────────────────────────────────────────
 const LeaveDetailsScreen = ({ navigation, route }) => {
  const isFocused = useIsFocused()
  const leave = route?.params?.leave || MOCK_LEAVE
  const s = STATUS_STYLE[leave.status]
 
  const canCancel = leave.status === 'Pending'
 
  return (
    <View style={detailStyles.container}>
      {isFocused && <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />}
 
      {/* ── Header ── */}
      <LinearGradient colors={['#7B6FF0', '#5B4DE8']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={detailStyles.header}>
        <View style={{ height: Platform.OS === 'android' ? (StatusBar.currentHeight || 24) + 8 : 54 }} />
        <View style={detailStyles.headerRow}>
          <TouchableOpacity style={detailStyles.backBtn} onPress={() => navigation?.goBack()} activeOpacity={0.75}>
            <Ionicons name="chevron-back" size={20} color="#fff" />
          </TouchableOpacity>
          <Text style={detailStyles.headerTitle}>Leave Details</Text>
          <View style={{ width: 38 }} />
        </View>
      </LinearGradient>
 
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={detailStyles.scrollContent}>
 
        {/* ── Status Hero Card ── */}
        <View style={detailStyles.heroCard}>
          <View style={detailStyles.heroLeft}>
            <View style={detailStyles.heroIconWrap}>
              <Ionicons name="calendar" size={24} color={App_Primary_color} />
            </View>
            <View>
              <Text style={detailStyles.heroType}>{leave.type}</Text>
              <Text style={detailStyles.heroDate}>{leave.from}  →  {leave.to}</Text>
            </View>
          </View>
          <View style={[detailStyles.statusBadgeLg, { backgroundColor: s.bg }]}>
            <Ionicons name={s.icon} size={14} color={s.text} style={{ marginRight: 4 }} />
            <Text style={[detailStyles.statusTxtLg, { color: s.text }]}>{leave.status}</Text>
          </View>
        </View>
 
        {/* ── Days Summary strip ── */}
        <View style={detailStyles.daysStrip}>
          {[
            { icon: 'sunny-outline',    color: App_Primary_color, label: 'Total Days', val: `${leave.days} Days` },
            { icon: 'calendar-outline', color: '#FFA502',          label: 'From',       val: leave.from },
            { icon: 'calendar-outline', color: '#2ED573',          label: 'To',         val: leave.to },
          ].map((item, i, arr) => (
            <React.Fragment key={item.label}>
              <View style={detailStyles.stripBlock}>
                <View style={[detailStyles.stripIcon, { backgroundColor: item.color + '18' }]}>
                  <Ionicons name={item.icon} size={13} color={item.color} />
                </View>
                <Text style={detailStyles.stripLabel}>{item.label}</Text>
                <Text style={detailStyles.stripVal}>{item.val}</Text>
              </View>
              {i < arr.length - 1 && <View style={detailStyles.stripDivider} />}
            </React.Fragment>
          ))}
        </View>
 
        {/* ── Leave Info Card ── */}
        <View style={detailStyles.sectionCard}>
          <View style={detailStyles.sectionHeader}>
            <View style={[detailStyles.sectionIconWrap, { backgroundColor: '#EDE9FF' }]}>
              <MaterialCommunityIcons name="text-box-outline" size={14} color={App_Primary_color} />
            </View>
            <Text style={detailStyles.sectionTitle}>Leave Information</Text>
          </View>
 
          <InfoRow icon="layers-outline"         label="Leave Type"  value={leave.type}     iconBg="#EDE9FF"  iconColor={App_Primary_color} />
          <View style={detailStyles.divider} />
          <InfoRow icon="partly-sunny-outline"   label="Day Type"    value={leave.dayType}  iconBg="#FFF3E0"  iconColor="#FFA502" />
          <View style={detailStyles.divider} />
          <InfoRow icon="create-outline"         label="Applied On"  value={leave.appliedOn} iconBg="#E8FAF0" iconColor="#2ED573" />
          <View style={detailStyles.divider} />
          <InfoRow icon="call-outline"           label="Contact"     value={leave.contact}  iconBg="#FFF0F3"  iconColor="#FF4757" />
        </View>
 
        {/* ── Reason Card ── */}
        <View style={detailStyles.sectionCard}>
          <View style={detailStyles.sectionHeader}>
            <View style={[detailStyles.sectionIconWrap, { backgroundColor: '#FFF3E0' }]}>
              <Ionicons name="chatbox-outline" size={14} color="#FFA502" />
            </View>
            <Text style={detailStyles.sectionTitle}>Reason</Text>
          </View>
          <View style={detailStyles.reasonBox}>
            <Text style={detailStyles.reasonTxt}>{leave.reason}</Text>
          </View>
        </View>
 
        {/* ── Approval Card (only if approved/rejected) ── */}
        {leave.status !== 'Pending' && (
          <View style={detailStyles.sectionCard}>
            <View style={detailStyles.sectionHeader}>
              <View style={[detailStyles.sectionIconWrap, { backgroundColor: leave.status === 'Approved' ? '#E8FAF0' : '#FFF0F3' }]}>
                <Ionicons name={leave.status === 'Approved' ? 'checkmark-done-outline' : 'close-outline'} size={14} color={leave.status === 'Approved' ? '#2ED573' : '#FF4757'} />
              </View>
              <Text style={detailStyles.sectionTitle}>{leave.status === 'Approved' ? 'Approval Details' : 'Rejection Details'}</Text>
            </View>
            <InfoRow icon="person-outline"        label="Action By"    value={leave.approvedBy}  iconBg="#EDE9FF" iconColor={App_Primary_color} />
            <View style={detailStyles.divider} />
            <InfoRow icon="calendar-outline"      label="Action Date"  value={leave.approvedOn}  iconBg="#FFF3E0" iconColor="#FFA502" />
            {leave.remarks && (
              <>
                <View style={detailStyles.divider} />
                <View style={detailStyles.remarksBox}>
                  <Text style={detailStyles.remarksLabel}>Remarks</Text>
                  <Text style={detailStyles.remarksTxt}>{leave.remarks}</Text>
                </View>
              </>
            )}
          </View>
        )}
 
        <View style={{ height: 90 }} />
      </ScrollView>
 
      {/* ── Action Button ── */}
      <View style={detailStyles.floatingWrap}>
        {canCancel ? (
          <TouchableOpacity activeOpacity={0.85} onPress={() => navigation?.goBack()} style={detailStyles.floatingTouch}>
            <LinearGradient colors={['#FF6B81', '#FF4757']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={detailStyles.floatingBtn}>
              <Ionicons name="close-circle-outline" size={20} color="#fff" style={{ marginRight: 8 }} />
              <Text style={detailStyles.floatingBtnTxt}>Cancel Leave Request</Text>
            </LinearGradient>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity activeOpacity={0.85} onPress={() => navigation?.navigate('ApplyLeave')} style={detailStyles.floatingTouch}>
            <LinearGradient colors={[App_Primary_color, '#4B0082']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={detailStyles.floatingBtn}>
              <Ionicons name="add-circle-outline" size={20} color="#fff" style={{ marginRight: 8 }} />
              <Text style={detailStyles.floatingBtnTxt}>Apply New Leave</Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}
 
const detailStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0F0F8' },
  scrollContent: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 20 },
 
  header: { paddingHorizontal: 20, paddingBottom: 20, borderBottomLeftRadius: 28, borderBottomRightRadius: 28 },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 4 },
  backBtn: { width: 38, height: 38, borderRadius: 19, backgroundColor: 'rgba(255,255,255,0.22)', alignItems: 'center', justifyContent: 'center', borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.35)' },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#fff', fontFamily: FONTS_FAMILY.NatoSans_SemiBold || undefined },
 
  // Hero card
  heroCard: { backgroundColor: '#fff', borderRadius: 20, padding: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.07, shadowRadius: 12, elevation: 3 },
  heroLeft: { flexDirection: 'row', alignItems: 'center', gap: 14, flex: 1 },
  heroIconWrap: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#EDE9FF', alignItems: 'center', justifyContent: 'center' },
  heroType: { fontSize: 15, fontWeight: '700', color: '#111', fontFamily: FONTS_FAMILY.NatoSans_SemiBold || undefined, marginBottom: 4 },
  heroDate: { fontSize: 12, color: '#888', fontFamily: FONTS_FAMILY.NatoSans_Regular || undefined },
  statusBadgeLg: { flexDirection: 'row', alignItems: 'center', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6, alignSelf: 'flex-start' },
  statusTxtLg: { fontSize: 12, fontWeight: '700', fontFamily: FONTS_FAMILY.NatoSans_SemiBold || undefined },
 
  // Days strip
  daysStrip: { backgroundColor: '#fff', borderRadius: 18, padding: 16, flexDirection: 'row', alignItems: 'stretch', marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 },
  stripBlock: { flex: 1, alignItems: 'center' },
  stripIcon: { width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginBottom: 6 },
  stripLabel: { fontSize: 10, color: '#aaa', fontFamily: FONTS_FAMILY.NatoSans_Regular || undefined, marginBottom: 3 },
  stripVal: { fontSize: 12, fontWeight: '700', color: '#111', fontFamily: FONTS_FAMILY.NatoSans_SemiBold || undefined, textAlign: 'center' },
  stripDivider: { width: 1, backgroundColor: '#EBEBF5', marginVertical: 4 },
 
  // Section cards
  sectionCard: { backgroundColor: '#fff', borderRadius: 20, padding: 16, marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 14 },
  sectionIconWrap: { width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  sectionTitle: { fontSize: 14, fontWeight: '700', color: '#111', fontFamily: FONTS_FAMILY.NatoSans_SemiBold || undefined },
 
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 8 },
  infoIcon: { width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  infoLabel: { flex: 1, fontSize: 13, color: '#888', fontFamily: FONTS_FAMILY.NatoSans_Regular || undefined },
  infoValue: { fontSize: 13, fontWeight: '600', color: '#111', fontFamily: FONTS_FAMILY.NatoSans_SemiBold || undefined },
  divider: { height: 1, backgroundColor: '#F2F2F7', marginVertical: 2 },
 
  reasonBox: { backgroundColor: '#FAFAFA', borderRadius: 12, padding: 14, borderWidth: 1, borderColor: '#EBEBF5' },
  reasonTxt: { fontSize: 13, color: '#555', lineHeight: 20, fontFamily: FONTS_FAMILY.NatoSans_Regular || undefined },
 
  remarksBox: { paddingTop: 8 },
  remarksLabel: { fontSize: 12, fontWeight: '600', color: '#888', fontFamily: FONTS_FAMILY.NatoSans_SemiBold || undefined, marginBottom: 6 },
  remarksTxt: { fontSize: 13, color: '#555', lineHeight: 20, fontFamily: FONTS_FAMILY.NatoSans_Regular || undefined },
 
  // Floating button
  floatingWrap: { position: 'absolute', bottom: 0, left: 0, right: 0, paddingHorizontal: 20, paddingBottom: Platform.OS === 'ios' ? 36 : 20, paddingTop: 12, backgroundColor: 'white' },
  floatingTouch: { borderRadius: 30, overflow: 'hidden', shadowColor: App_Primary_color, shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.4, shadowRadius: 12, elevation: 8 },
  floatingBtn: { height: 54, borderRadius: 30, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' },
  floatingBtnTxt: { color: '#fff', fontSize: 16, fontWeight: '700', letterSpacing: 0.3, fontFamily: FONTS_FAMILY.NatoSans_SemiBold || undefined },
})


export default LeaveDetailsScreen
 