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
import {App_Primary_color, darkMode25} from '../../common/Colors/colors'
import {FONTS_FAMILY} from '../../assets/Fonts'
import { useSelector } from 'react-redux'

const Support = ({navigation}) => {
  const {isDarkMode} = useSelector(state => state.theme)

  const handleEmailPress = (email) => {
    Linking.openURL(`mailto:${email}`)
  }

  const handlePhonePress = (phone) => {
    Linking.openURL(`tel:${phone}`)
  }


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
  supportHoursContainer: {
    backgroundColor: isDarkMode ? '#333' : '#E8F4F8',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: App_Primary_color,
  },
  supportHoursTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: App_Primary_color,
    marginBottom: 8,
    fontFamily: FONTS_FAMILY.Poppins_Medium,
  },
  supportHoursText: {
    fontSize: 14,
    color: isDarkMode ? 'white' : '#666',
    fontFamily: FONTS_FAMILY.Poppins_Medium,
    marginBottom: 2,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: isDarkMode ? 'white' : '#333',
    marginBottom: 12,
    fontFamily: FONTS_FAMILY.Poppins_Medium,
  },
  sectionContent: {
    fontSize: 14,
    lineHeight: 22,
    color: isDarkMode ? 'white' : '#555',
    marginBottom: 15,
    fontFamily: FONTS_FAMILY.Poppins_Medium,
  },
  contactCard: {
    backgroundColor: isDarkMode ? '#333' : 'white',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: isDarkMode ? '#555' : '#E5E5E5',
    shadowColor: isDarkMode ? '#000' : '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: isDarkMode ? 0.3 : 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  contactMethod: {
    fontSize: 16,
    fontWeight: '600',
    color: isDarkMode ? 'white' : '#333',
    marginBottom: 4,
    fontFamily: FONTS_FAMILY.Poppins_Medium,
  },
  contactDetail: {
    fontSize: 15,
    fontWeight: '600',
    color: App_Primary_color,
    marginBottom: 6,
    fontFamily: FONTS_FAMILY.Poppins_Medium,
  },
  contactDescription: {
    fontSize: 13,
    color: isDarkMode ? '#ccc' : '#666',
    marginBottom: 4,
    fontFamily: FONTS_FAMILY.Poppins_Medium,
  },
  responseTime: {
    fontSize: 12,
    color: isDarkMode ? '#aaa' : '#999',
    fontStyle: 'italic',
    fontFamily: FONTS_FAMILY.Poppins_Medium,
  },
  faqItem: {
    marginBottom: 20,
    backgroundColor: isDarkMode ? '#333' : 'white',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: isDarkMode ? '#555' : '#F0F0F0',
  },
  faqQuestion: {
    fontSize: 15,
    fontWeight: '600',
    color: isDarkMode ? 'white' : '#333',
    marginBottom: 6,
    fontFamily: FONTS_FAMILY.Poppins_Medium,
  },
  faqAnswer: {
    fontSize: 13,
    color: isDarkMode ? '#ccc' : '#555',
    marginBottom: 8,
    fontFamily: FONTS_FAMILY.Poppins_Medium,
  },
  bulletPoint: {
    fontSize: 13,
    lineHeight: 20,
    color: isDarkMode ? '#ccc' : '#555',
    marginBottom: 4,
    marginLeft: 10,
    fontFamily: FONTS_FAMILY.Poppins_Medium,
  },
  emergencyCard: {
    backgroundColor: isDarkMode ? '#4D3319' : '#FFF3E6',
    padding: 16,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#FF9500',
  },
  emergencyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: isDarkMode ? '#FFB366' : '#FF6B00',
    marginBottom: 4,
    fontFamily: FONTS_FAMILY.Poppins_Medium,
  },
  emergencyDetail: {
    fontSize: 15,
    fontWeight: '600',
    color: isDarkMode ? '#FFB366' : '#FF6B00',
    marginBottom: 6,
    fontFamily: FONTS_FAMILY.Poppins_Medium,
  },
  emergencyNote: {
    fontSize: 12,
    color: isDarkMode ? '#E6994D' : '#CC5500',
    fontFamily: FONTS_FAMILY.Poppins_Medium,
  },
  feedbackCard: {
    backgroundColor: isDarkMode ? '#1A2B3D' : '#F0F8FF',
    padding: 16,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#4A90E2',
  },
  feedbackTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: isDarkMode ? '#6BB6FF' : '#4A90E2',
    marginBottom: 4,
    fontFamily: FONTS_FAMILY.Poppins_Medium,
  },
  feedbackDetail: {
    fontSize: 15,
    fontWeight: '600',
    color: isDarkMode ? '#6BB6FF' : '#4A90E2',
    marginBottom: 6,
    fontFamily: FONTS_FAMILY.Poppins_Medium,
  },
  feedbackNote: {
    fontSize: 12,
    color: isDarkMode ? '#5BA3E6' : '#357ABD',
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
        <Text style={styles.headerTitle}>Support</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Support Hours */}
        <View style={styles.supportHoursContainer}>
          <Text style={styles.supportHoursTitle}>Support Hours</Text>
          <Text style={styles.supportHoursText}>Monday - Friday: 9:00 AM - 6:00 PM (EST)</Text>
          <Text style={styles.supportHoursText}>Saturday: 10:00 AM - 4:00 PM (EST)</Text>
          <Text style={styles.supportHoursText}>Sunday: Closed</Text>
        </View>

        {/* Contact Methods */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Us</Text>
          <Text style={styles.sectionContent}>
            Need help? We're here to assist you. Choose the best way to reach us:
          </Text>

          {/* Email Support */}
          <TouchableOpacity 
            style={styles.contactCard}
            onPress={() => handleEmailPress('support@influencerplatform.com')}
          >
            <Text style={styles.contactMethod}>📧 Email Support</Text>
            <Text style={styles.contactDetail}>support@influencerplatform.com</Text>
            <Text style={styles.contactDescription}>Best for detailed questions and account issues</Text>
            <Text style={styles.responseTime}>Response time: Within 24 hours</Text>
          </TouchableOpacity>

          {/* Phone Support */}
          <TouchableOpacity 
            style={styles.contactCard}
            onPress={() => handlePhonePress('+1-800-555-0123')}
          >
            <Text style={styles.contactMethod}>📞 Phone Support</Text>
            <Text style={styles.contactDetail}>+1 (800) 555-0123</Text>
            <Text style={styles.contactDescription}>For urgent matters and immediate assistance</Text>
            <Text style={styles.responseTime}>Available during support hours</Text>
          </TouchableOpacity>

          {/* Live Chat */}
          <View style={styles.contactCard}>
            <Text style={styles.contactMethod}>💬 Live Chat</Text>
            <Text style={styles.contactDetail}>Available in-app</Text>
            <Text style={styles.contactDescription}>Quick answers to common questions</Text>
            <Text style={styles.responseTime}>Available during support hours</Text>
          </View>
        </View>

        {/* Common Issues */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Common Issues & Solutions</Text>
          
          <View style={styles.faqItem}>
            <Text style={styles.faqQuestion}>Account & Login Issues</Text>
            <Text style={styles.faqAnswer}>Having trouble logging in or accessing your account?</Text>
            <Text style={styles.bulletPoint}>• Reset your password using the "Forgot Password" link</Text>
            <Text style={styles.bulletPoint}>• Check your email for verification messages</Text>
            <Text style={styles.bulletPoint}>• Ensure you're using the correct email address</Text>
          </View>

          <View style={styles.faqItem}>
            <Text style={styles.faqQuestion}>Payment & Billing</Text>
            <Text style={styles.faqAnswer}>Questions about payments, invoices, or billing?</Text>
            <Text style={styles.bulletPoint}>• Check your payment method is valid and up-to-date</Text>
            <Text style={styles.bulletPoint}>• Review your billing history in account settings</Text>
            <Text style={styles.bulletPoint}>• Contact us for payment disputes or refunds</Text>
          </View>

          <View style={styles.faqItem}>
            <Text style={styles.faqQuestion}>Profile & Campaign Issues</Text>
            <Text style={styles.faqAnswer}>Need help with your profile or campaigns?</Text>
            <Text style={styles.bulletPoint}>• Ensure all required fields are completed</Text>
            <Text style={styles.bulletPoint}>• Check campaign guidelines and requirements</Text>
            <Text style={styles.bulletPoint}>• Update your social media statistics regularly</Text>
          </View>

          <View style={styles.faqItem}>
            <Text style={styles.faqQuestion}>Technical Problems</Text>
            <Text style={styles.faqAnswer}>Experiencing app crashes or technical issues?</Text>
            <Text style={styles.bulletPoint}>• Update the app to the latest version</Text>
            <Text style={styles.bulletPoint}>• Restart your device and try again</Text>
            <Text style={styles.bulletPoint}>• Clear app cache and data if problems persist</Text>
          </View>
        </View>

        {/* Emergency Contact */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Emergency Contact</Text>
          <Text style={styles.sectionContent}>
            For urgent security issues or account compromises:
          </Text>
          <TouchableOpacity 
            style={styles.emergencyCard}
            onPress={() => handleEmailPress('emergency@influencerplatform.com')}
          >
            <Text style={styles.emergencyTitle}>🚨 Emergency Support</Text>
            <Text style={styles.emergencyDetail}>emergency@influencerplatform.com</Text>
            <Text style={styles.emergencyNote}>Available 24/7 for critical security issues</Text>
          </TouchableOpacity>
        </View>

        {/* Feedback */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Feedback & Suggestions</Text>
          <Text style={styles.sectionContent}>
            We value your feedback! Help us improve by sharing your thoughts:
          </Text>
          <TouchableOpacity 
            style={styles.feedbackCard}
            onPress={() => handleEmailPress('feedback@influencerplatform.com')}
          >
            <Text style={styles.feedbackTitle}>💡 Send Feedback</Text>
            <Text style={styles.feedbackDetail}>feedback@influencerplatform.com</Text>
            <Text style={styles.feedbackNote}>Share ideas, suggestions, or report bugs</Text>
          </TouchableOpacity>
        </View>

        {/* Additional Resources */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Additional Resources</Text>
          <Text style={styles.bulletPoint}>• Visit our Help Center for detailed guides</Text>
          <Text style={styles.bulletPoint}>• Check our Community Forum for user discussions</Text>
          <Text style={styles.bulletPoint}>• Follow our social media for updates and tips</Text>
          <Text style={styles.bulletPoint}>• Subscribe to our newsletter for platform updates</Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Our support team is committed to providing you with the best possible experience. Don't hesitate to reach out - we're here to help!
          </Text>
        </View>
      </View>
    </ScrollView>
  )
}

export default Support

