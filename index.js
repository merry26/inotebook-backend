const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();
const routerAuth = require("./routes/auth");
const routerNotes = require("./routes/notes");

// Middleware setup
app.use(cors({
    origin:["inotebook-frontend-omega.vercel.app"],
    methods:["POST","GET","PUT","DELETE"],
    credentials:true
}));
app.use(express.json()); // Body parser middleware

// Routes setup
app.use("/auth", routerAuth);
app.use("/notes", routerNotes);

const PORT = process.env.PORT || 5000;
const BASE_URL = process.env.BASE_URL;
const MONGO_URL = process.env.DATABASE;

// Connect to MongoDB
mongoose.connect(MONGO_URL)
    .then(() => {
        console.log("MongoDB database connected");
        // Start the server
        app.listen(PORT, () => {
            console.log(`Express server is running at ${BASE_URL}`);
        });
    })
    .catch((error) => console.error(error));
