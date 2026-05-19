import React, { useState } from 'react'
import {
  View, Text, TextInput, TouchableOpacity, ScrollView,
  StyleSheet, StatusBar, Platform, Modal, FlatList,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useIsFocused } from '@react-navigation/native'
import { App_Primary_color } from '../../../common/Colors/colors'
import { FONTS_FAMILY } from '../../../assets/Fonts'
 
const LEAVE_TYPES  = ['Annual Leave', 'Sick Leave', 'Casual Leave', 'Work From Home', 'Maternity/Paternity', 'Unpaid Leave']
const HALF_DAY_OPT = ['Full Day', 'First Half', 'Second Half']
 
// ─── Reusable Dropdown ────────────────────────────────────────────────────────
const Dropdown = ({ label, placeholder, value, options, onSelect }) => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Text style={applyStyles.fieldLabel}>{label}</Text>
      <TouchableOpacity activeOpacity={0.8} style={applyStyles.inputBox} onPress={() => setOpen(true)}>
        <Text style={[applyStyles.inputTxt, !value && applyStyles.placeholder]}>{value || placeholder}</Text>
        <Ionicons name="chevron-down" size={18} color="#7B6FF0" />
      </TouchableOpacity>
      <Modal visible={open} transparent animationType="fade">
        <TouchableOpacity style={applyStyles.overlay} activeOpacity={1} onPress={() => setOpen(false)}>
          <View style={applyStyles.dropMenu}>
            <FlatList data={options} keyExtractor={i => i} renderItem={({ item }) => (
              <TouchableOpacity style={[applyStyles.dropItem, value === item && applyStyles.dropItemActive]}
                onPress={() => { onSelect(item); setOpen(false) }} activeOpacity={0.75}>
                <Text style={[applyStyles.dropTxt, value === item && applyStyles.dropTxtActive]}>{item}</Text>
                {value === item && <Ionicons name="checkmark" size={15} color={App_Primary_color} />}
              </TouchableOpacity>
            )} />
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  )
}
 
// ─── Date Field ───────────────────────────────────────────────────────────────
const DateField = ({ label, placeholder, value, onPress }) => (
  <>
    <Text style={applyStyles.fieldLabel}>{label}</Text>
    <TouchableOpacity activeOpacity={0.8} style={applyStyles.inputBox} onPress={onPress}>
      <Ionicons name="calendar-outline" size={16} color="#7B6FF0" style={{ marginRight: 8 }} />
      <Text style={[applyStyles.inputTxt, !value && applyStyles.placeholder]}>{value || placeholder}</Text>
    </TouchableOpacity>
  </>
)
 
// ─── Screen ───────────────────────────────────────────────────────────────────
 const ApplyLeaveScreen = ({ navigation }) => {
  const isFocused = useIsFocused()
  const [leaveType,   setLeaveType]   = useState('')
  const [fromDate,    setFromDate]    = useState('')
  const [toDate,      setToDate]      = useState('')
  const [dayType,     setDayType]     = useState('Full Day')
  const [reason,      setReason]      = useState('')
  const [contactNo,   setContactNo]   = useState('')
  const [attachment,  setAttachment]  = useState('')
 
  // Calculate no. of days (mock)
  const totalDays = fromDate && toDate ? 3 : 0
 
  return (
    <View style={applyStyles.container}>
      {isFocused && <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />}
 
      {/* ── Header ── */}
      <LinearGradient colors={['#7B6FF0', '#5B4DE8']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={applyStyles.header}>
        <View style={{ height: Platform.OS === 'android' ? (StatusBar.currentHeight || 24) + 8 : 54 }} />
        <View style={applyStyles.headerRow}>
          <TouchableOpacity style={applyStyles.backBtn} onPress={() => navigation?.goBack()} activeOpacity={0.75}>
            <Ionicons name="chevron-back" size={20} color="#fff" />
          </TouchableOpacity>
          <Text style={applyStyles.headerTitle}>Apply Leave</Text>
          <View style={{ width: 38 }} />
        </View>
      </LinearGradient>
 
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={applyStyles.scrollContent} keyboardShouldPersistTaps="handled">
 
        {/* ── Days preview banner ── */}
        {totalDays > 0 && (
          <View style={applyStyles.daysBanner}>
            <Ionicons name="information-circle-outline" size={18} color={App_Primary_color} />
            <Text style={applyStyles.daysBannerTxt}>You are applying for <Text style={{ fontWeight: '700' }}>{totalDays} days</Text> of leave</Text>
          </View>
        )}
 
        {/* ── Form Card ── */}
        <View style={applyStyles.card}>
          <Text style={applyStyles.cardTitle}>Leave Information</Text>
          <Text style={applyStyles.cardSub}>Fill in the details for your leave request</Text>
 
          {/* Leave Type */}
          <View style={applyStyles.fieldWrap}>
            <Dropdown label="Leave Type" placeholder="Select Leave Type" value={leaveType} options={LEAVE_TYPES} onSelect={setLeaveType} />
          </View>
 
          {/* Date Row */}
          <View style={applyStyles.dateRow}>
            <View style={applyStyles.dateHalf}>
              <DateField label="From Date" placeholder="Select date" value={fromDate} onPress={() => setFromDate('10 May 2025')} />
            </View>
            <View style={applyStyles.dateHalf}>
              <DateField label="To Date" placeholder="Select date" value={toDate} onPress={() => setToDate('12 May 2025')} />
            </View>
          </View>
 
          {/* Day Type */}
          <View style={applyStyles.fieldWrap}>
            <Text style={applyStyles.fieldLabel}>Day Type</Text>
            <View style={applyStyles.dayTypeRow}>
              {HALF_DAY_OPT.map(opt => (
                <TouchableOpacity key={opt} activeOpacity={0.8}
                  style={[applyStyles.dayTypeBtn, dayType === opt && applyStyles.dayTypeBtnActive]}
                  onPress={() => setDayType(opt)}>
                  <Text style={[applyStyles.dayTypeTxt, dayType === opt && applyStyles.dayTypeTxtActive]}>{opt}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
 
          {/* Reason */}
          <View style={applyStyles.fieldWrap}>
            <Text style={applyStyles.fieldLabel}>Reason for Leave</Text>
            <View style={[applyStyles.inputBox, applyStyles.textAreaBox]}>
              <TextInput
                style={[applyStyles.inputTxt, { height: 90, textAlignVertical: 'top', padding: 0 }]}
                placeholder="Describe reason for leave..."
                placeholderTextColor="#C0BED8"
                multiline
                value={reason}
                onChangeText={setReason}
              />
            </View>
          </View>
 
          {/* Contact During Leave */}
          <View style={applyStyles.fieldWrap}>
            <Text style={applyStyles.fieldLabel}>Contact Number During Leave</Text>
            <View style={applyStyles.inputBox}>
              <Ionicons name="call-outline" size={16} color="#7B6FF0" style={{ marginRight: 8 }} />
              <TextInput
                style={[applyStyles.inputTxt, { padding: 0 }]}
                placeholder="Enter contact number"
                placeholderTextColor="#C0BED8"
                keyboardType="phone-pad"
                value={contactNo}
                onChangeText={setContactNo}
              />
            </View>
          </View>
 
          {/* Attachment (optional) */}
          <View style={applyStyles.fieldWrap}>
            <Text style={applyStyles.fieldLabel}>Attachment <Text style={applyStyles.optional}>(Optional)</Text></Text>
            <TouchableOpacity activeOpacity={0.8} style={applyStyles.uploadBox} onPress={() => setAttachment('document.pdf')}>
              <View style={applyStyles.uploadIconCircle}>
                <Ionicons name="attach-outline" size={20} color={App_Primary_color} />
              </View>
              <Text style={applyStyles.uploadTxt}>{attachment || 'Upload Supporting Document'}</Text>
              <Text style={applyStyles.uploadSub}>PDF, JPEG, PNG — max 5MB</Text>
            </TouchableOpacity>
          </View>
        </View>
 
        {/* ── Leave Policy Note ── */}
        <View style={applyStyles.noteCard}>
          <Ionicons name="shield-checkmark-outline" size={16} color="#FFA502" style={{ marginRight: 8 }} />
          <Text style={applyStyles.noteTxt}>Leave requests must be submitted at least <Text style={{ fontWeight: '700' }}>2 working days</Text> in advance. Sick leave requires a medical certificate for 3+ days.</Text>
        </View>
 
        <View style={{ height: 90 }} />
      </ScrollView>
 
      {/* ── Submit Button ── */}
      <View style={applyStyles.floatingWrap}>
        <TouchableOpacity activeOpacity={0.85} onPress={() => navigation?.goBack()} style={applyStyles.floatingTouch}>
          <LinearGradient colors={[App_Primary_color, '#4B0082']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={applyStyles.floatingBtn}>
            <Ionicons name="paper-plane-outline" size={18} color="#fff" style={{ marginRight: 8 }} />
            <Text style={applyStyles.floatingBtnTxt}>Submit Leave Request</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  )
}
 
const applyStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0F0F8' },
  scrollContent: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 20 },
 
  header: { paddingHorizontal: 20, paddingBottom: 20, borderBottomLeftRadius: 28, borderBottomRightRadius: 28 },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 4 },
  backBtn: { width: 38, height: 38, borderRadius: 19, backgroundColor: 'rgba(255,255,255,0.22)', alignItems: 'center', justifyContent: 'center', borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.35)' },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#fff', fontFamily: FONTS_FAMILY.NatoSans_SemiBold || undefined },
 
  // Days banner
  daysBanner: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#EDE9FF', borderRadius: 12, padding: 12, marginBottom: 14, gap: 8 },
  daysBannerTxt: { fontSize: 13, color: App_Primary_color, fontFamily: FONTS_FAMILY.NatoSans_Regular || undefined, flex: 1 },
 
  // Card
  card: { backgroundColor: '#fff', borderRadius: 20, padding: 18, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.07, shadowRadius: 12, elevation: 3 },
  cardTitle: { fontSize: 16, fontWeight: '700', color: '#1A1A2E', fontFamily: FONTS_FAMILY.NatoSans_SemiBold || undefined, marginBottom: 4 },
  cardSub: { fontSize: 12, color: '#9B9BB4', fontFamily: FONTS_FAMILY.NatoSans_Regular || undefined, marginBottom: 20 },
 
  fieldWrap: { marginBottom: 16 },
  fieldLabel: { fontSize: 12, fontWeight: '600', color: '#1A1A2E', fontFamily: FONTS_FAMILY.NatoSans_SemiBold || undefined, marginBottom: 8 },
  optional: { fontSize: 11, color: '#aaa', fontWeight: '400' },
  inputBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 12, borderWidth: 1.2, borderColor: '#E4E2F3', paddingHorizontal: 14, paddingVertical: Platform.OS === 'ios' ? 14 : 12, minHeight: 50 },
  inputTxt: { flex: 1, fontSize: 14, color: '#1A1A2E', fontFamily: FONTS_FAMILY.NatoSans_Regular || undefined },
  placeholder: { color: '#C0BED8' },
  textAreaBox: { alignItems: 'flex-start', paddingVertical: 12 },
 
  dateRow: { flexDirection: 'row', gap: 12, marginBottom: 16 },
  dateHalf: { flex: 1 },
 
  // Day type toggle
  dayTypeRow: { flexDirection: 'row', gap: 8 },
  dayTypeBtn: { flex: 1, alignItems: 'center', paddingVertical: 10, borderRadius: 10, borderWidth: 1.2, borderColor: '#E4E2F3', backgroundColor: '#fff' },
  dayTypeBtnActive: { backgroundColor: App_Primary_color, borderColor: App_Primary_color },
  dayTypeTxt: { fontSize: 12, fontWeight: '600', color: '#888', fontFamily: FONTS_FAMILY.NatoSans_SemiBold || undefined },
  dayTypeTxtActive: { color: '#fff' },
 
  // Upload
  uploadBox: { borderRadius: 14, borderWidth: 1.5, borderColor: '#C8C4F0', borderStyle: 'dashed', backgroundColor: '#F0EFFE', alignItems: 'center', paddingVertical: 20 },
  uploadIconCircle: { width: 42, height: 42, borderRadius: 21, backgroundColor: '#E4E1FA', alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  uploadTxt: { fontSize: 13, fontWeight: '700', color: App_Primary_color, fontFamily: FONTS_FAMILY.NatoSans_SemiBold || undefined, marginBottom: 4 },
  uploadSub: { fontSize: 11, color: '#9B9BB4', fontFamily: FONTS_FAMILY.NatoSans_Regular || undefined },
 
  // Note
  noteCard: { flexDirection: 'row', alignItems: 'flex-start', backgroundColor: '#FFF8EC', borderRadius: 14, padding: 14, marginTop: 14, borderWidth: 1, borderColor: '#FFE4A0' },
  noteTxt: { fontSize: 12, color: '#7A6000', lineHeight: 18, fontFamily: FONTS_FAMILY.NatoSans_Regular || undefined, flex: 1 },
 
  // Dropdown modal
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.25)', justifyContent: 'center', paddingHorizontal: 32 },
  dropMenu: { backgroundColor: '#fff', borderRadius: 16, paddingVertical: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.12, shadowRadius: 20, elevation: 10, maxHeight: 300 },
  dropItem: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 18, paddingVertical: 13 },
  dropItemActive: { backgroundColor: '#F0EFFE' },
  dropTxt: { flex: 1, fontSize: 14, color: '#1A1A2E', fontFamily: FONTS_FAMILY.NatoSans_Regular || undefined },
  dropTxtActive: { color: App_Primary_color, fontWeight: '600', fontFamily: FONTS_FAMILY.NatoSans_SemiBold || undefined },
 
  // Floating button
  floatingWrap: { position: 'absolute', bottom: 0, left: 0, right: 0, paddingHorizontal: 20, paddingBottom: Platform.OS === 'ios' ? 36 : 20, paddingTop: 12, backgroundColor: 'white' },
  floatingTouch: { borderRadius: 30, overflow: 'hidden', shadowColor: App_Primary_color, shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.4, shadowRadius: 12, elevation: 8 },
  floatingBtn: { height: 54, borderRadius: 30, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' },
  floatingBtnTxt: { color: '#fff', fontSize: 16, fontWeight: '700', letterSpacing: 0.3, fontFamily: FONTS_FAMILY.NatoSans_SemiBold || undefined },
})

export default ApplyLeaveScreen
 
 