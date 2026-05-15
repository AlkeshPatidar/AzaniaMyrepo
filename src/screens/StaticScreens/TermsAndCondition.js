import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native'
import { App_Primary_color, darkMode25 } from '../../common/Colors/colors'
import { FONTS_FAMILY } from '../../assets/Fonts'
import { useSelector } from 'react-redux'
import { BackWhite } from '../../assets/SVGs'
import useLoader from '../../utils/LoaderHook'
import { apiGet } from '../../utils/Apis'

const TermsAndConditionsScreen = ({ navigation }) => {
  const { isDarkMode } = useSelector(state => state.theme)

  const { showLoader, hideLoader } = useLoader()
  const [termsContent, setTermsContent] = useState(null);

  useEffect(() => {
    getTermsAndConditions()
  }, [])

  const getTermsAndConditions = async () => {
    try {
      showLoader()
      const res = await apiGet(`/api/settings`)
      setTermsContent(res?.data?.termsConditions)
      console.log('Terms and Conditions Content:', res?.data?.termsConditions);
      hideLoader()
    } catch (error) {
      console.error('Error fetching terms and conditions:', error);
      hideLoader()
    }
  };

  // Function to render HTML text by removing tags and formatting
  const renderFormattedText = (htmlText) => {
    if (!htmlText) return null;
    
    // Remove HTML tags and clean up the text
    let cleanText = htmlText
      .replace(/<[^>]*>/g, '') // Remove all HTML tags
      .replace(/&nbsp;/g, ' ') // Replace &nbsp; with space
      .replace(/&amp;/g, '&') // Replace &amp; with &
      .replace(/&lt;/g, '<') // Replace &lt; with <
      .replace(/&gt;/g, '>') // Replace &gt; with >
      .replace(/&quot;/g, '"') // Replace &quot; with "
      .replace(/&#39;/g, "'") // Replace &#39; with '
      .trim();
    
    // Split by multiple line breaks or paragraph breaks to create sections
    const paragraphs = cleanText
      .split(/\n\s*\n|\r\n\s*\r\n/) // Split by double line breaks
      .filter(paragraph => paragraph.trim().length > 0); // Remove empty paragraphs
    
    return paragraphs.map((paragraph, index) => (
      <Text key={index} style={styles.sectionContent}>
        {paragraph.trim()}
      </Text>
    ));
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? darkMode25 : '#F8F9FA',
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
      borderBottomColor: isDarkMode ? '#444' : '#E5E5E5',
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: 'white',
      fontFamily: FONTS_FAMILY.Poppins_Medium,
    },
    placeholder: {
      width: 50,
    },
    content: {
      padding: 20,
      paddingBottom: 40,
    },
    lastUpdatedContainer: {
      backgroundColor: isDarkMode ? '#333' : '#E8F4F8',
      padding: 15,
      borderRadius: 10,
      marginBottom: 20,
      borderLeftWidth: 4,
      borderLeftColor: App_Primary_color,
    },
    lastUpdatedText: {
      fontSize: 14,
      color: isDarkMode ? '#ccc' : '#666',
      fontFamily: FONTS_FAMILY.Poppins_Medium,
      fontStyle: 'italic',
    },
    section: {
      marginBottom: 25,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '700',
      color: isDarkMode ? 'white' : '#333',
      marginBottom: 12,
      fontFamily: FONTS_FAMILY.Poppins_SemiBold,
    },
    sectionContent: {
      fontSize: 15,
      lineHeight: 24,
      color: isDarkMode ? '#ccc' : '#555',
      marginBottom: 15,
      fontFamily: FONTS_FAMILY.Poppins_Regular,
      textAlign: 'justify',
    },
    loadingText: {
      fontSize: 16,
      color: isDarkMode ? '#ccc' : '#666',
      textAlign: 'center',
      marginTop: 50,
      fontFamily: FONTS_FAMILY.Poppins_Medium,
    },
    errorText: {
      fontSize: 16,
      color: '#FF6B6B',
      textAlign: 'center',
      marginTop: 50,
      fontFamily: FONTS_FAMILY.Poppins_Medium,
    },
    bulletPoint: {
      fontSize: 16,
      lineHeight: 22,
      color: isDarkMode ? '#ccc' : '#555',
      marginBottom: 6,
      marginLeft: 10,
      fontFamily: FONTS_FAMILY.Poppins_Medium,
    },
    contactInfo: {
      fontSize: 16,
      lineHeight: 22,
      color: App_Primary_color,
      marginBottom: 4,
      fontWeight: '500',
      fontFamily: FONTS_FAMILY.Poppins_Medium,
    },
    footer: {
      backgroundColor: isDarkMode ? '#2A2A2A' : '#F0F0F0',
      padding: 20,
      borderRadius: 10,
      marginTop: 20,
      borderWidth: 1,
      borderColor: isDarkMode ? '#444' : '#E0E0E0',
    },
    footerText: {
      fontSize: 14,
      textAlign: 'center',
      color: isDarkMode ? '#ccc' : '#666',
      fontStyle: 'italic',
      lineHeight: 20,
      fontFamily: FONTS_FAMILY.Poppins_Regular,
    },
  })

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackWhite />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Terms of Service</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Dynamic Terms and Conditions Content */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Terms and Conditions</Text>
          
          {/* Show loading state */}
          {termsContent === null && (
            <Text style={styles.loadingText}>Loading terms and conditions...</Text>
          )}
          
          {/* Show error state if no content */}
          {termsContent === '' && (
            <Text style={styles.errorText}>
              Terms and conditions content not available at the moment.
            </Text>
          )}
          
          {/* Render dynamic content */}
          {termsContent && termsContent !== '' && (
            <>
              {renderFormattedText(termsContent)}
            </>
          )}
        </View>

        {/* Footer */}
        {termsContent && termsContent !== '' && (
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              These terms and conditions are effective and were last updated recently. 
              Please review them periodically for any changes.
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  )
}

export default TermsAndConditionsScreen