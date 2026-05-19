



// import React, { useState, useEffect, useRef, useCallback } from 'react'
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   StatusBar,
//   Modal,
//   FlatList,
//   ScrollView,
//   KeyboardAvoidingView,
//   Keyboard,
//   Platform,
//   Animated,
//   Easing,
// } from 'react-native'
// import { useDispatch, useSelector } from 'react-redux'
// import AntDesign from 'react-native-vector-icons/AntDesign'
// import { useIsFocused } from '@react-navigation/native'

// import { FONTS_FAMILY } from '../../assets/Fonts'
// import { App_Primary_color, Ctaone, ctathree, ctatwo, dark33, dark55, darkMode25, white } from '../../common/Colors/colors'
// import CustomInputField from '../../components/wrapper/CustomInput'
// import CustomText from '../../components/TextComponent'
// import useLoader from '../../utils/LoaderHook'
// import { setUser } from '../../redux/reducer/user'
// import LinearGradient from 'react-native-linear-gradient'
// import { apiPost, setItem } from '../../utils/Apis'
// import { ToastMsg } from '../../utils/helperFunctions'
// import { syncCurrentLocationForRole } from '../../utils/locationHelpers'

// import DrawerModal from '../../components/DrawerModal'

// const LOGIN_METHODS = { MOBILE: 'mobile', EMAIL: 'email' }

// const COUNTRIES = [
//   { code: 'US', name: 'United States', dialCode: '+1', flag: '🇺🇸' },
//   { code: 'GB', name: 'United Kingdom', dialCode: '+44', flag: '🇬🇧' },
//   { code: 'IN', name: 'India', dialCode: '+91', flag: '🇮🇳' },
//   { code: 'CA', name: 'Canada', dialCode: '+1', flag: '🇨🇦' },
//   { code: 'AU', name: 'Australia', dialCode: '+61', flag: '🇦🇺' },
//   { code: 'DE', name: 'Germany', dialCode: '+49', flag: '🇩🇪' },
//   { code: 'FR', name: 'France', dialCode: '+33', flag: '🇫🇷' },
//   { code: 'JP', name: 'Japan', dialCode: '+81', flag: '🇯🇵' },
// ]

// const DEFAULT_COUNTRY = COUNTRIES[2]

// const useLoginAnimations = () => {
//   const fadeAnim = useRef(new Animated.Value(0)).current
//   const slideAnim = useRef(new Animated.Value(50)).current
//   const titleSlide = useRef(new Animated.Value(-30)).current
//   const tabSlide = useRef(new Animated.Value(30)).current
//   const inputFade = useRef(new Animated.Value(0)).current
//   const buttonScale = useRef(new Animated.Value(0.8)).current
//   const floatingAnim = useRef(new Animated.Value(0)).current

//   useEffect(() => {
//     Animated.parallel([
//       Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true, easing: Easing.out(Easing.cubic) }),
//       Animated.timing(slideAnim, { toValue: 0, duration: 800, useNativeDriver: true, easing: Easing.out(Easing.back(1.2)) }),
//       Animated.timing(titleSlide, { toValue: 0, duration: 600, delay: 200, useNativeDriver: true, easing: Easing.out(Easing.cubic) }),
//       Animated.timing(tabSlide, { toValue: 0, duration: 700, delay: 300, useNativeDriver: true, easing: Easing.out(Easing.cubic) }),
//       Animated.timing(inputFade, { toValue: 1, duration: 800, delay: 400, useNativeDriver: true }),
//       Animated.spring(buttonScale, { toValue: 1, delay: 500, friction: 4, tension: 40, useNativeDriver: true }),
//     ]).start()

//     Animated.loop(
//       Animated.sequence([
//         Animated.timing(floatingAnim, { toValue: 1, duration: 2000, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
//         Animated.timing(floatingAnim, { toValue: 0, duration: 2000, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
//       ])
//     ).start()
//   }, [])

//   const animateTabSwitch = useCallback(() => {
//     Animated.sequence([
//       Animated.timing(inputFade, { toValue: 0, duration: 200, useNativeDriver: true }),
//       Animated.timing(inputFade, { toValue: 1, duration: 400, useNativeDriver: true }),
//     ]).start()
//   }, [inputFade])

//   const floatingTranslate = floatingAnim.interpolate({
//     inputRange: [0, 1],
//     outputRange: [0, -10],
//   })

//   return { fadeAnim, slideAnim, titleSlide, tabSlide, inputFade, buttonScale, floatingTranslate, animateTabSwitch }
// }

// const CountryItem = React.memo(({ item, onSelect }) => (
//   <TouchableOpacity style={staticStyles.countryItem} onPress={() => onSelect(item)} activeOpacity={0.7}>
//     <Text style={staticStyles.countryFlag}>{item.flag}</Text>
//     <Text style={staticStyles.countryName}>{item.name}</Text>
//     <Text style={staticStyles.countryCode}>{item.dialCode}</Text>
//   </TouchableOpacity>
// ))

// const CountryPickerModal = React.memo(({ visible, onClose, onSelect, isDarkMode }) => (
//   <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
//     <View style={[staticStyles.modalContainer, isDarkMode && { backgroundColor: darkMode25 }]}>
//       <View style={staticStyles.modalHeader}>
//         <TouchableOpacity style={staticStyles.modalCloseButton} onPress={onClose} activeOpacity={0.7}>
//           <Text style={staticStyles.modalCloseText}>Done</Text>
//         </TouchableOpacity>
//       </View>
//       <FlatList
//         data={COUNTRIES}
//         renderItem={({ item }) => <CountryItem item={item} onSelect={onSelect} />}
//         keyExtractor={item => item.code}
//         style={staticStyles.countryList}
//         initialNumToRender={8}
//         removeClippedSubviews
//       />
//     </View>
//   </Modal>
// ))

// const PhoneInput = React.memo(({ country, phone, onPhoneChange, onCountryPress, isDarkMode }) => (
//   <View style={[staticStyles.phoneInputContainer, isDarkMode && { backgroundColor: dark33 }]}>
//     <TouchableOpacity
//       style={[staticStyles.countrySelector, isDarkMode && { backgroundColor: dark33 }]}
//       onPress={onCountryPress}
//       activeOpacity={0.7}
//     >
//       <Text style={staticStyles.countryFlag}>{country.flag}</Text>
//       <Text style={[staticStyles.dialCode, isDarkMode && { color: white }]}>{country.dialCode}</Text>
//       <Text style={staticStyles.dropdownArrow}>▼</Text>
//     </TouchableOpacity>
//     <TextInput
//       style={[staticStyles.phoneInput, isDarkMode && { backgroundColor: dark33, color: white }]}
//       placeholder="Enter phone number"
//       placeholderTextColor="#999"
//       keyboardType="phone-pad"
//       value={phone}
//       onChangeText={onPhoneChange}
//     />
//   </View>
// ))

// const Login = ({ navigation }) => {
//   const isFocused = useIsFocused()
//   const dispatch = useDispatch()
//   const { isDarkMode } = useSelector(state => state.theme)
//   const { showLoader, hideLoader } = useLoader()

//   const [loginMethod, setLoginMethod] = useState(LOGIN_METHODS.MOBILE)
//   const [selectedCountry, setSelectedCountry] = useState(DEFAULT_COUNTRY)
//   const [phoneNumber, setPhoneNumber] = useState('')
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [showCountryPicker, setShowCountryPicker] = useState(false)
//   const [keyboardVisible, setKeyboardVisible] = useState(false)

//   const {
//     fadeAnim, slideAnim, titleSlide, tabSlide,
//     inputFade, buttonScale, floatingTranslate, animateTabSwitch,
//   } = useLoginAnimations()

//   const handleTabSwitch = useCallback((method) => {
//     animateTabSwitch()
//     setLoginMethod(method)
//   }, [animateTabSwitch])

//   const handleCountrySelect = useCallback((country) => {
//     setSelectedCountry(country)
//     setShowCountryPicker(false)
//   }, [])

//   useEffect(() => {
//     const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow'
//     const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide'

//     const showSubscription = Keyboard.addListener(showEvent, () => setKeyboardVisible(true))
//     const hideSubscription = Keyboard.addListener(hideEvent, () => setKeyboardVisible(false))

//     return () => {
//       showSubscription.remove()
//       hideSubscription.remove()
//     }
//   }, [])

//   // ── Validation ─────────────────────────────────────────────────────────────
//   const validate = () => {
//     if (loginMethod === LOGIN_METHODS.MOBILE) {
//       if (!phoneNumber.trim()) { ToastMsg('Please enter phone number'); return false }
//     } else {
//       if (!email.trim()) { ToastMsg('Please enter email'); return false }
//     }
//     if (!password.trim()) { ToastMsg('Please enter password'); return false }
//     return true
//   }

//   // ── Submit ─────────────────────────────────────────────────────────────────
//   const handleSubmit = useCallback(async () => {
// navigation.navigate('Dashboard')

//     return
//     if (!validate()) return

//     const isMobile = loginMethod === LOGIN_METHODS.MOBILE

//     let url, payload
//     if (isMobile) {
//       url = '/api/user/LoginViaMobile'
//       payload = { Number: phoneNumber, Password: password }
//     } else {
//       url = '/api/user/LoginViaEmail'
//       payload = { Email: email, Password: password }
//     }

//     try {
//       showLoader()
//       const response = await apiPost(url, payload)
//       hideLoader()

//       if (response?.statusCode === 200 || response?.success) {
//         const loginData = response?.data || {}
//         await setItem('token', loginData?.token || '')
//         await setItem('UserType', 'Customer')
//         dispatch(setUser(JSON.stringify(loginData?.User || {})))
//         syncCurrentLocationForRole('Customer').catch((error) => {
//           console.log('Login location sync error:', error)
//         })
//         ToastMsg(response?.message || 'Login successful!')
//         navigation.replace('CustomerTab')
//         return
//       } else {
//         ToastMsg(response?.message || 'Login failed. Please try again.')
//       }
//     } catch (error) {
//       hideLoader()
//       console.log('Login error:', error)
//       ToastMsg('Something went wrong. Please try again.')
//     }
//   }, [loginMethod, phoneNumber, email, password, navigation])

//   const themed = themedStyles(isDarkMode)
//   const isMobile = loginMethod === LOGIN_METHODS.MOBILE

//   return (
//     <KeyboardAvoidingView
//       style={themed.container}
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       keyboardVerticalOffset={Platform.OS === 'ios' ? 24 : 0}
//     >
//       {isFocused && (
//         <StatusBar
//           barStyle={isDarkMode ? 'light-content' : 'dark-content'}
//           backgroundColor={isDarkMode ? darkMode25 : '#ffffff'}
//         />
//       )}

//       <ScrollView
//         contentContainerStyle={[
//           staticStyles.scrollViewContainer,
//           keyboardVisible && staticStyles.scrollViewContainerKeyboard,
//         ]}
//         showsVerticalScrollIndicator={false}
//         keyboardShouldPersistTaps="handled"
//         keyboardDismissMode="on-drag"
//       >
//         <Animated.View
//           style={[
//             staticStyles.content,
//             keyboardVisible && staticStyles.contentKeyboardVisible,
//             { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
//           ]}
//         >
//           {/* Title */}
//           <Animated.View style={{ transform: [{ translateY: titleSlide }] }}>
//             <Text style={themed.title}>Get started</Text>
//             <Text style={themed.subtitle}>
//               You can log in or make an account if you're new
//             </Text>
//           </Animated.View>



//           {/* Input fields */}
//           <Animated.View style={{ opacity: inputFade }}>

//             <View style={staticStyles.inputGroup}>
//               <CustomInputField
//                 label="Email Address"
//                 placeholder="Enter email"
//                 onChangeText={setEmail}
//                 value={email}
//               />
//               <CustomInputField
//                 label="Password"
//                 placeholder="Enter Password"
//                 icon={<AntDesign name="eye" color={isDarkMode ? white : 'black'} size={20} />}
//                 onChangeText={setPassword}
//                 value={password}
//                 secureTextEntry
//                 isPassword
//               />
//               <TouchableOpacity
//                 style={staticStyles.forgotPasswordBtn}
//                 onPress={() => navigation.navigate('ForgotPassword')}
//                 activeOpacity={0.7}
//               >
//                 <CustomText style={[staticStyles.forgotPasswordText, { color: App_Primary_color }]}>
//                   Forgot Password
//                 </CustomText>
//               </TouchableOpacity>
//             </View>
//             {/* )} */}
//           </Animated.View>

//           <Animated.View
//             style={[
//               staticStyles.inlineButtonContainer,
//               // { transform: [{ scale: buttonScale }, { translateY: floatingTranslate }] },
//             ]}
//           >
//             <TouchableOpacity onPress={handleSubmit} activeOpacity={0.8}
            
//             >
//               <LinearGradient
//                 colors={[Ctaone, ctatwo]}
//                 start={{ x: 1, y: 0 }}
//                 end={{ x: 1, y: 1 }}
//                 style={staticStyles.continueButton}
//               >
//                 <Text style={staticStyles.continueButtonText}>Continue</Text>
//               </LinearGradient>
//             </TouchableOpacity>
//           </Animated.View>

//           {/* {!keyboardVisible && (
//             <Animated.View style={[staticStyles.loginRedirect, { opacity: fadeAnim }]}>
//               <Text style={themed.loginText}>Don't have an account?</Text>
//               <TouchableOpacity
//                 onPress={() => navigation.navigate('Signup')}
//                 activeOpacity={0.7}
//               >
//                 <Text style={staticStyles.loginLink}>Sign up</Text>
//               </TouchableOpacity>
//             </Animated.View>
//           )} */}
//         </Animated.View>
//       </ScrollView>

//       {/* Country picker modal */}
//       <CountryPickerModal
//         visible={showCountryPicker}
//         onClose={() => setShowCountryPicker(false)}
//         onSelect={handleCountrySelect}
//         isDarkMode={isDarkMode}
//       />

     
//     </KeyboardAvoidingView>
//   )
// }

// const staticStyles = StyleSheet.create({
//   scrollViewContainer: { flexGrow: 1, paddingBottom: 24 },
//   scrollViewContainerKeyboard: { paddingBottom: 16 },
//   content: {
//     flex: 1,
//     paddingHorizontal: 20,
//     paddingTop: 20,
//     marginTop: 110,
//     paddingBottom: 40,
//   },
//   contentKeyboardVisible: {
//     marginTop: 48,
//     paddingBottom: 24,
//   },
//   inputGroup: { gap: 10 },
//   tab: { flex: 1, paddingVertical: 12, alignItems: 'center', borderRadius: 8 },
//   activeTab: { backgroundColor: App_Primary_color },
//   inactiveTab: { backgroundColor: 'transparent' },
//   tabText: { fontSize: 14, fontFamily: FONTS_FAMILY.Poppins_Medium },
//   activeTabText: { color: white },
//   phoneInputContainer: {
//     flexDirection: 'row',
//     borderColor: '#ddd',
//     borderRadius: 8,
//     height: 50,
//     gap: 10,
//   },
//   countrySelector: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 5,
//     borderRightColor: '#ddd',
//     minWidth: 100,
//     backgroundColor: '#F2F2F3',
//     borderRadius: 8,
//   },
//   countryFlag: { fontSize: 20, marginRight: 8 },
//   dialCode: { fontSize: 15, color: '#333', marginRight: 8, fontFamily: FONTS_FAMILY.Poppins_Regular },
//   dropdownArrow: { fontSize: 10, color: '#666' },
//   phoneInput: {
//     flex: 1,
//     paddingHorizontal: 20,
//     fontSize: 15,
//     color: '#333',
//     backgroundColor: '#F2F2F3',
//     borderRadius: 8,
//     fontFamily: FONTS_FAMILY.Poppins_Regular,
//   },
//   inlineButtonContainer: {
//     marginTop: 40,
//   },
//   forgotPasswordBtn: { alignSelf: 'flex-end' },
//   forgotPasswordText: { fontFamily: FONTS_FAMILY.Poppins_Regular },
//   continueButton: {
//     backgroundColor: App_Primary_color,
//     borderRadius: 8,
//     height: 40,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   continueButtonText: { color: white, fontSize: 16, fontWeight: '600' },
//   loginRedirect: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20, marginBottom: 8 },
//   loginLink: { fontSize: 14, fontFamily: FONTS_FAMILY.Poppins_SemiBold, color: App_Primary_color, marginLeft: 4 },
//   modalContainer: { flex: 1, backgroundColor: '#fff' },
//   modalHeader: { flexDirection: 'row', justifyContent: 'flex-end', paddingHorizontal: 20, paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#eee' },
//   modalCloseButton: { padding: 5 },
//   modalCloseText: { fontSize: 16, color: '#4A90E2', fontWeight: '600' },
//   countryList: { flex: 1 },
//   countryItem: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
//   countryName: { flex: 1, fontSize: 16, color: '#333', marginLeft: 12 },
//   countryCode: { fontSize: 16, color: '#666' },
// })

// const themedStyles = (isDarkMode) => StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: isDarkMode ? darkMode25 : '#ffffff',
//   },
//   title: {
//     fontSize: 20,
//     fontFamily: FONTS_FAMILY.Natosans_Medium,
//     color: isDarkMode ? white : '#000',
//     marginBottom: 8,
//   },
//   subtitle: {
//     fontSize: 13,
//     fontFamily: FONTS_FAMILY.Natosans_Regular,
//     color: isDarkMode ? white : '#666',
//     lineHeight: 24,
//     marginBottom: 20,
//   },
//   tabContainer: {
//     flexDirection: 'row',
//     backgroundColor: isDarkMode ? dark55 : '#F2F2F3',
//     borderRadius: 12,
//     padding: 4,
//     marginBottom: 30,
//   },
//   inactiveTabText: { color: isDarkMode ? white : '#666' },
//   inputLabel: {
//     fontSize: 16,
//     color: isDarkMode ? white : '#666',
//     marginBottom: 12,
//     fontWeight: '500',
//   },
//   loginText: {
//     fontSize: 14,
//     fontFamily: FONTS_FAMILY.Poppins_Regular,
//     color: isDarkMode ? white : '#666',
//   },
// })

// export default Login


import React, { useState, useEffect, useRef, useCallback } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  Animated,
  Easing,
  ImageBackground,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Feather from 'react-native-vector-icons/Feather'
import { useIsFocused } from '@react-navigation/native'

import { FONTS_FAMILY } from '../../assets/Fonts'
import {
  App_Primary_color,
  Ctaone,
  ctatwo,
  darkMode25,
  white,
} from '../../common/Colors/colors'
import CustomInputField from '../../components/wrapper/CustomInput'
import CustomText from '../../components/TextComponent'
import useLoader from '../../utils/LoaderHook'
import { setUser } from '../../redux/reducer/user'
import LinearGradient from 'react-native-linear-gradient'
import { apiPost, setItem } from '../../utils/Apis'
import { ToastMsg } from '../../utils/helperFunctions'
import { syncCurrentLocationForRole } from '../../utils/locationHelpers'
import IMG from '../../assets/Images'

const Login = ({ navigation }) => {
  const isFocused = useIsFocused()
  const dispatch = useDispatch()
  const { isDarkMode } = useSelector(state => state.theme)
  const { showLoader, hideLoader } = useLoader()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [keyboardVisible, setKeyboardVisible] = useState(false)

  // Animations
  const sheetAnim = useRef(new Animated.Value(60)).current
  const sheetOpacity = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.parallel([
      Animated.timing(sheetAnim, {
        toValue: 0,
        duration: 600,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(sheetOpacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start()
  }, [])

  useEffect(() => {
    const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow'
    const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide'
    const show = Keyboard.addListener(showEvent, () => setKeyboardVisible(true))
    const hide = Keyboard.addListener(hideEvent, () => setKeyboardVisible(false))
    return () => { show.remove(); hide.remove() }
  }, [])

  const validate = () => {
    if (!email.trim()) { ToastMsg('Please enter email'); return false }
    if (!password.trim()) { ToastMsg('Please enter password'); return false }
    return true
  }

  const handleSubmit = useCallback(async () => {
    navigation.navigate('EmployeeTabNavigation')
    return
    if (!validate()) return
    try {
      showLoader()
      const response = await apiPost('/api/user/LoginViaEmail', { Email: email, Password: password })
      hideLoader()
      if (response?.statusCode === 200 || response?.success) {
        const loginData = response?.data || {}
        await setItem('token', loginData?.token || '')
        await setItem('UserType', 'Customer')
        dispatch(setUser(JSON.stringify(loginData?.User || {})))
        syncCurrentLocationForRole('Customer').catch(console.log)
        ToastMsg(response?.message || 'Login successful!')
        navigation.replace('CustomerTab')
      } else {
        ToastMsg(response?.message || 'Login failed. Please try again.')
      }
    } catch (error) {
      hideLoader()
      ToastMsg('Something went wrong. Please try again.')
    }
  }, [email, password, navigation])

  return (
    <ImageBackground
      source={IMG.onboarding1}
      style={styles.fullBg}
      resizeMode="cover"
      blurRadius={8}
    >
      {/* Dark overlay so bg isn't too bright */}
      <View style={styles.bgOverlay} />

      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 24 : 0}
      >
        {isFocused && (
          <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
        )}

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
        >
          {/* White bottom sheet card */}
          <Animated.View
            style={[
              styles.sheet,
              { opacity: sheetOpacity, transform: [{ translateY: sheetAnim }] },
            ]}
          >
          {/* Title */}
          <Text style={styles.title}>Sign In</Text>
          <Text style={styles.subtitle}>Sign in to my account</Text>

          {/* Email Field */}
          <Text style={styles.label}>Email</Text>
          <View style={styles.inputWrapper}>
            <Feather name="mail" size={18} color="#aaa" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="My Email"
              placeholderTextColor="#bbb"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          {/* Password Field */}
          <Text style={styles.label}>Password</Text>
          <View style={styles.inputWrapper}>
            <Feather name="lock" size={18} color="#aaa" style={styles.inputIcon} />
            <TextInput
              style={[styles.input, { flex: 1 }]}
              placeholder="My Password"
              placeholderTextColor="#bbb"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(v => !v)}
              style={styles.eyeBtn}
              activeOpacity={0.7}
            >
              <Feather
                name={showPassword ? 'eye' : 'eye-off'}
                size={18}
                color="#aaa"
              />
            </TouchableOpacity>
          </View>

          {/* Remember Me + Forgot Password */}
          <View style={styles.rememberRow}>
            <TouchableOpacity
              style={styles.checkRow}
              onPress={() => setRememberMe(v => !v)}
              activeOpacity={0.7}
            >
              <View style={[styles.checkbox, rememberMe && styles.checkboxActive]}>
                {rememberMe && (
                  <Feather name="check" size={11} color={white} />
                )}
              </View>
              <Text style={styles.rememberText}>Remember Me</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('ForgotPassword')}
              activeOpacity={0.7}
            >
              <Text style={styles.forgotText}>Forgot Password</Text>
            </TouchableOpacity>
          </View>

          {/* Sign In Button */}
          <TouchableOpacity onPress={handleSubmit} activeOpacity={0.85} style={styles.signInBtn}>
            <LinearGradient
              colors={['#6C63FF', '#4B0082']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.signInGradient}
            >
              <Text style={styles.signInText}>Sign In</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* OR Divider */}
          <View style={styles.orRow}>
            <View style={styles.orLine} />
            <Text style={styles.orText}>OR</Text>
            <View style={styles.orLine} />
          </View>

          {/* Sign in with Employee ID */}
          <TouchableOpacity
            style={styles.altBtn}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('EmployeeLogin')}
          >
            <View style={styles.altIconWrap}>
              <Feather name="user" size={18} color={App_Primary_color} />
            </View>
            <Text style={styles.altBtnText}>Sign in With Employee ID</Text>
          </TouchableOpacity>

          {/* Sign in with Phone */}
          <TouchableOpacity
            style={styles.altBtn}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('PhoneLogin')}
          >
            <View style={styles.altIconWrap}>
              <Feather name="phone" size={18} color={App_Primary_color} />
            </View>
            <Text style={styles.altBtnText}>Sign in With Phone</Text>
          </TouchableOpacity>

          {/* Sign Up redirect */}
          <View style={styles.signUpRow}>
            <Text style={styles.signUpPrompt}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')} activeOpacity={0.7}>
              <Text style={styles.signUpLink}>Sign Up Here</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  fullBg: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  bgOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(60, 50, 160, 0.45)',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 36,
    // min height so it feels like a bottom sheet
    minHeight: '65%',
  },
  title: {
    fontSize: 24,
    fontFamily: FONTS_FAMILY?.Natosans_Bold || undefined,
    fontWeight: '700',
    color: '#111',
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: '#888',
    textAlign: 'center',
    marginBottom: 24,
    fontFamily: FONTS_FAMILY?.Natosans_Regular || undefined,
  },
  label: {
    fontSize: 13,
    color: '#444',
    marginBottom: 6,
    fontFamily: FONTS_FAMILY?.Poppins_Medium || undefined,
    fontWeight: '500',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    paddingHorizontal: 14,
    height: 50,
    marginBottom: 16,
    // backgroundColor: '#FAFAFA',
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#222',
    fontFamily: FONTS_FAMILY?.Poppins_Regular || undefined,
  },
  eyeBtn: {
    padding: 4,
  },
  rememberRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: App_Primary_color,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  checkboxActive: {
    backgroundColor: App_Primary_color,
    borderColor: App_Primary_color,
  },
  rememberText: {
    fontSize: 13,
    color: '#444',
    fontFamily: FONTS_FAMILY?.Poppins_Regular || undefined,
  },
  forgotText: {
    fontSize: 13,
    color: App_Primary_color,
    fontFamily: FONTS_FAMILY?.Poppins_Medium || undefined,
    fontWeight: '500',
  },
  signInBtn: {
    borderRadius: 30,
    overflow: 'hidden',
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  signInGradient: {
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
  signInText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: FONTS_FAMILY?.Poppins_SemiBold || undefined,
    letterSpacing: 0.5,
  },
  orRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 10,
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E8E8E8',
  },
  orText: {
    fontSize: 12,
    color: '#aaa',
    fontFamily: FONTS_FAMILY?.Poppins_Regular || undefined,
  },
  altBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0DCFF',
    borderRadius: 30,
    paddingVertical: 13,
    paddingHorizontal: 20,
    marginBottom: 12,
    gap: 12,
  },
  altIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#EDE9FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  altBtnText: {
    fontSize: 14,
    color: App_Primary_color,
    fontFamily: FONTS_FAMILY?.Poppins_Medium || undefined,
    fontWeight: '500',
  },
  signUpRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  signUpPrompt: {
    fontSize: 13,
    color: '#888',
    fontFamily: FONTS_FAMILY?.Poppins_Regular || undefined,
  },
  signUpLink: {
    fontSize: 13,
    color: App_Primary_color,
    fontFamily: FONTS_FAMILY?.Poppins_SemiBold || undefined,
    fontWeight: '600',
  },
})

export default Login