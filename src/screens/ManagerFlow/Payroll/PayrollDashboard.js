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
import { FONTS_FAMILY } from '../../../assets/Fonts';
import DrawerModal from '../../../components/DrawerModal';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const STAT_CARD_WIDTH = SCREEN_WIDTH / 2.3;

// ─── Static Data ──────────────────────────────────────────────────────────────
const staticStats = {
    netPay:            '₹ 18,42,500',
    employeesPaid:     '142',
    totalCost:         '₹ 22,10,000',
    pendingApprovals:  '8',
};

const staticPayroll = [
    { _id: '1',  Employee: { EmployeeID: 'EMP001', FullName: 'Rahul Sharma',   ProfileImage: 'https://i.pravatar.cc/150?u=rahul',   Department: 'Engineering', JobTitle: 'Sr. Engineer'   }, BaseSalary: 95000,  createdAt: '2025-05-01' },
    { _id: '2',  Employee: { EmployeeID: 'EMP002', FullName: 'Priya Singh',    ProfileImage: 'https://i.pravatar.cc/150?u=priya',   Department: 'HR',          JobTitle: 'HR Manager'     }, BaseSalary: 75000,  createdAt: '2025-05-01' },
    { _id: '3',  Employee: { EmployeeID: 'EMP003', FullName: 'Arjun Mehta',    ProfileImage: 'https://i.pravatar.cc/150?u=arjun',   Department: 'Finance',     JobTitle: 'Accountant'     }, BaseSalary: 68000,  createdAt: '2025-05-02' },
    { _id: '4',  Employee: { EmployeeID: 'EMP004', FullName: 'Sneha Patil',    ProfileImage: 'https://i.pravatar.cc/150?u=sneha',   Department: 'Design',      JobTitle: 'UI Designer'    }, BaseSalary: 72000,  createdAt: '2025-05-02' },
    { _id: '5',  Employee: { EmployeeID: 'EMP005', FullName: 'Vikram Rao',     ProfileImage: 'https://i.pravatar.cc/150?u=vikram',  Department: 'Operations',  JobTitle: 'Ops Lead'       }, BaseSalary: 82000,  createdAt: '2025-05-03' },
    { _id: '6',  Employee: { EmployeeID: 'EMP006', FullName: 'Anjali Gupta',   ProfileImage: 'https://i.pravatar.cc/150?u=anjali',  Department: 'Marketing',   JobTitle: 'Growth Manager' }, BaseSalary: 78000,  createdAt: '2025-05-03' },
    { _id: '7',  Employee: { EmployeeID: 'EMP007', FullName: 'Rohan Desai',    ProfileImage: 'https://i.pravatar.cc/150?u=rohan',   Department: 'Engineering', JobTitle: 'Backend Dev'    }, BaseSalary: 91000,  createdAt: '2025-05-04' },
    { _id: '8',  Employee: { EmployeeID: 'EMP008', FullName: 'Kavya Nair',     ProfileImage: 'https://i.pravatar.cc/150?u=kavya',   Department: 'HR',          JobTitle: 'Recruiter'      }, BaseSalary: 62000,  createdAt: '2025-05-04' },
    { _id: '9',  Employee: { EmployeeID: 'EMP009', FullName: 'Suresh Iyer',    ProfileImage: 'https://i.pravatar.cc/150?u=suresh',  Department: 'Finance',     JobTitle: 'CFO'            }, BaseSalary: 145000, createdAt: '2025-05-05' },
    { _id: '10', Employee: { EmployeeID: 'EMP010', FullName: 'Meera Joshi',    ProfileImage: 'https://i.pravatar.cc/150?u=meera',   Department: 'Design',      JobTitle: 'Product Mgr'    }, BaseSalary: 88000,  createdAt: '2025-05-05' },
    { _id: '11', Employee: { EmployeeID: 'EMP011', FullName: 'Aditya Bhatt',   ProfileImage: 'https://i.pravatar.cc/150?u=aditya',  Department: 'Operations',  JobTitle: 'DevOps Eng'     }, BaseSalary: 97000,  createdAt: '2025-05-06' },
    { _id: '12', Employee: { EmployeeID: 'EMP012', FullName: 'Pooja Kulkarni', ProfileImage: 'https://i.pravatar.cc/150?u=pooja',   Department: 'Marketing',   JobTitle: 'Content Lead'   }, BaseSalary: 67000,  createdAt: '2025-05-06' },
];

const statCards = [
    { title: 'Net Pay',           key: 'netPay',           icon: 'cash-multiple',           color: '#FF9F43', bg: '#FF9F431A' },
    { title: 'Employees Paid',    key: 'employeesPaid',    icon: 'account-group-outline',   color: '#A064FF', bg: '#A064FF1A' },
    { title: 'Total Cost',        key: 'totalCost',        icon: 'flag-outline',            color: '#F64E60', bg: '#F64E601A' },
    { title: 'Pending Approvals', key: 'pendingApprovals', icon: 'clock-alert-outline',     color: '#28C76F', bg: '#28C76F1A' },
];

const ITEMS_PER_PAGE = 6;

// ─── Edit Payroll Bottom Sheet ────────────────────────────────────────────────
const EditPayrollSheet = ({ visible, payroll, onClose, comingSoon }) => {
    if (!payroll) return null;
    return (
        <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
            <TouchableOpacity style={styles.sheetOverlay} activeOpacity={1} onPress={onClose} />
            <View style={styles.sheet}>
                <View style={styles.sheetHandle} />
                <View style={styles.sheetHeaderRow}>
                    <View>
                        <Text style={styles.sheetTitle}>Edit Payroll</Text>
                        <Text style={styles.sheetSub}>{payroll.Employee?.FullName} · {payroll.Employee?.EmployeeID}</Text>
                    </View>
                    <TouchableOpacity onPress={onClose} style={styles.sheetClose}>
                        <Feather name="x" size={18} color="#5C727D" />
                    </TouchableOpacity>
                </View>

                {[
                    { label: 'Department', value: payroll.Employee?.Department },
                    { label: 'Job Title',  value: payroll.Employee?.JobTitle   },
                ].map(f => (
                    <View key={f.label} style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>{f.label}</Text>
                        <View style={styles.inputBox}>
                            <TextInput
                                style={styles.textInput}
                                defaultValue={f.value}
                                placeholderTextColor="#94A3B8"
                            />
                        </View>
                    </View>
                ))}

                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Base Salary (₹)</Text>
                    <View style={styles.inputBox}>
                        <TextInput
                            style={styles.textInput}
                            defaultValue={payroll.BaseSalary?.toString()}
                            keyboardType="numeric"
                            placeholderTextColor="#94A3B8"
                        />
                    </View>
                </View>

                <View style={styles.sheetFooter}>
                    <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
                        <Text style={styles.cancelBtnText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.saveBtn} onPress={() => { comingSoon('Save Payroll'); onClose(); }}>
                        <Text style={styles.saveBtnText}>Save Changes</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

// ─── Payroll Row ──────────────────────────────────────────────────────────────
const PayrollRow = ({ emp, isFirst, isMenuOpen, onMenuToggle, onEdit }) => {
    const formatDate = (d) => {
        const dt = new Date(d);
        return `${dt.getDate()}/${dt.getMonth() + 1}/${dt.getFullYear().toString().slice(-2)}`;
    };

    return (
        <View style={[styles.row, isFirst && styles.rowHighlight]}>
            {/* Avatar + Name */}
            <View style={[styles.rowCell, { flex: 1.6 }]}>
                <Image source={{ uri: emp.Employee.ProfileImage }} style={styles.rowAvatar} />
                <View style={styles.rowNameWrap}>
                    <Text style={styles.rowName} numberOfLines={1}>{emp.Employee.FullName}</Text>
                    <Text style={styles.rowId}>{emp.Employee.EmployeeID}</Text>
                </View>
            </View>

            {/* Dept + Role stacked */}
            <View style={{ flex: 1.1 }}>
                <Text style={styles.rowDept} numberOfLines={1}>{emp.Employee.Department}</Text>
                <Text style={styles.rowRole} numberOfLines={1}>{emp.Employee.JobTitle}</Text>
            </View>

            {/* Net Pay */}
            <View style={{ flex: 0.9 }}>
                <Text style={styles.rowSalary}>₹{(emp.BaseSalary / 1000).toFixed(0)}k</Text>
                <Text style={styles.rowDate}>{formatDate(emp.createdAt)}</Text>
            </View>

            {/* 3-dot menu */}
            <View style={styles.menuWrap}>
                <TouchableOpacity onPress={onMenuToggle} style={styles.menuTrigger}>
                    <Feather name="more-vertical" size={16} color="#5C727D" />
                </TouchableOpacity>
                {isMenuOpen && (
                    <View style={styles.dropdown}>
                        <TouchableOpacity style={styles.dropdownItem} onPress={onEdit}>
                            <Feather name="edit-2" size={13} color="#746CFF" />
                            <Text style={styles.dropdownItemText}>Edit</Text>
                        </TouchableOpacity>
                        <View style={styles.dropdownDivider} />
                        <TouchableOpacity style={styles.dropdownItem} onPress={() => Alert.alert('Coming Soon 🚀')}>
                            <Feather name="eye" size={13} color="#28C76F" />
                            <Text style={[styles.dropdownItemText, { color: '#28C76F' }]}>View Slip</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </View>
    );
};

// ─── Main Screen ──────────────────────────────────────────────────────────────
const PayrollOverviewScreen = ({ navigation }) => {
    const [payroll]                           = useState(staticPayroll);
    const [searchQuery, setSearchQuery]       = useState('');
    const [currentPage, setCurrentPage]       = useState(1);
    const [openMenuId, setOpenMenuId]         = useState(null);
    const [isDrawerVisible, setDrawerVisible] = useState(false);
    const [editSheetVisible, setEditSheet]    = useState(false);
    const [selectedPayroll, setSelectedPayroll] = useState(null);

    const toggleDrawer = () => setDrawerVisible(prev => !prev);
    const comingSoon   = (label = '') =>
        Alert.alert('Coming Soon 🚀', `${label ? label + ' — ' : ''}This feature will be available soon!`);

    const filtered = payroll.filter(e =>
        e.Employee.FullName.toLowerCase().includes(searchQuery.toLowerCase())    ||
        e.Employee.EmployeeID.toLowerCase().includes(searchQuery.toLowerCase())  ||
        e.Employee.Department.toLowerCase().includes(searchQuery.toLowerCase())  ||
        e.Employee.JobTitle.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
    const paginated  = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    const handleSearch = (text) => { setSearchQuery(text); setCurrentPage(1); };

    const getPaginationGroup = () => {
        if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);
        if (currentPage <= 2) return [1, 2, 3, '...', totalPages];
        if (currentPage >= totalPages - 1) return [1, '...', totalPages - 2, totalPages - 1, totalPages];
        return [1, '...', currentPage, '...', totalPages];
    };

    const openEdit = (emp) => {
        setSelectedPayroll(emp);
        setOpenMenuId(null);
        setEditSheet(true);
    };

    return (
        <View style={styles.root}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

            {/* ── Header ── */}
            <View style={styles.header}>
                <View>
                    <Text style={styles.headerTitle}>Payroll Overview</Text>
                    <Text style={styles.headerSub}>Manage and execute payroll cycles</Text>
                </View>
                <View style={styles.headerRight}>
                    <TouchableOpacity style={styles.headerIconBtn} onPress={() => comingSoon('Export')}>
                        <Feather name="download" size={18} color="#122D34" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.addBtn} onPress={() => comingSoon('Create Pay Run')}>
                        <Feather name="plus" size={16} color="#FFFFFF" />
                    </TouchableOpacity>
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
                {/* ── Stat Cards ── */}
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
                            <Text style={[styles.statValue, { color: card.color }]}>{staticStats[card.key]}</Text>
                        </View>
                    ))}
                </ScrollView>

                {/* ── Pay Runs Info Banner ── */}
                <View style={styles.bannerCard}>
                    <View style={styles.bannerLeft}>
                        <View style={styles.bannerIconWrap}>
                            <MaterialCommunityIcons name="cash-register" size={22} color="#746CFF" />
                        </View>
                        <View>
                            <Text style={styles.bannerTitle}>Pay Runs</Text>
                            <Text style={styles.bannerSub}>Next run: June 1, 2025</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.bannerBtn} onPress={() => comingSoon('Pay Run')}>
                        <Text style={styles.bannerBtnText}>Run Now</Text>
                    </TouchableOpacity>
                </View>

                {/* ── Employee List Card ── */}
                <View style={styles.listCard}>
                    <Text style={styles.listCardTitle}>EMPLOYEE PAYROLL</Text>

                    {/* Search */}
                    <View style={styles.searchBar}>
                        <Feather name="search" size={15} color="#5C727D" />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search by name, dept, role..."
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
                        <Text style={[styles.tableHeaderText, { flex: 1.6 }]}>Employee</Text>
                        <Text style={[styles.tableHeaderText, { flex: 1.1 }]}>Dept / Role</Text>
                        <Text style={[styles.tableHeaderText, { flex: 0.9 }]}>Net Pay</Text>
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
                            <PayrollRow
                                key={emp._id}
                                emp={emp}
                                isFirst={index === 0 && currentPage === 1}
                                isMenuOpen={openMenuId === emp._id}
                                onMenuToggle={() => setOpenMenuId(openMenuId === emp._id ? null : emp._id)}
                                onEdit={() => openEdit(emp)}
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
            </ScrollView>

            {/* ── Edit Payroll Sheet ── */}
            <EditPayrollSheet
                visible={editSheetVisible}
                payroll={selectedPayroll}
                onClose={() => setEditSheet(false)}
                comingSoon={comingSoon}
            />

            {/* ── Drawer ── */}
            <DrawerModal
                isModalVisible={isDrawerVisible}
                toggleModal={toggleDrawer}
                navigation={navigation}
            />
        </View>
    );
};

// ─── Styles ───────────────────────────────────────────────────────────────────
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
    addBtn: {
        width: 36,
        height: 36,
        borderRadius: 10,
        backgroundColor: '#746CFF',
        alignItems: 'center',
        justifyContent: 'center',
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
        fontSize: moderateScale(17),
        fontWeight: '700',
        fontFamily: FONTS_FAMILY.Natosans_Bold,
    },

    // Banner Card
    bannerCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        marginHorizontal: moderateScale(16),
        marginTop: verticalScale(14),
        paddingHorizontal: moderateScale(14),
        paddingVertical: verticalScale(12),
        borderWidth: 1,
        borderColor: '#EDEDF0',
    },
    bannerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    bannerIconWrap: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: '#EEF0FF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bannerTitle: {
        fontSize: moderateScale(14),
        fontWeight: '700',
        color: '#122D34',
        fontFamily: FONTS_FAMILY.Natosans_Medium,
    },
    bannerSub: {
        fontSize: moderateScale(11),
        color: '#5C727D',
        marginTop: 2,
        fontFamily: FONTS_FAMILY.Natosans_Regular,
    },
    bannerBtn: {
        backgroundColor: '#746CFF',
        paddingHorizontal: moderateScale(16),
        paddingVertical: verticalScale(8),
        borderRadius: 10,
    },
    bannerBtnText: {
        fontSize: moderateScale(13),
        fontWeight: '700',
        color: '#FFFFFF',
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

    // Row
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
        marginTop: 1,
    },
    rowDept: {
        fontSize: moderateScale(12),
        fontWeight: '600',
        color: '#122D34',
        fontFamily: FONTS_FAMILY.Natosans_Medium,
    },
    rowRole: {
        fontSize: moderateScale(10),
        color: '#94A3B8',
        fontFamily: FONTS_FAMILY.Natosans_Regular,
        marginTop: 1,
    },
    rowSalary: {
        fontSize: moderateScale(13),
        fontWeight: '700',
        color: '#746CFF',
        fontFamily: FONTS_FAMILY.Natosans_Bold,
    },
    rowDate: {
        fontSize: moderateScale(10),
        color: '#B0B8C1',
        fontFamily: FONTS_FAMILY.Natosans_Regular,
        marginTop: 1,
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

    // Edit Sheet
    sheetOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    sheet: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingHorizontal: moderateScale(20),
        paddingBottom: verticalScale(36),
        paddingTop: verticalScale(10),
    },
    sheetHandle: {
        width: 40,
        height: 4,
        borderRadius: 2,
        backgroundColor: '#E0E0E8',
        alignSelf: 'center',
        marginBottom: verticalScale(16),
    },
    sheetHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: verticalScale(20),
    },
    sheetTitle: {
        fontSize: moderateScale(17),
        fontWeight: '700',
        color: '#122D34',
        fontFamily: FONTS_FAMILY.Natosans_Medium,
    },
    sheetSub: {
        fontSize: moderateScale(12),
        color: '#5C727D',
        marginTop: 3,
        fontFamily: FONTS_FAMILY.Natosans_Regular,
    },
    sheetClose: {
        width: 32,
        height: 32,
        borderRadius: 8,
        backgroundColor: '#F7F8FA',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputGroup: {
        marginBottom: verticalScale(14),
    },
    inputLabel: {
        fontSize: moderateScale(12),
        fontWeight: '600',
        color: '#2B4951',
        marginBottom: verticalScale(6),
        fontFamily: FONTS_FAMILY.Natosans_Medium,
    },
    inputBox: {
        borderWidth: 1,
        borderColor: '#DCE2E4',
        borderRadius: 10,
        backgroundColor: '#F8FAFF',
        paddingHorizontal: moderateScale(14),
        paddingVertical: verticalScale(11),
    },
    textInput: {
        fontSize: moderateScale(14),
        color: '#122D34',
        padding: 0,
        fontFamily: FONTS_FAMILY.Natosans_Regular,
    },
    sheetFooter: {
        flexDirection: 'row',
        gap: 12,
        marginTop: verticalScale(8),
    },
    cancelBtn: {
        flex: 1,
        paddingVertical: verticalScale(13),
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#DCE2E4',
        alignItems: 'center',
    },
    cancelBtnText: {
        fontSize: moderateScale(14),
        fontWeight: '600',
        color: '#5C727D',
        fontFamily: FONTS_FAMILY.Natosans_Medium,
    },
    saveBtn: {
        flex: 1,
        paddingVertical: verticalScale(13),
        borderRadius: 12,
        backgroundColor: '#746CFF',
        alignItems: 'center',
    },
    saveBtnText: {
        fontSize: moderateScale(14),
        fontWeight: '700',
        color: '#FFFFFF',
        fontFamily: FONTS_FAMILY.Natosans_Bold,
    },
});

export default PayrollOverviewScreen;