import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    Modal,
    StatusBar,
    Alert,
    Dimensions,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { FONTS_FAMILY } from '../../../assets/Fonts';
import DrawerModal from '../../../components/DrawerModal';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const STAT_CARD_WIDTH = SCREEN_WIDTH / 2.4;

// ─── Static Data ──────────────────────────────────────────────────────────────
const staticStats = [
    { title: 'Total Employees', value: '700', icon: '👥', color: '#FF9F43', bg: '#FF9F431A' },
    { title: 'Coverage Rate', value: '92%', icon: '✅', color: '#28C76F', bg: '#28C76F1A' },
    { title: 'Under-Staffed', value: '3', icon: '⚠️', color: '#F64E60', bg: '#F64E601A' },
    { title: 'Open Shifts', value: '3', icon: '⏳', color: '#00CFE8', bg: '#00CFE81A' },
    { title: 'Scheduled Hours', value: '1,240h', icon: '🕐', color: '#A064FF', bg: '#A064FF1A' },
];


const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const staticShifts = [
    {
        _id: '1', name: 'Morning Shift', time: '06:00 AM – 02:00 PM',
        theme: 'blue',
        schedule: { Mon: 12, Tue: 14, Wed: 11, Thu: 13, Fri: 15, Sat: 8, Sun: 5 },
    },
    {
        _id: '2', name: 'Afternoon Shift', time: '02:00 PM – 10:00 PM',
        theme: 'yellow',
        schedule: { Mon: 9, Tue: 10, Wed: 8, Thu: 11, Fri: 12, Sat: 6, Sun: 4 },
    },
    {
        _id: '3', name: 'Night Shift', time: '10:00 PM – 06:00 AM',
        theme: 'blue',
        schedule: { Mon: 6, Tue: 7, Wed: 5, Thu: 8, Fri: 7, Sat: 4, Sun: 3 },
    },
    {
        _id: '4', name: 'General Shift', time: '09:00 AM – 06:00 PM',
        theme: 'yellow',
        schedule: { Mon: 18, Tue: 20, Wed: 17, Thu: 19, Fri: 22, Sat: 10, Sun: 7 },
    },
    {
        _id: '5', name: 'Split Shift', time: '07:00 AM – 11:00 AM / 04:00 PM – 08:00 PM',
        theme: 'blue',
        schedule: { Mon: 5, Tue: 6, Wed: 4, Thu: 5, Fri: 6, Sat: 2, Sun: 1 },
    },
    {
        _id: '6', name: 'Weekend Shift', time: '08:00 AM – 04:00 PM',
        theme: 'yellow',
        schedule: { Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 14, Sun: 12 },
    },
];

const ITEMS_PER_PAGE = 4;

// ─── Main Screen ──────────────────────────────────────────────────────────────
const ShiftScheduler = ({ navigation }) => {
    const [shifts] = useState(staticShifts);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedDay, setSelectedDay] = useState('Mon');
    const [openMenuId, setOpenMenuId] = useState(null);
    const [isDrawerVisible, setDrawerVisible] = useState(false);
    const [addShiftModal, setAddShiftModal] = useState(false);

    const totalPages = Math.ceil(shifts.length / ITEMS_PER_PAGE);
    const paginated = shifts.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
    const toggleDrawer = () => setDrawerVisible(prev => !prev);

    const comingSoon = (label = '') =>
        Alert.alert('Coming Soon 🚀', `${label ? label + ' — ' : ''}This feature will be available soon!`);

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
                    <Text style={styles.headerTitle}>Shift Scheduler</Text>
                    <Text style={styles.headerSub}>Plan and assign employee work schedules</Text>
                </View>
                <View style={styles.headerRight}>
                    <TouchableOpacity style={styles.headerIconBtn} onPress={comingSoon}>
                        <Feather name="download" size={18} color="#122D34" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuBtn} onPress={() => setDrawerVisible(true)}>
                        <Text style={{ fontSize: 20, color: '#746CFF' }}>☰</Text>
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
                    snapToInterval={STAT_CARD_WIDTH + 10}
                    decelerationRate="fast"
                    snapToAlignment="start"
                >
                    {staticStats.map((card, idx) => (
                        <View key={idx} style={[styles.statCard, { width: STAT_CARD_WIDTH }]}>
                            <View style={[styles.statIconWrap, { backgroundColor: card.bg }]}>
                                <Text style={{ fontSize: 16 }}>{card.icon}</Text>
                            </View>
                            <Text style={styles.statTitle}>{card.title}</Text>
                            <Text style={[styles.statValue, { color: card.color }]}>{card.value}</Text>
                        </View>
                    ))}
                </ScrollView>

                {/* ── Day Selector ── */}
                <View style={styles.daySelector}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.daySelectorInner}>
                        {days.map(day => (
                            <TouchableOpacity
                                key={day}
                                style={[styles.dayBtn, selectedDay === day && styles.dayBtnActive]}
                                onPress={() => setSelectedDay(day)}
                            >
                                <Text style={[styles.dayBtnText, selectedDay === day && styles.dayBtnTextActive]}>{day}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {/* ── Action Buttons ── */}
                <View style={styles.actionRow}>
                    <TouchableOpacity style={styles.actionBtnOutline} onPress={() => setAddShiftModal(true)}>
                        <Text style={styles.actionBtnOutlineText}>＋  Add New Shift</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionBtnOutline} onPress={() => comingSoon('All Shifts')}>
                        <Text style={styles.actionBtnOutlineText}>All Shifts</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionBtnPrimary} onPress={() => comingSoon('Assign Shifts')}>
                        <Text style={styles.actionBtnPrimaryText}>＋  Assign Shifts</Text>
                    </TouchableOpacity>
                </View>

                {/* ── Shift List ── */}
                <View style={styles.listCard}>
                    <View style={styles.listCardHeader}>
                        <Text style={styles.listCardTitle}>SHIFT SCHEDULE</Text>
                        <Text style={styles.listCardSub}>{selectedDay} · {shifts.length} shifts</Text>
                    </View>

                    {paginated.map((shift, index) => (
                        <ShiftRow
                            key={shift._id}
                            shift={shift}
                            selectedDay={selectedDay}
                            isMenuOpen={openMenuId === shift._id}
                            onMenuToggle={() => setOpenMenuId(openMenuId === shift._id ? null : shift._id)}
                            onAction={comingSoon}
                        />
                    ))}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <View style={styles.pagination}>
                            <TouchableOpacity
                                style={[styles.pageArrowBtn, currentPage === 1 && styles.pageBtnDisabled]}
                                onPress={() => setCurrentPage(p => Math.max(p - 1, 1))}
                                disabled={currentPage === 1}
                            >
                                <Text style={[styles.pagePrevNext, currentPage === 1 && styles.pageTextDisabled]}>‹  Prev</Text>
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
                                <Text style={[styles.pagePrevNext, currentPage === totalPages && styles.pageTextDisabled]}>Next  ›</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </ScrollView>

            {/* ── Add Shift Modal ── */}
            <Modal visible={addShiftModal} transparent animationType="slide">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalSheet}>
                        <View style={styles.modalHandle} />
                        <Text style={styles.modalTitle}>Add New Shift</Text>
                        <Text style={styles.modalSub}>Fill in the shift details below</Text>

                        {['Shift Name', 'Start Time', 'End Time'].map((label) => (
                            <View key={label} style={styles.inputGroup}>
                                <Text style={styles.inputLabel}>{label}</Text>
                                <View style={styles.inputBox}>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder={`Enter ${label.toLowerCase()}`}
                                        placeholderTextColor="#94A3B8"
                                    />
                                </View>
                            </View>
                        ))}

                        <View style={styles.modalActions}>
                            <TouchableOpacity style={styles.modalCancelBtn} onPress={() => setAddShiftModal(false)}>
                                <Text style={styles.modalCancelText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalSaveBtn} onPress={() => { comingSoon('Save Shift'); setAddShiftModal(false); }}>
                                <Text style={styles.modalSaveText}>Save Shift</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

         <DrawerModal
                isModalVisible={isDrawerVisible}
                toggleModal={toggleDrawer}
                navigation={navigation}
            />
        </View>
    );
};

// ─── Shift Row ────────────────────────────────────────────────────────────────
const ShiftRow = ({ shift, selectedDay, isMenuOpen, onMenuToggle, onAction }) => {
    const count = shift.schedule[selectedDay] ?? 0;
    const isBlue = shift.theme === 'blue';

    return (
        <View style={styles.shiftRow}>
            {/* Left accent bar */}
            <View style={[styles.shiftAccent, { backgroundColor: isBlue ? '#00CFE8' : '#FFC107' }]} />

            {/* Shift info */}
            <View style={[styles.shiftBody, { backgroundColor: isBlue ? '#F0F9FF' : '#FFFBEA' }]}>
                <View style={styles.shiftInfo}>
                    <Text style={styles.shiftName}>{shift.name}</Text>
                    <Text style={styles.shiftTime}>{shift.time}</Text>
                    <View style={styles.shiftCountRow}>
                        <View style={[styles.shiftCountBadge, { backgroundColor: isBlue ? '#E0F5FF' : '#FFF3CD' }]}>
                            <Text style={[styles.shiftCountText, { color: isBlue ? '#00CFE8' : '#E6A817' }]}>
                                👤  {count} employees
                            </Text>
                        </View>
                        <Text style={styles.shiftDayLabel}>{selectedDay}</Text>
                    </View>
                </View>

                {/* 3-dot menu */}
                <View style={styles.menuWrap}>
                    <TouchableOpacity onPress={onMenuToggle} style={styles.menuTrigger}>
                        <Text style={{ fontSize: 18, color: '#5C727D' }}>⋮</Text>
                    </TouchableOpacity>
                    {isMenuOpen && (
                        <View style={styles.dropdown}>
                            <TouchableOpacity style={styles.dropdownItem} onPress={() => onAction('View')}>
                                <Text style={[styles.dropdownItemText, { color: '#746CFF' }]}>👁  View Details</Text>
                            </TouchableOpacity>
                            <View style={styles.dropdownDivider} />
                            <TouchableOpacity style={styles.dropdownItem} onPress={() => onAction('Edit')}>
                                <Text style={[styles.dropdownItemText, { color: '#28C76F' }]}>✏️  Edit Shift</Text>
                            </TouchableOpacity>
                            <View style={styles.dropdownDivider} />
                            <TouchableOpacity style={styles.dropdownItem} onPress={() => onAction('Assign')}>
                                <Text style={[styles.dropdownItemText, { color: '#FF9F43' }]}>➕  Assign Employees</Text>
                            </TouchableOpacity>
                            <View style={styles.dropdownDivider} />
                            <TouchableOpacity style={styles.dropdownItem} onPress={() => onAction('Delete')}>
                                <Text style={[styles.dropdownItemText, { color: '#F64E60' }]}>🗑  Delete</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </View>
        </View>
    );
};

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
    root: { flex: 1, backgroundColor: '#F7F8FA' },

    // Header
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 18,
        paddingTop: 52,
        paddingBottom: 14,
        borderBottomWidth: 1,
        borderBottomColor: '#EDEDF0',
    },
    headerTitle: { fontSize: 17, fontWeight: '700', color: '#122D34' },
    headerSub: { fontSize: 12, color: '#5C727D', marginTop: 2 },
    headerRight: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    headerIconBtn: {
        width: 36, height: 36, borderRadius: 10,
        backgroundColor: '#F7F8FA', alignItems: 'center', justifyContent: 'center',
    },
    menuBtn: {
        width: 36, height: 36, borderRadius: 10,
        backgroundColor: '#EEF0FF', alignItems: 'center', justifyContent: 'center',
    },

    scrollContent: { paddingBottom: 28 },

    // Stat Cards
    statScrollContent: {
        paddingHorizontal: 16, paddingTop: 16, paddingBottom: 4, gap: 10,
    },
    statCard: {
        backgroundColor: '#FFFFFF', borderRadius: 16,
        padding: 14, borderWidth: 1, borderColor: '#EDEDF0',
    },
    statIconWrap: {
        width: 40, height: 40, borderRadius: 20,
        alignItems: 'center', justifyContent: 'center', marginBottom: 10,
    },
    statTitle: { fontSize: 11, color: '#5C727D', marginBottom: 3 },
    statValue: { fontSize: 18, fontWeight: '700' },

    // Day Selector
    daySelector: {
        marginHorizontal: 16, marginTop: 14,
        backgroundColor: '#FFFFFF', borderRadius: 12,
        borderWidth: 1, borderColor: '#EDEDF0', overflow: 'hidden',
    },
    daySelectorInner: { paddingHorizontal: 8, paddingVertical: 8, gap: 6 },
    dayBtn: {
        paddingHorizontal: 16, paddingVertical: 7, borderRadius: 8,
        backgroundColor: '#F3F6F9',
    },
    dayBtnActive: {
        backgroundColor: '#746CFF',
        shadowColor: '#746CFF', shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3, shadowRadius: 6, elevation: 4,
    },
    dayBtnText: { fontSize: 13, fontWeight: '600', color: '#5C727D' },
    dayBtnTextActive: { color: '#FFFFFF' },

    // Action Buttons
    actionRow: {
        flexDirection: 'row', gap: 8,
        marginHorizontal: 16, marginTop: 12, flexWrap: 'wrap',
    },
    actionBtnOutline: {
        paddingHorizontal: 14, paddingVertical: 9, borderRadius: 10,
        borderWidth: 1, borderColor: '#DCE2E4', backgroundColor: '#FFFFFF',
    },
    actionBtnOutlineText: { fontSize: 13, fontWeight: '500', color: '#122D34' },
    actionBtnPrimary: {
        paddingHorizontal: 14, paddingVertical: 9, borderRadius: 10,
        backgroundColor: '#746CFF',
    },
    actionBtnPrimaryText: { fontSize: 13, fontWeight: '600', color: '#FFFFFF' },

    // List Card
    listCard: {
        backgroundColor: '#FFFFFF', borderRadius: 16,
        marginHorizontal: 16, marginTop: 14,
        padding: 14, borderWidth: 1, borderColor: '#EDEDF0',
    },
    listCardHeader: {
        flexDirection: 'row', justifyContent: 'space-between',
        alignItems: 'center', marginBottom: 12,
    },
    listCardTitle: { fontSize: 11, fontWeight: '700', color: '#2B4951', letterSpacing: 1.2 },
    listCardSub: { fontSize: 11, color: '#94A3B8' },

    // Shift Row
    shiftRow: {
        flexDirection: 'row', marginBottom: 10, borderRadius: 10, overflow: 'hidden',
        borderWidth: 1, borderColor: '#F0F0F5',
    },
    shiftAccent: { width: 4 },
    shiftBody: {
        flex: 1, flexDirection: 'row', alignItems: 'flex-start',
        padding: 12, justifyContent: 'space-between',
    },
    shiftInfo: { flex: 1, paddingRight: 8 },
    shiftName: { fontSize: 13, fontWeight: '700', color: '#122D34', marginBottom: 3 },
    shiftTime: { fontSize: 11, color: '#5C727D', marginBottom: 8 },
    shiftCountRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    shiftCountBadge: { paddingHorizontal: 9, paddingVertical: 4, borderRadius: 6 },
    shiftCountText: { fontSize: 11, fontWeight: '700' },
    shiftDayLabel: { fontSize: 10, color: '#B0B8C1' },

    // Menu
    menuWrap: { width: 24, alignItems: 'flex-end', position: 'relative' },
    menuTrigger: { padding: 2 },
    dropdown: {
        position: 'absolute', top: 24, right: 0,
        backgroundColor: '#FFFFFF', borderRadius: 10,
        borderWidth: 1, borderColor: '#EDEDF0',
        zIndex: 99, elevation: 8, minWidth: 170,
        shadowColor: '#000', shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08, shadowRadius: 10,
    },
    dropdownItem: { paddingHorizontal: 14, paddingVertical: 11 },
    dropdownItemText: { fontSize: 13, color: '#122D34' },
    dropdownDivider: { height: 1, backgroundColor: '#F2F2F5' },

    // Pagination
    pagination: {
        flexDirection: 'row', alignItems: 'center',
        justifyContent: 'space-between', marginTop: 16,
    },
    pageArrowBtn: { flexDirection: 'row', alignItems: 'center', gap: 3 },
    pageBtnDisabled: { opacity: 0.35 },
    pagePrevNext: { fontSize: 13, fontWeight: '500', color: '#5C727D' },
    pageTextDisabled: { color: '#C0C0D0' },
    pageNumbers: { flexDirection: 'row', gap: 5 },
    pageNumber: {
        width: 28, height: 28, borderRadius: 7,
        alignItems: 'center', justifyContent: 'center', backgroundColor: '#F3F6F9',
    },
    pageNumberActive: {
        backgroundColor: '#746CFF',
        shadowColor: '#746CFF', shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3, shadowRadius: 6, elevation: 4,
    },
    pageNumberDots: { backgroundColor: 'transparent' },
    pageNumberText: { fontSize: 12, fontWeight: '600', color: '#5C727D' },
    pageNumberTextActive: { color: '#FFFFFF' },

    // Modal
    modalOverlay: {
        flex: 1, backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'flex-end',
    },
    modalSheet: {
        backgroundColor: '#FFFFFF', borderTopLeftRadius: 24, borderTopRightRadius: 24,
        padding: 24, paddingBottom: 40,
    },
    modalHandle: {
        width: 40, height: 4, borderRadius: 2,
        backgroundColor: '#E0E0E8', alignSelf: 'center', marginBottom: 20,
    },
    modalTitle: { fontSize: 17, fontWeight: '700', color: '#122D34', marginBottom: 4 },
    modalSub: { fontSize: 13, color: '#5C727D', marginBottom: 20 },
    inputGroup: { marginBottom: 16 },
    inputLabel: { fontSize: 12, fontWeight: '600', color: '#2B4951', marginBottom: 6 },
    inputBox: {
        borderWidth: 1, borderColor: '#DCE2E4', borderRadius: 10,
        backgroundColor: '#F8FAFF', paddingHorizontal: 14, paddingVertical: 11,
    },
    textInput: { fontSize: 14, color: '#122D34' },
    modalActions: { flexDirection: 'row', gap: 12, marginTop: 8 },
    modalCancelBtn: {
        flex: 1, paddingVertical: 13, borderRadius: 12,
        borderWidth: 1, borderColor: '#DCE2E4', alignItems: 'center',
    },
    modalCancelText: { fontSize: 14, fontWeight: '600', color: '#5C727D' },
    modalSaveBtn: {
        flex: 1, paddingVertical: 13, borderRadius: 12,
        backgroundColor: '#746CFF', alignItems: 'center',
    },
    modalSaveText: { fontSize: 14, fontWeight: '600', color: '#FFFFFF' },

    // Drawer
    drawerOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.35)', flexDirection: 'row' },
    drawer: {
        width: SCREEN_WIDTH * 0.72, backgroundColor: '#FFFFFF',
        paddingTop: 60, paddingHorizontal: 24, paddingBottom: 40,
    },
    drawerTitle: { fontSize: 20, fontWeight: '700', color: '#122D34', marginBottom: 28 },
    drawerItem: { paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#F2F2F5' },
    drawerItemActive: { backgroundColor: '#F0EEFF', marginHorizontal: -24, paddingHorizontal: 24, borderRadius: 0 },
    drawerItemText: { fontSize: 15, color: '#5C727D', fontWeight: '500' },
    drawerItemTextActive: { color: '#746CFF', fontWeight: '700' },
});

export default ShiftScheduler;