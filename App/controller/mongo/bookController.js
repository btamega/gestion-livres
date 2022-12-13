const { Auteur } = require("./auteurController");
const { Book } = require("../../models/mongo/livre");
const db = require("../../config/mongodb/db-config")(mongoose);

const createAuteur = function (bookId, auteur) {
    return Auteur.findByIdAndUpdate(bookId,{
        $push:{
            auteurs:[
                {
                    statuts: auteur.statuts
                }
            ]
        },
       new:true,useFindAndModify:false
    }
    )
}
exports.create = (req, res) => {
  if (!req.body.title) {
    res.status(400).send({
      message: "Book title can not be empty!"
    });
    return;
  }
  const book = {
    title: req.body.title,
    gender: req.body.gender,
    cover: req.body.cover,
  };
  const auteurs = [];
//   A chaque fois qu'un livre est créé, nous devons ajouter la liste des auteurs 
    Book.find({}, function(err, auteurs) {
    var auteurMap = {};
    auteurs.forEach(function(auteur) {
      auteurMap[auteur._id] = auteur;
    });
    auteurs=userMap;  
  });

  
  db.collection.insertOne(book)
  .then(data => {
//    Une fois le livre créé, nous devons mettre à jour le tableau d'auteurs 
//    pour spécifier les auteurs du livre
   createAuteur(data.body.book._id,auteurs)
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the book."
    });
  });
};

exports.update = (req, res) => {
    const id = req.params.id;
    User.where({ _id: id }).update(
        { 
            $set: { 
                title: req.params.title, 
                gender: req.params.gender, 
                cover: req.params.cover, 
                }
        }
        )
      .then(num => {
        if (num == 1) {
          res.send({
            message: "User was updated successfully."
          });
        } else {
          res.send({
            message: "Cannot update User with id=${id}. Maybe User was not found or req.body is empty!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating User with id=" + id
        });
      });
  };