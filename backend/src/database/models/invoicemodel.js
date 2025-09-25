import mongoose from "mongoose";

// Address schema for reusability
const addressSchema = new mongoose.Schema({
  businessName: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  gstin: {
    type: String,
    trim: true,
    default: null // Since it's optional
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  city: {
    type: String,
    required: true,
    trim: true
  },
  postalCode: {
    type: String,
    required: true,
    trim: true
  },
  state: {
    type: String,
    required: true,
    trim: true
  }
});



const itemSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
},
  hsn: { 
    type: String, 
    required: false 
},
  gstRate: { 
    type: Number, 
    required: true 
},
  quantity: { 
    type: Number, 
    required: true 
},
  rate: { 
    type: Number, 
    required: true 
},
  amount: { 
    type: Number, 
    required: true 
},
  cgst: { 
    type: Number, 
    required: true 
},
  sgst: { 
    type: Number, 
    required: true 
},
  total: { 
    type: Number, 
    required: true 
}
});




// Main invoice schema
const invoice = new mongoose.Schema({
  invoiceNumber: {
    type: String,
    required: false,
    unique: true
  },
  invoiceDate: {
    type: Date,
    default: Date.now
  },
  billedBy: {
    type: addressSchema,
    required: true
  },
  billedTo: {
    type: addressSchema,
    required: true
  },
items: [itemSchema],
  subtotal: { 
    type: Number, 
    required: true 
},
  totalCgst: { 
    type: Number, 
    required: true 
},
  totalSgst: { 
    type: Number, 
    required: true 
},
  grandTotal: { 
    type: Number, 
    required: true
 },
  payment: {
    upiId: {
      type: String,
      trim: true,
      default: ''
    }
  }

}, {
  timestamps: true // Automatically adds createdAt and updatedAt
});

invoice.pre('save', async function(next) {
  if (this.isNew) {
    const count = await mongoose.model('Invoice').countDocuments();
    this.invoiceNumber = `INV-${String(count + 1).padStart(6, '0')}`;
  }
  next();
});

 const Invoice = mongoose.model('Invoice', invoice);

export default Invoice; 


