const express= require('express')
const mongoose = require('mongoose')
const app=express()
const routerAuth= require("./routes/auth")
const routerNotes= require("./routes/notes")
const cors= require('cors')
require('dotenv').config();


app.use(express.json()) //middleware
app.use("/auth",routerAuth)
app.use("/notes", routerNotes)
app.use(cors());
 
const PORT = 5000
const BASE_URL = process.env.BASE_URL;
const MONGO_URL = process.env.DATABASE;

mongoose.connect(MONGO_URL).then(() => {
    console.log("MongoDB database connected");
    app.listen(PORT, () => {
        console.log(`Express server is running at ${BASE_URL}`);
    });
}).catch((error) => console.error(error));