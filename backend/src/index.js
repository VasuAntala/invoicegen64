import express from 'express';
import cors from 'cors';
import router from './routes/index.js';
import { mongooseConnection } from './database/connection/connection.js';

const app = express();

// CORS for React frontend
app.use(cors({ origin: [
  "http://localhost:5173",
  "https://invoicegen64-aacq.vercel.app" // your deployed frontend
]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB ONCE before starting server
await mongooseConnection(); 

app.use(router);

app.get('/', (req, res) => {
  res.send('Welcome to the backend server!');
});

app.listen(3002, () => {
  console.log(`Server is running on port 3002`);
});
