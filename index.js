const express = require('express')
const app = express()
const port = 3001
const cors = require("cors");
const bodyParser = require('body-parser');
app.use(bodyParser.json())
require("./routes/web")(app);
const { json, urlencoded } = require('express');
var corsOptions ={
  origin : "http://localhost:3000",
  credentials:true,
  optionSuccessStatus:200
};
app.use(cors(corsOptions));
app.use(json());
app.use(urlencoded({extended:true}));

const db = require("./App/models");
db.sequelize.sync({force: true}).then(()=>{
  console.log('Drop  and .....');

});

app.listen(port, () => {
  console.log(port)
})