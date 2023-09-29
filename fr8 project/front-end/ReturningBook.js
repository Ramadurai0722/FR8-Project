import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

function ReturningBooks() {
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

  const handleReturnBook = (bookId) => {

    fetch(`http://localhost:3000/return-book/${bookId}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then(() => {
        setRentedBooks((prevBooks) => prevBooks.filter((book) => book._id !== bookId));
      })
      .catch((error) => {
        console.error('Error returning book:', error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Returning Books</Text>

      <FlatList
        data={rentedBooks}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => (
          <View style={styles.bookItem}>
            <Text style={styles.bookName}>{item.bookName}</Text>
            <Text style={styles.email}>Email: {item.email}</Text>
            <TouchableOpacity
              style={styles.returnButton}
              onPress={() => handleReturnBook(item._id)}
            >
              <Text style={styles.returnButtonText}>Return Book</Text>
            </TouchableOpacity>
          </View>
        )}
      />
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
  returnButton: {
    backgroundColor: 'red',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  returnButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ReturningBooks;
