# Invoice Management Backend

A comprehensive backend system for managing invoices with token money tracking capabilities.

## Features

- **User Authentication**: JWT-based authentication system
- **Invoice Management**: Create, view, update, and delete invoices
- **Token Money Tracking**: Track partial payments and token amounts
- **Payment History**: Complete payment transaction history
- **Auto-generated IDs**: Automatic invoice numbers and transaction IDs
- **Status Management**: Track invoice status (pending, partial, paid)

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Server
```bash
npm start
```

The server will run on `http://localhost:3002`

### 3. Test the API
```bash
node test_api.js
```

## API Endpoints

### Authentication
- `POST /auth/registers` - Register a new user
- `POST /auth/login` - Login and get JWT token

### Invoice Management
- `POST /invoice/create` - Create a new invoice
- `GET /invoice/all` - Get all user invoices
- `GET /invoice/:invoiceId` - Get specific invoice with payment history
- `PUT /invoice/:invoiceId/status` - Update invoice status
- `DELETE /invoice/:invoiceId` - Delete invoice (if no payments)

### Token Payments
- `POST /invoice/:invoiceId/token` - Add token payment
- `GET /invoice/:invoiceId/tokens` - Get payment history

## Database Models

### User Model
```javascript
{
  username: String,
  email: String (unique),
  password: String,
  timestamps: true
}
```

### Invoice Model
```javascript
{
  userId: ObjectId (ref: User),
  invoiceNumber: String (auto-generated),
  clientName: String,
  clientEmail: String,
  items: [{
    description: String,
    quantity: Number,
    rate: Number,
    amount: Number
  }],
  subtotal: Number,
  tax: Number,
  total: Number,
  tokenAmount: Number,
  remainingAmount: Number,
  status: String (pending/partial/paid),
  dueDate: Date,
  notes: String,
  timestamps: true
}
```

### Token Model
```javascript
{
  invoiceId: ObjectId (ref: Invoice),
  userId: ObjectId (ref: User),
  amount: Number,
  paymentMethod: String,
  transactionId: String (auto-generated),
  notes: String,
  status: String (pending/completed/failed),
  timestamps: true
}
```

## Usage Examples

### Creating an Invoice with Token Payment
```javascript
const invoiceData = {
  clientName: "John Doe",
  clientEmail: "john@example.com",
  items: [
    {
      description: "Web Development",
      quantity: 1,
      rate: 1000,
      amount: 1000
    }
  ],
  subtotal: 1000,
  tax: 100,
  total: 1100,
  tokenAmount: 200, // Initial token payment
  dueDate: "2024-02-15",
  notes: "Payment due in 30 days",
  paymentMethod: "cash"
};

const response = await fetch('http://localhost:3002/invoice/create', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify(invoiceData)
});
```

### Adding Additional Token Payment
```javascript
const paymentData = {
  amount: 300,
  paymentMethod: "card",
  notes: "Second installment payment"
};

const response = await fetch(`http://localhost:3002/invoice/${invoiceId}/token`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify(paymentData)
});
```

## Status Tracking

### Invoice Status
- **pending**: No payments made yet
- **partial**: Some token payments received
- **paid**: Full payment received

### Payment Methods
- cash
- card
- bank_transfer
- upi
- other

## Security Features

- JWT token authentication for all invoice operations
- User-specific invoice access (users can only see their own invoices)
- Input validation and error handling
- Secure token generation for transactions

## Error Handling

The API returns appropriate HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## Development

### File Structure
```
src/
├── controller/
│   ├── auth/
│   │   ├── auth.js
│   │   └── index.js
│   ├── invoice/
│   │   ├── invoice.js
│   │   └── index.js
│   └── index.js
├── database/
│   ├── connection/
│   │   └── connection.js
│   ├── models/
│   │   ├── usersmodel.js
│   │   ├── invoicemodel.js
│   │   ├── tokenmodel.js
│   │   └── index.js
│   └── index.js
├── helper/
│   ├── jwt.js
│   └── index.js
├── routes/
│   ├── user.js
│   ├── invoice.js
│   └── index.js
└── index.js
```

### Adding New Features

1. Create model in `src/database/models/`
2. Create controller in `src/controller/`
3. Create routes in `src/routes/`
4. Update main index files to include new modules

## Testing

Run the comprehensive test suite:
```bash
node test_api.js
```

This will test:
- User registration and login
- Invoice creation
- Invoice retrieval
- Token payment addition
- Payment history retrieval

## Production Considerations

1. **Environment Variables**: Move JWT secret to environment variables
2. **Password Hashing**: Implement proper password hashing (bcrypt)
3. **Input Validation**: Add comprehensive input validation
4. **Rate Limiting**: Implement API rate limiting
5. **Logging**: Add proper logging system
6. **Database Indexing**: Add indexes for better performance
7. **CORS Configuration**: Configure CORS for production domains
