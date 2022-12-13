const tutoriel = require("../models/tutoriel");
const  mongoose  = require('mongoose');

require("../config/mongodb/db-config")(mongoose);
const mytutoriel = new tutoriel({
    // _id: new mongoose.Types.ObjectId(),
    title: 'CRUD avec MERN',
    author: 'BOUGARY TAMEGA',
  });
  
  mytutoriel.save(function (err) {
    if (err) console.error(err);
    // const story1 = new Story({
    //   title: 'Casino Royale',
    //   mytutoriel: mytutoriel._id    // assign the _id from the person
    // });
  
    // story1.save(function (err) {
    //   if (err) return handleError(err);
    //   // that's it!
    // });
    else console.log("Insert successfully");
  });