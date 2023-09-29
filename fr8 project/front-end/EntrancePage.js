import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RentingBook from './RentingBook';

const availableBooks = [
  {
    id: '1',
    name: 'Wise Steps for Success',
    imageURL: 'https://5.imimg.com/data5/IU/SQ/GD/SELLER-43618059/book-cover-page-design-500x500.jpg',
  },
  {
    id: '2',
    name: 'Power Quality',
    imageURL: 'http://www.thompsonrd.com/PowerQualityBookCover.jpg',
  },
  {
    id: '3',
    name: 'Alice',
    imageURL: 'http://2.bp.blogspot.com/_JXi92wDCOGk/THQHfuWRWGI/AAAAAAAABtA/xbALCvw4XjU/s320/002e+Alice+book+cover+Back+&+Front.jpg',
  },
  {
    id: '4',
    name: 'Secrete',
    imageURL: 'http://windowsphonesecrets.files.wordpress.com/2010/08/book_cover_v1.jpg',
  },
  {
    id: '5',
    name: 'Diffrent Winter',
    imageURL: 'https://img.freepik.com/free-vector/abstract-elegant-winter-book-cover_23-2148798745.jpg?size=626&ext=jpg&ga=GA1.1.1142263.1693895490&semt=ais',
  },
  {
    id: '6',
    name: 'The Bike Guy',
    imageURL: 'https://img.freepik.com/free-vector/bike-guy-wattpad-book-cover_23-2149452163.jpg?size=626&ext=jpg&ga=GA1.1.1142263.1693895490&semt=ais',
  },
  {
    id: '7',
    name: 'Life on the Candle',
    imageURL: 'https://img.freepik.com/free-psd/realistic-book-cover-presentation_1310-24.jpg?size=626&ext=jpg&ga=GA1.1.1142263.1693895490&semt=ais',
  },
];

function EntrancePage() {
  const navigation = useNavigation();

  const handleLogout = () => {
    navigation.navigate('Home');
  };

  const handleReturnBook = () => {
    navigation.navigate('ReturningBooks');
  };
  
  const handleRentBook = () => {
    navigation.navigate('RentingBook', { availableBooks });
  };

  const handleRentedBooks = () => {
    navigation.navigate('RentedBooks');
  };


  const renderBookRow = ({ item }) => (
    <View style={styles.bookRow}>
      {item.map((book) => (
        <View key={book.id} style={styles.bookContainer}>
          <Image source={{ uri: book.imageURL }} style={styles.bookImage} />
          <Text style={styles.bookName}>{book.name}</Text>
        </View>
      ))}
    </View>
  );

  const booksInRows = availableBooks.reduce((rows, book, index) => {
    if (index % 3 === 0) {
      rows.push([book]);
    } else {
      rows[rows.length - 1].push(book);
    }
    return rows;
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Library Management System</Text>
      <FlatList
        data={booksInRows}
        keyExtractor={(item, index) => String(index)} // Use index as the key
        renderItem={renderBookRow}
      />

      <TouchableOpacity style={styles.rentButton} onPress={handleRentBook}>
        <Text style={styles.rentButtonText}>Rent a Book</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleRentedBooks}>
        <Text style={styles.buttonText}>Rented Books</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleReturnBook}>
        <Text style={styles.buttonText}>Return Book</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
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
  bookRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  bookContainer: {
    flex: 1,
    alignItems: 'center',
  },
  bookImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  bookName: {
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
  logoutButton: {
    backgroundColor: 'blue',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  logoutButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  rentButton: {
    backgroundColor: 'green',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 16,
  },
  rentButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default EntrancePage;
