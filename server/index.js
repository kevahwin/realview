/*****************************************
* INDEX.JS: Main Entry Point for Backend *
******************************************/
const dotenv = require("dotenv").config();
const mongoose = require('mongoose');
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require('multer');
const morgan = require('morgan');
const helmet = require('helmet');
const uploads = require('./routes/api/uploads');
const posts = require("./routes/api/posts");

const app = express();

/**************
* MIDDLEWARE *
***************/
app.use(bodyParser.json());

app.use(cors());
app.use(morgan('tiny'));
// app.use(helmet())

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      connectSrc: ["'self'", "assets.babylonjs.com"],
      // add any other directives you need
    },
  },
}));

mongoose
        .connect(process.env.MONGODB_URI, {
        })
        .then(() => console.log("DB connection successful!"))
        .catch((error) => console.error(`Error connecting DB: ${error}`));

/*********
* ROUTES *
**********/
//Backend Index
app.get('/status', (req, res) => {
  res.send('Welcome to the RealView API - Up and Running');
});

// Posts - will not be used later on
app.use("/api/posts", posts);

// Uploaded files
app.use("/api/uploads", uploads);

// Handle production
if (process.env.NODE_ENV === "production") {
  // Static folder
  app.use(express.static(__dirname + "/public/"));

  // Handle SPA
  app.get(/.*/, (req, res) => res.sendFile(__dirname + "/public/index.html"));
}

/**************
* PORT CONFIG *
***************/
const port = process.env.PORT || 5001;
app.listen(port, () => console.log(`Server started on port ${port}`));