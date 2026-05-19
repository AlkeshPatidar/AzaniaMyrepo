// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';

// const Stack = createStackNavigator();

// // 👉 Screen 1
// const HomeScreen = ({ navigation }) => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>Home Screen</Text>

//       <TouchableOpacity
//         style={styles.button}
//         onPress={() => navigation.navigate('Details')}
//       >
//         <Text style={styles.buttonText}>Go to Details</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// // 👉 Screen 2
// const DetailsScreen = ({ navigation }) => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>Details Screen</Text>

//       <TouchableOpacity
//         style={styles.button}
//         onPress={() => navigation.goBack()}
//       >
//         <Text style={styles.buttonText}>Go Back</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// // 👉 Main App
// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Home">
        
//         <Stack.Screen 
//           name="Home" 
//           component={HomeScreen} 
//         />

//         <Stack.Screen 
//           name="Details" 
//           component={DetailsScreen} 
//         />

//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// // 👉 Styles
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   text: {
//     fontSize: 22,
//     marginBottom: 20
//   },
//   button: {
//     backgroundColor: '#007bff',
//     padding: 12,
//     borderRadius: 8
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16
//   }
// });

import React from 'react'
import {StatusBar} from 'react-native'
import StackNavigation from './src/routes/StackNavigation/route'
// import FlashMessage from 'react-native-flash-message'
import Loader from './src/components/Loader'
import {Provider, useSelector} from 'react-redux'
import store from './src/redux/store'
import {LoginCheckProvider} from './src/utils/Context'
import ToastMessage from './src/components/Tooltips/SuccessToolTip'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'


const App = () => {
  const MainApp = () => {
  const loaderVisible = useSelector(state => state?.loader?.loader)

 

  return (
    <LoginCheckProvider>
      <SafeAreaProvider>
        {/* <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}} edges={['top']}> */}
          {/* <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" translucent={false} /> */}
          <StackNavigation />
          {/* <FlashMessage position='top' /> */}
           {/* <ToastMessage /> */}
          <Loader visible={loaderVisible} />
        {/* </SafeAreaView> */}
      </SafeAreaProvider>
    </LoginCheckProvider>
  )
}

  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  )
}

export default App
