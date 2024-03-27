const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/ai_crm_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

// Customer Schema
const customerSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  industry: String,
  // Add more fields as needed
});
const Customer = mongoose.model('Customer', customerSchema);

app.use(bodyParser.json());

// Routes
app.get('/customers', async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/customers', async (req, res) => {
  const customer = new Customer({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    industry: req.body.industry,
  });
  try {
    const newCustomer = await customer.save();
    res.status(201).json(newCustomer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Add more routes for updating and deleting customers as needed

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
