import React from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Linking,
} from 'react-native'
import {BackArrow} from '../../assets/SVGs'
import color, {App_Primary_color, darkMode25, white} from '../../common/Colors/colors'
import {FONTS_FAMILY} from '../../assets/Fonts'
import SpaceBetweenRow from '../../components/wrapper/spacebetween'
import CustomText from '../../components/TextComponent'
import ThemeToggle from '../../components/ThemeToggle'
import { useSelector } from 'react-redux'

const Settings = ({navigation}) => {
  const handleEmailPress = (email) => {
    Linking.openURL(`mailto:${email}`)
  }

  const handlePhonePress = (phone) => {
    Linking.openURL(`tel:${phone}`)
  }

  const {isDarkMode} = useSelector(state => state.theme)
console.log('+============Dark Mode====', isDarkMode);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:isDarkMode? darkMode25: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
    paddingBottom: 20,
    backgroundColor: App_Primary_color,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    fontFamily: FONTS_FAMILY.Poppins_Medium,
  },

 
 

})


  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackArrow />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Content */}
      <View style={{paddingHorizontal:20, marginTop:20}}>
    <SpaceBetweenRow>
        <CustomText style={{
            color:isDarkMode?white:'black',
            fontSize:16,
            fontFamily:FONTS_FAMILY.Poppins_Regular
        }}>Dark Mode</CustomText>
          <ThemeToggle />

    </SpaceBetweenRow>
      </View>
    </ScrollView>
  )
}

export default Settings

