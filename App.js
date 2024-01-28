// DEFAULT IMPORTS
import React from 'react';
import { useContext, useEffect } from 'react'
import { useFonts } from 'expo-font'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage'

// UI
import { CloseIcon, GluestackUIProvider, Icon } from "@gluestack-ui/themed"

// COMPONENTS AND SCREENS
import LoadingComponent from './components/LoadingComponent'
import Login from './screens/Login'
import SignUp from './screens/SignUp'
import Welcome from './screens/Welcome'

// CONTEXTS AND REDUX
import AuthContextProvider, { AuthContext } from './store/auth-context'
import { Provider } from 'react-redux';
import { store, persistor } from './store/redux/store'

// CONFIGS AND UTILS 
import { config } from "@gluestack-ui/config";

const Stack = createStackNavigator()

function DefaultStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Sign Up" component={SignUp} />
    </Stack.Navigator>
  )
}

function AuthenticatedStack() {
  const auth = useContext(AuthContext)
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={Welcome} options={{
        headerRight: () => <Icon as={CloseIcon} size="lg" onPress={auth.logout} />
      }} />
    </Stack.Navigator>
  )
}

function RenderStacks() {
  const auth = useContext(AuthContext)

  return (
    <NavigationContainer>
      {!auth.isAuthenticated && <DefaultStack />}
      {auth.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  )
}

function Root() {
  const appData = useSelector((s) => s.app)
  const auth = useContext(AuthContext)

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem('token')

      if (storedToken) {
        auth.authenticate(storedToken)
      }
    }

    fetchToken()
  }, [])

  return <RenderStacks />
}

export default function App() {
  const [fontsLoaded] = useFonts({
    'josefinB': require('./assets/font/JosefinSans-Bold.ttf'),
    'josefinL': require('./assets/font/JosefinSans-Light.ttf'),
    'josefinR': require('./assets/font/JosefinSans-Regular.ttf'),
    'josefinT': require('./assets/font/JosefinSans-Thin.ttf')
  })

  if (!fontsLoaded) {
    return <LoadingComponent />
  }

  return (
    <GluestackUIProvider config={config}>
      <AuthContextProvider>
        <Provider store={store}>
            <Root />
        </Provider>
      </AuthContextProvider>
    </GluestackUIProvider>
  );
}