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

// ─── Static Data ──────────────────────────────────────────────────────────────
const MONTHS = [
    { label: 'Jan', value: 1  }, { label: 'Feb', value: 2  }, { label: 'Mar', value: 3  },
    { label: 'Apr', value: 4  }, { label: 'May', value: 5  }, { label: 'Jun', value: 6  },
    { label: 'Jul', value: 7  }, { label: 'Aug', value: 8  }, { label: 'Sep', value: 9  },
    { label: 'Oct', value: 10 }, { label: 'Nov', value: 11 }, { label: 'Dec', value: 12 },
];
const YEARS = [2024, 2025, 2026, 2027, 2028];

const staticPayslips = [
    { _id: '1',  Employee: { EmployeeID: 'EMP001', FullName: 'Rahul Sharma',   ProfileImage: 'https://i.pravatar.cc/150?u=rahul',   Department: 'Engineering' }, PayRun: { Month: 5, Year: 2025 }, GrossPay: 105000, NetPay: 92000,  Status: 'Paid'    },
    { _id: '2',  Employee: { EmployeeID: 'EMP002', FullName: 'Priya Singh',    ProfileImage: 'https://i.pravatar.cc/150?u=priya',   Department: 'HR'          }, PayRun: { Month: 5, Year: 2025 }, GrossPay: 84000,  NetPay: 75000,  Status: 'Pending' },
    { _id: '3',  Employee: { EmployeeID: 'EMP003', FullName: 'Arjun Mehta',    ProfileImage: 'https://i.pravatar.cc/150?u=arjun',   Department: 'Finance'     }, PayRun: { Month: 5, Year: 2025 }, GrossPay: 77000,  NetPay: 68000,  Status: 'Paid'    },
    { _id: '4',  Employee: { EmployeeID: 'EMP004', FullName: 'Sneha Patil',    ProfileImage: 'https://i.pravatar.cc/150?u=sneha',   Department: 'Design'      }, PayRun: { Month: 5, Year: 2025 }, GrossPay: 81000,  NetPay: 72000,  Status: 'Pending' },
    { _id: '5',  Employee: { EmployeeID: 'EMP005', FullName: 'Vikram Rao',     ProfileImage: 'https://i.pravatar.cc/150?u=vikram',  Department: 'Operations'  }, PayRun: { Month: 5, Year: 2025 }, GrossPay: 92000,  NetPay: 82000,  Status: 'Paid'    },
    { _id: '6',  Employee: { EmployeeID: 'EMP006', FullName: 'Anjali Gupta',   ProfileImage: 'https://i.pravatar.cc/150?u=anjali',  Department: 'Marketing'   }, PayRun: { Month: 4, Year: 2025 }, GrossPay: 88000,  NetPay: 78000,  Status: 'Paid'    },
    { _id: '7',  Employee: { EmployeeID: 'EMP007', FullName: 'Rohan Desai',    ProfileImage: 'https://i.pravatar.cc/150?u=rohan',   Department: 'Engineering' }, PayRun: { Month: 4, Year: 2025 }, GrossPay: 102000, NetPay: 91000,  Status: 'Pending' },
    { _id: '8',  Employee: { EmployeeID: 'EMP008', FullName: 'Kavya Nair',     ProfileImage: 'https://i.pravatar.cc/150?u=kavya',   Department: 'HR'          }, PayRun: { Month: 4, Year: 2025 }, GrossPay: 70000,  NetPay: 62000,  Status: 'Paid'    },
    { _id: '9',  Employee: { EmployeeID: 'EMP009', FullName: 'Suresh Iyer',    ProfileImage: 'https://i.pravatar.cc/150?u=suresh',  Department: 'Finance'     }, PayRun: { Month: 4, Year: 2025 }, GrossPay: 160000, NetPay: 145000, Status: 'Paid'    },
    { _id: '10', Employee: { EmployeeID: 'EMP010', FullName: 'Meera Joshi',    ProfileImage: 'https://i.pravatar.cc/150?u=meera',   Department: 'Design'      }, PayRun: { Month: 3, Year: 2025 }, GrossPay: 98000,  NetPay: 88000,  Status: 'Pending' },
    { _id: '11', Employee: { EmployeeID: 'EMP011', FullName: 'Aditya Bhatt',   ProfileImage: 'https://i.pravatar.cc/150?u=aditya',  Department: 'Operations'  }, PayRun: { Month: 3, Year: 2025 }, GrossPay: 108000, NetPay: 97000,  Status: 'Paid'    },
    { _id: '12', Employee: { EmployeeID: 'EMP012', FullName: 'Pooja Kulkarni', ProfileImage: 'https://i.pravatar.cc/150?u=pooja',   Department: 'Marketing'   }, PayRun: { Month: 3, Year: 2025 }, GrossPay: 76000,  NetPay: 67000,  Status: 'Paid'    },
];

const STATUS_COLORS = {
    Paid:    { text: '#28C76F', bg: '#E8F9F1' },
    Pending: { text: '#FF9F43', bg: '#FFF4E5' },
};

const ITEMS_PER_PAGE = 6;

// ─── Filter Bottom Sheet ──────────────────────────────────────────────────────
const FilterSheet = ({ visible, selectedMonth, selectedYear, onSelectMonth, onSelectYear, onApply, onClose }) => (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
        <TouchableOpacity style={styles.sheetOverlay} activeOpacity={1} onPress={onClose} />
        <View style={styles.sheet}>
            <View style={styles.sheetHandle} />
            <View style={styles.sheetHeaderRow}>
                <Text style={styles.sheetTitle}>Filter Pay Period</Text>
                <TouchableOpacity onPress={onClose} style={styles.sheetClose}>
                    <Feather name="x" size={18} color="#5C727D" />
                </TouchableOpacity>
            </View>

            {/* Month chips */}
            <Text style={styles.filterLabel}>Month</Text>
            <View style={styles.chipRow}>
                {MONTHS.map(m => (
                    <TouchableOpacity
                        key={m.value}
                        style={[styles.chip, selectedMonth === m.value && styles.chipActive]}
                        onPress={() => onSelectMonth(selectedMonth === m.value ? null : m.value)}
                    >
                        <Text style={[styles.chipText, selectedMonth === m.value && styles.chipTextActive]}>
                            {m.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Year chips */}
            <Text style={[styles.filterLabel, { marginTop: verticalScale(14) }]}>Year</Text>
            <View style={styles.chipRow}>
                {YEARS.map(y => (
                    <TouchableOpacity
                        key={y}
                        style={[styles.chip, selectedYear === y && styles.chipActive]}
                        onPress={() => onSelectYear(selectedYear === y ? null : y)}
                    >
                        <Text style={[styles.chipText, selectedYear === y && styles.chipTextActive]}>
                            {y}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <View style={styles.sheetFooter}>
                <TouchableOpacity
                    style={styles.cancelBtn}
                    onPress={() => { onSelectMonth(null); onSelectYear(null); onClose(); }}
                >
                    <Text style={styles.cancelBtnText}>Clear</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.saveBtn} onPress={onApply}>
                    <Text style={styles.saveBtnText}>Apply Filter</Text>
                </TouchableOpacity>
            </View>
        </View>
    </Modal>
);

// ─── Make Paid Confirm Sheet ──────────────────────────────────────────────────
const MakePaidSheet = ({ visible, payslip, onConfirm, onClose }) => {
    if (!payslip) return null;
    return (
        <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
            <TouchableOpacity style={styles.sheetOverlay} activeOpacity={1} onPress={onClose} />
            <View style={styles.sheet}>
                <View style={styles.sheetHandle} />
                <View style={styles.sheetHeaderRow}>
                    <View>
                        <Text style={styles.sheetTitle}>Mark as Paid</Text>
                        <Text style={styles.sheetSub}>{payslip.Employee?.FullName} · {payslip.Employee?.EmployeeID}</Text>
                    </View>
                    <TouchableOpacity onPress={onClose} style={styles.sheetClose}>
                        <Feather name="x" size={18} color="#5C727D" />
                    </TouchableOpacity>
                </View>

                {/* Payslip summary */}
                <View style={styles.summaryCard}>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryKey}>Department</Text>
                        <Text style={styles.summaryVal}>{payslip.Employee?.Department}</Text>
                    </View>
                    <View style={styles.summaryDivider} />
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryKey}>Pay Period</Text>
                        <Text style={styles.summaryVal}>{payslip.PayRun?.Month}/{payslip.PayRun?.Year}</Text>
                    </View>
                    <View style={styles.summaryDivider} />
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryKey}>Gross Pay</Text>
                        <Text style={styles.summaryVal}>₹{payslip.GrossPay?.toLocaleString()}</Text>
                    </View>
                    <View style={styles.summaryDivider} />
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryKey}>Net Pay</Text>
                        <Text style={[styles.summaryVal, { color: '#746CFF', fontFamily: FONTS_FAMILY.Natosans_Bold }]}>
                            ₹{payslip.NetPay?.toLocaleString()}
                        </Text>
                    </View>
                </View>

                <Text style={styles.confirmNote}>
                    This will mark the payslip as <Text style={{ color: '#28C76F', fontFamily: FONTS_FAMILY.Natosans_Bold }}>Paid</Text>. This action cannot be undone.
                </Text>

                <View style={styles.sheetFooter}>
                    <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
                        <Text style={styles.cancelBtnText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.saveBtn, { backgroundColor: '#28C76F' }]} onPress={onConfirm}>
                        <Text style={styles.saveBtnText}>✓  Confirm Paid</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

// ─── Payslip Row ──────────────────────────────────────────────────────────────
const PayslipRow = ({ item, isFirst, isMenuOpen, onMenuToggle, onViewDetails, onMakePaid }) => {
    const statusStyle = STATUS_COLORS[item.Status] || { text: '#5C727D', bg: '#F3F6F9' };
    return (
        <View style={[styles.row, isFirst && styles.rowHighlight]}>
            {/* Avatar + Name */}
            <View style={[styles.rowCell, { flex: 1.5 }]}>
                <Image source={{ uri: item.Employee.ProfileImage }} style={styles.rowAvatar} />
                <View style={styles.rowNameWrap}>
                    <Text style={styles.rowName} numberOfLines={1}>{item.Employee.FullName}</Text>
                    <Text style={styles.rowId}>{item.Employee.EmployeeID}</Text>
                    <Text style={styles.rowDept} numberOfLines={1}>{item.Employee.Department}</Text>
                </View>
            </View>

            {/* Pay info */}
            <View style={{ flex: 1.1 }}>
                <Text style={styles.rowNetPay}>₹{(item.NetPay / 1000).toFixed(0)}k</Text>
                <Text style={styles.rowGross}>Gross ₹{(item.GrossPay / 1000).toFixed(0)}k</Text>
                <Text style={styles.rowPeriod}>{item.PayRun.Month}/{item.PayRun.Year}</Text>
            </View>

            {/* Status badge */}
            <View style={{ flex: 0.8 }}>
                <View style={[styles.statusBadge, { backgroundColor: statusStyle.bg }]}>
                    <Text style={[styles.statusText, { color: statusStyle.text }]}>{item.Status}</Text>
                </View>
            </View>

            {/* 3-dot menu */}
            <View style={styles.menuWrap}>
                <TouchableOpacity onPress={onMenuToggle} style={styles.menuTrigger}>
                    <Feather name="more-vertical" size={16} color="#5C727D" />
                </TouchableOpacity>
                {isMenuOpen && (
                    <View style={styles.dropdown}>
                        <TouchableOpacity style={styles.dropdownItem} onPress={onViewDetails}>
                            <Feather name="eye" size={13} color="#746CFF" />
                            <Text style={styles.dropdownItemText}>View Details</Text>
                        </TouchableOpacity>
                        {item.Status !== 'Paid' && (
                            <>
                                <View style={styles.dropdownDivider} />
                                <TouchableOpacity style={styles.dropdownItem} onPress={onMakePaid}>
                                    <Feather name="check-circle" size={13} color="#28C76F" />
                                    <Text style={[styles.dropdownItemText, { color: '#28C76F' }]}>Make Paid</Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </View>
                )}
            </View>
        </View>
    );
};

// ─── Main Screen ──────────────────────────────────────────────────────────────
const PayslipPreviewScreen = ({ navigation }) => {
    const [payslips]                          = useState(staticPayslips);
    const [searchQuery, setSearchQuery]       = useState('');
    const [currentPage, setCurrentPage]       = useState(1);
    const [openMenuId, setOpenMenuId]         = useState(null);
    const [isDrawerVisible, setDrawerVisible] = useState(false);

    // Filter state
    const [filterVisible, setFilterVisible]   = useState(false);
    const [selectedMonth, setSelectedMonth]   = useState(null);
    const [selectedYear, setSelectedYear]     = useState(null);
    const [appliedMonth, setAppliedMonth]     = useState(null);
    const [appliedYear, setAppliedYear]       = useState(null);

    // Make Paid modal
    const [paidSheetVisible, setPaidSheet]    = useState(false);
    const [selectedPayslip, setSelectedPayslip] = useState(null);

    const toggleDrawer = () => setDrawerVisible(prev => !prev);
    const comingSoon   = (label = '') =>
        Alert.alert('Coming Soon 🚀', `${label ? label + ' — ' : ''}This feature will be available soon!`);

    const applyFilter = () => {
        setAppliedMonth(selectedMonth);
        setAppliedYear(selectedYear);
        setCurrentPage(1);
        setFilterVisible(false);
    };

    // Filter + search
    const filtered = payslips.filter(item => {
        const matchSearch =
            item.Employee.FullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.Employee.EmployeeID.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.Employee.Department.toLowerCase().includes(searchQuery.toLowerCase());
        const matchMonth = appliedMonth ? item.PayRun.Month === appliedMonth : true;
        const matchYear  = appliedYear  ? item.PayRun.Year  === appliedYear  : true;
        return matchSearch && matchMonth && matchYear;
    });

    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
    const paginated  = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
    const handleSearch = (text) => { setSearchQuery(text); setCurrentPage(1); };

    const getPaginationGroup = () => {
        if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);
        if (currentPage <= 2) return [1, 2, 3, '...', totalPages];
        if (currentPage >= totalPages - 1) return [1, '...', totalPages - 2, totalPages - 1, totalPages];
        return [1, '...', currentPage, '...', totalPages];
    };

    const openMakePaid = (item) => {
        setSelectedPayslip(item);
        setOpenMenuId(null);
        setPaidSheet(true);
    };

    const confirmMakePaid = () => {
        setPaidSheet(false);
        Alert.alert('Success ✓', `${selectedPayslip?.Employee?.FullName}'s payslip marked as Paid!`);
    };

    const filterActive = appliedMonth || appliedYear;
    const periodLabel  = appliedMonth && appliedYear
        ? `${MONTHS.find(m => m.value === appliedMonth)?.label} ${appliedYear}`
        : appliedMonth
            ? MONTHS.find(m => m.value === appliedMonth)?.label
            : appliedYear
                ? String(appliedYear)
                : 'All';

    return (
        <View style={styles.root}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

            {/* ── Header ── */}
            <View style={styles.header}>
                <View>
                    <Text style={styles.headerTitle}>Payslip Preview</Text>
                    <Text style={styles.headerSub}>Generate and manage employee payslips</Text>
                </View>
                <View style={styles.headerRight}>
                    <TouchableOpacity style={styles.headerIconBtn} onPress={() => comingSoon('Share')}>
                        <Feather name="share-2" size={17} color="#122D34" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.headerIconBtn} onPress={() => comingSoon('Export')}>
                        <Feather name="download" size={17} color="#122D34" />
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
                {/* ── Pay Period + Filter bar ── */}
                <View style={styles.periodBar}>
                    <View style={styles.periodLeft}>
                        <MaterialCommunityIcons name="calendar-month-outline" size={16} color="#746CFF" />
                        <Text style={styles.periodLabel}>Pay Period: </Text>
                        <Text style={styles.periodValue}>{periodLabel}</Text>
                    </View>
                    <TouchableOpacity
                        style={[styles.filterBtn, filterActive && styles.filterBtnActive]}
                        onPress={() => { setSelectedMonth(appliedMonth); setSelectedYear(appliedYear); setFilterVisible(true); }}
                    >
                        <Feather name="sliders" size={14} color={filterActive ? '#FFFFFF' : '#746CFF'} />
                        <Text style={[styles.filterBtnText, filterActive && { color: '#FFFFFF' }]}>
                            {filterActive ? 'Filtered' : 'Filter'}
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* ── Employee List Card ── */}
                <View style={styles.listCard}>
                    <Text style={styles.listCardTitle}>PAYSLIP LIST</Text>

                    {/* Search */}
                    <View style={styles.searchBar}>
                        <Feather name="search" size={15} color="#5C727D" />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search by name, ID, dept..."
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
                        <Text style={[styles.tableHeaderText, { flex: 1.5 }]}>Employee</Text>
                        <Text style={[styles.tableHeaderText, { flex: 1.1 }]}>Pay Info</Text>
                        <Text style={[styles.tableHeaderText, { flex: 0.8 }]}>Status</Text>
                        <View style={{ width: 20 }} />
                    </View>

                    {/* Rows */}
                    {paginated.length === 0 ? (
                        <View style={styles.emptyState}>
                            <MaterialCommunityIcons name="file-search-outline" size={40} color="#C0C0D0" />
                            <Text style={styles.emptyText}>No payslips found</Text>
                        </View>
                    ) : (
                        paginated.map((item, index) => (
                            <PayslipRow
                                key={item._id}
                                item={item}
                                isFirst={index === 0 && currentPage === 1}
                                isMenuOpen={openMenuId === item._id}
                                onMenuToggle={() => setOpenMenuId(openMenuId === item._id ? null : item._id)}
                                onViewDetails={() => { setOpenMenuId(null); comingSoon('View Details'); }}
                                onMakePaid={() => openMakePaid(item)}
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
                                        <Text style={[styles.pageNumberText, page === currentPage && styles.pageNumberTextActive]}>
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
                                <Text style={[styles.pagePrevNext, currentPage === totalPages && styles.pageTextDisabled]}>Next</Text>
                                <Feather name="chevron-right" size={15} color={currentPage === totalPages ? '#C0C0D0' : '#122D34'} />
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </ScrollView>

            {/* ── Filter Sheet ── */}
            <FilterSheet
                visible={filterVisible}
                selectedMonth={selectedMonth}
                selectedYear={selectedYear}
                onSelectMonth={setSelectedMonth}
                onSelectYear={setSelectedYear}
                onApply={applyFilter}
                onClose={() => setFilterVisible(false)}
            />

            {/* ── Make Paid Sheet ── */}
            <MakePaidSheet
                visible={paidSheetVisible}
                payslip={selectedPayslip}
                onConfirm={confirmMakePaid}
                onClose={() => setPaidSheet(false)}
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
    root: { flex: 1, backgroundColor: '#F7F8FA' },

    // Header
    header: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',
        paddingHorizontal: moderateScale(18),
        paddingTop: verticalScale(52),
        paddingBottom: verticalScale(14),
        borderBottomWidth: 1, borderBottomColor: '#EDEDF0',
    },
    headerTitle: { fontSize: moderateScale(17), fontWeight: '700', color: '#122D34', fontFamily: FONTS_FAMILY.Natosans_Medium },
    headerSub:   { fontSize: moderateScale(12), color: '#5C727D', marginTop: 2, fontFamily: FONTS_FAMILY.Natosans_Regular },
    headerRight: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    headerIconBtn: { width: 36, height: 36, borderRadius: 10, backgroundColor: '#F7F8FA', alignItems: 'center', justifyContent: 'center' },
    avatarBtn:     { width: 36, height: 36, borderRadius: 10, backgroundColor: '#EEF0FF', alignItems: 'center', justifyContent: 'center' },

    scrollContent: { paddingBottom: verticalScale(28) },

    // Period bar
    periodBar: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',
        marginHorizontal: moderateScale(16), marginTop: verticalScale(14),
        borderRadius: 12, paddingHorizontal: moderateScale(14), paddingVertical: verticalScale(11),
        borderWidth: 1, borderColor: '#EDEDF0',
    },
    periodLeft:  { flexDirection: 'row', alignItems: 'center', gap: 6 },
    periodLabel: { fontSize: moderateScale(12), color: '#5C727D', fontFamily: FONTS_FAMILY.Natosans_Regular },
    periodValue: { fontSize: moderateScale(13), fontWeight: '700', color: '#122D34', fontFamily: FONTS_FAMILY.Natosans_Bold },
    filterBtn: {
        flexDirection: 'row', alignItems: 'center', gap: 5,
        paddingHorizontal: moderateScale(12), paddingVertical: verticalScale(7),
        borderRadius: 8, borderWidth: 1, borderColor: '#746CFF',
    },
    filterBtnActive: { backgroundColor: '#746CFF', borderColor: '#746CFF' },
    filterBtnText:   { fontSize: moderateScale(12), fontWeight: '600', color: '#746CFF', fontFamily: FONTS_FAMILY.Natosans_Medium },

    // List Card
    listCard: {
        backgroundColor: '#FFFFFF', borderRadius: 16,
        marginHorizontal: moderateScale(16), marginTop: verticalScale(14),
        padding: moderateScale(14), borderWidth: 1, borderColor: '#EDEDF0',
    },
    listCardTitle: { fontSize: moderateScale(11), fontWeight: '700', color: '#2B4951', letterSpacing: 1.2, marginBottom: verticalScale(12), fontFamily: FONTS_FAMILY.Natosans_Bold },

    // Search
    searchBar: {
        flexDirection: 'row', alignItems: 'center', backgroundColor: '#F8FAFF',
        borderRadius: 10, borderWidth: 1, borderColor: '#122D3414',
        paddingHorizontal: moderateScale(12), paddingVertical: verticalScale(8),
        gap: 8, marginBottom: verticalScale(14),
    },
    searchInput: { flex: 1, fontSize: moderateScale(13), color: '#122D34', padding: 0, fontFamily: FONTS_FAMILY.Natosans_Regular },

    // Table Header
    tableHeader: {
        flexDirection: 'row', alignItems: 'center', backgroundColor: '#F8FAFF',
        borderRadius: 8, paddingHorizontal: moderateScale(10), paddingVertical: verticalScale(8),
        marginBottom: verticalScale(4), borderWidth: 1, borderColor: '#F0F0F5',
    },
    tableHeaderText: { fontSize: moderateScale(11), fontWeight: '600', color: '#122D34', fontFamily: FONTS_FAMILY.Natosans_Medium },

    // Row
    row: {
        flexDirection: 'row', alignItems: 'center',
        paddingVertical: verticalScale(10), paddingHorizontal: moderateScale(4),
        borderBottomWidth: 1, borderBottomColor: '#F2F2F5',
    },
    rowHighlight: { backgroundColor: '#F0F4FF', borderRadius: 10, paddingHorizontal: moderateScale(8), marginHorizontal: -moderateScale(4) },
    rowCell:      { flexDirection: 'row', alignItems: 'center', gap: 7 },
    rowAvatar:    { width: moderateScale(30), height: moderateScale(30), borderRadius: moderateScale(15), backgroundColor: '#EEE', flexShrink: 0 },
    rowNameWrap:  { flex: 1 },
    rowName:      { fontSize: moderateScale(12), fontWeight: '600', color: '#122D34', fontFamily: FONTS_FAMILY.Natosans_Medium },
    rowId:        { fontSize: moderateScale(10), color: '#94A3B8', fontFamily: FONTS_FAMILY.Natosans_Regular, marginTop: 1 },
    rowDept:      { fontSize: moderateScale(10), color: '#B0B8C1', fontFamily: FONTS_FAMILY.Natosans_Regular, marginTop: 1 },
    rowNetPay:    { fontSize: moderateScale(13), fontWeight: '700', color: '#746CFF', fontFamily: FONTS_FAMILY.Natosans_Bold },
    rowGross:     { fontSize: moderateScale(10), color: '#94A3B8', fontFamily: FONTS_FAMILY.Natosans_Regular, marginTop: 1 },
    rowPeriod:    { fontSize: moderateScale(10), color: '#B0B8C1', fontFamily: FONTS_FAMILY.Natosans_Regular, marginTop: 1 },
    statusBadge:  { alignSelf: 'flex-start', paddingHorizontal: 7, paddingVertical: 3, borderRadius: 6 },
    statusText:   { fontSize: moderateScale(10), fontWeight: '700', fontFamily: FONTS_FAMILY.Natosans_Bold },

    // 3-dot Menu
    menuWrap:     { width: 20, alignItems: 'flex-end', position: 'relative' },
    menuTrigger:  { padding: 2 },
    dropdown: {
        position: 'absolute', top: 22, right: 0,
        backgroundColor: '#FFFFFF', borderRadius: 10,
        borderWidth: 1, borderColor: '#EDEDF0',
        zIndex: 99, elevation: 6, minWidth: 140,
        shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.08, shadowRadius: 10,
    },
    dropdownItem:     { flexDirection: 'row', alignItems: 'center', paddingHorizontal: moderateScale(14), paddingVertical: verticalScale(10), gap: 8 },
    dropdownItemText: { fontSize: moderateScale(13), color: '#122D34', fontFamily: FONTS_FAMILY.Natosans_Regular },
    dropdownDivider:  { height: 1, backgroundColor: '#F2F2F5' },

    // Empty
    emptyState: { alignItems: 'center', paddingVertical: verticalScale(30), gap: 8 },
    emptyText:  { fontSize: moderateScale(14), color: '#94A3B8', fontFamily: FONTS_FAMILY.Natosans_Regular },

    // Pagination
    pagination:       { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: verticalScale(16) },
    pageArrowBtn:     { flexDirection: 'row', alignItems: 'center', gap: 3 },
    pageBtnDisabled:  { opacity: 0.35 },
    pagePrevNext:     { fontSize: moderateScale(13), fontWeight: '500', color: '#5C727D', fontFamily: FONTS_FAMILY.Natosans_Medium },
    pageTextDisabled: { color: '#C0C0D0' },
    pageNumbers:      { flexDirection: 'row', gap: 5 },
    pageNumber:       { width: 28, height: 28, borderRadius: 7, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F3F6F9' },
    pageNumberActive: { backgroundColor: '#746CFF', shadowColor: '#746CFF', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.3, shadowRadius: 6, elevation: 4 },
    pageNumberDots:   { backgroundColor: 'transparent' },
    pageNumberText:   { fontSize: moderateScale(12), fontWeight: '600', color: '#5C727D', fontFamily: FONTS_FAMILY.Natosans_Medium },
    pageNumberTextActive: { color: '#FFFFFF', fontFamily: FONTS_FAMILY.Natosans_Bold },

    // Bottom Sheets (shared)
    sheetOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)' },
    sheet: {
        backgroundColor: '#FFFFFF', borderTopLeftRadius: 24, borderTopRightRadius: 24,
        paddingHorizontal: moderateScale(20), paddingBottom: verticalScale(36), paddingTop: verticalScale(10),
    },
    sheetHandle:    { width: 40, height: 4, borderRadius: 2, backgroundColor: '#E0E0E8', alignSelf: 'center', marginBottom: verticalScale(16) },
    sheetHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: verticalScale(18) },
    sheetTitle:     { fontSize: moderateScale(17), fontWeight: '700', color: '#122D34', fontFamily: FONTS_FAMILY.Natosans_Medium },
    sheetSub:       { fontSize: moderateScale(12), color: '#5C727D', marginTop: 3, fontFamily: FONTS_FAMILY.Natosans_Regular },
    sheetClose:     { width: 32, height: 32, borderRadius: 8, backgroundColor: '#F7F8FA', alignItems: 'center', justifyContent: 'center' },
    sheetFooter:    { flexDirection: 'row', gap: 12, marginTop: verticalScale(10) },
    cancelBtn:      { flex: 1, paddingVertical: verticalScale(13), borderRadius: 12, borderWidth: 1, borderColor: '#DCE2E4', alignItems: 'center' },
    cancelBtnText:  { fontSize: moderateScale(14), fontWeight: '600', color: '#5C727D', fontFamily: FONTS_FAMILY.Natosans_Medium },
    saveBtn:        { flex: 1, paddingVertical: verticalScale(13), borderRadius: 12, backgroundColor: '#746CFF', alignItems: 'center' },
    saveBtnText:    { fontSize: moderateScale(14), fontWeight: '700', color: '#FFFFFF', fontFamily: FONTS_FAMILY.Natosans_Bold },

    // Filter chips
    filterLabel: { fontSize: moderateScale(12), fontWeight: '600', color: '#2B4951', marginBottom: verticalScale(8), fontFamily: FONTS_FAMILY.Natosans_Medium },
    chipRow:     { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
    chip:        { paddingHorizontal: moderateScale(14), paddingVertical: verticalScale(7), borderRadius: 20, backgroundColor: '#F3F6F9', borderWidth: 1, borderColor: '#EDEDF0' },
    chipActive:  { backgroundColor: '#746CFF', borderColor: '#746CFF' },
    chipText:    { fontSize: moderateScale(12), fontWeight: '500', color: '#5C727D', fontFamily: FONTS_FAMILY.Natosans_Medium },
    chipTextActive: { color: '#FFFFFF', fontFamily: FONTS_FAMILY.Natosans_Bold },

    // Make Paid summary card
    summaryCard:    { backgroundColor: '#F8FAFF', borderRadius: 12, padding: moderateScale(14), marginBottom: verticalScale(14), borderWidth: 1, borderColor: '#EDEDF0' },
    summaryRow:     { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: verticalScale(8) },
    summaryDivider: { height: 1, backgroundColor: '#F0F0F5' },
    summaryKey:     { fontSize: moderateScale(13), color: '#5C727D', fontFamily: FONTS_FAMILY.Natosans_Regular },
    summaryVal:     { fontSize: moderateScale(13), fontWeight: '600', color: '#122D34', fontFamily: FONTS_FAMILY.Natosans_Medium },
    confirmNote:    { fontSize: moderateScale(12), color: '#94A3B8', textAlign: 'center', marginBottom: verticalScale(6), fontFamily: FONTS_FAMILY.Natosans_Regular, lineHeight: 18 },
});

export default PayslipPreviewScreen;