const express = require('express')
const app = express()
const port = 3001
const cors = require("cors");
const MongoClient = require('mongodb').MongoClient
// require("./routes/web")(app);
const { json, urlencoded } = require('express');
const { default: mongoose } = require('mongoose');
app.use(cors);
app.use(json());
app.use(urlencoded({extended:true}));
require("./App/config/mongodb/db-config")(mongoose);
require("./App/controller/tutorielController");
app.listen(port, () => {
  console.log(port)
})