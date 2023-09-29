const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/Library-system', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(cors());

// Define a User schema and model using Mongoose
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
});

const User = mongoose.model('User', userSchema);

// Define a schema and model for rented books
const rentedBookSchema = new mongoose.Schema({
  email: String,
  bookName: String,
  rentDays: Number,
});

const RentedBook = mongoose.model('RentedBook', rentedBookSchema);

app.use(bodyParser.json());

// Route to handle user registration
app.post('/register', async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword, email });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error registering user' });
  }
});

// Route to handle user login
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error logging in' });
  }
});

// Route to handle book rentals
app.post('/rent-book', async (req, res) => {
  try {
    const { email, bookName, rentDays } = req.body;
    const rentedBook = new RentedBook({ email, bookName, rentDays });
    await rentedBook.save();
    res.status(201).json({ message: 'Book successfully rented' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error renting book' });
  }
});

// Add a new route to get rented books
app.get('/rented-books', async (req, res) => {
    try {
      // Retrieve all rented books from the database
      const rentedBooks = await RentedBook.find();
      res.status(200).json(rentedBooks);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error getting rented books' });
    }
  });
  
// Route to handle returning a rented book
app.delete('/return-book/:id', async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedBook = await RentedBook.findByIdAndRemove(id);
  
      if (!deletedBook) {
        return res.status(404).json({ message: 'Book not found' });
      }
  
      res.status(200).json({ message: 'Book successfully returned' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error returning book' });
    }
  });
  
  

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
