const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/social-network', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.log(err));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const userRoutes = require('./routes/users');
const thoughtRoutes = require('./routes/thoughts');
const reactionRoutes = require('./routes/reactions');

// Use the routes
app.use('/api/users', userRoutes);
app.use('/api/thoughts', thoughtRoutes);
app.use('/api/thoughts', reactionRoutes);
