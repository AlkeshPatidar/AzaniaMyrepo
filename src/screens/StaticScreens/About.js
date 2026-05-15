import React from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native'
import {BackArrow} from '../../assets/SVGs'
import {App_Primary_color, darkMode25} from '../../common/Colors/colors'
import {FONTS_FAMILY} from '../../assets/Fonts'
import { useSelector } from 'react-redux'

const About = ({navigation}) => {
  const {isDarkMode} = useSelector(state => state.theme)


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
    fontFamily: FONTS_FAMILY.Poppins_Medium,
  },
  subSectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: isDarkMode ? '#ddd' : '#444',
    marginTop: 12,
    marginBottom: 8,
    fontFamily: FONTS_FAMILY.Poppins_Medium,
  },
  sectionContent: {
    fontSize: 13,
    lineHeight: 24,
    color: isDarkMode ? '#ccc' : '#555',
    marginBottom: 8,
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
    fontSize: 13,
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
    fontSize: 13,
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
        <Text style={styles.headerTitle}>About</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Last Updated */}
        <View style={styles.lastUpdatedContainer}>
          <Text style={styles.lastUpdatedText}>Last updated: January 15, 2025</Text>
        </View>

        {/* Introduction */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Introduction</Text>
          <Text style={styles.sectionContent}>
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Influencer Marketing Platform. We are committed to protecting your privacy and ensuring the security of your personal information.
          </Text>
        </View>

        {/* Information We Collect */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Information We Collect</Text>
          
          <Text style={styles.subSectionTitle}>Personal Information</Text>
          <Text style={styles.sectionContent}>
            We may collect personal information that you provide directly to us, including:
          </Text>
          <Text style={styles.bulletPoint}>• Name, email address, and phone number</Text>
          <Text style={styles.bulletPoint}>• Profile information and bio</Text>
          <Text style={styles.bulletPoint}>• Social media handles and statistics</Text>
          <Text style={styles.bulletPoint}>• Payment and billing information</Text>
          <Text style={styles.bulletPoint}>• Communication preferences</Text>

          <Text style={styles.subSectionTitle}>Automatically Collected Information</Text>
          <Text style={styles.sectionContent}>
            When you use our platform, we automatically collect:
          </Text>
          <Text style={styles.bulletPoint}>• Device information (IP address, browser type, operating system)</Text>
          <Text style={styles.bulletPoint}>• Usage data (pages visited, time spent, features used)</Text>
          <Text style={styles.bulletPoint}>• Location information (with your consent)</Text>
          <Text style={styles.bulletPoint}>• Cookies and similar tracking technologies</Text>
        </View>

        {/* How We Use Your Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. How We Use Your Information</Text>
          <Text style={styles.sectionContent}>
            We use the collected information for various purposes:
          </Text>
          <Text style={styles.bulletPoint}>• Provide and maintain our services</Text>
          <Text style={styles.bulletPoint}>• Process transactions and payments</Text>
          <Text style={styles.bulletPoint}>• Communicate with you about our services</Text>
          <Text style={styles.bulletPoint}>• Personalize your experience</Text>
          <Text style={styles.bulletPoint}>• Improve our platform and develop new features</Text>
          <Text style={styles.bulletPoint}>• Prevent fraud and ensure security</Text>
          <Text style={styles.bulletPoint}>• Comply with legal obligations</Text>
          <Text style={styles.bulletPoint}>• Send marketing communications (with your consent)</Text>
        </View>

        {/* Information Sharing and Disclosure */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. Information Sharing and Disclosure</Text>
          <Text style={styles.sectionContent}>
            We may share your information in the following circumstances:
          </Text>
          
          <Text style={styles.subSectionTitle}>With Other Users</Text>
          <Text style={styles.sectionContent}>
            Profile information may be visible to other users to facilitate connections between influencers and brands.
          </Text>

          <Text style={styles.subSectionTitle}>Service Providers</Text>
          <Text style={styles.sectionContent}>
            We may share information with third-party service providers who assist us in:
          </Text>
          <Text style={styles.bulletPoint}>• Payment processing</Text>
          <Text style={styles.bulletPoint}>• Data analytics</Text>
          <Text style={styles.bulletPoint}>• Customer support</Text>
          <Text style={styles.bulletPoint}>• Marketing and advertising</Text>
          <Text style={styles.bulletPoint}>• Cloud storage and hosting</Text>

          <Text style={styles.subSectionTitle}>Legal Requirements</Text>
          <Text style={styles.sectionContent}>
            We may disclose your information if required by law or to protect our rights and safety.
          </Text>
        </View>

        {/* Data Security */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4. Data Security</Text>
          <Text style={styles.sectionContent}>
            We implement appropriate technical and organizational measures to protect your information:
          </Text>
          <Text style={styles.bulletPoint}>• Encryption of data in transit and at rest</Text>
          <Text style={styles.bulletPoint}>• Regular security assessments and audits</Text>
          <Text style={styles.bulletPoint}>• Access controls and authentication</Text>
          <Text style={styles.bulletPoint}>• Employee training on data protection</Text>
          <Text style={styles.bulletPoint}>• Incident response procedures</Text>
          <Text style={styles.sectionContent}>
            However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
          </Text>
        </View>

        {/* Data Retention */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>5. Data Retention</Text>
          <Text style={styles.sectionContent}>
            We retain your personal information for as long as necessary to:
          </Text>
          <Text style={styles.bulletPoint}>• Provide our services to you</Text>
          <Text style={styles.bulletPoint}>• Comply with legal obligations</Text>
          <Text style={styles.bulletPoint}>• Resolve disputes and enforce agreements</Text>
          <Text style={styles.bulletPoint}>• Improve our services and user experience</Text>
          <Text style={styles.sectionContent}>
            When we no longer need your information, we will securely delete or anonymize it.
          </Text>
        </View>

        {/* Your Privacy Rights */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>6. Your Privacy Rights</Text>
          <Text style={styles.sectionContent}>
            Depending on your location, you may have the following rights:
          </Text>
          <Text style={styles.bulletPoint}>• Access your personal information</Text>
          <Text style={styles.bulletPoint}>• Correct inaccurate information</Text>
          <Text style={styles.bulletPoint}>• Delete your personal information</Text>
          <Text style={styles.bulletPoint}>• Restrict processing of your information</Text>
          <Text style={styles.bulletPoint}>• Data portability</Text>
          <Text style={styles.bulletPoint}>• Object to processing</Text>
          <Text style={styles.bulletPoint}>• Withdraw consent</Text>
          <Text style={styles.sectionContent}>
            To exercise these rights, please contact us using the information provided below.
          </Text>
        </View>

        {/* Cookies and Tracking */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>7. Cookies and Tracking Technologies</Text>
          <Text style={styles.sectionContent}>
            We use cookies and similar technologies to:
          </Text>
          <Text style={styles.bulletPoint}>• Remember your preferences and settings</Text>
          <Text style={styles.bulletPoint}>• Analyze usage patterns and improve performance</Text>
          <Text style={styles.bulletPoint}>• Provide personalized content and advertisements</Text>
          <Text style={styles.bulletPoint}>• Ensure security and prevent fraud</Text>
          <Text style={styles.sectionContent}>
            You can control cookie settings through your browser preferences, but some features may not function properly if cookies are disabled.
          </Text>
        </View>

        {/* Third-Party Links */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>8. Third-Party Links and Services</Text>
          <Text style={styles.sectionContent}>
            Our platform may contain links to third-party websites and services. We are not responsible for the privacy practices of these third parties. We encourage you to review their privacy policies before providing any information.
          </Text>
        </View>

        {/* Children's Privacy */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>9. Children's Privacy</Text>
          <Text style={styles.sectionContent}>
            Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If we become aware that we have collected such information, we will take steps to delete it promptly.
          </Text>
        </View>

        {/* International Data Transfers */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>10. International Data Transfers</Text>
          <Text style={styles.sectionContent}>
            Your information may be transferred to and processed in countries other than your country of residence. These countries may have different data protection laws. We ensure appropriate safeguards are in place to protect your information during such transfers.
          </Text>
        </View>

        {/* Marketing Communications */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>11. Marketing Communications</Text>
          <Text style={styles.sectionContent}>
            We may send you marketing communications about our services, new features, and promotional offers. You can opt out of these communications at any time by:
          </Text>
          <Text style={styles.bulletPoint}>• Clicking the unsubscribe link in emails</Text>
          <Text style={styles.bulletPoint}>• Updating your communication preferences in your account</Text>
          <Text style={styles.bulletPoint}>• Contacting us directly</Text>
        </View>

        {/* Changes to Privacy Policy */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>12. Changes to This Privacy Policy</Text>
          <Text style={styles.sectionContent}>
            We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the new policy on our platform and updating the "Last updated" date. Your continued use of our services constitutes acceptance of the updated policy.
          </Text>
        </View>

        {/* Contact Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>13. Contact Us</Text>
          <Text style={styles.sectionContent}>
            If you have questions or concerns about this Privacy Policy or our data practices, please contact us:
          </Text>
          <Text style={styles.contactInfo}>Email: privacy@yourplatform.com</Text>
          <Text style={styles.contactInfo}>Phone: +1 (555) 123-4567</Text>
          <Text style={styles.contactInfo}>Address: 123 Business St, City, State 12345</Text>
          <Text style={styles.contactInfo}>Data Protection Officer: dpo@yourplatform.com</Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            By using our platform, you acknowledge that you have read and understood this Privacy Policy and consent to the collection and use of your information as described herein.
          </Text>
        </View>
      </View>
    </ScrollView>
  )
}

export default About

