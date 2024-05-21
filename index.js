const express = require('express');
const app = new express();
const bodyParser = require('body-parser');
const port = 5000;
const cors =require('cors');
const mongoDB = require('./db')
const router = require('./src/routes/api');

app.use(bodyParser.json())
app.use(cors())

mongoDB();

// Request Rate Limit
const rateLimit =require('express-rate-limit');
const limiter= rateLimit({windowMs:15*60*1000,max:3000})
app.use(limiter)

app.use("/api/v1",router)

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

app.listen(port, () => {
    console.log("App is running at the port : 5000")
})