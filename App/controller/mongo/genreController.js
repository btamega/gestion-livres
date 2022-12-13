
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('tamega', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

const Genre = require('../models/genre')(sequelize, DataTypes);
exports.create = (req, res) => {
  if (!req.body.category) {
    res.status(400).send({
      message: "Genre can not be empty!"
    });
    return;
  }
  const genre = {
    name: req.body.name,
    date: req.body.date,
  };
  Genre.create(genre)
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the genre."
    });
  });
};

exports.findAll = (req, res) => {
  Genre.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Genres."
      });
    });
};
exports.findOne = (req, res) => {
  const id = req.params.id;
  Genre.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Genre with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Genre with id=" + id
      });
    });
};
exports.update = (req, res) => {
  const id = req.params.id;

  Genre.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Genre was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Genre with id=${id}. Maybe Genre was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Genre with id=" + id
      });
    });
};
exports.delete = (req, res) => {
  const id = req.params.id;
  Genre.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Genre was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Genre with id=${id}. Maybe Genre was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Genre with id=" + id
      });
    });
};
exports.deleteAll = (req, res) => {
  Genre.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Genres were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Genres."
      });
    });
};