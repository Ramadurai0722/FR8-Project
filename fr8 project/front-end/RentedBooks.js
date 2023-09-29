import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function RentedBooks() {
    const navigation = useNavigation();
  const [rentedBooks, setRentedBooks] = useState([]);
  
  useEffect(() => {
    fetch('http://localhost:3000/rented-books')
      .then((response) => response.json())
      .then((data) => {
        setRentedBooks(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Rented Books</Text>
      
      <FlatList
        data={rentedBooks}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => (
          <View style={styles.bookItem}>
            <Text style={styles.bookName}>{item.bookName}</Text>
            <Text style={styles.email}>Email: {item.email}</Text>
           </View>
        )}
      />
       <br />
        <br />
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate('Entrance')}
      >
        <Text style={styles.backButtonText}>Back to Entrance</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  bookItem: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
  },
  bookName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  email: {
    fontSize: 16,
  },
  remainingDays: {
    fontSize: 16,
  },

  backButton: {
    backgroundColor: 'blue',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  backButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default RentedBooks;
