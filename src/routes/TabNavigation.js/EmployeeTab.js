import * as React from 'react';
import { useState, useEffect } from 'react';
import { Keyboard, View, StyleSheet, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';

// ── Import your SVG icons ──────────────────────────────────────────────────────
// Active (colored/filled) icons
import {
   AttendenceActive,
  AttendanceInactive,
  HomeActive,
  LeavesActive,
  LeavesInactive,
  PayrollActive,
  payrollInactive,
  ActiveTask,
  TaskInactive,
  HomeInactive
} from '../../assets/SVGs'; // 👈 update path to your SVG index



import HomeScreen from '../../screens/EmployeeFlow/EmployeeHome';
import EmployeeAttendanceScreen from '../../screens/EmployeeFlow/EmployeeAttendance/EmployeeAttendance';
import EmployeeTasksScreen from '../../screens/EmployeeFlow/Employeetasks/EmployeeTasks';
import EmployeePayrollScreen from '../../screens/EmployeeFlow/EmployeePayroll/EmployeePayroll';

import LeaveHomeScreen from '../../screens/EmployeeFlow/EmployeeLeave/LeaveScreen';


// For now all tabs point to HomeScreen until you create the rest
// const HomeScreen = HomeScreen;
const TaskScreen      = HomeScreen;
const PayrollScreen   = HomeScreen;
const LeaveScreen     = HomeScreen;
// const  EmployeeAttendanceScreen = EmployeeAttendanceScreen;

// ─────────────────────────────────────────────────────────────────────────────
const Tab   = createBottomTabNavigator();
const Stack = createStackNavigator();

// ── Tab config — easy to add/change screens later ─────────────────────────────
const TAB_CONFIG = [
  {
    name:       'HomeTab',
    label:      'Home',
    component:  HomeScreen,
    ActiveIcon:   HomeActive,
    InactiveIcon: HomeInactive,
  },
  {
    name:       'AttendantTab',
    label:      'Attendance',
    component:  EmployeeAttendanceScreen,
    ActiveIcon:   AttendenceActive,
    InactiveIcon: AttendanceInactive,
  },
  {
    name:       'TaskTab',
    label:      'Task',
    component:  EmployeeTasksScreen,
    ActiveIcon:   ActiveTask,
    InactiveIcon: TaskInactive,
  },
  {
    name:       'PayrollTab',
    label:      'Payroll',
    component:  EmployeePayrollScreen,
    ActiveIcon:   PayrollActive,
    InactiveIcon: payrollInactive,
  },
  {
    name:       'LeaveTab',
    label:      'Leave',
    component:  LeaveHomeScreen,
    ActiveIcon:   LeavesActive,
    InactiveIcon: LeavesInactive,
  },
];

// ─── Tab Icon + Label ─────────────────────────────────────────────────────────
const TabItem = ({ focused, ActiveIcon, InactiveIcon, label }) => (
  <View style={styles.tabItem}>
    <View style={styles.iconWrap}>
      {focused ? <ActiveIcon /> : <InactiveIcon />}
    </View>
    <Text style={[styles.tabLabel, focused && styles.tabLabelActive]}>
      {label}
    </Text>
    {/* Active underline indicator */}
    {/* {focused && <View style={styles.activeBar} />} */}
  </View>
);

// ─── Main Tab Navigator ───────────────────────────────────────────────────────
function EmployeeTabNavigation() {
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const show = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
    const hide = Keyboard.addListener('keyboardDidHide',  () => setKeyboardVisible(false));
    return () => { show.remove(); hide.remove(); };
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: [
          styles.tabBar,
          keyboardVisible && { display: 'none' },
        ],
        tabBarShowLabel: false, // we render label ourselves inside TabItem
      }}
    >
      {TAB_CONFIG.map(({ name, label, component, ActiveIcon, InactiveIcon }) => (
        <Tab.Screen
          key={name}
          name={name}
          component={component}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabItem
                focused={focused}
                ActiveIcon={ActiveIcon}
                InactiveIcon={InactiveIcon}
                label={label}
              />
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#FFFFFF',
    height: 88,
    // borderTopWidth: 1,
    borderTopColor: '#F0F0F5',
    elevation: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: -4 },
    paddingBottom: 0,
    paddingTop: 0,
    justifyContent: 'center',
  },

  // Each tab cell
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 14,
    width: 60,
    position: 'relative',
  },

  // Icon container
  iconWrap: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Label
  tabLabel: {
    fontSize: 11,
    fontWeight: '500',
    color: '#8A9BB0',     // inactive grey — matches image
    marginTop: 4,
    letterSpacing: 0.2,
  },
  tabLabelActive: {
    color: '#746CFF',     // purple — matches active "Attendant" in image
    fontWeight: '600',
  },

  // Short underline bar under active label (matches the design)
  activeBar: {
    position: 'absolute',
    bottom: -10,
    width: 28,
    height: 3,
    borderRadius: 2,
    backgroundColor: '#746CFF',
  },
});

export default EmployeeTabNavigation;