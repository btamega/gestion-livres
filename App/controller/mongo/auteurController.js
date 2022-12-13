const { Auteur } = require("../../models/mongo/auteur");
const db = require("../../config/mongodb/db-config")(mongoose);

exports.create = (req, res) => {
  const auteur = {
    statuts: req.body.statuts,
    livres: req.body.livres,
  };
  db.collection.insertOne(auteur)
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the auteur."
    });
  });
};

exports.update = (req, res) => {
    const id = req.params.id;
    Auteur.where({ _id: id }).update(
        { 
            $set: { 
                statuts: req.params.statuts, 
                livres: req.params.livres, 
                }
        }
        )
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Auteur was updated successfully."
          });
        } else {
          res.send({
            message: "Cannot update Auteur with id=${id}. Maybe Auteur was not found or req.body is empty!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Auteur with id=" + id
        });
      });
  };