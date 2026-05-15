

import React, { useState, useEffect, useRef } from 'react';
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
} from 'react-native';
import { FONTS_FAMILY } from '../../assets/Fonts';
import { App_Primary_color, dark33, dark55, darkMode25, white } from '../../common/Colors/colors';
import { useSelector } from 'react-redux';
import CustomInputField from '../../components/wrapper/CustomInput';
import useLoader from '../../utils/LoaderHook';
import { inValidEmail, inValidPassword } from '../../utils/CheckValidation';
import { ToastMsg } from '../../utils/helperFunctions';
import urls from '../../config/urls';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { apiPost } from '../../utils/Apis';
import { OtpInput } from 'react-native-otp-entry';
import CustomText from '../../components/TextComponent';
import { useIsFocused } from '@react-navigation/native';

const ForgotPassword = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [step, setStep] = useState(1); // 1: Email, 2: OTP + Password
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const { showLoader, hideLoader } = useLoader();
  const { isDarkMode } = useSelector(state => state.theme);

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const titleBounceAnim = useRef(new Animated.Value(0)).current;
  const inputFadeAnim = useRef(new Animated.Value(0)).current;
  const buttonScaleAnim = useRef(new Animated.Value(0)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;

  // Timer for resend OTP
  useEffect(() => {
    let interval = null;
    if (step === 2 && timer > 0 && !canResend) {
      interval = setInterval(() => {
        setTimer(timer => timer - 1);
      }, 1000);
    } else if (timer === 0) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer, canResend, step]);

  // Initial animations on mount
  useEffect(() => {
    // 1. Entrance Fade + Slide
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    // 2. Title Bounce Animation (delayed)
    Animated.sequence([
      Animated.delay(200),
      Animated.spring(titleBounceAnim, {
        toValue: 1,
        friction: 4,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();

    // 3. Input Fields Fade (delayed)
    Animated.sequence([
      Animated.delay(400),
      Animated.timing(inputFadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();

    // 4. Button Spring Effect (delayed)
    Animated.sequence([
      Animated.delay(600),
      Animated.spring(buttonScaleAnim, {
        toValue: 1,
        friction: 5,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();

    // 5. Continuous Floating Animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -8,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  // Reset animations when step changes
  useEffect(() => {
    if (step === 2) {
      // Reset and replay animations for step 2
      fadeAnim.setValue(0);
      slideAnim.setValue(50);
      titleBounceAnim.setValue(0);
      inputFadeAnim.setValue(0);
      buttonScaleAnim.setValue(0);

      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ]).start();

      Animated.sequence([
        Animated.delay(200),
        Animated.spring(titleBounceAnim, {
          toValue: 1,
          friction: 4,
          tension: 40,
          useNativeDriver: true,
        }),
      ]).start();

      Animated.sequence([
        Animated.delay(400),
        Animated.timing(inputFadeAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]).start();

      Animated.sequence([
        Animated.delay(600),
        Animated.spring(buttonScaleAnim, {
          toValue: 1,
          friction: 5,
          tension: 40,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [step]);

  const onSendOTP = async () => {
    return
    const emailError = inValidEmail(email);
    if (emailError) {
      ToastMsg(emailError);
      return;
    }

    try {
      showLoader();
      const data = { email: email };
      const response = await apiPost('/api/user/forgot/otpsend', data);
      
      if (response?.statusCode === 200) {
        ToastMsg('OTP sent successfully');
        setStep(2);
        setTimer(60);
        setCanResend(false);
      } else {
        ToastMsg(response?.message || 'Failed to send OTP');
      }
      hideLoader();
    } catch (error) {
      hideLoader();
      ToastMsg(error?.message || 'Network Error');
    }
  };

  const onResendOTP = async () => {
    try {
      showLoader();
      const data = { email: email };
      const response = await apiPost('/api/user/forgot/otpsend', data);
      
      if (response?.statusCode === 200) {
        ToastMsg('OTP resent successfully');
        setTimer(60);
        setCanResend(false);
        setOtp('');
      } else {
        ToastMsg(response?.message || 'Failed to resend OTP');
      }
      hideLoader();
    } catch (error) {
      hideLoader();
      ToastMsg(error?.message || 'Network Error');
    }
  };

  const onVerifyAndReset = async () => {
    if (!otp || otp.length !== 4) {
      ToastMsg('Please enter valid 4-digit OTP');
      return;
    }

    const passwordError = inValidPassword(newPassword);
    if (passwordError) {
      ToastMsg(passwordError);
      return;
    }

    if (newPassword !== confirmPassword) {
      ToastMsg('Passwords do not match');
      return;
    }

    try {
      showLoader();
      const data = { 
        email: email, 
        password: newPassword,
        otp: parseInt(otp)
      };
      const response = await apiPost('/api/user/forgot/otpverify', data);
      console.log('OTP Verify Response:', response);

      if (response?.statusCode === 200) {
        ToastMsg(response?.message || 'Password reset successfully');
        navigation.navigate('Login');
      } else {
        ToastMsg(response?.message || 'Failed to reset password');
      }
      hideLoader();
    } catch (error) {
      hideLoader();
      if (error?.message) {
        ToastMsg(error?.message);
        console.log('OTP Verify Error:', error);
      } else {
        ToastMsg('Network Error');
      }
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? darkMode25 : '#ffffff',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingTop: 50,
      paddingBottom: 20,
    },
    backButton: {
      padding: 5,
    },
    backArrow: {
      fontSize: 24,
      color: isDarkMode ? white : '#333',
    },
    scrollViewContainer: {
      flexGrow: 1,
    },
    content: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 20,
      marginTop: 100,
      paddingBottom: 100,
    },
    title: {
      fontSize: 24,
      fontFamily: FONTS_FAMILY.Poppins_Bold,
      color: isDarkMode ? white : '#000',
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 14,
      fontFamily: FONTS_FAMILY.Poppins_Regular,
      color: isDarkMode ? 'white' : '#666',
      lineHeight: 22,
      marginBottom: 40,
    },
    emailText: {
      fontSize: 14,
      fontFamily: FONTS_FAMILY.Poppins_SemiBold,
      color: App_Primary_color,
    },
    inputContainer: {
      gap: 15,
      marginBottom: 30,
    },
    otpContainer: {
      marginBottom: 20,
    },
    otpLabel: {
      fontSize: 16,
      color: isDarkMode ? 'white' : '#666',
      marginBottom: 15,
      fontFamily: FONTS_FAMILY.Poppins_Medium,
    },
    otpInput: {
      marginBottom: 20,
    },
    resendContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 30,
    },
    resendText: {
      fontSize: 14,
      fontFamily: FONTS_FAMILY.Poppins_Regular,
      color: isDarkMode ? 'white' : '#666',
    },
    resendButton: {
      marginLeft: 5,
    },
    resendButtonText: {
      fontSize: 14,
      fontFamily: FONTS_FAMILY.Poppins_SemiBold,
      color: canResend ? App_Primary_color : (isDarkMode ? '#666' : '#999'),
    },
    timerText: {
      fontSize: 14,
      fontFamily: FONTS_FAMILY.Poppins_Medium,
      color: App_Primary_color,
      marginLeft: 5,
    },
    buttonContainer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: isDarkMode ? darkMode25 : '#ffffff',
      paddingHorizontal: 20,
      paddingVertical: 20,
      paddingBottom: 70,
    },
    continueButton: {
      backgroundColor: App_Primary_color,
      borderRadius: 25,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
    },
    continueButtonText: {
      color: '#ffffff',
      fontSize: 16,
      fontFamily: FONTS_FAMILY.Poppins_SemiBold,
    },
    loginRedirect: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      bottom: 20
    },
    loginText: {
      fontSize: 14,
      fontFamily: FONTS_FAMILY.Poppins_Regular,
      color: isDarkMode ? 'white' : '#666',
    },
    loginLink: {
      fontSize: 14,
      fontFamily: FONTS_FAMILY.Poppins_SemiBold,
      color: App_Primary_color,
      marginLeft: 4,
    },
  });

  const renderStep1 = () => (
    <>
      <Animated.View
        style={{
          opacity: titleBounceAnim,
          transform: [
            {
              scale: titleBounceAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0.8, 1],
              }),
            },
          ],
        }}
      >
        <Text style={styles.title}>Forgot Password</Text>
        <Text style={styles.subtitle}>
          Enter your email address to receive a verification code
        </Text>
      </Animated.View>

      <Animated.View
        style={[
          styles.inputContainer,
          {
            opacity: inputFadeAnim,
          },
        ]}
      >
        <CustomInputField
          label={'Email'}
          placeholder={'Enter your email address'}
          onChangeText={setEmail}
          value={email}
        />
      </Animated.View>
    </>
  );

  const renderStep2 = () => (
    <>
      <Animated.View
        style={{
          opacity: titleBounceAnim,
          transform: [
            {
              scale: titleBounceAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0.8, 1],
              }),
            },
          ],
        }}
      >
        <Text style={styles.title}>Verify OTP</Text>
        <Text style={styles.subtitle}>
          We have sent a verification code to{'\n'}
          <Text style={styles.emailText}>{email}</Text>
        </Text>
      </Animated.View>

      <Animated.View
        style={{
          opacity: inputFadeAnim,
        }}
      >
        {/* OTP Input */}
        <View style={styles.otpContainer}>
          <Text style={styles.otpLabel}>Enter OTP</Text>
          <OtpInput
            numberOfDigits={4}
            focusColor={App_Primary_color}
            focusStickBlinkingDuration={500}
            onTextChange={(text) => setOtp(text)}
            onFilled={(text) => setOtp(text)}
            textInputProps={{
              accessibilityLabel: "One-Time Password",
            }}
            theme={{
              containerStyle: styles.otpInput,
              pinCodeContainerStyle: {
                width: 60,
                height: 60,
                borderRadius: 12,
                backgroundColor: isDarkMode ? dark55 : '#F2F2F3',
                borderColor: isDarkMode ? dark33 : '#ddd',
                borderWidth: 1,
              },
              pinCodeTextStyle: {
                fontSize: 18,
                fontFamily: FONTS_FAMILY.Poppins_SemiBold,
                color: isDarkMode ? white : '#333',
              },
              focusStickStyle: {
                backgroundColor: App_Primary_color,
              },
              focusedPinCodeContainerStyle: {
                borderColor: App_Primary_color,
                borderWidth: 2,
              },
            }}
          />
        </View>

        {/* Resend OTP */}
        <View style={styles.resendContainer}>
          <Text style={styles.resendText}>Didn't receive the code?</Text>
          <TouchableOpacity
            style={styles.resendButton}
            onPress={onResendOTP}
            disabled={!canResend}
            activeOpacity={0.7}
          >
            <Text style={styles.resendButtonText}>
              {canResend ? 'Resend' : 'Resend in'}
            </Text>
          </TouchableOpacity>
          {!canResend && (
            <Text style={styles.timerText}>{formatTime(timer)}</Text>
          )}
        </View>

        {/* Password Fields */}
        <View style={styles.inputContainer}>
          <CustomInputField
            label={'New Password'}
            placeholder={'Enter new password'}
            icon={<AntDesign name={'eye'} color={isDarkMode ? white : 'black'} size={20} />}
            onChangeText={setNewPassword}
            value={newPassword}
            secureTextEntry={true}
            isPassword
          />

          <CustomInputField
            label={'Confirm Password'}
            placeholder={'Confirm new password'}
            icon={<AntDesign name={'eye'} color={isDarkMode ? white : 'black'} size={20} />}
            onChangeText={setConfirmPassword}
            value={confirmPassword}
            secureTextEntry={true}
            isPassword
          />
        </View>
      </Animated.View>
    </>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {isFocused && (
        <StatusBar 
          barStyle={isDarkMode ? 'light-content' : "dark-content"} 
          backgroundColor={isDarkMode ? darkMode25 : "#ffffff"} 
        />
      )}

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            if (step === 2) {
              setStep(1);
              setOtp('');
              setNewPassword('');
              setConfirmPassword('');
              setTimer(60);
              setCanResend(false);
            } else {
              navigation.goBack();
            }
          }}
          activeOpacity={0.7}
        >
          <Ionicons 
            name="arrow-back" 
            style={styles.backArrow}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollViewContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Content with Fade + Slide Animation */}
        <Animated.View
          style={[
            styles.content,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          {step === 1 ? renderStep1() : renderStep2()}
        </Animated.View>
      </ScrollView>

      {/* Button - Fixed at bottom with Spring + Float Animation */}
      <Animated.View
        style={[
          styles.buttonContainer,
          {
            opacity: buttonScaleAnim,
            transform: [
              {
                scale: buttonScaleAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.8, 1],
                }),
              },
              { translateY: floatAnim },
            ],
          },
        ]}
      >
        <TouchableOpacity
          style={styles.continueButton}
          onPress={step === 1 ? onSendOTP : onVerifyAndReset}
          activeOpacity={0.8}
        >
          <Text style={styles.continueButtonText}>
            {step === 1 ? 'Send OTP' : 'Reset Password'}
          </Text>
        </TouchableOpacity>
      </Animated.View>

      <View style={styles.loginRedirect}>
        <Text style={styles.loginText}>Remember your password?</Text>
        <TouchableOpacity 
          onPress={() => navigation.navigate('Login')}
          activeOpacity={0.7}
        >
          <Text style={styles.loginLink}>Sign in</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ForgotPassword;