import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import OnboardingCarousel from '../../screens/Splash/Onboarding';
import SplashScreen from '../../screens/Splash/SplashScreen';
import Login from '../../screens/Auth/Login';

import Dashboard from '../../screens/ManagerFlow/ManagerDashBoard/DashBoard';
import Employees from '../../screens/ManagerFlow/Employees/EmployeeList';
import DailyAttendance from '../../screens/ManagerFlow/Attendance/DailyAttendance';
import MonthlyAttendance from '../../screens/ManagerFlow/Attendance/MonthlyAttendance';
import ShiftScheduler from '../../screens/ManagerFlow/Attendance/ShiftSchedular';
import Overtime from '../../screens/ManagerFlow/Attendance/Overtime';
import TimeOff from '../../screens/ManagerFlow/Attendance/TimeOff';
import Leaves from '../../screens/ManagerFlow/Attendance/Leaves';

import PayrollOverviewScreen from '../../screens/ManagerFlow/Payroll/PayrollDashboard';
import PayslipPreviewScreen from '../../screens/ManagerFlow/Payroll/PayslipPreview'

import EmployeeHome from '../../screens/EmployeeFlow/EmployeeHome';

import EmployeeTabNavigation from '../TabNavigation.js/EmployeeTab';
import ClockInAreaScreen from '../../screens/EmployeeFlow/EmployeeAttendance/ClockInAreaScreen';

import TaskDetailsScreen from '../../screens/EmployeeFlow/Employeetasks/TaskDetails';
import SubmitExpenseScreen from '../../screens/EmployeeFlow/EmployeePayroll/AddExpense';

import LeaveDetailsScreen from '../../screens/EmployeeFlow/EmployeeLeave/LeaveDetail';
import ApplyLeaveScreen from '../../screens/EmployeeFlow/EmployeeLeave/ApplyLeave';

// const Stack = createNativeStackNavigator();
const Stack = createStackNavigator();
const appNavigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#FFFFFF',
  },
}

const StackNavigation = () => {
  return (
    <NavigationContainer theme={appNavigationTheme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#FFFFFF' },
          statusBarTranslucent: false,
          statusBarStyle: 'dark',
          statusBarColor: '#FFFFFF',
          animation: 'slide_from_right'
        }}
        initialRouteName="SplashScreen">


        <Stack.Screen name={'SplashScreen'} component={SplashScreen} />
        <Stack.Screen name={'OnboardingCarousel'} component={OnboardingCarousel} />

        <Stack.Screen name={'Login'} component={Login} />
        <Stack.Screen name={'Dashboard'} component={Dashboard} />
        <Stack.Screen name={'Employees'} component={Employees} />
        <Stack.Screen name={'DailyAttendance'} component={DailyAttendance} />
        <Stack.Screen name={'MonthlyAttendance'} component={MonthlyAttendance} />
        <Stack.Screen name={'ShiftScheduler'} component={ShiftScheduler} />
        <Stack.Screen name={'Overtime'} component={Overtime} />
        <Stack.Screen name={'TimeOff'} component={TimeOff} />
        <Stack.Screen name={'Leaves'} component={Leaves} />

        <Stack.Screen name={'PayrollOverviewScreen'} component={PayrollOverviewScreen} />
        <Stack.Screen name={'PayslipPreviewScreen'} component={PayslipPreviewScreen}/>


      {/* EmployeeFlow */}
      <Stack.Screen name={'EmployeeHome'} component={EmployeeHome} />
      <Stack.Screen name={'EmployeeTabNavigation'} component={EmployeeTabNavigation} />
      <Stack.Screen name={'ClockInAreaScreen'} component={ClockInAreaScreen} />
      <Stack.Screen name={'TaskDetailsScreen'} component={TaskDetailsScreen} />
      <Stack.Screen name={'SubmitExpenseScreen'} component={SubmitExpenseScreen} />
      <Stack.Screen name={'LeaveDetailsScreen'} component={LeaveDetailsScreen} />
      <Stack.Screen name={'ApplyLeave'} component={ApplyLeaveScreen} />

        

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
