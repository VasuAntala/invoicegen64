import mongoose from 'mongoose';

const tokenSchema = new mongoose.Schema({
  invoiceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Invoice',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'card', 'bank_transfer', 'upi', 'other'],
    default: 'cash'
  },
  transactionId: {
    type: String,
    unique: true
  },
  notes: {
    type: String
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'completed'
  }
}, {
  timestamps: true
});

// Generate transaction ID automatically
tokenSchema.pre('save', async function(next) {
  if (this.isNew && !this.transactionId) {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    this.transactionId = `TXN-${timestamp}-${random}`;
  }
  next();
});

export const Token = mongoose.model('Token', tokenSchema);
