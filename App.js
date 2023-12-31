import * as React from 'react';
import { useEffect } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

import { LogBox } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Login from './screens/LoginPage';
import SignUp from './screens/SignUp';
import Event from './screens/Event';
import EventDetails from './screens/EventDetails';
import HomePage from './screens/HomePage'
import EditProfilePage from './screens/EditProfilePage';

import { useFonts } from 'expo-font';
import 'firebase/firestore';
import { auth } from './components/AuthUtils';

import MyGroups from './screens/Group/MyGroups';
import CreateGroup from './screens/Group/CreateGroup';
import GroupDetail from './screens/Group/GroupDetail';

import CreateEvent from './screens/CreateEvent';
import ProfileScreen from './screens/ProfilePage';
import SearchPage from './screens/SearchPage';

import UserContext from './components/UserContext';

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

const App = () => {
  LogBox.ignoreLogs(['Key "base64" in the image picker result is deprecated']);
  const [userEmail, setUserEmail] = React.useState(null);
  const [showHomeScreen, setShowHomeScreen] = React.useState(false);

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged((user) => {
      if (user) {
        setShowHomeScreen(true);
        setUserEmail(user.email);
      } else {
        setShowHomeScreen(false);
        setUserEmail(null);
      }
    });

    return () => subscriber();
  }, []);

  const BottomTabs = () => {
    return (
      <Tabs.Navigator 
        screenOptions={{ 
          headerShown: true,
          tabBarStyle: {
            backgroundColor: 'rgb(46,46,46)',
          },
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: 'white', 
          headerStyle: {
            backgroundColor: 'rgb(46,46,46)',
            shadowColor: 'transparent', // Remove shadow on iOS
          },
          headerTintColor: 'white',
        }}>

          <Tabs.Screen
            name="Home"
            component={HomePage}
            options={{
              tabBarIcon: ({ size }) => (
                <Ionicons name="md-home-outline" size={size} color="white" />
              ),
              
            }}
          >
          </Tabs.Screen>

        <Tabs.Screen
          name='Groups'
          component={MyGroups}
          options={{
            tabBarIcon: ({ size }) => (
              <Ionicons
                name='md-people-outline' size={size} color='white'
              />
            ),
          }}
        ></Tabs.Screen>
        <Tabs.Screen
          name='Events'
          component={Event}
          options={{
            tabBarIcon: ({ size }) => (
              <Ionicons name='md-game-controller-outline' size={size} color='white' />
            ),
          }}
        ></Tabs.Screen>

        <Tabs.Screen
          name='Search'
          component={SearchPage}
          options={{
            tabBarIcon: ({ size }) => (
              <Ionicons name='md-search' size={size} color='white' />
            ),
          }}
        ></Tabs.Screen>

          <Tabs.Screen
            name="Profile" 
            component={ProfileScreen}
            options={{
              tabBarIcon: ({ size }) => (
                <Ionicons name="md-settings-outline" size={size} color="white" />
              )
            }}
          />

      </Tabs.Navigator>
    )
  }

  const [fontsLoaded, error] = useFonts({
    'GothicA1-Regular': require('./assets/fonts/GothicA1-Regular.ttf'),
    'GothicA1-Medium': require('./assets/fonts/GothicA1-Medium.ttf'),
    'GothicA1-SemiBold': require('./assets/fonts/GothicA1-SemiBold.ttf'),
  });

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <>
    <UserContext.Provider value={{userEmail, setUserEmail}}>
      <NavigationContainer>
        {showHomeScreen ? (
          <Stack.Navigator>
            <Stack.Screen
              name="HomePage"
              component={BottomTabs}
              options={{
                headerStyle: {
                  backgroundColor: 'rgb(46,46,46)',
                },
                headerShown: false,
              }}
            />

            <Stack.Screen
              name='CreateEvent'
              component={CreateEvent}
              options={{
                headerStyle: {
                  backgroundColor: 'rgb(46,46,46)',
                },
                headerTitle: 'Create an Event',
                headerTintColor: 'white',
                headerShown: true,
                headerBackTitle: 'Back'
              }}
            />

            <Stack.Screen
              name="EventDetails"
              component={EventDetails}
              options={{
                headerStyle: {
                  backgroundColor: 'rgb(46,46,46)',
                },
                headerTintColor: 'white',
                headerShown: true, 
                headerBackTitle: 'Back'
              }}
            />

            <Stack.Screen
              name='CreateGroup'
              component={CreateGroup}
              options={{
                headerStyle: {
                  backgroundColor: 'rgb(46,46,46)',
                },
                headerTitle: 'Create Group',
                headerTintColor: 'white',
                headerBackTitle: 'Groups'
              }}
            />

            <Stack.Screen
              name='GroupDetail'
              component={GroupDetail}
              options={{
                headerStyle: {
                  backgroundColor: 'rgb(46,46,46)',
                },
                headerTitle: 'Group Detail',
                headerTintColor: 'white',
                headerBackTitle: 'Groups'
              }}
            />
            <Stack.Screen
              name='EditProfilePage'
              component={EditProfilePage}
              options={{
                headerStyle: {
                  backgroundColor: 'rgb(46,46,46)',
                },
                headerTitle: 'Edit Profile',
                headerTintColor: 'white',
              }}
            />
            <Stack.Screen
              name='ProfilePage'
              component={ProfileScreen}
              options={{
                headerStyle: {
                  backgroundColor: 'rgb(46,46,46)',
                },
                headerTitle: 'Profile',
                headerTintColor: 'white',
              }}
            />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
              name='Login'
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name='SignUp'
              component={SignUp}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </UserContext.Provider>
    </>
  );
};

export default App;
