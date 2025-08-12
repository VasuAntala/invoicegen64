# Invoice Management API Documentation

## Base URL
```
http://localhost:3002
```

## Authentication
All invoice endpoints require authentication. Include the JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## Endpoints

### 1. Create Invoice
**POST** `/invoice/create`

Creates a new invoice with optional token payment.

**Request Body:**
```json
{
  "clientName": "John Doe",
  "clientEmail": "john@example.com",
  "items": [
    {
      "description": "Web Development",
      "quantity": 1,
      "rate": 1000,
      "amount": 1000
    }
  ],
  "subtotal": 1000,
  "tax": 100,
  "total": 1100,
  "tokenAmount": 200,
  "dueDate": "2024-02-15",
  "notes": "Payment due in 30 days",
  "paymentMethod": "cash",
  "tokenNotes": "Initial token payment"
}
```

**Response:**
```json
{
  "message": "Invoice created successfully",
  "data": {
    "_id": "invoice_id",
    "invoiceNumber": "INV-000001",
    "clientName": "John Doe",
    "total": 1100,
    "tokenAmount": 200,
    "remainingAmount": 900,
    "status": "partial"
  }
}
```

### 2. Get User's Invoices
**GET** `/invoice/all`

Retrieves all invoices for the authenticated user.

**Response:**
```json
{
  "message": "Invoices retrieved successfully",
  "data": [
    {
      "_id": "invoice_id",
      "invoiceNumber": "INV-000001",
      "clientName": "John Doe",
      "total": 1100,
      "tokenAmount": 200,
      "remainingAmount": 900,
      "status": "partial",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

### 3. Get Specific Invoice
**GET** `/invoice/:invoiceId`

Retrieves a specific invoice with its token payment history.

**Response:**
```json
{
  "message": "Invoice retrieved successfully",
  "data": {
    "invoice": {
      "_id": "invoice_id",
      "invoiceNumber": "INV-000001",
      "clientName": "John Doe",
      "items": [...],
      "total": 1100,
      "tokenAmount": 200,
      "remainingAmount": 900,
      "status": "partial"
    },
    "tokens": [
      {
        "_id": "token_id",
        "amount": 200,
        "paymentMethod": "cash",
        "transactionId": "TXN-1705312200000-123",
        "createdAt": "2024-01-15T10:30:00Z"
      }
    ]
  }
}
```

### 4. Add Token Payment
**POST** `/invoice/:invoiceId/token`

Adds a token payment to an existing invoice.

**Request Body:**
```json
{
  "amount": 300,
  "paymentMethod": "card",
  "notes": "Second installment payment"
}
```

**Response:**
```json
{
  "message": "Token payment added successfully",
  "data": {
    "token": {
      "_id": "token_id",
      "amount": 300,
      "transactionId": "TXN-1705312300000-456"
    },
    "updatedInvoice": {
      "tokenAmount": 500,
      "remainingAmount": 600,
      "status": "partial"
    }
  }
}
```

### 5. Get Invoice Token Payments
**GET** `/invoice/:invoiceId/tokens`

Retrieves all token payments for a specific invoice.

**Response:**
```json
{
  "message": "Token payments retrieved successfully",
  "data": [
    {
      "_id": "token_id",
      "amount": 200,
      "paymentMethod": "cash",
      "transactionId": "TXN-1705312200000-123",
      "status": "completed",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

### 6. Update Invoice Status
**PUT** `/invoice/:invoiceId/status`

Updates the status of an invoice.

**Request Body:**
```json
{
  "status": "paid"
}
```

**Response:**
```json
{
  "message": "Invoice status updated successfully",
  "data": {
    "status": "paid"
  }
}
```

### 7. Delete Invoice
**DELETE** `/invoice/:invoiceId`

Deletes an invoice (only if no payments have been made).

**Response:**
```json
{
  "message": "Invoice deleted successfully"
}
```

## Status Values

### Invoice Status
- `pending`: No payments made
- `partial`: Some token payments made
- `paid`: Full payment received

### Payment Methods
- `cash`: Cash payment
- `card`: Card payment
- `bank_transfer`: Bank transfer
- `upi`: UPI payment
- `other`: Other payment methods

### Token Status
- `pending`: Payment pending
- `completed`: Payment completed
- `failed`: Payment failed

## Error Responses

### 400 Bad Request
```json
{
  "error": "Token amount must be greater than 0"
}
```

### 401 Unauthorized
```json
{
  "message": "Failed to authenticate token"
}
```

### 403 Forbidden
```json
{
  "message": "No token provided"
}
```

### 404 Not Found
```json
{
  "error": "Invoice not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Failed to create invoice",
  "details": "Error details"
}
```

## Usage Examples

### Frontend Integration

```javascript
// Create an invoice
const createInvoice = async (invoiceData) => {
  const response = await fetch('http://localhost:3002/invoice/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(invoiceData)
  });
  return response.json();
};

// Get user's invoices
const getInvoices = async () => {
  const response = await fetch('http://localhost:3002/invoice/all', {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  return response.json();
};

// Add token payment
const addTokenPayment = async (invoiceId, paymentData) => {
  const response = await fetch(`http://localhost:3002/invoice/${invoiceId}/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(paymentData)
  });
  return response.json();
};
```

## Database Schema

### Invoice Model
- `userId`: Reference to User
- `invoiceNumber`: Auto-generated unique number
- `clientName`: Client's name
- `clientEmail`: Client's email
- `items`: Array of invoice items
- `subtotal`: Subtotal amount
- `tax`: Tax amount
- `total`: Total amount
- `tokenAmount`: Total token payments received
- `remainingAmount`: Remaining amount to be paid
- `status`: Invoice status
- `dueDate`: Payment due date
- `notes`: Additional notes

### Token Model
- `invoiceId`: Reference to Invoice
- `userId`: Reference to User
- `amount`: Payment amount
- `paymentMethod`: Method of payment
- `transactionId`: Auto-generated unique transaction ID
- `notes`: Payment notes
- `status`: Payment status
