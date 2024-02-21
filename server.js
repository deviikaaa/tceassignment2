const express = require('express');
const connectDB = require('./database');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

connectDB(); // Connect to the database

app.use(express.json()); // Parse incoming JSON requests

app.use('/api', routes); // Use the defined routes

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
