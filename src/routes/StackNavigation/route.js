import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../../screens/Splash/SplashScreen';
import Login from '../../screens/Auth/Login';

import Dashboard from '../../screens/ManagerFlow/ManagerDashBoard/DashBoard';
import Employees from '../../screens/ManagerFlow/Employees/EmployeeList';






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
        <Stack.Screen name={'Login'} component={Login} />
        <Stack.Screen name={'Dashboard'} component={Dashboard} />
        <Stack.Screen name={'Employees'} component={Employees} />


        {/* <Stack.Screen name={'SearchingNearbyCranesScreen'} component={SearchingNearbyCranesScreen} />


        <Stack.Screen name={'Onboarding'} component={Splash1} />
        <Stack.Screen name={'Signup'} component={Signup} />
        <Stack.Screen name={'AddCompanyDetails'} component={AddCompanyDetails} />
        <Stack.Screen name={'CustomerTab'} component={TabNavigation} />
        <Stack.Screen name={'ForgotPassword'} component={ForgotPassword} />
        <Stack.Screen name={'Otpscreen'} component={OtpScreen} />
        <Stack.Screen name={'LocationPermissionScreen'} component={LocationPermissionScreen} />
        <Stack.Screen name={'PersonalInfoScreen'} component={PersonalInfoScreen} />
        <Stack.Screen name={'TermsAndcondition'} component={TermsAndConditionsScreen} />
        <Stack.Screen name={'PrivacyPolicy'} component={PrivacyPolicyScreen} />
        <Stack.Screen name={'NotificationsScreen'} component={NotificationsScreen} /> */}

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
