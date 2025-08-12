import { model } from '../../database/index.js';
import mongoose from 'mongoose';

// Create a new invoice
export const createInvoice = async (req, res) => {
  try {
    // Check if database is connected
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ 
        error: 'Database not connected', 
        message: 'Please ensure MongoDB is running and try again' 
      });
    }

    const { clientName, clientEmail, items, subtotal, tax, total, tokenAmount, dueDate, notes } = req.body;
    const userEmail = req.user.email;

    // Find user by email
    const user = await model.User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Calculate remaining amount
    const remainingAmount = total - (tokenAmount || 0);

    // Determine status based on token amount
    let status = 'pending';
    if (tokenAmount >= total) {
      status = 'paid';
    } else if (tokenAmount > 0) {
      status = 'partial';
    }

    const invoice = new model.Invoice({
      userId: user._id,
      clientName,
      clientEmail,
      items,
      subtotal,
      tax,
      total,
      tokenAmount: tokenAmount || 0,
      remainingAmount,
      status,
      dueDate,
      notes
    });

    await invoice.save();

    // If token amount is provided, create a token record
    if (tokenAmount && tokenAmount > 0) {
      const token = new model.Token({
        invoiceId: invoice._id,
        userId: user._id,
        amount: tokenAmount,
        paymentMethod: req.body.paymentMethod || 'cash',
        notes: req.body.tokenNotes || 'Initial token payment'
      });
      await token.save();
    }

    res.status(201).json({
      message: 'Invoice created successfully',
      data: invoice
    });

  } catch (error) {
    console.error('Error creating invoice:', error);
    res.status(500).json({ error: 'Failed to create invoice', details: error.message });
  }
};

// Get all invoices for the authenticated user
export const getUserInvoices = async (req, res) => {
  try {
    const userEmail = req.user.email;
    const user = await model.User.findOne({ email: userEmail });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const invoices = await model.Invoice.find({ userId: user._id })
      .populate('userId', 'username email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: 'Invoices retrieved successfully',
      data: invoices
    });

  } catch (error) {
    console.error('Error fetching invoices:', error);
    res.status(500).json({ error: 'Failed to fetch invoices', details: error.message });
  }
};

// Get a specific invoice by ID
export const getInvoiceById = async (req, res) => {
  try {
    const { invoiceId } = req.params;
    const userEmail = req.user.email;
    
    const user = await model.User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const invoice = await model.Invoice.findOne({ 
      _id: invoiceId, 
      userId: user._id 
    }).populate('userId', 'username email');

    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }

    // Get token payments for this invoice
    const tokens = await model.Token.find({ invoiceId }).sort({ createdAt: -1 });

    res.status(200).json({
      message: 'Invoice retrieved successfully',
      data: {
        invoice,
        tokens
      }
    });

  } catch (error) {
    console.error('Error fetching invoice:', error);
    res.status(500).json({ error: 'Failed to fetch invoice', details: error.message });
  }
};

// Add token payment to an invoice
export const addTokenPayment = async (req, res) => {
  try {
    const { invoiceId } = req.params;
    const { amount, paymentMethod, notes } = req.body;
    const userEmail = req.user.email;

    const user = await model.User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Find the invoice
    const invoice = await model.Invoice.findOne({ 
      _id: invoiceId, 
      userId: user._id 
    });

    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }

    // Validate amount
    if (amount <= 0) {
      return res.status(400).json({ error: 'Token amount must be greater than 0' });
    }

    if (amount > invoice.remainingAmount) {
      return res.status(400).json({ error: 'Token amount cannot exceed remaining amount' });
    }

    // Create token payment record
    const token = new model.Token({
      invoiceId: invoice._id,
      userId: user._id,
      amount,
      paymentMethod: paymentMethod || 'cash',
      notes: notes || 'Token payment'
    });

    await token.save();

    // Update invoice
    invoice.tokenAmount += amount;
    invoice.remainingAmount -= amount;
    
    // Update status
    if (invoice.remainingAmount === 0) {
      invoice.status = 'paid';
    } else if (invoice.tokenAmount > 0) {
      invoice.status = 'partial';
    }

    await invoice.save();

    res.status(201).json({
      message: 'Token payment added successfully',
      data: {
        token,
        updatedInvoice: invoice
      }
    });

  } catch (error) {
    console.error('Error adding token payment:', error);
    res.status(500).json({ error: 'Failed to add token payment', details: error.message });
  }
};

// Get all token payments for an invoice
export const getInvoiceTokens = async (req, res) => {
  try {
    const { invoiceId } = req.params;
    const userEmail = req.user.email;

    const user = await model.User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Verify invoice belongs to user
    const invoice = await model.Invoice.findOne({ 
      _id: invoiceId, 
      userId: user._id 
    });

    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }

    const tokens = await model.Token.find({ invoiceId })
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: 'Token payments retrieved successfully',
      data: tokens
    });

  } catch (error) {
    console.error('Error fetching token payments:', error);
    res.status(500).json({ error: 'Failed to fetch token payments', details: error.message });
  }
};

// Update invoice status
export const updateInvoiceStatus = async (req, res) => {
  try {
    const { invoiceId } = req.params;
    const { status } = req.body;
    const userEmail = req.user.email;

    const user = await model.User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const invoice = await model.Invoice.findOne({ 
      _id: invoiceId, 
      userId: user._id 
    });

    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }

    invoice.status = status;
    await invoice.save();

    res.status(200).json({
      message: 'Invoice status updated successfully',
      data: invoice
    });

  } catch (error) {
    console.error('Error updating invoice status:', error);
    res.status(500).json({ error: 'Failed to update invoice status', details: error.message });
  }
};

// Delete an invoice (only if no payments have been made)
export const deleteInvoice = async (req, res) => {
  try {
    const { invoiceId } = req.params;
    const userEmail = req.user.email;

    const user = await model.User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const invoice = await model.Invoice.findOne({ 
      _id: invoiceId, 
      userId: user._id 
    });

    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }

    // Check if any token payments exist
    const tokenCount = await model.Token.countDocuments({ invoiceId });
    if (tokenCount > 0) {
      return res.status(400).json({ error: 'Cannot delete invoice with existing payments' });
    }

    await model.Invoice.findByIdAndDelete(invoiceId);

    res.status(200).json({
      message: 'Invoice deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting invoice:', error);
    res.status(500).json({ error: 'Failed to delete invoice', details: error.message });
  }
};
