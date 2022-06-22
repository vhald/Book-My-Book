const express = require('express');
const { readdirSync } = require('fs');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();


const PORT = process.env.PORT || 8000;

const app = express();

// db config
const dbConfig = require('./Config/db')
dbConfig();


//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));



// route middleware
readdirSync('./routes').map((r) => app.use('/api', require(`./routes/${r}`)));
// app.use("/api", router);


app.listen(PORT, () => {
    console.log(`Running on ${PORT}`);
})



