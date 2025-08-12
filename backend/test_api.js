import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:3002';

// Test data
const testUser = {
  username: 'testuser',
  email: 'test@example.com',
  password: 'password123',
  conPassword: 'password123'
};

const testInvoice = {
  clientName: 'Test Client',
  clientEmail: 'client@example.com',
  items: [
    {
      description: 'Web Development',
      quantity: 1,
      rate: 1000,
      amount: 1000
    }
  ],
  subtotal: 1000,
  tax: 100,
  total: 1100,
  tokenAmount: 200,
  dueDate: '2024-02-15',
  notes: 'Test invoice',
  paymentMethod: 'cash'
};

async function testAPI() {
  console.log('🚀 Testing Invoice Management API...\n');

  try {
    // 1. Register a test user
    console.log('1. Testing user registration...');
    const registerResponse = await fetch(`${BASE_URL}/auth/registers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testUser)
    });
    
    if (registerResponse.ok) {
      console.log('✅ User registration successful');
    } else {
      console.log('⚠️ User might already exist, continuing...');
    }

    // 2. Login to get token
    console.log('\n2. Testing user login...');
    const loginResponse = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: testUser.username,
        email: testUser.email,
        password: testUser.password
      })
    });

    if (!loginResponse.ok) {
      throw new Error('Login failed');
    }

    const loginData = await loginResponse.json();
    const token = loginData.data.token;
    console.log('✅ Login successful, token received');

    // 3. Create an invoice
    console.log('\n3. Testing invoice creation...');
    const createInvoiceResponse = await fetch(`${BASE_URL}/invoice/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(testInvoice)
    });

    if (!createInvoiceResponse.ok) {
      const error = await createInvoiceResponse.json();
      throw new Error(`Invoice creation failed: ${error.error}`);
    }

    const invoiceData = await createInvoiceResponse.json();
    const invoiceId = invoiceData.data._id;
    console.log('✅ Invoice created successfully');
    console.log(`   Invoice ID: ${invoiceId}`);
    console.log(`   Invoice Number: ${invoiceData.data.invoiceNumber}`);

    // 4. Get user's invoices
    console.log('\n4. Testing get user invoices...');
    const getInvoicesResponse = await fetch(`${BASE_URL}/invoice/all`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!getInvoicesResponse.ok) {
      throw new Error('Failed to get invoices');
    }

    const invoicesData = await getInvoicesResponse.json();
    console.log('✅ Retrieved user invoices');
    console.log(`   Total invoices: ${invoicesData.data.length}`);

    // 5. Get specific invoice
    console.log('\n5. Testing get specific invoice...');
    const getInvoiceResponse = await fetch(`${BASE_URL}/invoice/${invoiceId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!getInvoiceResponse.ok) {
      throw new Error('Failed to get specific invoice');
    }

    const specificInvoiceData = await getInvoiceResponse.json();
    console.log('✅ Retrieved specific invoice');
    console.log(`   Client: ${specificInvoiceData.data.invoice.clientName}`);
    console.log(`   Total: $${specificInvoiceData.data.invoice.total}`);

    // 6. Add token payment
    console.log('\n6. Testing add token payment...');
    const tokenPaymentData = {
      amount: 300,
      paymentMethod: 'card',
      notes: 'Second installment payment'
    };

    const addTokenResponse = await fetch(`${BASE_URL}/invoice/${invoiceId}/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(tokenPaymentData)
    });

    if (!addTokenResponse.ok) {
      const error = await addTokenResponse.json();
      throw new Error(`Token payment failed: ${error.error}`);
    }

    const tokenPaymentResult = await addTokenResponse.json();
    console.log('✅ Token payment added successfully');
    console.log(`   Payment amount: $${tokenPaymentResult.data.token.amount}`);
    console.log(`   Transaction ID: ${tokenPaymentResult.data.token.transactionId}`);

    // 7. Get token payments for invoice
    console.log('\n7. Testing get token payments...');
    const getTokensResponse = await fetch(`${BASE_URL}/invoice/${invoiceId}/tokens`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!getTokensResponse.ok) {
      throw new Error('Failed to get token payments');
    }

    const tokensData = await getTokensResponse.json();
    console.log('✅ Retrieved token payments');
    console.log(`   Total payments: ${tokensData.data.length}`);

    console.log('\n🎉 All API tests completed successfully!');
    console.log('\n📋 Summary:');
    console.log('   - User authentication: ✅');
    console.log('   - Invoice creation: ✅');
    console.log('   - Invoice retrieval: ✅');
    console.log('   - Token payment: ✅');
    console.log('   - Payment history: ✅');

  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    process.exit(1);
  }
}

// Run the test
testAPI();
