import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './Home';
import Login from './Login';
import Register from './register';
import EntrancePage from './EntrancePage';
import UserProfile from './userProfile';
import RentingBook from './RentingBook';
import RentedBooks from './RentedBooks';
import ReturningBooks from './ReturningBook';

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="register" component={Register} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Entrance" component={EntrancePage} />
        <Stack.Screen name="Userprofile" component={UserProfile} />
        <Stack.Screen name="RentingBook" component={RentingBook} />
        <Stack.Screen name="RentedBooks" component={RentedBooks} />
        <Stack.Screen name="ReturningBooks" component={ReturningBooks} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
