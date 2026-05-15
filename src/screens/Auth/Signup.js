// import React, { useState, useCallback } from 'react'
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   StatusBar,
//   ScrollView,
//   KeyboardAvoidingView,
//   Platform,
//   Animated,
//   Easing,
// } from 'react-native'
// import { useSelector } from 'react-redux'
// import AntDesign from 'react-native-vector-icons/AntDesign'

// import { FONTS_FAMILY } from '../../assets/Fonts'
// import { App_Primary_color, Ctaone, ctathree, ctatwo, darkMode25, white } from '../../common/Colors/colors'
// import CustomInputField from '../../components/wrapper/CustomInput'
// import LinearGradient from 'react-native-linear-gradient'
// import { apiPost, setItem } from '../../utils/Apis'
// import { ToastMsg } from '../../utils/helperFunctions'
// import { useDispatch } from 'react-redux'
// import { setUser } from '../../redux/reducer/user'

// const useSignupAnimations = () => {
//   const fadeAnim    = React.useRef(new Animated.Value(0)).current
//   const slideAnim   = React.useRef(new Animated.Value(50)).current
//   const titleSlide  = React.useRef(new Animated.Value(-30)).current
//   const inputFade   = React.useRef(new Animated.Value(0)).current
//   const buttonScale = React.useRef(new Animated.Value(0.8)).current
//   const floatingAnim = React.useRef(new Animated.Value(0)).current

//   React.useEffect(() => {
//     Animated.parallel([
//       Animated.timing(fadeAnim,    { toValue: 1, duration: 800, useNativeDriver: true, easing: Easing.out(Easing.cubic) }),
//       Animated.timing(slideAnim,   { toValue: 0, duration: 800, useNativeDriver: true, easing: Easing.out(Easing.back(1.2)) }),
//       Animated.timing(titleSlide,  { toValue: 0, duration: 600, delay: 200, useNativeDriver: true, easing: Easing.out(Easing.cubic) }),
//       Animated.timing(inputFade,   { toValue: 1, duration: 800, delay: 400, useNativeDriver: true }),
//       Animated.spring(buttonScale, { toValue: 1, delay: 500, friction: 4, tension: 40, useNativeDriver: true }),
//     ]).start()

//     Animated.loop(
//       Animated.sequence([
//         Animated.timing(floatingAnim, { toValue: 1, duration: 2000, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
//         Animated.timing(floatingAnim, { toValue: 0, duration: 2000, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
//       ])
//     ).start()
//   }, [])

//   const floatingTranslate = floatingAnim.interpolate({
//     inputRange: [0, 1],
//     outputRange: [0, -10],
//   })

//   return { fadeAnim, slideAnim, titleSlide, inputFade, buttonScale, floatingTranslate }
// }

// const INITIAL_FORM = { name: '', email: '', password: '', mobile: '' }

// const Signup = ({ navigation }) => {
//   const { isDarkMode } = useSelector(state => state.theme)
//   const dispatch = useDispatch()

//   const [form, setForm]       = useState(INITIAL_FORM)
//   const [loading, setLoading] = useState(false)

//   const updateField = useCallback((field) => (value) => {
//     setForm(prev => ({ ...prev, [field]: value }))
//   }, [])

//   const { fadeAnim, slideAnim, titleSlide, inputFade, buttonScale, floatingTranslate } = useSignupAnimations()

//   // ── Validation ──────────────────────────────────────────────────────────────
//   const validate = () => {
//     if (!form.name.trim())     { ToastMsg('Please enter your full name');  return false }
//     if (!form.email.trim())    { ToastMsg('Please enter your email');       return false }
//     if (!form.mobile.trim())   { ToastMsg('Please enter mobile number');    return false }
//     if (form.mobile.length < 10) { ToastMsg('Enter valid 10-digit mobile'); return false }
//     if (!form.password.trim()) { ToastMsg('Please enter password');         return false }
//     return true
//   }

//   // ── Submit ──────────────────────────────────────────────────────────────────
//   const handleSubmit = useCallback(async () => {
//     if (!validate()) return

//     try {
//       setLoading(true)

//       const payload = {
//         Name:     form.name,
//         Email:    form.email,
//         Number:   form.mobile,
//         Password: form.password,
//       }

//       const response = await apiPost('/api/user/UserRegister', payload)
//       setLoading(false)

//       if (response?.statusCode === 200 || response?.success) {
//        navigation.goBack()
     
//       } 
//       else {
//         ToastMsg(response?.message || 'Registration failed. Please try again.')
//       }
//     } catch (error) {
//       setLoading(false)
//       console.log('Signup error:', error)
//       ToastMsg('Something went wrong. Please try again.')
//     }
//   }, [form, navigation])

//   const themed = themedStyles(isDarkMode)

//   return (
//     <KeyboardAvoidingView
//       style={themed.container}
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//     >
//       <StatusBar
//         barStyle={isDarkMode ? 'light-content' : 'dark-content'}
//         backgroundColor={isDarkMode ? darkMode25 : '#ffffff'}
//       />

//       <ScrollView
//         contentContainerStyle={staticStyles.scrollViewContainer}
//         showsVerticalScrollIndicator={false}
//         keyboardShouldPersistTaps="handled"
//       >
//         <Animated.View
//           style={[
//             staticStyles.content,
//             { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
//           ]}
//         >
//           {/* Title block */}
//           <Animated.View style={{ transform: [{ translateY: titleSlide }] }}>
//             <Text style={themed.title}>Create Account</Text>
//             <Text style={themed.subtitle}>Fill in your details to create a new account</Text>
//           </Animated.View>

//           {/* Input fields */}
//           <Animated.View style={[staticStyles.inputContainer, { opacity: inputFade }]}>
//             <CustomInputField
//               label="Full Name"
//               placeholder="Enter your full name"
//               onChangeText={updateField('name')}
//               value={form.name}
//             />
//             <CustomInputField
//               label="Email"
//               placeholder="Enter your email"
//               onChangeText={updateField('email')}
//               value={form.email}
//               keyboardType="email-address"
//             />
//             <CustomInputField
//               label="Password"
//               placeholder="Enter password"
//               icon={<AntDesign name="eye" color={isDarkMode ? white : 'black'} size={20} />}
//               onChangeText={updateField('password')}
//               value={form.password}
//               secureTextEntry
//               isPassword
//             />
//             <CustomInputField
//               label="Mobile Number"
//               placeholder="Enter mobile number"
//               onChangeText={updateField('mobile')}
//               value={form.mobile}
//               keyboardType="phone-pad"
//               maxLength={10}
//             />
//           </Animated.View>
//         </Animated.View>

//         <View style={staticStyles.scrollSpacer} />
//       </ScrollView>

//       {/* Fixed bottom button */}
//       <Animated.View
//         style={[
//           themed.buttonContainer,
//           { transform: [{ scale: buttonScale }, { translateY: floatingTranslate }] },
//         ]}
//       >
//         <TouchableOpacity onPress={handleSubmit} activeOpacity={0.8} disabled={loading}>
//           <LinearGradient
//             colors={[Ctaone, ctatwo, ctathree]}
//             start={{ x: 0, y: 0 }}
//             end={{ x: 1, y: 1 }}
//             style={[staticStyles.signupButton, loading && { opacity: 0.7 }]}
//           >
//             <Text style={staticStyles.signupButtonText}>
//               {loading ? 'Creating Account...' : 'Create Account'}
//             </Text>
//           </LinearGradient>
//         </TouchableOpacity>

//         <Animated.View style={[staticStyles.loginRedirect, { opacity: fadeAnim }]}>
//           <Text style={themed.loginText}>Already have an account?</Text>
//           <TouchableOpacity onPress={() => navigation.navigate('Login')} activeOpacity={0.7}>
//             <Text style={staticStyles.loginLink}>Sign In</Text>
//           </TouchableOpacity>
//         </Animated.View>
//       </Animated.View>
//     </KeyboardAvoidingView>
//   )
// }

// const staticStyles = StyleSheet.create({
//   scrollViewContainer: { flexGrow: 1 },
//   scrollSpacer: { height: 100 },
//   content: {
//     flex: 1,
//     paddingHorizontal: 20,
//     paddingTop: 20,
//     marginTop: 100,
//     paddingBottom: 100,
//   },
//   inputContainer: { gap: 10 },
//   signupButton: {
//     borderRadius: 5,
//     height: 40,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   signupButtonText: {
//     color: white,
//     fontSize: 14,
//     fontWeight: '600',
//     fontFamily: FONTS_FAMILY.Poppins_SemiBold,
//   },
//   loginRedirect: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   loginLink: {
//     fontSize: 14,
//     fontFamily: FONTS_FAMILY.Poppins_SemiBold,
//     color: App_Primary_color,
//     marginLeft: 4,
//   },
// })

// const themedStyles = (isDarkMode) => StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: isDarkMode ? darkMode25 : '#ffffff',
//   },
//   title: {
//     fontSize: 20,
//     fontFamily: FONTS_FAMILY.Poppins_Bold,
//     color: isDarkMode ? white : '#000',
//     marginBottom: 8,
//   },
//   subtitle: {
//     fontSize: 13,
//     fontFamily: FONTS_FAMILY.Poppins_Regular,
//     color: isDarkMode ? white : '#666',
//     lineHeight: 24,
//     marginBottom: 40,
//   },
//   buttonContainer: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     backgroundColor: isDarkMode ? darkMode25 : '#ffffff',
//     paddingHorizontal: 20,
//     paddingVertical: 20,
//     paddingBottom: 40,
//   },
//   loginText: {
//     fontSize: 14,
//     fontFamily: FONTS_FAMILY.Poppins_Regular,
//     color: isDarkMode ? white : '#666',
//   },
// })

// export default Signup



import React, { useState, useCallback } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Animated,
  Easing,
  Switch,
} from 'react-native'
import { useSelector } from 'react-redux'
import AntDesign from 'react-native-vector-icons/AntDesign'

import { FONTS_FAMILY } from '../../assets/Fonts'
import { App_Primary_color, Ctaone, ctathree, ctatwo, darkMode25, white } from '../../common/Colors/colors'
import CustomInputField from '../../components/wrapper/CustomInput'
import LinearGradient from 'react-native-linear-gradient'
import { apiPost, setItem } from '../../utils/Apis'
import { ToastMsg } from '../../utils/helperFunctions'
import { useDispatch } from 'react-redux'
import { setUser } from '../../redux/reducer/user'
import { useIsFocused } from '@react-navigation/native'

const useSignupAnimations = () => {
  const fadeAnim    = React.useRef(new Animated.Value(0)).current
  const slideAnim   = React.useRef(new Animated.Value(50)).current
  const titleSlide  = React.useRef(new Animated.Value(-30)).current
  const inputFade   = React.useRef(new Animated.Value(0)).current
  const buttonScale = React.useRef(new Animated.Value(0.8)).current
  const floatingAnim = React.useRef(new Animated.Value(0)).current

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim,    { toValue: 1, duration: 800, useNativeDriver: true, easing: Easing.out(Easing.cubic) }),
      Animated.timing(slideAnim,   { toValue: 0, duration: 800, useNativeDriver: true, easing: Easing.out(Easing.back(1.2)) }),
      Animated.timing(titleSlide,  { toValue: 0, duration: 600, delay: 200, useNativeDriver: true, easing: Easing.out(Easing.cubic) }),
      Animated.timing(inputFade,   { toValue: 1, duration: 800, delay: 400, useNativeDriver: true }),
      Animated.spring(buttonScale, { toValue: 1, delay: 500, friction: 4, tension: 40, useNativeDriver: true }),
    ]).start()

    Animated.loop(
      Animated.sequence([
        Animated.timing(floatingAnim, { toValue: 1, duration: 2000, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(floatingAnim, { toValue: 0, duration: 2000, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ])
    ).start()
  }, [])

  const floatingTranslate = floatingAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -10],
  })

  return { fadeAnim, slideAnim, titleSlide, inputFade, buttonScale, floatingTranslate }
}

const INITIAL_FORM = { name: '', email: '', password: '', mobile: '' }

const Signup = ({ navigation }) => {
  const { isDarkMode } = useSelector(state => state.theme)
  const dispatch = useDispatch()
  const isFocused = useIsFocused()

  const [form, setForm]             = useState(INITIAL_FORM)
  const [loading, setLoading]       = useState(false)
  const [isCorporate, setIsCorporate] = useState(false)

  const updateField = useCallback((field) => (value) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }, [])

  const { fadeAnim, slideAnim, titleSlide, inputFade, buttonScale, floatingTranslate } = useSignupAnimations()

  // ── Validation ──────────────────────────────────────────────────────────────
  const validate = () => {
    if (!form.name.trim())     { ToastMsg('Please enter your full name');  return false }
    if (!form.email.trim())    { ToastMsg('Please enter your email');       return false }
    if (!form.mobile.trim())   { ToastMsg('Please enter mobile number');    return false }
    if (form.mobile.length < 10) { ToastMsg('Enter valid 10-digit mobile'); return false }
    if (!form.password.trim()) { ToastMsg('Please enter password');         return false }
    return true
  }

  // ── Submit ──────────────────────────────────────────────────────────────────
  const handleSubmit = useCallback(async () => {
    if (!validate()) return

    try {
      setLoading(true)

      const payload = {
        Name:     form.name,
        Email:    form.email,
        Number:   form.mobile,
        Password: form.password,
      }

      const endpoint = isCorporate
        ? '/api/user/CorporateUserRegister'
        : '/api/user/UserRegister'

      const response = await apiPost(endpoint, payload)
      setLoading(false)

      if (response?.statusCode === 200 || response?.success) {
        isCorporate? navigation.navigate('AddCompanyDetails',{token:response?.data?.token}):
        navigation.goBack()
      } else {
        ToastMsg(response?.message || 'Registration failed. Please try again.')
      }
    } catch (error) {
      setLoading(false)
      console.log('Signup error:', error)
      ToastMsg('Something went wrong. Please try again.')
    }
  }, [form, isCorporate, navigation])

  const themed = themedStyles(isDarkMode)

  return (
    <KeyboardAvoidingView
      style={themed.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {isFocused && (
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={isDarkMode ? darkMode25 : '#ffffff'}
        />
      )}

      <ScrollView
        contentContainerStyle={staticStyles.scrollViewContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Animated.View
          style={[
            staticStyles.content,
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
          ]}
        >
          {/* Title block */}
          <Animated.View style={{ transform: [{ translateY: titleSlide }] }}>
            <Text style={themed.title}>Create Account</Text>
            <Text style={themed.subtitle}>Fill in your details to create a new account</Text>
          </Animated.View>

          {/* Input fields */}
          <Animated.View style={[staticStyles.inputContainer, { opacity: inputFade }]}>
            <CustomInputField
              label="Full Name"
              placeholder="Enter your full name"
              onChangeText={updateField('name')}
              value={form.name}
            />
            <CustomInputField
              label="Email"
              placeholder="Enter your email"
              onChangeText={updateField('email')}
              value={form.email}
              keyboardType="email-address"
            />
            <CustomInputField
              label="Password"
              placeholder="Enter password"
              icon={<AntDesign name="eye" color={isDarkMode ? white : 'black'} size={20} />}
              onChangeText={updateField('password')}
              value={form.password}
              secureTextEntry
              isPassword
            />
            <CustomInputField
              label="Mobile Number"
              placeholder="Enter mobile number"
              onChangeText={updateField('mobile')}
              value={form.mobile}
              keyboardType="phone-pad"
              maxLength={10}
            />

            {/* Corporate User Toggle */}
            <View style={themed.corporateRow}>
              <Text style={themed.corporateLabel}>Are you a Corporate User?</Text>
              <Switch
                value={isCorporate}
                onValueChange={setIsCorporate}
                trackColor={{ false: isDarkMode ? '#444' : '#ddd', true: Ctaone }}
                thumbColor={isCorporate ? ctatwo : (isDarkMode ? '#aaa' : '#f4f3f4')}
              />
            </View>
          </Animated.View>
        </Animated.View>

        <View style={staticStyles.scrollSpacer} />
      </ScrollView>

      {/* Fixed bottom button */}
      <Animated.View
        style={[
          themed.buttonContainer,
          { transform: [{ scale: buttonScale }, { translateY: floatingTranslate }] },
        ]}
      >
        <TouchableOpacity onPress={handleSubmit} activeOpacity={0.8} disabled={loading}>
          <LinearGradient
            colors={[Ctaone, ctatwo, ctathree]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[staticStyles.signupButton, loading && { opacity: 0.7 }]}
          >
            <Text style={staticStyles.signupButtonText}>
              {loading ? 'Creating Account...' : 'Create Account'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        <Animated.View style={[staticStyles.loginRedirect, { opacity: fadeAnim }]}>
          <Text style={themed.loginText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')} activeOpacity={0.7}>
            <Text style={staticStyles.loginLink}>Sign In</Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    </KeyboardAvoidingView>
  )
}

const staticStyles = StyleSheet.create({
  scrollViewContainer: { flexGrow: 1 },
  scrollSpacer: { height: 100 },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    marginTop: 100,
    paddingBottom: 100,
  },
  inputContainer: { gap: 10 },
  signupButton: {
    borderRadius: 5,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  signupButtonText: {
    color: white,
    fontSize: 14,
    fontWeight: '600',
    fontFamily: FONTS_FAMILY.Poppins_SemiBold,
  },
  loginRedirect: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginLink: {
    fontSize: 14,
    fontFamily: FONTS_FAMILY.Poppins_SemiBold,
    color: App_Primary_color,
    marginLeft: 4,
  },
})

const themedStyles = (isDarkMode) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: isDarkMode ? darkMode25 : '#ffffff',
  },
  title: {
    fontSize: 20,
    fontFamily: FONTS_FAMILY.Poppins_Bold,
    color: isDarkMode ? white : '#000',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 13,
    fontFamily: FONTS_FAMILY.Poppins_Regular,
    color: isDarkMode ? white : '#666',
    lineHeight: 24,
    marginBottom: 40,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: isDarkMode ? darkMode25 : '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingBottom: 40,
  },
  loginText: {
    fontSize: 14,
    fontFamily: FONTS_FAMILY.Poppins_Regular,
    color: isDarkMode ? white : '#666',
  },
  corporateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 6,
    paddingHorizontal: 2,
  },
  corporateLabel: {
    fontSize: 14,
    fontFamily: FONTS_FAMILY.Poppins_Regular,
    color: isDarkMode ? white : '#333',
  },
})

export default Signup