import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import morgan from 'morgan'
import cors from 'cors';
import connectDB from './db/connect.js'
import dotenv from "dotenv";
import helmet from "helmet";
import authRouter from './routers/auth-router.js'
dotenv.config(); // Load environment variables


// connect to database
connectDB()


const app = express();

app.use(morgan("tiny"));

app.use(cors({
    origin: '*', // Replace with your frontend URL
    credentials: true // Allow cookies to be sent with requests
}));



// middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(helmet({
  crossOriginEmbedderPolicy: false,
}));

// routes

// app.get('/', (req, res) => {
//     res.send('API is working correctly.');
// });

app.use('/api/v1/auth', authRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})
