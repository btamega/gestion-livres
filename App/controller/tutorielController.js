const tutoriel = require("../models/mongo/tutoriel");
const  mongoose  = require('mongoose');
require("../config/mongodb/db-config")(mongoose);
const Tutorial = mongoose.model('Tutorial', tutoriel);
const tuto = new Tutorial(
  { titre: 'Déploiement du projet avec Docker',
  description:'Ce tutoriel permet d\'apprendre à déployer un projet développé avec les technologies de Node js en utilisant la conteneurisation',
  published:false
 });
tuto.save(function (err) {
  if (err) return handleError(err);
  // saved!
});

// or

Tutorial.create({ size: 'tuto' }, function (err, tuto) {
  if (err) return handleError(err);
  // saved!
});

// or, for inserting large batches of documents
Tutorial.insertMany([{ size: 'tuto' }], function(err) {

});