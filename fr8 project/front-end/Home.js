import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Library Management System</Text>
      <Button
        title="Registration"
        onPress={() => navigation.navigate('register')}
      />
      <Button
        title="Login"
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default Home;
