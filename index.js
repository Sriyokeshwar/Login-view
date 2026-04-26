import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import user from './api/user.js';
import cors from 'cors';


dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors(
    {origin : 'http://localhost:5173'}
));
connectDB();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use("/api", user);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

 