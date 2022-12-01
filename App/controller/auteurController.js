
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('tamega', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

const Auteur = require('../models/auteur')(sequelize, DataTypes);
exports.create = (req, res) => {
    console.log(req.body);
  if (!req.body.lastName) {
    res.status(400).send({
      message: "Auteur can not be empty!"
    });
    return;
  }
  const auteur = {
    lastName: req.body.lastName,
    firstName: req.body.firstName,
    statut: req.body.statut,
  };
  Auteur.create(auteur)
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

exports.findAll = (req, res) => {
  Auteur.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving auteurs."
      });
    });
};
exports.findOne = (req, res) => {
  const id = req.params.id;
  Auteur.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find auteur with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving auteur with id=" + id
      });
    });
};
exports.update = (req, res) => {
  const id = req.params.id;

  Auteur.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "auteur was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update auteur with id=${id}. Maybe auteur was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating auteur with id=" + id
      });
    });
};
exports.delete = (req, res) => {
  const id = req.params.id;
  Auteur.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "auteur was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete auteur with id=${id}. Maybe auteur was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete auteur with id=" + id
      });
    });
};
exports.deleteAll = (req, res) => {
  Auteur.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} auteurs were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all auteurs."
      });
    });
};