const { User } = require("../../models/mongo/user");
const db = require("../../config/mongodb/db-config")(mongoose);

exports.create = (req, res) => {
  if (!req.body.firstName) {
    res.status(400).send({
      message: "FirstName can not be empty!"
    });
    return;
  }
  const user = {
    lastName: req.body.lastName,
    firstName: req.body.firstName,
    dateNaissance: req.body.dateNaissance,
    address: req.body.address,
    dateNaissance: req.body.dateNaissance,
  };
  db.collection.insertOne(user)
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the user."
    });
  });
};

exports.update = (req, res) => {
    const id = req.params.id;
    User.where({ _id: id }).update(
        { 
            $set: { 
                firstName: req.params.firstName, 
                lastName: req.params.lastName, 
                dateNaissance: req.params.dateNaissance, 
                address: req.params.address, 
                roles: req.params.roles, 
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