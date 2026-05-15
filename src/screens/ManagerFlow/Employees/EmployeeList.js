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

// 2.4 cards visible at once — responsive
const STAT_CARD_WIDTH = SCREEN_WIDTH / 2.5;

// ─── Static Data ──────────────────────────────────────────────────────────────
const employeeSummary = {
    totalEmployees: 248,
    newEmployees: 34,
    activeEmployees: 210,
    male: 145,
    female: 103,
};

const staticEmployees = [
    { _id: '1',  FullName: 'Rahul Sharma',   JobTitle: 'Frontend Developer', Manager: 'Amit Verma',  EmploymentStatus: 'Active',   Department: 'Engineering',     JoinDate: '01 Jan 2023', BaseSalary: '₹85,000',   EmployeeType: 'Full-time', ProfileImage: 'https://i.pravatar.cc/150?u=rahul'   },
    { _id: '2',  FullName: 'Priya Singh',    JobTitle: 'UI/UX Designer',     Manager: 'Neha Joshi',  EmploymentStatus: 'Active',   Department: 'Design',          JoinDate: '15 Mar 2023', BaseSalary: '₹78,000',   EmployeeType: 'Full-time', ProfileImage: 'https://i.pravatar.cc/150?u=priya'   },
    { _id: '3',  FullName: 'Arjun Mehta',    JobTitle: 'Backend Developer',  Manager: 'Amit Verma',  EmploymentStatus: 'Active',   Department: 'Engineering',     JoinDate: '10 Feb 2022', BaseSalary: '₹92,000',   EmployeeType: 'Full-time', ProfileImage: 'https://i.pravatar.cc/150?u=arjun'   },
    { _id: '4',  FullName: 'Sneha Patil',    JobTitle: 'HR Manager',         Manager: 'Ravi Kumar',  EmploymentStatus: 'Active',   Department: 'Human Resources', JoinDate: '05 Jul 2021', BaseSalary: '₹70,000',   EmployeeType: 'Full-time', ProfileImage: 'https://i.pravatar.cc/150?u=sneha'   },
    { _id: '5',  FullName: 'Vikram Rao',     JobTitle: 'DevOps Engineer',    Manager: 'Amit Verma',  EmploymentStatus: 'Inactive', Department: 'Engineering',     JoinDate: '20 Nov 2022', BaseSalary: '₹95,000',   EmployeeType: 'Contract',  ProfileImage: 'https://i.pravatar.cc/150?u=vikram'  },
    { _id: '6',  FullName: 'Anjali Gupta',   JobTitle: 'Product Manager',    Manager: 'Ravi Kumar',  EmploymentStatus: 'Active',   Department: 'Product',         JoinDate: '12 Apr 2020', BaseSalary: '₹1,10,000', EmployeeType: 'Full-time', ProfileImage: 'https://i.pravatar.cc/150?u=anjali'  },
    { _id: '7',  FullName: 'Rohan Desai',    JobTitle: 'QA Engineer',        Manager: 'Neha Joshi',  EmploymentStatus: 'Active',   Department: 'Quality',         JoinDate: '08 Aug 2023', BaseSalary: '₹65,000',   EmployeeType: 'Full-time', ProfileImage: 'https://i.pravatar.cc/150?u=rohan'   },
    { _id: '8',  FullName: 'Kavya Nair',     JobTitle: 'Data Analyst',       Manager: 'Amit Verma',  EmploymentStatus: 'Active',   Department: 'Analytics',       JoinDate: '25 Sep 2022', BaseSalary: '₹80,000',   EmployeeType: 'Part-time', ProfileImage: 'https://i.pravatar.cc/150?u=kavya'   },
    { _id: '9',  FullName: 'Suresh Iyer',    JobTitle: 'Sales Executive',    Manager: 'Ravi Kumar',  EmploymentStatus: 'Active',   Department: 'Sales',           JoinDate: '14 Dec 2021', BaseSalary: '₹55,000',   EmployeeType: 'Full-time', ProfileImage: 'https://i.pravatar.cc/150?u=suresh'  },
    { _id: '10', FullName: 'Meera Joshi',    JobTitle: 'Content Writer',     Manager: 'Neha Joshi',  EmploymentStatus: 'Inactive', Department: 'Marketing',       JoinDate: '30 Jun 2023', BaseSalary: '₹50,000',   EmployeeType: 'Contract',  ProfileImage: 'https://i.pravatar.cc/150?u=meera'   },
    { _id: '11', FullName: 'Aditya Bhatt',   JobTitle: 'Mobile Developer',   Manager: 'Amit Verma',  EmploymentStatus: 'Active',   Department: 'Engineering',     JoinDate: '02 Feb 2024', BaseSalary: '₹88,000',   EmployeeType: 'Full-time', ProfileImage: 'https://i.pravatar.cc/150?u=aditya'  },
    { _id: '12', FullName: 'Pooja Kulkarni', JobTitle: 'Finance Analyst',    Manager: 'Ravi Kumar',  EmploymentStatus: 'Active',   Department: 'Finance',         JoinDate: '18 Oct 2020', BaseSalary: '₹75,000',   EmployeeType: 'Full-time', ProfileImage: 'https://i.pravatar.cc/150?u=pooja'   },
];

const statCards = [
    { title: 'Total Employees', key: 'totalEmployees',  icon: 'account-group-outline',  color: '#FF9F43', bg: '#FF9F431A' },
    { title: 'New Employees',   key: 'newEmployees',    icon: 'account-plus-outline',   color: '#A064FF', bg: '#A064FF1A' },
    { title: 'Active',          key: 'activeEmployees', icon: 'account-check-outline',  color: '#28C76F', bg: '#28C76F1A' },
    { title: 'Male',            key: 'male',            icon: 'gender-male',            color: '#00CFE8', bg: '#00CFE81A' },
    { title: 'Female',          key: 'female',          icon: 'gender-female',          color: '#F64E60', bg: '#F64E601A' },
];

const ITEMS_PER_PAGE = 6;

// ─── Main Screen ──────────────────────────────────────────────────────────────
const Employees = ({ navigation }) => {
    const [employees, setEmployees]         = useState(staticEmployees);
    const [searchQuery, setSearchQuery]     = useState('');
    const [currentPage, setCurrentPage]     = useState(1);
    const [openMenuId, setOpenMenuId]       = useState(null);
    const [deleteModal, setDeleteModal]     = useState({ visible: false, employee: null });
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [isDrawerVisible, setDrawerVisible] = useState(false);

    const toggleDrawer = () => setDrawerVisible(prev => !prev);

    const filtered = employees.filter(e =>
        e.FullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.Department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.JobTitle.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
    const paginated  = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    const handleSearch = (text) => { setSearchQuery(text); setCurrentPage(1); };

    const handleDelete = () => {
        setDeleteLoading(true);
        setTimeout(() => {
            setEmployees(prev => prev.filter(e => e._id !== deleteModal.employee._id));
            setDeleteLoading(false);
            setDeleteModal({ visible: false, employee: null });
        }, 800);
    };

    const comingSoon = () => Alert.alert('Coming Soon 🚀', 'This feature will be available soon!');

    return (
        <View style={styles.root}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

            {/* ── Header ── */}
            <View style={styles.header}>
                <View>
                    <Text style={styles.headerTitle}>Employees</Text>
                    <Text style={styles.headerSub}>Manage all employee records</Text>
                </View>
                <View style={styles.headerRight}>
                    <TouchableOpacity style={styles.headerIconBtn} onPress={comingSoon}>
                        <Feather name="download" size={18} color="#122D34" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.headerIconBtn} onPress={comingSoon}>
                        <Feather name="plus" size={18} color="#122D34" />
                    </TouchableOpacity>
                    {/* Same menu button pattern as Dashboard */}
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
                    style={styles.statScroll}
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
                            <Text style={styles.statCount}>{employeeSummary[card.key]}</Text>
                            <Text style={styles.statTitle}>{card.title}</Text>
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

                    {/* Employee Rows */}
                    {paginated.length === 0 ? (
                        <View style={styles.emptyState}>
                            <MaterialCommunityIcons name="account-search-outline" size={40} color="#C0C0D0" />
                            <Text style={styles.emptyText}>No employees found</Text>
                        </View>
                    ) : (
                        paginated.map((emp) => (
                            <EmployeeRow
                                key={emp._id}
                                emp={emp}
                                isMenuOpen={openMenuId === emp._id}
                                onMenuToggle={() => setOpenMenuId(openMenuId === emp._id ? null : emp._id)}
                                onView={() => { setOpenMenuId(null); comingSoon(); }}
                                onDelete={() => { setOpenMenuId(null); setDeleteModal({ visible: true, employee: emp }); }}
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
                                <Feather name="chevron-left" size={16} color={currentPage === 1 ? '#C0C0D0' : '#5C727D'} />
                                <Text style={[styles.pagePrevNext, currentPage === 1 && styles.pagePrevNextDisabled]}>Prev</Text>
                            </TouchableOpacity>

                            <View style={styles.pageNumbers}>
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                    <TouchableOpacity
                                        key={page}
                                        style={[styles.pageNumber, currentPage === page && styles.pageNumberActive]}
                                        onPress={() => setCurrentPage(page)}
                                    >
                                        <Text style={[styles.pageNumberText, currentPage === page && styles.pageNumberTextActive]}>
                                            {page}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>

                            <TouchableOpacity
                                style={[styles.pageArrowBtn, currentPage === totalPages && styles.pageBtnDisabled]}
                                onPress={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                                disabled={currentPage === totalPages}
                            >
                                <Text style={[styles.pagePrevNext, currentPage === totalPages && styles.pagePrevNextDisabled]}>Next</Text>
                                <Feather name="chevron-right" size={16} color={currentPage === totalPages ? '#C0C0D0' : '#122D34'} />
                            </TouchableOpacity>
                        </View>
                    )}
                </View>

            </ScrollView>

            {/* ── Delete Modal ── */}
            <DeleteModal
                visible={deleteModal.visible}
                employee={deleteModal.employee}
                loading={deleteLoading}
                onClose={() => setDeleteModal({ visible: false, employee: null })}
                onConfirm={handleDelete}
            />

            {/* ── Drawer — same as Dashboard ── */}
            <DrawerModal
                isModalVisible={isDrawerVisible}
                toggleModal={toggleDrawer}
                navigation={navigation}
            />
        </View>
    );
};

// ─── Employee Row ─────────────────────────────────────────────────────────────
const EmployeeRow = ({ emp, isMenuOpen, onMenuToggle, onView, onDelete }) => (
    <View style={styles.empRow}>
        <Image source={{ uri: emp.ProfileImage }} style={styles.empAvatar} />
        <View style={styles.empInfo}>
            <Text style={styles.empName} numberOfLines={1}>{emp.FullName}</Text>
            <Text style={styles.empRole} numberOfLines={1}>{emp.JobTitle}</Text>
            <View style={styles.empMeta}>
                <View style={styles.empMetaItem}>
                    <MaterialCommunityIcons name="office-building-outline" size={11} color="#94A3B8" />
                    <Text style={styles.empMetaText}>{emp.Department}</Text>
                </View>
                <View style={styles.empMetaItem}>
                    <MaterialCommunityIcons name="calendar-outline" size={11} color="#94A3B8" />
                    <Text style={styles.empMetaText}>{emp.JoinDate}</Text>
                </View>
            </View>
            <View style={styles.empBottomRow}>
                <View style={[styles.statusBadge, { backgroundColor: emp.EmploymentStatus === 'Active' ? '#E8F9F1' : '#FEE2E2' }]}>
                    <Text style={[styles.statusText, { color: emp.EmploymentStatus === 'Active' ? '#28C76F' : '#EF4444' }]}>
                        {emp.EmploymentStatus}
                    </Text>
                </View>
                <Text style={styles.empSalary}>{emp.BaseSalary}</Text>
                <View style={styles.empTypeBadge}>
                    <Text style={styles.empTypeText}>{emp.EmployeeType}</Text>
                </View>
            </View>
        </View>

        {/* 3-dot Menu */}
        <View style={styles.menuWrap}>
            <TouchableOpacity onPress={onMenuToggle} style={styles.menuTrigger}>
                <Feather name="more-vertical" size={18} color="#5C727D" />
            </TouchableOpacity>
            {isMenuOpen && (
                <View style={styles.dropdown}>
                    <TouchableOpacity style={styles.dropdownItem} onPress={onView}>
                        <Feather name="eye" size={14} color="#746CFF" />
                        <Text style={styles.dropdownItemText}>View Details</Text>
                    </TouchableOpacity>
                    <View style={styles.dropdownDivider} />
                    <TouchableOpacity style={styles.dropdownItem} onPress={onDelete}>
                        <Feather name="trash-2" size={14} color="#EF4444" />
                        <Text style={[styles.dropdownItemText, { color: '#EF4444' }]}>Delete</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    </View>
);

// ─── Delete Modal ─────────────────────────────────────────────────────────────
const DeleteModal = ({ visible, employee, loading, onClose, onConfirm }) => (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
        <View style={styles.modalOverlay}>
            <View style={styles.modalBox}>
                <View style={styles.modalIconWrap}>
                    <MaterialCommunityIcons name="delete-outline" size={28} color="#EF4444" />
                </View>
                <Text style={styles.modalTitle}>Delete Employee</Text>
                <Text style={styles.modalSub}>
                    Are you sure you want to delete{' '}
                    <Text style={{ fontFamily: FONTS_FAMILY.Natosans_Bold, color: '#122D34' }}>{employee?.FullName}</Text>?
                    {'\n'}This action cannot be undone.
                </Text>
                <View style={styles.modalBtns}>
                    <TouchableOpacity style={styles.modalCancelBtn} onPress={onClose}>
                        <Text style={styles.modalCancelText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.modalDeleteBtn, loading && { opacity: 0.6 }]}
                        onPress={onConfirm}
                        disabled={loading}
                    >
                        <Text style={styles.modalDeleteText}>{loading ? 'Deleting...' : 'Delete'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </Modal>
);

// ─── Styles ──────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#F7F8FA',
    },

    // ── Header (same pattern as Dashboard) ──
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
    // Same purple menu button as Dashboard
    avatarBtn: {
        width: 36,
        height: 36,
        borderRadius: 10,
        backgroundColor: '#EEF0FF',
        alignItems: 'center',
        justifyContent: 'center',
    },

    scrollContent: {
        paddingBottom: verticalScale(24),
    },

    // ── Stat Cards ──
    statScroll: {
        marginTop: verticalScale(16),
    },
    statScrollContent: {
        paddingHorizontal: moderateScale(16),
        gap: moderateScale(8),
    },
    statCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: moderateScale(10),
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
    statCount: {
        fontSize: moderateScale(24),
        fontWeight: '900',
        color: '#122D34',
        fontFamily: FONTS_FAMILY.Natosans_Bold,
    },
    statTitle: {
        fontSize: moderateScale(11),
        color: '#5C727D',
        marginTop: 2,
        fontFamily: FONTS_FAMILY.Natosans_Regular,
    },

    // ── List Card ──
    listCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        marginHorizontal: moderateScale(16),
        marginTop: verticalScale(14),
        padding: moderateScale(16),
        borderWidth: 1,
        borderColor: '#EDEDF0',
    },
    listCardTitle: {
        fontSize: moderateScale(11),
        fontWeight: '700',
        color: '#122D34',
        letterSpacing: 1.2,
        marginBottom: verticalScale(12),
        fontFamily: FONTS_FAMILY.Natosans_Bold,
    },

    // ── Search ──
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F3F6F9',
        borderRadius: 10,
        paddingHorizontal: moderateScale(12),
        paddingVertical: verticalScale(9),
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

    // ── Empty ──
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

    // ── Employee Row ──
    empRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingVertical: verticalScale(12),
        borderBottomWidth: 1,
        borderBottomColor: '#F2F2F5',
        gap: 10,
    },
    empAvatar: {
        width: moderateScale(44),
        height: moderateScale(44),
        borderRadius: moderateScale(22),
        backgroundColor: '#EEE',
        flexShrink: 0,
    },
    empInfo: { flex: 1 },
    empName: {
        fontSize: moderateScale(13),
        fontWeight: '700',
        color: '#122D34',
        fontFamily: FONTS_FAMILY.Natosans_Medium,
    },
    empRole: {
        fontSize: moderateScale(11),
        color: '#5C727D',
        marginTop: 1,
        fontFamily: FONTS_FAMILY.Natosans_Regular,
    },
    empMeta: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginTop: verticalScale(4),
    },
    empMetaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3,
    },
    empMetaText: {
        fontSize: moderateScale(10),
        color: '#94A3B8',
        fontFamily: FONTS_FAMILY.Natosans_Regular,
    },
    empBottomRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginTop: verticalScale(5),
        flexWrap: 'wrap',
    },
    statusBadge: {
        paddingHorizontal: 7,
        paddingVertical: 2,
        borderRadius: 6,
    },
    statusText: {
        fontSize: moderateScale(10),
        fontWeight: '700',
        textTransform: 'uppercase',
        fontFamily: FONTS_FAMILY.Natosans_Bold,
    },
    empSalary: {
        fontSize: moderateScale(11),
        fontWeight: '600',
        color: '#122D34',
        fontFamily: FONTS_FAMILY.Natosans_Medium,
    },
    empTypeBadge: {
        paddingHorizontal: 7,
        paddingVertical: 2,
        borderRadius: 6,
        backgroundColor: '#EEF2FF',
    },
    empTypeText: {
        fontSize: moderateScale(10),
        color: '#746CFF',
        fontWeight: '600',
        fontFamily: FONTS_FAMILY.Natosans_Medium,
    },

    // ── 3-dot Dropdown ──
    menuWrap: {
        position: 'relative',
        alignItems: 'flex-end',
    },
    menuTrigger: { padding: 4 },
    dropdown: {
        position: 'absolute',
        top: 28,
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
        minWidth: 145,
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

    // ── Pagination ──
    pagination: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: verticalScale(16),
    },
    pageArrowBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    pageBtnDisabled: { opacity: 0.35 },
    pagePrevNext: {
        fontSize: moderateScale(13),
        fontWeight: '500',
        color: '#5C727D',
        fontFamily: FONTS_FAMILY.Natosans_Medium,
    },
    pagePrevNextDisabled: { color: '#C0C0D0' },
    pageNumbers: {
        flexDirection: 'row',
        gap: 6,
    },
    pageNumber: {
        width: 30,
        height: 30,
        borderRadius: 8,
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

    // ── Delete Modal ──
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.45)',
        alignItems: 'center',
        justifyContent: 'center',
        padding: moderateScale(24),
    },
    modalBox: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: moderateScale(24),
        width: '100%',
        alignItems: 'center',
    },
    modalIconWrap: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#FEE2E2',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: verticalScale(14),
    },
    modalTitle: {
        fontSize: moderateScale(16),
        fontWeight: '700',
        color: '#122D34',
        marginBottom: verticalScale(8),
        fontFamily: FONTS_FAMILY.Natosans_Bold,
    },
    modalSub: {
        fontSize: moderateScale(13),
        color: '#5C727D',
        textAlign: 'center',
        lineHeight: 20,
        marginBottom: verticalScale(20),
        fontFamily: FONTS_FAMILY.Natosans_Regular,
    },
    modalBtns: {
        flexDirection: 'row',
        gap: 10,
        width: '100%',
    },
    modalCancelBtn: {
        flex: 1,
        paddingVertical: verticalScale(11),
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#EDEDF0',
        alignItems: 'center',
    },
    modalCancelText: {
        fontSize: moderateScale(13),
        fontWeight: '600',
        color: '#5C727D',
        fontFamily: FONTS_FAMILY.Natosans_Medium,
    },
    modalDeleteBtn: {
        flex: 1,
        paddingVertical: verticalScale(11),
        borderRadius: 12,
        backgroundColor: '#EF4444',
        alignItems: 'center',
    },
    modalDeleteText: {
        fontSize: moderateScale(13),
        fontWeight: '700',
        color: '#FFFFFF',
        fontFamily: FONTS_FAMILY.Natosans_Bold,
    },
});

export default Employees;