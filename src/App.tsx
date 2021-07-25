import React from 'react'

import { IconButton, Provider as PaperProvider } from 'react-native-paper'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'

import {
  LoginScreen,
  NotificationsScreen,
  PumpsScreen,
  SensorsScreen,
  SettingsScreen,
  SubscribersScreen,
} from './screens'

import { AuthProvider, useAuth } from './contexts/AuthContext'
import {
  NotificationsProvider,
  PumpsProvider,
  SensorsProvider,
  SubscribersProvider,
} from './hooks'
import { DarkTheme } from './Theme'

type ProviderType = ({ children }: { children: JSX.Element }) => JSX.Element

// Combine a bunch of providers into a single provider
const combineProviders = (providers: ProviderType[]): ProviderType => {
  const CombinedProviders = ({ children }: { children: JSX.Element }) => {
    return providers.reduce(
      (tree, Provider) => <Provider>{tree}</Provider>,
      children,
    )
  }

  return CombinedProviders
}

const EndpointProviders = combineProviders([
  NotificationsProvider,
  SubscribersProvider,
  PumpsProvider,
  SensorsProvider
])

const drawerScreenOptions = (iconName: string) => {
  return {
    headerShown: true,
    headerTintColor: 'white',
    headerStyle: { backgroundColor: '#7f6886' },
    drawerIcon: () => <IconButton icon={iconName} disabled />,
  }
}

const Drawer = createDrawerNavigator()
const Stack = createStackNavigator()

const Navigation = () => {
  const { isLoggedIn } = useAuth()

  return (
    <NavigationContainer theme={DarkTheme}>
      {isLoggedIn ? (
        <PaperProvider theme={DarkTheme}>
          <EndpointProviders>
            <Drawer.Navigator lazy initialRouteName="Notifications">
              <Drawer.Screen
                name="Notifications"
                component={NotificationsScreen}
                options={drawerScreenOptions('bell')}
              />
              <Drawer.Screen
                name="Subscribers"
                component={SubscribersScreen}
                options={drawerScreenOptions('email')}
              />
              <Drawer.Screen
                name="Pumps"
                component={PumpsScreen}
                options={drawerScreenOptions('water-pump')}
              />
              <Drawer.Screen
                name="Sensors"
                component={SensorsScreen}
                options={drawerScreenOptions(
                  'chart-bell-curve-cumulative',
                )}
              />
              <Drawer.Screen
                name="Settings"
                component={SettingsScreen}
                options={drawerScreenOptions('dots-horizontal-circle')}
              />
            </Drawer.Navigator>
          </EndpointProviders>
        </PaperProvider>
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  )
}

export const App = () => {
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  )
}
