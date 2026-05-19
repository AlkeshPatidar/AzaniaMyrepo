import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Platform,
  ScrollView,
  Modal,
  FlatList,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useIsFocused } from '@react-navigation/native'

import { App_Primary_color } from '../../../common/Colors/colors'
import { FONTS_FAMILY } from '../../../assets/Fonts'

// ─── Constants ────────────────────────────────────────────────────────────────
const CATEGORIES = [
  'Travel & Transport',
  'Accommodation',
  'Meals & Entertainment',
  'Office Supplies',
  'Software & Subscriptions',
  'Medical',
  'Other',
]

// ─── Dropdown Picker ──────────────────────────────────────────────────────────
const DropdownPicker = ({ label, placeholder, value, onSelect, options }) => {
  const [visible, setVisible] = useState(false)

  return (
    <>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.inputBox}
        onPress={() => setVisible(true)}
      >
        <Text style={[styles.inputText, !value && styles.placeholderText]}>
          {value || placeholder}
        </Text>
        <Ionicons name="chevron-down" size={18} color="#7B6FF0" />
      </TouchableOpacity>

      {/* Dropdown Modal */}
      <Modal visible={visible} transparent animationType="fade">
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setVisible(false)}
        >
          <View style={styles.dropdownMenu}>
            <FlatList
              data={options}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[styles.dropdownItem, value === item && styles.dropdownItemActive]}
                  onPress={() => {
                    onSelect(item)
                    setVisible(false)
                  }}
                  activeOpacity={0.75}
                >
                  <Text style={[styles.dropdownItemTxt, value === item && styles.dropdownItemTxtActive]}>
                    {item}
                  </Text>
                  {value === item && (
                    <Ionicons name="checkmark" size={16} color={App_Primary_color} />
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  )
}

// ─── Date Picker Trigger ──────────────────────────────────────────────────────
const DatePickerField = ({ label, placeholder, value, onPress }) => (
  <>
    <Text style={styles.fieldLabel}>{label}</Text>
    <TouchableOpacity activeOpacity={0.8} style={styles.inputBox} onPress={onPress}>
      <Text style={[styles.inputText, !value && styles.placeholderText]}>
        {value || placeholder}
      </Text>
      <Ionicons name="chevron-down" size={18} color="#7B6FF0" />
    </TouchableOpacity>
  </>
)

// ─── Main Screen ──────────────────────────────────────────────────────────────
const SubmitExpenseScreen = ({ navigation }) => {
  const isFocused = useIsFocused()

  const [category, setCategory]       = useState('')
  const [date, setDate]               = useState('')
  const [amount, setAmount]           = useState('')
  const [description, setDescription] = useState('')
  const [fileName, setFileName]       = useState('')

  const handleUpload = () => {
    // Wire to document picker library (react-native-document-picker)
    // DocumentPicker.pick({ type: [DocumentPicker.types.pdf, ...] })
    setFileName('document.pdf') // mock
  }

  const handleSubmit = () => {
    // Handle submission logic
  }

  return (
    <View style={styles.container}>
      {isFocused && (
        <StatusBar barStyle="dark-content" backgroundColor="#F5F5FB" translucent={false} />
      )}

      {/* ── Header ── */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation?.goBack()}
          activeOpacity={0.75}
        >
          <Ionicons name="chevron-back" size={20} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Submit Expense</Text>
        {/* spacer */}
        <View style={{ width: 38 }} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* ── Card ── */}
        <View style={styles.card}>

          {/* Section heading */}
          <Text style={styles.sectionTitle}>Fill Claim Information</Text>
          <Text style={styles.sectionSub}>Information about claim details</Text>

          {/* ── Upload Box ── */}
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.uploadBox}
            onPress={handleUpload}
          >
            {/* Dashed border via nested Views (RN doesn't support borderStyle dashed on all sides natively) */}
            <View style={styles.uploadInner}>
              {/* Soft purple circle icon */}
              <View style={styles.uploadIconCircle}>
                <MaterialCommunityIcons name="paperclip" size={22} color={App_Primary_color} />
              </View>
              <Text style={styles.uploadTitle}>
                {fileName ? fileName : 'Upload Claim Document'}
              </Text>
              <Text style={styles.uploadSub}>
                Format should be in .pdf .jpeg .png less than 5MB
              </Text>
            </View>
          </TouchableOpacity>

          {/* ── Expense Category ── */}
          <View style={styles.fieldWrap}>
            <DropdownPicker
              label="Expense Category"
              placeholder="Select Category"
              value={category}
              onSelect={setCategory}
              options={CATEGORIES}
            />
          </View>

          {/* ── Transaction Date ── */}
          <View style={styles.fieldWrap}>
            <DatePickerField
              label="Transaction Date"
              placeholder="Enter Transaction Date"
              value={date}
              onPress={() => {
                // Wire to @react-native-community/datetimepicker
                // For now mock:
                setDate('27 April 2025')
              }}
            />
          </View>

          {/* ── Expense Amount ── */}
          <View style={styles.fieldWrap}>
            <Text style={styles.fieldLabel}>Expense Amount ($USD)</Text>
            <View style={styles.inputBox}>
              <TextInput
                style={[styles.inputText, styles.textInput]}
                placeholder="Enter Amount"
                placeholderTextColor="#C0BED8"
                keyboardType="decimal-pad"
                value={amount}
                onChangeText={setAmount}
              />
            </View>
          </View>

          {/* ── Expense Description ── */}
          <View style={styles.fieldWrap}>
            <Text style={styles.fieldLabel}>Expense Description</Text>
            <View style={[styles.inputBox, styles.textAreaBox]}>
              <TextInput
                style={[styles.inputText, styles.textInput, styles.textArea]}
                placeholder="Enter Expense Description"
                placeholderTextColor="#C0BED8"
                multiline
                textAlignVertical="top"
                value={description}
                onChangeText={setDescription}
              />
            </View>
          </View>

        </View>

        {/* Bottom padding for floating button */}
        <View style={{ height: 90 }} />
      </ScrollView>

      {/* ── Floating Submit Button ── */}
      <View style={styles.floatingWrap}>
        <TouchableOpacity
          activeOpacity={0.87}
          onPress={handleSubmit}
          style={styles.floatingTouch}
        >
          <LinearGradient
            colors={['#7B6FF0', '#5B4DE8']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.floatingBtn}
          >
            <Text style={styles.floatingBtnTxt}>Submit Expense</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  )
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5FB',
  },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 16, paddingTop: 12, paddingBottom: 20 },

  // ── Header ──
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 24) + 10 : 54,
    paddingBottom: 14,
    backgroundColor: '#F5F5FB',
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 2,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A2E',
    fontFamily: FONTS_FAMILY.NatoSans_SemiBold || undefined,
  },

  // ── Card ──
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 18,
    shadowColor: '#7B6FF0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 14,
    elevation: 3,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A2E',
    fontFamily: FONTS_FAMILY.NatoSans_SemiBold || undefined,
    marginBottom: 4,
  },
  sectionSub: {
    fontSize: 12,
    color: '#9B9BB4',
    fontFamily: FONTS_FAMILY.NatoSans_Regular || undefined,
    marginBottom: 18,
  },

  // ── Upload Box ──
  uploadBox: {
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#C8C4F0',
    borderStyle: 'dashed',
    backgroundColor: '#F0EFFE',
    marginBottom: 20,
    overflow: 'hidden',
  },
  uploadInner: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  uploadIconCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#E4E1FA',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  uploadTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: App_Primary_color,
    fontFamily: FONTS_FAMILY.NatoSans_SemiBold || undefined,
    marginBottom: 4,
    textAlign: 'center',
  },
  uploadSub: {
    fontSize: 11,
    color: '#9B9BB4',
    fontFamily: FONTS_FAMILY.NatoSans_Regular || undefined,
    textAlign: 'center',
    lineHeight: 16,
  },

  // ── Fields ──
  fieldWrap: {
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1A1A2E',
    fontFamily: FONTS_FAMILY.NatoSans_SemiBold || undefined,
    marginBottom: 8,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1.2,
    borderColor: '#E4E2F3',
    paddingHorizontal: 14,
    paddingVertical: Platform.OS === 'ios' ? 14 : 12,
    minHeight: 50,
  },
  inputText: {
    flex: 1,
    fontSize: 14,
    color: '#1A1A2E',
    fontFamily: FONTS_FAMILY.NatoSans_Regular || undefined,
  },
  placeholderText: {
    color: '#C0BED8',
  },
  textInput: {
    padding: 0,
    margin: 0,
  },
  textAreaBox: {
    alignItems: 'flex-start',
    paddingVertical: 12,
    minHeight: 110,
  },
  textArea: {
    height: 90,
    textAlignVertical: 'top',
  },

  // ── Dropdown Modal ──
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  dropdownMenu: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 10,
    maxHeight: 320,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 13,
  },
  dropdownItemActive: {
    backgroundColor: '#F0EFFE',
  },
  dropdownItemTxt: {
    flex: 1,
    fontSize: 14,
    color: '#1A1A2E',
    fontFamily: FONTS_FAMILY.NatoSans_Regular || undefined,
  },
  dropdownItemTxtActive: {
    color: App_Primary_color,
    fontWeight: '600',
    fontFamily: FONTS_FAMILY.NatoSans_SemiBold || undefined,
  },

  // ── Floating Button ──
  floatingWrap: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === 'ios' ? 36 : 20,
    paddingTop: 12,
    backgroundColor: '#F5F5FB',
  },
  floatingTouch: {
    borderRadius: 30,
    overflow: 'hidden',
    shadowColor: '#7B6FF0',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  floatingBtn: {
    height: 54,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatingBtnTxt: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
    fontFamily: FONTS_FAMILY.NatoSans_SemiBold || undefined,
  },
})

export default SubmitExpenseScreen