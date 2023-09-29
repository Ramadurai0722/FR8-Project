import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, Alert } from 'react-native';

const RentingBook = ({ navigation, route }) => {
  const [email, setEmail] = useState('');
  const [bookName, setBookName] = useState('');
  const [rentDays, setRentDays] = useState(0);

  const { availableBooks } = route.params || {};


  const handleSubmit = () => {
    if (!email || !bookName || rentDays <= 0) {
      alert('Please full all Fields');
      return;
    }

    const isBookAvailable = availableBooks.some((book) => book.name === bookName);

    if (!isBookAvailable) {
      alert('Book Not Available');
      return;
    }

    const dataToSend = {
        email,
        bookName,
        rentDays,
      };
    

      fetch('http://localhost:3000/rent-book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message === 'Book successfully rented') {
            alert('Success', 'Book successfully rented!');
            setEmail('');
            setBookName('');
            setRentDays(0);
          } else {
            alert('Error', 'Failed to rent the book');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          alert('Error', 'Failed to rent the book');
        });
    };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Rent a Book</Text>

      {/* Input fields */}
      <TextInput
        style={styles.input}
        placeholder="Email ID"
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Book Name"
        onChangeText={setBookName}
        value={bookName}
      />
      <TextInput
        style={styles.input}
        placeholder="Days of Rent"
        onChangeText={(text) => {
          const parsedRentDays = parseInt(text, 10);
          if (!isNaN(parsedRentDays)) {
            setRentDays(parsedRentDays);
          } else {
            setRentDays(0);
          }
        }}
        value={rentDays.toString()}
        keyboardType="numeric"
      />

      {/* Submit button */}
      <Button title="Submit" onPress={handleSubmit} />

      {/* List of available books */}
      <FlatList
        data={availableBooks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text>{item.name}</Text>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
});

export default RentingBook;
