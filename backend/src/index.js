import express from 'express';
import cors from 'cors';
import router from './routes/index.js';
import { mongooseConnection } from './database/connection/connection.js';

const app = express();

// CORS for React frontend
// app.use(cors({ origin:"https://vercel.com/vasu-antalas-projects/invoicegen64-aacq/C8kbneJuspUKRw1F4afkZFZpBMu9" }));



const allowedOrigins = [
  "http://localhost:5173", // local development
  "https://invoicegen64-aacq.vercel.app",
  "https://invoicegen64-j6xn.vercel.app",
  "https://invoicegen64-aacq-git-main-vasu-antalas-projects.vercel.app" // ✅ new vercel build URL
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("❌ Blocked by CORS:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

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
