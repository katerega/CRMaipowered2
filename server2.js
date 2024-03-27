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
    // Add more fields as needed
  });
  try {
    const newCustomer = await customer.save();
    res.status(201).json(newCustomer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Add routes for updating and deleting customers
app.put('/customers/:id', async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (customer == null) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    // Update customer fields
    customer.name = req.body.name;
    customer.email = req.body.email;
    customer.phone = req.body.phone;
    customer.industry = req.body.industry;
    // Save updated customer
    const updatedCustomer = await customer.save();
    res.json(updatedCustomer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete('/customers/:id', async (req, res) => {
  try {
    const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);
    if (deletedCustomer == null) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.json({ message: 'Customer deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
// add routes for  AI-driven insights, automation of tasks, integration with external systems,