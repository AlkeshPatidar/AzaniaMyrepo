import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    Image,
    Modal,
    StatusBar,
    Alert,
    Dimensions,
} from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FONTS_FAMILY } from '../../../assets/Fonts';
import DrawerModal from '../../../components/DrawerModal';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const STAT_CARD_WIDTH = SCREEN_WIDTH / 2.3;

// ─── Static Data ──────────────────────────────────────────────────────────────
const staticSummary = {
    averageWorkingTime: '7h 42m',
    averageCheckInTime: '09:12 AM',
    averageCheckOutTime: '06:54 PM',
    averageBreakTime: '38m',
};

const staticAttendance = [
    { _id: '1',  Employee: { EmployeeID: 'EMP001', FullName: 'Rahul Sharma',   ProfileImage: 'https://i.pravatar.cc/150?u=rahul'   }, ClockIn: '09:05 AM', ClockOut: '06:30 PM', WorkingHours: '9h 25m', Shift: 'Morning', Status: 'Present' },
    { _id: '2',  Employee: { EmployeeID: 'EMP002', FullName: 'Priya Singh',    ProfileImage: 'https://i.pravatar.cc/150?u=priya'   }, ClockIn: '09:20 AM', ClockOut: '06:45 PM', WorkingHours: '9h 25m', Shift: 'Morning', Status: 'Present' },
    { _id: '3',  Employee: { EmployeeID: 'EMP003', FullName: 'Arjun Mehta',    ProfileImage: 'https://i.pravatar.cc/150?u=arjun'   }, ClockIn: '-',        ClockOut: '-',        WorkingHours: '-',      Shift: 'Morning', Status: 'Absent'  },
    { _id: '4',  Employee: { EmployeeID: 'EMP004', FullName: 'Sneha Patil',    ProfileImage: 'https://i.pravatar.cc/150?u=sneha'   }, ClockIn: '10:00 AM', ClockOut: '07:00 PM', WorkingHours: '9h 00m', Shift: 'Morning', Status: 'Late'    },
    { _id: '5',  Employee: { EmployeeID: 'EMP005', FullName: 'Vikram Rao',     ProfileImage: 'https://i.pravatar.cc/150?u=vikram'  }, ClockIn: '02:00 PM', ClockOut: '11:00 PM', WorkingHours: '9h 00m', Shift: 'Evening', Status: 'Present' },
    { _id: '6',  Employee: { EmployeeID: 'EMP006', FullName: 'Anjali Gupta',   ProfileImage: 'https://i.pravatar.cc/150?u=anjali'  }, ClockIn: '09:00 AM', ClockOut: '06:00 PM', WorkingHours: '9h 00m', Shift: 'Morning', Status: 'Present' },
    { _id: '7',  Employee: { EmployeeID: 'EMP007', FullName: 'Rohan Desai',    ProfileImage: 'https://i.pravatar.cc/150?u=rohan'   }, ClockIn: '-',        ClockOut: '-',        WorkingHours: '-',      Shift: 'Morning', Status: 'Absent'  },
    { _id: '8',  Employee: { EmployeeID: 'EMP008', FullName: 'Kavya Nair',     ProfileImage: 'https://i.pravatar.cc/150?u=kavya'   }, ClockIn: '09:15 AM', ClockOut: '06:15 PM', WorkingHours: '9h 00m', Shift: 'Morning', Status: 'Present' },
    { _id: '9',  Employee: { EmployeeID: 'EMP009', FullName: 'Suresh Iyer',    ProfileImage: 'https://i.pravatar.cc/150?u=suresh'  }, ClockIn: '08:55 AM', ClockOut: '05:55 PM', WorkingHours: '9h 00m', Shift: 'Morning', Status: 'Present' },
    { _id: '10', Employee: { EmployeeID: 'EMP010', FullName: 'Meera Joshi',    ProfileImage: 'https://i.pravatar.cc/150?u=meera'   }, ClockIn: '09:30 AM', ClockOut: '06:30 PM', WorkingHours: '9h 00m', Shift: 'Morning', Status: 'Late'    },
    { _id: '11', Employee: { EmployeeID: 'EMP011', FullName: 'Aditya Bhatt',   ProfileImage: 'https://i.pravatar.cc/150?u=aditya'  }, ClockIn: '02:05 PM', ClockOut: '11:05 PM', WorkingHours: '9h 00m', Shift: 'Evening', Status: 'Present' },
    { _id: '12', Employee: { EmployeeID: 'EMP012', FullName: 'Pooja Kulkarni', ProfileImage: 'https://i.pravatar.cc/150?u=pooja'   }, ClockIn: '-',        ClockOut: '-',        WorkingHours: '-',      Shift: 'Night',   Status: 'Absent'  },
];

const statCards = [
    { title: 'Avg Working Time',  key: 'averageWorkingTime',   icon: 'timer-outline',           color: '#FF9F43', bg: '#FF9F431A' },
    { title: 'Check In Time',     key: 'averageCheckInTime',   icon: 'login',                   color: '#A064FF', bg: '#A064FF1A' },
    { title: 'Check Out Time',    key: 'averageCheckOutTime',  icon: 'logout',                  color: '#F64E60', bg: '#F64E601A' },
    { title: 'Avg Break Time',    key: 'averageBreakTime',     icon: 'coffee-outline',          color: '#28C76F', bg: '#28C76F1A' },
];

const STATUS_COLORS = {
    Present: { text: '#28C76F', bg: '#E8F9F1' },
    Absent:  { text: '#F64E60', bg: '#FEE2E2' },
    Late:    { text: '#FF9F43', bg: '#FFF4E5' },
};

const ITEMS_PER_PAGE = 6;

// ─── Main Screen ──────────────────────────────────────────────────────────────
const DailyAttendance = ({ navigation }) => {
    const [attendance]                      = useState(staticAttendance);
    const [searchQuery, setSearchQuery]     = useState('');
    const [currentPage, setCurrentPage]     = useState(1);
    const [openMenuId, setOpenMenuId]       = useState(null);
    const [isDrawerVisible, setDrawerVisible] = useState(false);

    const toggleDrawer = () => setDrawerVisible(prev => !prev);
    const comingSoon   = () => Alert.alert('Coming Soon 🚀', 'This feature will be available soon!');

    const filtered = attendance.filter(e =>
        e.Employee.FullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.Employee.EmployeeID.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.Status.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.Shift.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
    const paginated  = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    const handleSearch = (text) => { setSearchQuery(text); setCurrentPage(1); };

    // Smart pagination group (same logic as web)
    const getPaginationGroup = () => {
        if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);
        if (currentPage <= 2) return [1, 2, 3, '...', totalPages];
        if (currentPage >= totalPages - 1) return [1, '...', totalPages - 2, totalPages - 1, totalPages];
        return [1, '...', currentPage, '...', totalPages];
    };

    return (
        <View style={styles.root}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

            {/* ── Header ── */}
            <View style={styles.header}>
                <View>
                    <Text style={styles.headerTitle}>Daily Attendance</Text>
                    <Text style={styles.headerSub}>Today's attendance overview</Text>
                </View>
                <View style={styles.headerRight}>
                    <TouchableOpacity style={styles.headerIconBtn} onPress={comingSoon}>
                        <Feather name="download" size={18} color="#122D34" />
                    </TouchableOpacity>
                    {/* Same purple menu icon as Dashboard & Employees */}
                    <TouchableOpacity style={styles.avatarBtn} onPress={toggleDrawer}>
                        <MaterialCommunityIcons name="menu" size={22} color="#746CFF" />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
                onStartShouldSetResponder={() => { setOpenMenuId(null); return false; }}
            >
                {/* ── Stat Cards — horizontal responsive scroll ── */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.statScrollContent}
                    decelerationRate="fast"
                    snapToInterval={STAT_CARD_WIDTH + moderateScale(10)}
                    snapToAlignment="start"
                >
                    {statCards.map((card) => (
                        <View key={card.key} style={[styles.statCard, { width: STAT_CARD_WIDTH }]}>
                            <View style={[styles.statIconWrap, { backgroundColor: card.bg }]}>
                                <MaterialCommunityIcons name={card.icon} size={20} color={card.color} />
                            </View>
                            <Text style={styles.statTitle}>{card.title}</Text>
                            <Text style={[styles.statValue, { color: card.color }]}>{staticSummary[card.key]}</Text>
                        </View>
                    ))}
                </ScrollView>

                {/* ── Employee List Card ── */}
                <View style={styles.listCard}>
                    <Text style={styles.listCardTitle}>EMPLOYEE LIST</Text>

                    {/* Search */}
                    <View style={styles.searchBar}>
                        <Feather name="search" size={15} color="#5C727D" />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search by name, ID, status, shift..."
                            placeholderTextColor="#94A3B8"
                            value={searchQuery}
                            onChangeText={handleSearch}
                        />
                        {searchQuery.length > 0 && (
                            <TouchableOpacity onPress={() => handleSearch('')}>
                                <Feather name="x" size={14} color="#94A3B8" />
                            </TouchableOpacity>
                        )}
                    </View>

                    {/* Column Headers */}
                    <View style={styles.tableHeader}>
                        <Text style={[styles.tableHeaderText, { flex: 1.4 }]}>Employee</Text>
                        <Text style={[styles.tableHeaderText, { flex: 0.9 }]}>Clock In</Text>
                        <Text style={[styles.tableHeaderText, { flex: 0.9 }]}>Clock Out</Text>
                        <Text style={[styles.tableHeaderText, { flex: 0.8 }]}>Status</Text>
                        <View style={{ width: 20 }} />
                    </View>

                    {/* Rows */}
                    {paginated.length === 0 ? (
                        <View style={styles.emptyState}>
                            <MaterialCommunityIcons name="account-search-outline" size={40} color="#C0C0D0" />
                            <Text style={styles.emptyText}>No records found</Text>
                        </View>
                    ) : (
                        paginated.map((emp, index) => (
                            <AttendanceRow
                                key={emp._id}
                                emp={emp}
                                isFirst={index === 0 && currentPage === 1}
                                isMenuOpen={openMenuId === emp._id}
                                onMenuToggle={() => setOpenMenuId(openMenuId === emp._id ? null : emp._id)}
                                onAction={comingSoon}
                            />
                        ))
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <View style={styles.pagination}>
                            <TouchableOpacity
                                style={[styles.pageArrowBtn, currentPage === 1 && styles.pageBtnDisabled]}
                                onPress={() => setCurrentPage(p => Math.max(p - 1, 1))}
                                disabled={currentPage === 1}
                            >
                                <Feather name="chevron-left" size={15} color={currentPage === 1 ? '#C0C0D0' : '#5C727D'} />
                                <Text style={[styles.pagePrevNext, currentPage === 1 && styles.pageTextDisabled]}>Prev</Text>
                            </TouchableOpacity>

                            <View style={styles.pageNumbers}>
                                {getPaginationGroup().map((page, i) => (
                                    <TouchableOpacity
                                        key={i}
                                        style={[
                                            styles.pageNumber,
                                            page === currentPage && styles.pageNumberActive,
                                            page === '...' && styles.pageNumberDots,
                                        ]}
                                        onPress={() => page !== '...' && setCurrentPage(page)}
                                        disabled={page === '...'}
                                    >
                                        <Text style={[
                                            styles.pageNumberText,
                                            page === currentPage && styles.pageNumberTextActive,
                                        ]}>{page}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>

                            <TouchableOpacity
                                style={[styles.pageArrowBtn, currentPage === totalPages && styles.pageBtnDisabled]}
                                onPress={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                                disabled={currentPage === totalPages}
                            >
                                <Text style={[styles.pagePrevNext, currentPage === totalPages && styles.pageTextDisabled]}>Next</Text>
                                <Feather name="chevron-right" size={15} color={currentPage === totalPages ? '#C0C0D0' : '#122D34'} />
                            </TouchableOpacity>
                        </View>
                    )}
                </View>

                {/* Extra Detail Card — expanded info on tap row */}
            </ScrollView>

            {/* ── Drawer ── */}
            <DrawerModal
                isModalVisible={isDrawerVisible}
                toggleModal={toggleDrawer}
                navigation={navigation}
            />
        </View>
    );
};

// ─── Attendance Row ───────────────────────────────────────────────────────────
const AttendanceRow = ({ emp, isFirst, isMenuOpen, onMenuToggle, onAction }) => {
    const statusStyle = STATUS_COLORS[emp.Status] || { text: '#5C727D', bg: '#F3F6F9' };

    return (
        <View style={[styles.row, isFirst && styles.rowHighlight]}>
            {/* Avatar + Name */}
            <View style={[styles.rowCell, { flex: 1.4 }]}>
                <Image source={{ uri: emp.Employee.ProfileImage }} style={styles.rowAvatar} />
                <View style={styles.rowNameWrap}>
                    <Text style={styles.rowName} numberOfLines={1}>{emp.Employee.FullName}</Text>
                    <Text style={styles.rowId}>{emp.Employee.EmployeeID}</Text>
                </View>
            </View>

            {/* Clock In */}
            <View style={{ flex: 0.9 }}>
                <Text style={styles.rowTime}>{emp.ClockIn}</Text>
                {emp.Shift !== '-' && <Text style={styles.rowShift}>{emp.Shift}</Text>}
            </View>

            {/* Clock Out */}
            <View style={{ flex: 0.9 }}>
                <Text style={styles.rowTime}>{emp.ClockOut}</Text>
                {emp.WorkingHours !== '-' && <Text style={styles.rowHours}>{emp.WorkingHours}</Text>}
            </View>

            {/* Status */}
            <View style={{ flex: 0.8 }}>
                <View style={[styles.statusBadge, { backgroundColor: statusStyle.bg }]}>
                    <Text style={[styles.statusText, { color: statusStyle.text }]}>{emp.Status}</Text>
                </View>
            </View>

            {/* 3-dot */}
            <View style={styles.menuWrap}>
                <TouchableOpacity onPress={onMenuToggle} style={styles.menuTrigger}>
                    <Feather name="more-vertical" size={16} color="#5C727D" />
                </TouchableOpacity>
                {isMenuOpen && (
                    <View style={styles.dropdown}>
                        <TouchableOpacity style={styles.dropdownItem} onPress={onAction}>
                            <Feather name="eye" size={13} color="#746CFF" />
                            <Text style={styles.dropdownItemText}>View Details</Text>
                        </TouchableOpacity>
                        <View style={styles.dropdownDivider} />
                        <TouchableOpacity style={styles.dropdownItem} onPress={onAction}>
                            <Feather name="edit-2" size={13} color="#28C76F" />
                            <Text style={[styles.dropdownItemText, { color: '#28C76F' }]}>Edit</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
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
    headerTitle: {
        fontSize: moderateScale(17),
        fontWeight: '700',
        color: '#122D34',
        fontFamily: FONTS_FAMILY.Natosans_Medium,
    },
    headerSub: {
        fontSize: moderateScale(12),
        color: '#5C727D',
        marginTop: 2,
        fontFamily: FONTS_FAMILY.Natosans_Regular,
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    headerIconBtn: {
        width: 36,
        height: 36,
        borderRadius: 10,
        backgroundColor: '#F7F8FA',
        alignItems: 'center',
        justifyContent: 'center',
    },
    // Same purple menu icon as Dashboard & Employees
    avatarBtn: {
        width: 36,
        height: 36,
        borderRadius: 10,
        backgroundColor: '#EEF0FF',
        alignItems: 'center',
        justifyContent: 'center',
    },

    scrollContent: {
        paddingBottom: verticalScale(28),
    },

    // Stat Cards
    statScrollContent: {
        paddingHorizontal: moderateScale(16),
        paddingTop: verticalScale(16),
        paddingBottom: verticalScale(4),
        gap: moderateScale(10),
    },
    statCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: moderateScale(14),
        borderWidth: 1,
        borderColor: '#EDEDF0',
    },
    statIconWrap: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: verticalScale(10),
    },
    statTitle: {
        fontSize: moderateScale(11),
        color: '#5C727D',
        fontFamily: FONTS_FAMILY.Natosans_Regular,
        marginBottom: 3,
    },
    statValue: {
        fontSize: moderateScale(18),
        fontWeight: '700',
        fontFamily: FONTS_FAMILY.Natosans_Bold,
    },

    // List Card
    listCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        marginHorizontal: moderateScale(16),
        marginTop: verticalScale(14),
        padding: moderateScale(14),
        borderWidth: 1,
        borderColor: '#EDEDF0',
    },
    listCardTitle: {
        fontSize: moderateScale(11),
        fontWeight: '700',
        color: '#2B4951',
        letterSpacing: 1.2,
        marginBottom: verticalScale(12),
        fontFamily: FONTS_FAMILY.Natosans_Bold,
    },

    // Search
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F8FAFF',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#122D3414',
        paddingHorizontal: moderateScale(12),
        paddingVertical: verticalScale(8),
        gap: 8,
        marginBottom: verticalScale(14),
    },
    searchInput: {
        flex: 1,
        fontSize: moderateScale(13),
        color: '#122D34',
        padding: 0,
        fontFamily: FONTS_FAMILY.Natosans_Regular,
    },

    // Table Header
    tableHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F8FAFF',
        borderRadius: 8,
        paddingHorizontal: moderateScale(10),
        paddingVertical: verticalScale(8),
        marginBottom: verticalScale(4),
        borderWidth: 1,
        borderColor: '#F0F0F5',
    },
    tableHeaderText: {
        fontSize: moderateScale(11),
        fontWeight: '600',
        color: '#122D34',
        fontFamily: FONTS_FAMILY.Natosans_Medium,
    },

    // Attendance Row
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: verticalScale(10),
        paddingHorizontal: moderateScale(4),
        borderBottomWidth: 1,
        borderBottomColor: '#F2F2F5',
    },
    rowHighlight: {
        backgroundColor: '#F0F4FF',
        borderRadius: 10,
        paddingHorizontal: moderateScale(8),
        marginHorizontal: -moderateScale(4),
    },
    rowCell: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 7,
    },
    rowAvatar: {
        width: moderateScale(30),
        height: moderateScale(30),
        borderRadius: moderateScale(15),
        backgroundColor: '#EEE',
        flexShrink: 0,
    },
    rowNameWrap: { flex: 1 },
    rowName: {
        fontSize: moderateScale(12),
        fontWeight: '600',
        color: '#122D34',
        fontFamily: FONTS_FAMILY.Natosans_Medium,
    },
    rowId: {
        fontSize: moderateScale(10),
        color: '#94A3B8',
        fontFamily: FONTS_FAMILY.Natosans_Regular,
    },
    rowTime: {
        fontSize: moderateScale(12),
        color: '#5C727D',
        fontFamily: FONTS_FAMILY.Natosans_Regular,
    },
    rowShift: {
        fontSize: moderateScale(10),
        color: '#B0B8C1',
        marginTop: 1,
        fontFamily: FONTS_FAMILY.Natosans_Regular,
    },
    rowHours: {
        fontSize: moderateScale(10),
        color: '#746CFF',
        marginTop: 1,
        fontFamily: FONTS_FAMILY.Natosans_Regular,
    },
    statusBadge: {
        alignSelf: 'flex-start',
        paddingHorizontal: 7,
        paddingVertical: 3,
        borderRadius: 6,
    },
    statusText: {
        fontSize: moderateScale(10),
        fontWeight: '700',
        fontFamily: FONTS_FAMILY.Natosans_Bold,
    },

    // 3-dot Menu
    menuWrap: {
        width: 20,
        alignItems: 'flex-end',
        position: 'relative',
    },
    menuTrigger: { padding: 2 },
    dropdown: {
        position: 'absolute',
        top: 22,
        right: 0,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#EDEDF0',
        zIndex: 99,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 10,
        elevation: 6,
        minWidth: 140,
    },
    dropdownItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: moderateScale(14),
        paddingVertical: verticalScale(10),
        gap: 8,
    },
    dropdownItemText: {
        fontSize: moderateScale(13),
        color: '#122D34',
        fontFamily: FONTS_FAMILY.Natosans_Regular,
    },
    dropdownDivider: {
        height: 1,
        backgroundColor: '#F2F2F5',
    },

    // Empty
    emptyState: {
        alignItems: 'center',
        paddingVertical: verticalScale(30),
        gap: 8,
    },
    emptyText: {
        fontSize: moderateScale(14),
        color: '#94A3B8',
        fontFamily: FONTS_FAMILY.Natosans_Regular,
    },

    // Pagination
    pagination: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: verticalScale(16),
    },
    pageArrowBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3,
    },
    pageBtnDisabled: { opacity: 0.35 },
    pagePrevNext: {
        fontSize: moderateScale(13),
        fontWeight: '500',
        color: '#5C727D',
        fontFamily: FONTS_FAMILY.Natosans_Medium,
    },
    pageTextDisabled: { color: '#C0C0D0' },
    pageNumbers: {
        flexDirection: 'row',
        gap: 5,
    },
    pageNumber: {
        width: 28,
        height: 28,
        borderRadius: 7,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F3F6F9',
    },
    pageNumberActive: {
        backgroundColor: '#746CFF',
        shadowColor: '#746CFF',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 4,
    },
    pageNumberDots: {
        backgroundColor: 'transparent',
    },
    pageNumberText: {
        fontSize: moderateScale(12),
        fontWeight: '600',
        color: '#5C727D',
        fontFamily: FONTS_FAMILY.Natosans_Medium,
    },
    pageNumberTextActive: {
        color: '#FFFFFF',
        fontFamily: FONTS_FAMILY.Natosans_Bold,
    },
});

export default DailyAttendance;