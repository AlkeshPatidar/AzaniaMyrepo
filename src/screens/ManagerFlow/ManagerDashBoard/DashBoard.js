import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
    Dimensions,
    Alert,
} from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import {
    LineChart,
    PieChart,
} from 'react-native-chart-kit';
import { FONTS_FAMILY } from '../../../assets/Fonts';

import DrawerModal from '../../../components/DrawerModal';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH - moderateScale(32);

// ─── Mock Data ────────────────────────────────────────────────────────────────
const performanceData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
    datasets: [
        { data: [25, 95, 10, 96, 48, 55, 22, 92], color: () => '#38BDF8', strokeWidth: 2 },
        { data: [38, 72, 26, 60, 10, 82, 44, 54], color: () => '#F87171', strokeWidth: 2 },
    ],
    legend: ['Team Project', 'Product Team'],
};

const pieData = [
    { name: 'Engineering', population: 40, color: '#746CFF', legendFontColor: '#5C727D', legendFontSize: 11 },
    { name: 'Marketing', population: 25, color: '#38BDF8', legendFontColor: '#5C727D', legendFontSize: 11 },
    { name: 'Sales', population: 20, color: '#F87171', legendFontColor: '#5C727D', legendFontSize: 11 },
    { name: 'HR', population: 15, color: '#10B981', legendFontColor: '#5C727D', legendFontSize: 11 },
];

const pendingApprovals = [
    { id: 1, label: 'Leave Request', icon: 'file-document-outline', color: '#D97706', bg: '#FFFBEB', count: 3 },
    { id: 2, label: 'Attendance Corrections', icon: 'checkbox-marked-outline', color: '#D97706', bg: '#FFFBEB', count: 5 },
    { id: 3, label: 'Payroll Approvals', icon: 'cash-check', color: '#D97706', bg: '#FFFBEB', count: 2 },
    { id: 4, label: 'Document Approvals', icon: 'file-check-outline', color: '#D97706', bg: '#FFFBEB', count: 4 },
];

const recentActivities = [
    { _id: '1', Type: 'LEAVE', Title: 'Leave Approved', Description: 'Annual leave for Rahul Sharma', Action: 'Approved', createdAt: new Date().toISOString() },
    { _id: '2', Type: 'OTHER', Title: 'New Hire Onboarded', Description: 'Priya Singh joined Engineering', Action: 'Pending', createdAt: new Date(Date.now() - 3600000).toISOString() },
    { _id: '3', Type: 'LEAVE', Title: 'Sick Leave Request', Description: 'Amit Kumar - 2 days', Action: 'Pending', createdAt: new Date(Date.now() - 7200000).toISOString() },
];

const announcements = [
    { _id: '1', Heading: 'Q2 Performance Review', Detail: 'All team leads to submit performance reports by Friday.', AnnouncementBy: 'Admin', Date: '14 May 2025' },
    { _id: '2', Heading: 'New Holiday Policy', Detail: 'Updated holiday schedule for the remainder of the year.', AnnouncementBy: 'HR', Date: '12 May 2025' },
];

const quickActions = [
    { label: 'Add Employee', icon: 'plus', color: '#0EA5E9', bg: '#E0F2FE' },
    { label: 'Create Jobs', icon: 'briefcase-outline', color: '#F97316', bg: '#FFF4E5' },
    { label: 'Payroll Policies', icon: 'shield-check-outline', color: '#A855F7', bg: '#F3E8FF' },
    { label: 'Leave Policies', icon: 'file-document-outline', color: '#EF4444', bg: '#FEE2E2' },
];

// ─── Chart Config ─────────────────────────────────────────────────────────────
const chartConfig = {
    backgroundGradientFrom: '#FFFFFF',
    backgroundGradientTo: '#FFFFFF',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(116, 108, 255, ${opacity})`,
    labelColor: () => '#94A3B8',
    propsForDots: { r: '0' },
    propsForBackgroundLines: { stroke: '#F1F5F9', strokeDasharray: '4' },
};

// ─── Sub Components ───────────────────────────────────────────────────────────
const SectionCard = ({ children, style }) => (
    <View style={[styles.card, style]}>{children}</View>
);

const CardTitle = ({ title }) => (
    <Text style={styles.cardTitle}>{title}</Text>
);

// ─── Main Component ───────────────────────────────────────────────────────────
const Dashboard = ({ navigation }) => {
    const [dashboardStats] = useState({ totalEmployees: 248, leavers: 12, newHires: 34, growth: 22 });
    const [isDrawerVisible, setDrawerVisible] = useState(false);
    const comingSoon = () => Alert.alert('Coming Soon 🚀', 'This feature will be available soon!');
    const toggleDrawer = () => setDrawerVisible(prev => !prev);

    return (
        <View style={styles.root}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

            {/* ── Header ── */}
            <View style={styles.header}>
                <View>
                    <Text style={styles.headerGreeting}>Welcome back 👋</Text>
                    <Text style={styles.headerName}>John Doe</Text>
                </View>
                <View style={styles.headerRight}>
                    <TouchableOpacity style={styles.headerIconBtn} onPress={comingSoon}>
                        <Ionicons name="notifications-outline" size={20} color="#122D34" />
                        <View style={styles.notifDot} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.headerIconBtn} onPress={comingSoon}>
                        <Feather name="download" size={20} color="#122D34" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.avatarBtn} onPress={toggleDrawer}>
                        <MaterialCommunityIcons name="menu" size={22} color="#746CFF" />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* ── Workforce Overview ── */}
                <SectionCard>
                    <CardTitle title="Workforce Overview" />
                    <View style={styles.workforceGrid}>
                        {[
                            { label: 'Total Employees', value: dashboardStats.totalEmployees, icon: 'account-group-outline', color: '#F97316', bg: '#FFF4E5' },
                            { label: 'Leavers', value: dashboardStats.leavers, icon: 'account-minus-outline', color: '#EF4444', bg: '#FEE2E2' },
                            { label: 'New Hires', value: dashboardStats.newHires, icon: 'account-plus-outline', color: '#A855F7', bg: '#F3E8FF' },
                            { label: 'Growth', value: `${dashboardStats.growth}%`, icon: 'trending-up', color: '#0EA5E9', bg: '#E0F2FE' },
                        ].map((item, i) => (
                            <View
                                key={i}
                                style={[
                                    styles.workforceCell,
                                    i % 2 === 0 && styles.workforceCellBorderRight,
                                    i < 2 && styles.workforceCellBorderBottom,
                                ]}
                            >
                                <View style={[styles.workforceIconWrap, { backgroundColor: item.bg }]}>
                                    <MaterialCommunityIcons name={item.icon} size={16} color={item.color} />
                                </View>
                                <View style={styles.workforceValueRow}>
                                    <Text style={styles.workforceValue}>{item.value}</Text>
                                    <View style={styles.trendBadge}>
                                        <MaterialCommunityIcons name="trending-up" size={10} color="#10B981" />
                                        <Text style={styles.trendText}> +25.5%</Text>
                                    </View>
                                </View>
                                <Text style={styles.workforceLabel}>{item.label}</Text>
                            </View>
                        ))}
                    </View>
                </SectionCard>

                {/* ── Team Performance Line Chart ── */}
                <SectionCard>
                    <View style={styles.chartHeader}>
                        <View>
                            <CardTitle title="Team Performance" />
                            <View style={styles.legendRow}>
                                <View style={styles.legendItem}>
                                    <View style={[styles.legendDot, { backgroundColor: '#38BDF8' }]} />
                                    <Text style={styles.legendText}>Team Project</Text>
                                </View>
                                <View style={styles.legendItem}>
                                    <View style={[styles.legendDot, { backgroundColor: '#F87171' }]} />
                                    <Text style={styles.legendText}>Product Team</Text>
                                </View>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.periodBtn} onPress={comingSoon}>
                            <Feather name="calendar" size={12} color="#5C727D" />
                            <Text style={styles.periodBtnText}> Last 6 Month</Text>
                        </TouchableOpacity>
                    </View>
                    <LineChart
                        data={performanceData}
                        width={CARD_WIDTH - moderateScale(32)}
                        height={180}
                        chartConfig={chartConfig}
                        bezier={false}
                        withDots={false}
                        withShadow={false}
                        style={styles.lineChart}
                        withLegend={false}
                    />
                </SectionCard>

                {/* ── Department Pie Chart ── */}
                {/* <SectionCard>
                    <CardTitle title="Department Breakdown" />
                    <PieChart
                        data={pieData}
                        width={CARD_WIDTH - moderateScale(32)}
                        height={180}
                        chartConfig={chartConfig}
                        accessor="population"
                        backgroundColor="transparent"
                        paddingLeft="10"
                        absolute={false}
                    />
                </SectionCard> */}

                {/* ── Recent Activity ── */}
                <SectionCard>
                    <CardTitle title="Recent Activity" />
                    <View style={styles.activityList}>
                        {recentActivities.map((item) => (
                            <View key={item._id} style={styles.activityItem}>
                                <View style={[
                                    styles.activityIcon,
                                    { backgroundColor: item.Type === 'LEAVE' ? '#DCFCE7' : '#EEF2FF' },
                                ]}>
                                    <Ionicons
                                        name={item.Type === 'LEAVE' ? 'calendar-outline' : 'notifications-outline'}
                                        size={16}
                                        color={item.Type === 'LEAVE' ? '#16A34A' : '#746CFF'}
                                    />
                                </View>
                                <View style={styles.activityContent}>
                                    <Text style={styles.activityTitle} numberOfLines={1}>{item.Title}</Text>
                                    <Text style={styles.activityDesc} numberOfLines={1}>{item.Description}</Text>
                                    <View style={[
                                        styles.actionBadge,
                                        { backgroundColor: item.Action === 'Approved' ? '#DCFCE7' : '#EEF2FF' },
                                    ]}>
                                        <Text style={[
                                            styles.actionBadgeText,
                                            { color: item.Action === 'Approved' ? '#16A34A' : '#746CFF' },
                                        ]}>{item.Action}</Text>
                                    </View>
                                </View>
                                <View style={styles.activityTime}>
                                    <Text style={styles.activityDate}>
                                        {new Date(item.createdAt).toLocaleDateString()}
                                    </Text>
                                    <Text style={styles.activityHour}>
                                        {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </Text>
                                </View>
                            </View>
                        ))}
                    </View>
                    <TouchableOpacity style={styles.viewAllBtn} onPress={comingSoon}>
                        <Text style={styles.viewAllText}>View all</Text>
                        <Feather name="arrow-right" size={13} color="#5C727D" />
                    </TouchableOpacity>
                </SectionCard>

                {/* ── Pending Approvals ── */}
                <SectionCard>
                    <CardTitle title="Pending Approval" />
                    <View style={styles.approvalList}>
                        {pendingApprovals.map((item) => (
                            <TouchableOpacity key={item.id} style={styles.approvalItem} onPress={comingSoon} activeOpacity={0.7}>
                                <View style={[styles.approvalIcon, { backgroundColor: item.bg }]}>
                                    <MaterialCommunityIcons name={item.icon} size={16} color={item.color} />
                                </View>
                                <Text style={styles.approvalLabel}>{item.label}</Text>
                                <View style={styles.approvalCount}>
                                    <Text style={styles.approvalCountText}>{item.count}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <TouchableOpacity style={styles.viewAllBtn} onPress={comingSoon}>
                        <Text style={styles.viewAllText}>View all</Text>
                        <Feather name="arrow-right" size={13} color="#5C727D" />
                    </TouchableOpacity>
                </SectionCard>

                {/* ── Quick Actions ── */}
                <SectionCard>
                    <CardTitle title="Quick Actions" />
                    <View style={styles.quickGrid}>
                        {quickActions.map((item, i) => (
                            <TouchableOpacity key={i} style={styles.quickItem} onPress={comingSoon} activeOpacity={0.7}>
                                <View style={[styles.quickIcon, { backgroundColor: item.bg }]}>
                                    <MaterialCommunityIcons name={item.icon} size={16} color={item.color} />
                                </View>
                                <Text style={styles.quickLabel}>{item.label}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </SectionCard>

                {/* ── AI Insights ── */}
                <SectionCard>
                    <CardTitle title="AI Insights" />
                    <View style={styles.insightItem}>
                        <View style={[styles.insightIcon, { backgroundColor: '#FEE2E2' }]}>
                            <MaterialCommunityIcons name="alert-outline" size={14} color="#EF4444" />
                        </View>
                        <Text style={styles.insightText}>3 Employees show attrition risk</Text>
                    </View>
                    <View style={[styles.insightItem, { marginTop: verticalScale(8) }]}>
                        <View style={[styles.insightIcon, { backgroundColor: '#DCFCE7' }]}>
                            <MaterialCommunityIcons name="trending-up" size={14} color="#16A34A" />
                        </View>
                        <Text style={styles.insightText}>Hiring trend increased in last 2 months</Text>
                    </View>
                    <TouchableOpacity style={styles.viewAllBtn} onPress={comingSoon}>
                        <Text style={styles.viewAllText}>View all</Text>
                        <Feather name="arrow-right" size={13} color="#5C727D" />
                    </TouchableOpacity>
                </SectionCard>

                {/* ── Announcements ── */}
                <SectionCard>
                    <View style={styles.announcementHeader}>
                        <View>
                            <CardTitle title="Announcements" />
                            <Text style={styles.announcementSub}>Latest updates</Text>
                        </View>
                        <TouchableOpacity style={styles.addAnnouncementBtn} onPress={comingSoon}>
                            <Feather name="plus" size={14} color="#FFFFFF" />
                            <Text style={styles.addAnnouncementText}>Add</Text>
                        </TouchableOpacity>
                    </View>
                    {announcements.map((item) => (
                        <View key={item._id} style={styles.announcementItem}>
                            <View style={[
                                styles.announcementIcon,
                                { backgroundColor: item.AnnouncementBy === 'Admin' ? '#FFEAEA' : '#DCFCE7' },
                            ]}>
                                <Ionicons
                                    name="notifications-outline"
                                    size={15}
                                    color={item.AnnouncementBy === 'Admin' ? '#F64E60' : '#16A34A'}
                                />
                            </View>
                            <View style={styles.announcementContent}>
                                <View style={styles.announcementTitleRow}>
                                    <Text style={styles.announcementTitle} numberOfLines={1}>{item.Heading}</Text>
                                    <Text style={styles.announcementDate}>{item.Date}</Text>
                                </View>
                                <View style={[
                                    styles.announcementByBadge,
                                    { backgroundColor: item.AnnouncementBy === 'Admin' ? '#FFEAEA' : '#EEF2FF' },
                                ]}>
                                    <Text style={[
                                        styles.announcementByText,
                                        { color: item.AnnouncementBy === 'Admin' ? '#F64E60' : '#746CFF' },
                                    ]}>{item.AnnouncementBy}</Text>
                                </View>
                                <Text style={styles.announcementDetail} numberOfLines={2}>{item.Detail}</Text>
                            </View>
                        </View>
                    ))}
                    <TouchableOpacity style={styles.viewAllBtn} onPress={comingSoon}>
                        <Text style={styles.viewAllText}>View all</Text>
                        <Feather name="arrow-right" size={13} color="#5C727D" />
                    </TouchableOpacity>
                </SectionCard>

                {/* ── Smart Suggestions ── */}
                <SectionCard style={{ marginBottom: verticalScale(24) }}>
                    <CardTitle title="Smart Suggestions" />
                    <View style={styles.insightItem}>
                        <View style={[styles.insightIcon, { backgroundColor: '#FEF3C7' }]}>
                            <MaterialCommunityIcons name="lightbulb-outline" size={14} color="#D97706" />
                        </View>
                        <Text style={styles.insightText}>
                            You have <Text style={{ fontWeight: '700', color: '#122D34' }}>4</Text> pending leaves to approve
                        </Text>
                    </View>
                    <TouchableOpacity style={styles.viewAllBtn} onPress={comingSoon}>
                        <Text style={styles.viewAllText}>View all</Text>
                        <Feather name="arrow-right" size={13} color="#5C727D" />
                    </TouchableOpacity>
                </SectionCard>

            </ScrollView>

             <DrawerModal
                isModalVisible={isDrawerVisible}
                toggleModal={toggleDrawer}
                navigation={navigation}
              />
        </View>
    );
};

// ─── Styles ──────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#F7F8FA',
    },

    // Header
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',
        paddingHorizontal: moderateScale(18),
        paddingTop: verticalScale(52),
        paddingBottom: verticalScale(14),
        borderBottomWidth: 1,
        borderBottomColor: '#EDEDF0',
    },
    headerGreeting: {
        fontSize: moderateScale(12),
        color: '#5C727D',
        fontFamily: FONTS_FAMILY.Natosans_Regular,
    },
    headerName: {
        fontSize: moderateScale(17),
        fontWeight: '700',
        color: '#122D34',
        marginTop: 1,
        fontFamily: FONTS_FAMILY.Natosans_Medium,
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    headerIconBtn: {
        width: 36,
        height: 36,
        borderRadius: 10,
        backgroundColor: '#F7F8FA',
        alignItems: 'center',
        justifyContent: 'center',
    },
    notifDot: {
        position: 'absolute',
        top: 7,
        right: 7,
        width: 7,
        height: 7,
        borderRadius: 4,
        backgroundColor: '#EF4444',
        borderWidth: 1.5,
        borderColor: '#F7F8FA',
    },
    avatarBtn: {
        width: 36,
        height: 36,
        borderRadius: 10,
        backgroundColor: '#EEF0FF',
        alignItems: 'center',
        justifyContent: 'center',
    },

    scrollContent: {
        paddingHorizontal: moderateScale(16),
        paddingTop: verticalScale(16),
    },

    // Card
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: moderateScale(16),
        marginBottom: verticalScale(14),
        borderWidth: 1,
        borderColor: '#EDEDF0',
    },
    cardTitle: {
        fontSize: moderateScale(14),
        fontWeight: '700',
        color: '#122D34',
        marginBottom: verticalScale(12),
        fontFamily: FONTS_FAMILY.Natosans_Medium,
    },

    // Workforce Grid
    workforceGrid: {
        borderWidth: 1,
        borderColor: '#F0F0F5',
        borderRadius: 12,
        overflow: 'hidden',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    workforceCell: {
        width: '50%',
        padding: moderateScale(14),
    },
    workforceCellBorderRight: {
        borderRightWidth: 1,
        borderRightColor: '#F0F0F5',
    },
    workforceCellBorderBottom: {
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F5',
    },
    workforceIconWrap: {
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: verticalScale(8),
    },
    workforceValueRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginBottom: 2,
    },
    workforceValue: {
        fontSize: moderateScale(20),
        fontWeight: '700',
        color: '#122D34',
        fontFamily: FONTS_FAMILY.Natosans_Medium,
    },
    trendBadge: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    trendText: {
        fontSize: moderateScale(10),
        fontWeight: '600',
        color: '#10B981',
        fontFamily: FONTS_FAMILY.Natosans_Medium,
    },
    workforceLabel: {
        fontSize: moderateScale(11),
        color: '#5C727D',
        fontFamily: FONTS_FAMILY.Natosans_Regular,
    },

    // Line Chart
    chartHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: verticalScale(4),
    },
    legendRow: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 4,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    legendDot: {
        width: 7,
        height: 7,
        borderRadius: 4,
    },
    legendText: {
        fontSize: moderateScale(11),
        color: '#5C727D',
        fontFamily: FONTS_FAMILY.Natosans_Regular,
    },
    periodBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#EDEDF0',
    },
    periodBtnText: {
        fontSize: moderateScale(11),
        color: '#5C727D',
        fontFamily: FONTS_FAMILY.Natosans_Regular,
    },
    lineChart: {
        marginTop: 8,
        borderRadius: 8,
        marginLeft: -8,
    },

    // Activity
    activityList: { gap: verticalScale(10) },
    activityItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 10,
        padding: moderateScale(10),
        backgroundColor: '#F8FAFF',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#F0F0F5',
    },
    activityIcon: {
        width: 36,
        height: 36,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
    },
    activityContent: { flex: 1 },
    activityTitle: {
        fontSize: moderateScale(13),
        fontWeight: '600',
        color: '#122D34',
        fontFamily: FONTS_FAMILY.Natosans_Medium,
    },
    activityDesc: {
        fontSize: moderateScale(11),
        color: '#5C727D',
        marginTop: 1,
        fontFamily: FONTS_FAMILY.Natosans_Regular,
    },
    actionBadge: {
        alignSelf: 'flex-start',
        marginTop: 4,
        paddingHorizontal: 7,
        paddingVertical: 2,
        borderRadius: 20,
    },
    actionBadgeText: {
        fontSize: moderateScale(10),
        fontWeight: '600',
        fontFamily: FONTS_FAMILY.Natosans_Medium,
    },
    activityTime: { alignItems: 'flex-end' },
    activityDate: {
        fontSize: moderateScale(10),
        fontWeight: '500',
        color: '#122D34',
        fontFamily: FONTS_FAMILY.Natosans_Medium,
    },
    activityHour: {
        fontSize: moderateScale(10),
        color: '#94A3B8',
        marginTop: 2,
        fontFamily: FONTS_FAMILY.Natosans_Regular,
    },

    // View All
    viewAllBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: verticalScale(14),
        gap: 4,
    },
    viewAllText: {
        fontSize: moderateScale(13),
        fontWeight: '500',
        color: '#5C727D',
        fontFamily: FONTS_FAMILY.Natosans_Regular,
    },

    // Approvals
    approvalList: { gap: verticalScale(8) },
    approvalItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: moderateScale(10),
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#F0F0F5',
        gap: 10,
    },
    approvalIcon: {
        width: 32,
        height: 32,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    approvalLabel: {
        flex: 1,
        fontSize: moderateScale(13),
        fontWeight: '500',
        color: '#122D34',
        fontFamily: FONTS_FAMILY.Natosans_Medium,
    },
    approvalCount: {
        width: 22,
        height: 22,
        borderRadius: 11,
        backgroundColor: '#EF4444',
        alignItems: 'center',
        justifyContent: 'center',
    },
    approvalCountText: {
        fontSize: moderateScale(11),
        fontWeight: '700',
        color: '#FFFFFF',
        fontFamily: FONTS_FAMILY.Natosans_Medium,
    },

    // Quick Actions
    quickGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: moderateScale(10),
    },
    quickItem: {
        width: '47%',
        flexDirection: 'row',
        alignItems: 'center',
        padding: moderateScale(12),
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#F0F0F5',
        gap: 10,
    },
    quickIcon: {
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    quickLabel: {
        fontSize: moderateScale(12),
        fontWeight: '500',
        color: '#122D34',
        flex: 1,
        fontFamily: FONTS_FAMILY.Natosans_Medium,
    },

    // Insights
    insightItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        padding: moderateScale(10),
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#F0F0F5',
    },
    insightIcon: {
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    insightText: {
        fontSize: moderateScale(13),
        color: '#122D34',
        flex: 1,
        fontFamily: FONTS_FAMILY.Natosans_Regular,
    },

    // Announcements
    announcementHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: verticalScale(12),
    },
    announcementSub: {
        fontSize: moderateScale(11),
        color: '#5C727D',
        marginTop: 2,
        fontFamily: FONTS_FAMILY.Natosans_Regular,
    },
    addAnnouncementBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        paddingHorizontal: moderateScale(12),
        paddingVertical: verticalScale(6),
        borderRadius: 10,
        backgroundColor: '#746CFF',
    },
    addAnnouncementText: {
        fontSize: moderateScale(12),
        fontWeight: '600',
        color: '#FFFFFF',
        fontFamily: FONTS_FAMILY.Natosans_Medium,
    },
    announcementItem: {
        flexDirection: 'row',
        gap: 10,
        padding: moderateScale(12),
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#F0F0F5',
        marginBottom: verticalScale(8),
    },
    announcementIcon: {
        width: 36,
        height: 36,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
    },
    announcementContent: { flex: 1 },
    announcementTitleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: 6,
    },
    announcementTitle: {
        fontSize: moderateScale(13),
        fontWeight: '600',
        color: '#122D34',
        flex: 1,
        fontFamily: FONTS_FAMILY.Natosans_Medium,
    },
    announcementDate: {
        fontSize: moderateScale(10),
        color: '#94A3B8',
        flexShrink: 0,
        fontFamily: FONTS_FAMILY.Natosans_Regular,
    },
    announcementByBadge: {
        alignSelf: 'flex-start',
        paddingHorizontal: 7,
        paddingVertical: 2,
        borderRadius: 20,
        marginTop: 3,
        marginBottom: 4,
    },
    announcementByText: {
        fontSize: moderateScale(10),
        fontWeight: '600',
        fontFamily: FONTS_FAMILY.Natosans_Medium,
    },
    announcementDetail: {
        fontSize: moderateScale(12),
        color: '#5C727D',
        lineHeight: 17,
        fontFamily: FONTS_FAMILY.Natosans_Regular,
    },
});

export default Dashboard;