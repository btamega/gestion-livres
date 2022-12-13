
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('tamega', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

const Edition = require('../models/edition')(sequelize, DataTypes);
exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      message: "Edition can not be empty!"
    });
    return;
  }
  const edition = {
    name: req.body.name,
    date: req.body.date,
  };
  Edition.create(edition)
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the Edition."
    });
  });
};

exports.findAll = (req, res) => {
  Edition.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Editions."
      });
    });
};
exports.findOne = (req, res) => {
  const id = req.params.id;
  Edition.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Edition with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Edition with id=" + id
      });
    });
};
exports.update = (req, res) => {
  const id = req.params.id;

  Edition.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Edition was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Edition with id=${id}. Maybe Edition was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Edition with id=" + id
      });
    });
};
exports.delete = (req, res) => {
  const id = req.params.id;
  Edition.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Edition was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Edition with id=${id}. Maybe Edition was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Edition with id=" + id
      });
    });
};
exports.deleteAll = (req, res) => {
  Edition.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Editions were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Editions."
      });
    });
};