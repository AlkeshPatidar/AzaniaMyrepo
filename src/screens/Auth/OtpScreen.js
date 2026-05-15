import React, {useEffect, useState} from 'react'
import {ScrollView, StatusBar, TouchableOpacity, View} from 'react-native'
import CustomText from '../../components/TextComponent'
import color, {App_Primary_color, dark33, darkMode25} from '../../common/Colors/colors'
import Row from '../../components/wrapper/row'
import {
  BackArrow,
  BackIcon,
  BackMsg,
  BackWhite,
  Divider,
  EyeIcon,
  LoginLogo,
  Socials,
} from '../../assets/SVGs'
import {FONTS_FAMILY} from '../../assets/Fonts'
import CustomInputField from '../../components/wrapper/CustomInput'
import CustomButton from '../../components/Button'
import {inValidNum} from '../../utils/CheckValidation'
import {ToastMsg} from '../../utils/helperFunctions'
import useLoader from '../../utils/LoaderHook'
import urls from '../../config/urls'
import {apiPost, getItem, setItem} from '../../utils/Apis'
import {useDispatch, useSelector} from 'react-redux'
import {setUser} from '../../redux/reducer/user'
import OTPInput from '../../components/OtpInput'
import { useIsFocused } from '@react-navigation/native'

const OtpScreen = ({navigation}) => {
  const isFocused = useIsFocused()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [activeTab, setActiveTab] = useState('Influencers')
  const [otpValue, setOtpValue] = useState('')
  const {showLoader, hideLoader} = useLoader()
  const [role, setRole] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    const getRole = async () => {
      const role = await getItem('UserType')
      setRole(role)
    }
    getRole()
  }, [])

  console.log("role", role);
  

  const onSubmit = async () => {
    try {
      showLoader()
      const data = {Email: email, Password: password}
      const response = await apiPost(urls.login, data)
      console.log('response', response)

      if (response?.statusCode === 200) {
        dispatch(setUser(JSON.stringify(response?.data?.User)))
        if (response?.data?.token) {
          await setItem('token', response?.data?.token)
          const token = await getItem('token')
          if (token) {
            navigation.replace('Tab')
          }
        }
        ToastMsg(response?.message)
        hideLoader()
      }
    } catch (error) {
      hideLoader()
      if (error?.message) {
        ToastMsg(error?.message)
        // response?.message
      } else {
        ToastMsg('Network Error')
      }
    }
  }

  const renderHeader = () => {
    return (
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 50,
        paddingBottom: 20,
      }}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={{padding: 5}}>
           {isDarkMode? <BackWhite/>: <BackIcon/>}
        </TouchableOpacity>
      </View>
    )
  }

     const { isDarkMode } = useSelector(state => state.theme)

  const renderContent = () => {
    return (
      <View style={{
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,

      }}>
        <CustomText
          style={{
            fontSize: 28,
            fontWeight: '600',
            // color: '#000',
            marginBottom: 8,
            fontFamily: FONTS_FAMILY.Poppins_SemiBold,
          }}>
          Enter your OTP number
        </CustomText>
        
        <CustomText
          style={{
            fontSize: 16,
            // color: '#666',
            lineHeight: 24,
            marginBottom: 40,
            fontFamily: FONTS_FAMILY.Poppins_Regular,
          }}>
          We've sent the OTP number via sms to{'\n'}+92 888 1234 5678
        </CustomText>

        {/* OTP Input */}
        <View style={{marginBottom: 40}}>
          <OTPInput 
            numInputs={6} 
            onChangeText={text => {
              console.log(text)
              setOtpValue(text)
            }}
            containerStyle={{
              justifyContent: 'space-between',
              paddingHorizontal: 10,
            }}
            inputStyle={{
              width: 60,
              height: 60,
              borderRadius: 8,
              textAlign: 'center',
              fontSize: 20,
              // color:'white',
              fontFamily: FONTS_FAMILY.Poppins_Medium,
              backgroundColor:isDarkMode? dark33: '#F2F2F3',
              
            }}
            focusedStyle={{
              borderColor: '#4A90E2',
              borderWidth: 2,
            }}
            
          />
        </View>

        {/* Continue Button */}
        <CustomButton
          style={{
            borderRadius: 25,
            height: 50,
            marginTop: 20,
          }}
          title={'Continue'}
          titleStyle={{
            color: '#ffffff',
            fontSize: 16,
            fontWeight: '600',
            fontFamily: FONTS_FAMILY.Poppins_SemiBold,
          }}
          onPress={() => {
              navigation.navigate('LocationPermissionScreen')
          }}
        />

        {/* Terms and Privacy Policy */}
        <View style={{
          alignItems: 'center',
          marginTop: 20,
          // paddingHorizontal: 20,
        }}>
          <CustomText
            style={{
              fontSize: 12,
              color:isDarkMode?'white': '#666',
              textAlign: 'center',
              lineHeight: 18,
              fontFamily: FONTS_FAMILY.Poppins_Regular,
            }}>
            By clicking, I accept the{' '}
            <CustomText style={{color:isDarkMode? 'white': 'black', fontSize:12, fontFamily:FONTS_FAMILY.Poppins_Medium}}>Terms and Conditions</CustomText>
            {' '}&{' '}
            <CustomText style={{color:isDarkMode?'white': 'black', fontSize:12, fontFamily:FONTS_FAMILY.Poppins_Medium}}>Privacy Policy</CustomText>
          </CustomText>
        </View>

       
      </View>
    )
  }

  return (
    <View
      style={{
        backgroundColor: isDarkMode? darkMode25: '#ffffff',
        flex: 1,
      }}>
      {isFocused && (
        <StatusBar
          barStyle={isDarkMode?'light-content': 'dark-content'}
          backgroundColor={isDarkMode? darkMode25: "#ffffff"}
        />
      )}
      {renderHeader()}
      {renderContent()}
      
   
    </View>
  )
}

export default OtpScreen