import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    ScrollView,
    Alert,
} from 'react-native';
import Modal from 'react-native-modal';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { useTranslation } from 'react-i18next';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { FONTS_FAMILY } from '../assets/Fonts';

// ─── Exact same structure as Web Sidebar ─────────────────────────────────────
const menuSections = [
    {
        sectionKey: null,
        items: [
            {
                label: 'Dashboard',
                navigationKey: 'Dashboard',
                icon: <MaterialCommunityIcons name="view-dashboard-outline" size={18} color="#746CFF" />,
            },
            {
                label: 'Analytics',
                navigationKey: 'Analytics',
                icon: <Ionicons name="bar-chart-outline" size={18} color="#746CFF" />,
            },
        ],
    },
    {
        sectionKey: 'Employees',
        icon: <Ionicons name="people-outline" size={18} color="#746CFF" />,
        items: [
            {
                label: 'Manage Employees',
                navigationKey: 'Employees',
                icon: <Feather name="users" size={16} color="#746CFF" />,
            },
            {
                label: 'Organization Chart',
                navigationKey: 'OrgChart',
                icon: <MaterialCommunityIcons name="sitemap-outline" size={16} color="#746CFF" />,
            },
        ],
    },
    {
        sectionKey: 'Attendance',
        icon: <Feather name="calendar" size={18} color="#746CFF" />,
        items: [
            {
                label: 'Daily Attendance',
                navigationKey: 'DailyAttendance',
                icon: <MaterialCommunityIcons name="calendar-today" size={16} color="#746CFF" />,
            },
            {
                label: 'Monthly Attendance',
                navigationKey: 'MonthlyAttendance',
                icon: <MaterialCommunityIcons name="calendar-month-outline" size={16} color="#746CFF" />,
            },
            {
                label: 'Shift Scheduler',
                navigationKey: 'ShiftScheduler',
                icon: <MaterialCommunityIcons name="clock-time-four-outline" size={16} color="#746CFF" />,
            },
            {
                label: 'Overtime',
                navigationKey: 'Overtime',
                icon: <MaterialCommunityIcons name="timer-sand" size={16} color="#746CFF" />,
            },
            {
                label: 'Time Off',
                navigationKey: 'TimeOff',
                icon: <MaterialCommunityIcons name="umbrella-outline" size={16} color="#746CFF" />,
            },
            {
                label: 'Leaves',
                navigationKey: 'Leaves',
                icon: <MaterialCommunityIcons name="leaf-off" size={16} color="#746CFF" />,
            },
            {
                label: 'AI Insight',
                navigationKey: 'AIInsight',
                icon: <MaterialCommunityIcons name="robot-outline" size={16} color="#746CFF" />,
            },
        ],
    },
    {
        sectionKey: 'Payroll',
        icon: <MaterialCommunityIcons name="cash-multiple" size={18} color="#746CFF" />,
        items: [
            {
                label: 'Payroll Dashboard',
                navigationKey: 'PayrollOverviewScreen',
                icon: <MaterialCommunityIcons name="view-dashboard-variant-outline" size={16} color="#746CFF" />,
            },
            {
                label: 'Pay Slips',
                navigationKey: 'PayslipPreviewScreen',
                icon: <Feather name="file-text" size={16} color="#746CFF" />,
            },
            {
                label: 'Adjustments',
                navigationKey: 'Adjustments',
                icon: <MaterialCommunityIcons name="tune-variant" size={16} color="#746CFF" />,
            },
            {
                label: 'All Pay Run',
                navigationKey: 'AllPayRun',
                icon: <MaterialCommunityIcons name="playlist-check" size={16} color="#746CFF" />,
            },
            {
                label: 'Pay Run',
                navigationKey: 'PayRun',
                icon: <MaterialCommunityIcons name="run-fast" size={16} color="#746CFF" />,
            },
        ],
    },
    {
        sectionKey: 'Communication',
        icon: <Feather name="message-square" size={18} color="#746CFF" />,
        items: [
            {
                label: 'Messages',
                navigationKey: 'Messages',
                icon: <Feather name="message-circle" size={16} color="#746CFF" />,
            },
        ],
    },
    {
        sectionKey: 'Performance',
        icon: <Ionicons name="trending-up-outline" size={18} color="#746CFF" />,
        items: [
            {
                label: 'Analytic',
                navigationKey: 'PerformanceAnalytic',
                icon: <Ionicons name="analytics-outline" size={16} color="#746CFF" />,
            },
            {
                label: 'Goals',
                navigationKey: 'Goals',
                icon: <MaterialCommunityIcons name="target" size={16} color="#746CFF" />,
            },
            {
                label: 'Employees',
                navigationKey: 'PerformanceEmployees',
                icon: <Feather name="users" size={16} color="#746CFF" />,
            },
            {
                label: 'Reviews',
                navigationKey: 'Reviews',
                icon: <MaterialCommunityIcons name="star-check-outline" size={16} color="#746CFF" />,
            },
        ],
    },
    {
        sectionKey: null,
        items: [
            {
                label: 'Reports',
                navigationKey: 'Reports',
                icon: <Feather name="file-text" size={18} color="#746CFF" />,
            },
        ],
    },
];

// ─── Component ───────────────────────────────────────────────────────────────
const DrawerModal = ({ isModalVisible, toggleModal, navigation, isLanguage }) => {
    const { t } = useTranslation();

    const handlePress = (navigationKey) => {
        toggleModal();
        setTimeout(() => {
            navigation.navigate(navigationKey);
            // 👇 Replace this alert with navigation.navigate(navigationKey) when routes are ready
            // Alert.alert('Coming Soon 🚀', 'This feature will be available soon!');
        }, 300);
    };

    const handleSettings = () => {
        toggleModal();
        setTimeout(() => {
            Alert.alert('Coming Soon 🚀', 'Settings will be available soon!');
            // navigation.navigate('Settings');
        }, 300);
    };

    return (
        <Modal
            isVisible={isModalVisible}
            onBackdropPress={toggleModal}
            style={styles.modal}
            animationIn="slideInLeft"
            animationOut="slideOutLeft"
            hasBackdrop
            backdropOpacity={0.55}
        >
            <View style={styles.drawer}>

                {/* ── Logo ── */}
                <View style={styles.logoSection}>
                    <View style={styles.logoIconWrap}>
                        <MaterialCommunityIcons name="layers-triple-outline" size={22} color="#746CFF" />
                    </View>
                    <View>
                        <Text style={styles.logoTitle}>AZANIA</Text>
                        <Text style={styles.logoSub}>Group HRMS</Text>
                    </View>
                </View>

                {/* ── Profile Card ── */}
                <TouchableOpacity
                    style={styles.profileCard}
                    onPress={() => { toggleModal(); navigation.navigate('EditProfile'); }}
                    activeOpacity={0.8}
                >
                    <Image
                        source={{ uri: 'https://via.placeholder.com/100' }}
                        style={styles.avatar}
                    />
                    <View style={styles.profileInfo}>
                        <Text style={styles.profileName}>Rahul Sharma</Text>
                        <Text style={styles.profileEmail}>rahulsharma@gmail.com</Text>
                    </View>
                    <Feather name="chevron-right" size={16} color="#C0C0D0" />
                </TouchableOpacity>

                {/* ── Menu List ── */}
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                >
                    {menuSections.map((section, si) => (
                        <View key={si}>

                            {/* Section Header with icon (if sectionKey exists) */}
                            {section.sectionKey && (
                                <View style={styles.sectionHeader}>
                                    <View style={styles.sectionHeaderIcon}>{section.icon}</View>
                                    <Text style={styles.sectionHeaderText}>{section.sectionKey}</Text>
                                </View>
                            )}

                            {/* Items Card */}
                            <View style={[
                                styles.sectionCard,
                                section.sectionKey && styles.sectionCardIndented,
                            ]}>
                                {section.items.map((item, ii) => (
                                    <TouchableOpacity
                                        key={ii}
                                        style={[
                                            styles.menuItem,
                                            ii < section.items.length - 1 && styles.menuItemBorder,
                                        ]}
                                        onPress={() => handlePress(item.navigationKey)}
                                        activeOpacity={0.65}
                                    >
                                        <View style={styles.iconWrap}>{item.icon}</View>
                                        <Text style={styles.menuLabel}>{item.label}</Text>
                                        <Feather name="chevron-right" size={13} color="#C8C8D8" />
                                    </TouchableOpacity>
                                ))}
                            </View>

                            <View style={{ height: verticalScale(10) }} />
                        </View>
                    ))}
                </ScrollView>

                {/* ── Settings at Bottom — same as web sidebar ── */}
                <TouchableOpacity style={styles.settingsBtn} onPress={handleSettings} activeOpacity={0.8}>
                    <Feather name="settings" size={18} color="#746CFF" />
                    <Text style={styles.settingsText}>Settings</Text>
                </TouchableOpacity>

            </View>
        </Modal>
    );
};

// ─── Styles ──────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
    modal: {
        margin: 0,
        justifyContent: 'flex-start',
    },
    drawer: {
        width: '82%',
        height: '100%',
        backgroundColor: '#F7F8FA',
    },

    // Logo
    logoSection: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: moderateScale(18),
        paddingTop: verticalScale(52),
        paddingBottom: verticalScale(14),
        borderBottomWidth: 1,
        borderBottomColor: '#EDEDF0',
    },
    logoIconWrap: {
        width: 38,
        height: 38,
        borderRadius: 10,
        backgroundColor: '#EEF0FF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoTitle: {
        fontSize: moderateScale(13),
        fontWeight: '700',
        color: '#746CFF',
        letterSpacing: 1,
    },
    logoSub: {
        fontSize: moderateScale(9),
        color: '#746CFF',
        opacity: 0.65,
        letterSpacing: 0.5,
    },

    // Profile
    profileCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        paddingHorizontal: moderateScale(16),
        paddingVertical: verticalScale(11),
        borderBottomWidth: 1,
        borderBottomColor: '#EDEDF0',
        gap: 10,
    },
    avatar: {
        width: moderateScale(40),
        height: moderateScale(40),
        borderRadius: moderateScale(20),
        backgroundColor: '#DDD',
    },
    profileInfo: { flex: 1 },
    profileName: {
        fontSize: moderateScale(13),
        fontWeight: '600',
        color: '#1A1A2E',
    },
    profileEmail: {
        fontSize: moderateScale(11),
        color: '#8A8A9A',
        marginTop: 1,
    },

    // Scroll
    scrollContent: {
        paddingHorizontal: moderateScale(12),
        paddingTop: verticalScale(12),
        paddingBottom: verticalScale(10),
    },

    // Section Header
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 7,
        marginBottom: verticalScale(8),
        paddingHorizontal: 2,
    },
    sectionHeaderIcon: { opacity: 0.9 },
    sectionHeaderText: {
        fontSize: moderateScale(13),
        fontFamily: FONTS_FAMILY.Natosans_Medium,
        color: '#2B2B3B',
    },

    // Card
    sectionCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#EDEDF0',
    },
    sectionCardIndented: {
        marginLeft: moderateScale(8),
        borderLeftWidth: 2,
        borderLeftColor: '#E0DEFF',
    },

    // Menu Item
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: moderateScale(13),
        paddingVertical: verticalScale(10),
        gap: 10,
    },
    menuItemBorder: {
        borderBottomWidth: 1,
        borderBottomColor: '#F2F2F5',
    },
    iconWrap: {
        width: 24,
        alignItems: 'center',
    },
    menuLabel: {
        flex: 1,
        fontSize: moderateScale(13),
        color: '#2B2B3B',
        fontFamily: FONTS_FAMILY.Natosans_Regular
    },

    // Settings Bottom
    settingsBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingHorizontal: moderateScale(18),
        paddingVertical: verticalScale(16),
        borderTopWidth: 1,
        borderTopColor: '#EDEDF0',
        backgroundColor: '#FFFFFF',
    },
    settingsText: {
        fontSize: moderateScale(14),
        // fontWeight: '500',
        fontFamily: FONTS_FAMILY.Natosans_Medium,
        color: '#746CFF',
    },
});

export default DrawerModal;