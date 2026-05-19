import React, { useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Platform,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useIsFocused } from '@react-navigation/native'

import { App_Primary_color } from '../../../common/Colors/colors'
import { FONTS_FAMILY } from '../../../assets/Fonts'

// ─── Mock Data ────────────────────────────────────────────────────────────────
const ALL_TASKS = [
  {
    id: '1',
    title: 'Wiring Dashboard Analytics',
    status: 'In Progress',
    priority: 'High',
    progress: 0.75,
    date: '27 April',
    comments: 2,
    filter: 'In Progress',
  },
  {
    id: '2',
    title: 'Wiring Dashboard Analytics',
    status: 'In Progress',
    priority: 'High',
    progress: 0.6,
    date: '27 April',
    comments: 2,
    filter: 'In Progress',
  },
  {
    id: '3',
    title: 'Wiring Dashboard Analytics',
    status: 'In Progress',
    priority: 'Medium',
    progress: 0.4,
    date: '28 April',
    comments: 3,
    filter: 'In Progress',
  },
  {
    id: '4',
    title: 'Design System Update',
    status: 'Finish',
    priority: 'Low',
    progress: 1,
    date: '25 April',
    comments: 1,
    filter: 'Finish',
  },
  {
    id: '5',
    title: 'API Integration Module',
    status: 'Finish',
    priority: 'High',
    progress: 1,
    date: '24 April',
    comments: 4,
    filter: 'Finish',
  },
]

const SUMMARY = { toDo: 5, inProgress: 2, done: 1 }

const PRIORITY_COLOR = { High: '#FF4757', Medium: '#FFA502', Low: '#2ED573' }

const FILTERS = [
  { key: 'All', label: 'All', count: 3 },
  { key: 'In Progress', label: 'In Progress', count: 2 },
  { key: 'Finish', label: 'Finish', count: 2 },
]

// ─── Task Card ────────────────────────────────────────────────────────────────
const TaskCard = ({ item, navigation }) => (
  <TouchableOpacity style={styles.taskCard}
  onPress={()=>navigation.navigate('TaskDetailsScreen')}
  >
    {/* Title row */}
    <View style={styles.taskTitleRow}>
      <View style={styles.taskIconWrap}>
        <Ionicons name="flash" size={16} color="#fff" />
      </View>
      <Text style={styles.taskTitle} numberOfLines={1}>{item.title}</Text>
    </View>

    {/* Badges */}
    <View style={styles.badgeRow}>
      <View style={styles.badgeInProgress}>
        <View style={styles.badgeDot} />
        <Text style={styles.badgeInProgressTxt}>{item.status}</Text>
      </View>
      <View style={[styles.badgePriority, { backgroundColor: PRIORITY_COLOR[item.priority] || '#FF4757' }]}>
        <Text style={styles.badgePriorityTxt}>🚩 {item.priority}</Text>
      </View>
    </View>

    {/* Progress bar */}
    <View style={styles.progressTrack}>
      <LinearGradient
        colors={[App_Primary_color, '#A89CF7']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.progressFill, { width: `${item.progress * 100}%` }]}
      />
    </View>

    {/* Footer */}
    <View style={styles.taskFooter}>
      <View style={styles.avatarCircle}>
        <Text style={styles.avatarEmoji}>👩‍🦱</Text>
      </View>
      <View style={styles.taskMeta}>
        <View style={styles.taskMetaItem}>
          <Feather name="calendar" size={12} color="#bbb" style={{ marginRight: 4 }} />
          <Text style={styles.taskMetaTxt}>{item.date}</Text>
        </View>
        <View style={styles.taskMetaItem}>
          <Ionicons name="chatbubble-outline" size={12} color="#bbb" style={{ marginRight: 4 }} />
          <Text style={styles.taskMetaTxt}>{item.comments}</Text>
        </View>
      </View>
    </View>
  </TouchableOpacity>
)

// ─── Main Screen ──────────────────────────────────────────────────────────────
const EmployeeTasksScreen = ({ navigation }) => {
  const isFocused = useIsFocused()
  const [activeFilter, setActiveFilter] = useState('In Progress')

  const filteredTasks =
    activeFilter === 'All' ? ALL_TASKS : ALL_TASKS.filter(t => t.filter === activeFilter)

  return (
    <View style={styles.container}>
      {isFocused && (
        <StatusBar barStyle="light-content" translucent />
      )}

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Purple Header ── */}
        <LinearGradient
          colors={['#7B6FF0', '#5B4DE8']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <View style={{ height: Platform.OS === 'android' ? (StatusBar.currentHeight || 24) + 8 : 54 }} />

          {/* Title + illustration */}
          <View style={styles.headerRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.headerTitle}>Challenges Awaiting</Text>
              <Text style={styles.headerSub}>Let's tackle your to do list</Text>
            </View>
            {/* Clock with wings illustration */}
            <View style={styles.illustWrap}>
              <Text style={[styles.sp, { top: 0, right: 10, fontSize: 13 }]}>✦</Text>
              <Text style={[styles.sp, { top: 18, right: 0, fontSize: 9 }]}>✦</Text>
              <Text style={[styles.sp, { top: 4, right: 36, fontSize: 8 }]}>✦</Text>
              {/* Wings */}
              <Text style={styles.wingLeft}>〜</Text>
              <Text style={styles.wingRight}>〜</Text>
              <View style={styles.illCircle}>
                <Ionicons name="time-outline" size={28} color="#fff" />
              </View>
            </View>
          </View>

          {/* ── Summary Card ── */}
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Summary of Your Work</Text>
            <Text style={styles.summarySub}>Your current task progress</Text>

            <View style={styles.statsRow}>
              {/* To Do */}
              <View style={styles.statBlock}>
                <View style={styles.statLabelRow}>
                  <View style={[styles.statIconWrap, { backgroundColor: '#EDE9FF' }]}>
                    <MaterialCommunityIcons name="clock-outline" size={13} color={App_Primary_color} />
                  </View>
                  <Text style={styles.statLabel}>To Do</Text>
                </View>
                <Text style={styles.statVal}>{SUMMARY.toDo}</Text>
              </View>

              <View style={styles.statDivider} />

              {/* In Progress */}
              <View style={styles.statBlock}>
                <View style={styles.statLabelRow}>
                  <View style={[styles.statIconWrap, { backgroundColor: '#FFF3E0' }]}>
                    <Ionicons name="time-outline" size={13} color="#FFA502" />
                  </View>
                  <Text style={styles.statLabel}>In Progress</Text>
                </View>
                <Text style={styles.statVal}>{SUMMARY.inProgress}</Text>
              </View>

              <View style={styles.statDivider} />

              {/* Done */}
              <View style={styles.statBlock}>
                <View style={styles.statLabelRow}>
                  <View style={[styles.statIconWrap, { backgroundColor: '#E8FAF0' }]}>
                    <Ionicons name="checkmark-circle-outline" size={13} color="#2ED573" />
                  </View>
                  <Text style={styles.statLabel}>Done</Text>
                </View>
                <Text style={styles.statVal}>{SUMMARY.done}</Text>
              </View>
            </View>
          </View>
        </LinearGradient>

        {/* ── Filter Tabs ── */}
        <View style={styles.filterWrap}>
          {FILTERS.map(f => {
            const isActive = f.key === activeFilter
            return (
              <TouchableOpacity
                key={f.key}
                onPress={() => setActiveFilter(f.key)}
                activeOpacity={0.75}
                style={[styles.filterBtn, isActive && styles.filterBtnActive]}
              >
                <Text style={[styles.filterTxt, isActive && styles.filterTxtActive]}>
                  {f.label}
                </Text>
                <View style={[styles.filterCountWrap, isActive && styles.filterCountWrapActive]}>
                  <Text style={[styles.filterCountTxt, isActive && styles.filterCountTxtActive]}>
                    {f.count}
                  </Text>
                </View>
              </TouchableOpacity>
            )
          })}
        </View>

        {/* ── Task List ── */}
        <View style={styles.taskList}>
          {filteredTasks.map(item => (
            <TaskCard key={item.id} item={item} 
            navigation={navigation}
            />
          ))}
        </View>

        {/* Bottom padding for floating button */}
        <View style={{ height: 90 }} />
      </ScrollView>

      {/* ── Floating Create Task Button ── */}
      <View style={styles.floatingBtnWrap}>
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => navigation?.navigate('CreateTask')}
          style={styles.floatingBtnTouch}
        >
          <LinearGradient
            colors={[App_Primary_color, '#4B0082']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.floatingBtn}
          >
            <Text style={styles.floatingBtnTxt}>Create Task</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  )
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0F0F8' },
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: 20 },

  // ── Header ──
  header: {
    paddingHorizontal: 20,
    paddingBottom: 28,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
    marginTop: 4,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    fontFamily: FONTS_FAMILY.NatoSans_SemiBold || undefined,
    marginBottom: 4,
  },
  headerSub: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.85)',
    fontFamily: FONTS_FAMILY.NatoSans_Regular || undefined,
  },

  // Illustration
  illustWrap: {
    width: 90,
    height: 72,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sp: {
    position: 'absolute',
    color: 'rgba(255,255,255,0.85)',
  },
  wingLeft: {
    position: 'absolute',
    left: 4,
    top: 22,
    fontSize: 18,
    color: 'rgba(255,255,255,0.7)',
    transform: [{ scaleY: -1 }, { rotate: '-20deg' }],
  },
  wingRight: {
    position: 'absolute',
    right: 4,
    top: 22,
    fontSize: 18,
    color: 'rgba(255,255,255,0.7)',
    transform: [{ scaleY: -1 }, { rotate: '20deg' }],
  },
  illCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(255,255,255,0.22)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.4)',
  },

  // ── Summary Card ──
  summaryCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 18,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
  },
  summaryTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111',
    fontFamily: FONTS_FAMILY.NatoSans_SemiBold || undefined,
    marginBottom: 2,
  },
  summarySub: {
    fontSize: 11,
    color: '#aaa',
    fontFamily: FONTS_FAMILY.NatoSans_Regular || undefined,
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
    backgroundColor: '#FAFAFA',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EBEBF5',
    overflow: 'hidden',
  },
  statBlock: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 12,
  },
  statLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 8,
  },
  statIconWrap: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statLabel: {
    fontSize: 11,
    color: '#888',
    fontFamily: FONTS_FAMILY.NatoSans_Regular || undefined,
  },
  statVal: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111',
    fontFamily: FONTS_FAMILY.NatoSans_SemiBold || undefined,
  },
  statDivider: {
    width: 1,
    backgroundColor: '#EBEBF5',
    marginVertical: 10,
  },

  // ── Filters ──
  filterWrap: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    // paddingTop: 20,
    // paddingBottom: 10,
    gap: 8,
    // flex:1,
    backgroundColor:'white',
    justifyContent:'center',
    marginVertical:10,
    marginHorizontal:10,
    borderRadius:30,
    alignItems:'center',
    paddingVertical:5
  },
  filterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 30,
    backgroundColor: '#fff',
    // borderWidth: 1,
    borderColor: '#E8E8F0',
  },
  filterBtnActive: {
    backgroundColor: App_Primary_color,
    borderColor: App_Primary_color,
  },
  filterTxt: {
    fontSize: 13,
    fontWeight: '600',
    color: '#888',
    fontFamily: FONTS_FAMILY.NatoSans_SemiBold || undefined,
  },
  filterTxtActive: {
    color: '#fff',
  },
  filterCountWrap: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#EBEBF5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterCountWrapActive: {
    backgroundColor: 'rgba(255,255,255,0.28)',
  },
  filterCountTxt: {
    fontSize: 10,
    fontWeight: '700',
    color: '#888',
  },
  filterCountTxtActive: {
    color: '#fff',
  },

  // ── Task Cards ──
  taskList: {
    paddingHorizontal: 20,
    gap: 12,
  },
  taskCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  taskTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  taskIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: App_Primary_color,
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#111',
    fontFamily: FONTS_FAMILY.NatoSans_SemiBold || undefined,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 14,
  },
  badgeInProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    gap: 5,
  },
  badgeDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#BBBBBB',
  },
  badgeInProgressTxt: {
    fontSize: 11,
    color: '#666',
    fontFamily: FONTS_FAMILY.NatoSans_Regular || undefined,
  },
  badgePriority: {
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  badgePriorityTxt: {
    fontSize: 11,
    color: '#fff',
    fontWeight: '700',
    fontFamily: FONTS_FAMILY.NatoSans_SemiBold || undefined,
  },
  progressTrack: {
    height: 6,
    backgroundColor: '#EBEBF5',
    borderRadius: 3,
    marginBottom: 14,
    overflow: 'hidden',
  },
  progressFill: {
    height: 6,
    borderRadius: 3,
  },
  taskFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#EDE9FF',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: '#fff',
  },
  avatarEmoji: { fontSize: 18 },
  taskMeta: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 16,
  },
  taskMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskMetaTxt: {
    fontSize: 12,
    color: '#aaa',
    fontFamily: FONTS_FAMILY.NatoSans_Regular || undefined,
  },

  // ── Floating Button ──
  floatingBtnWrap: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === 'ios' ? 36 : 20,
    paddingTop: 12,
    backgroundColor: 'white',
  },
  floatingBtnTouch: {
    borderRadius: 30,
    overflow: 'hidden',
    shadowColor: App_Primary_color,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  floatingBtn: {
    height: 54,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatingBtnTxt: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
    fontFamily: FONTS_FAMILY.NatoSans_SemiBold || undefined,
  },
})

export default EmployeeTasksScreen