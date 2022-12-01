const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('tamega', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

const Cart = require("../models/cart");
exports.bookCart = async () => {
    const carts = await Cart.find().populate({
        path: "items.bookId",
        select: "name price total"
    });;
    return carts[0];
};
exports.addItem = async payload => {
    const newItem = await Cart.create(payload);
    return newItem
}
const Book = require('../models/book')(sequelize, DataTypes);
exports.create = (req, res) => {
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  const book = {
    title: req.body.title,
    gender: req.body.gender,
    cover: req.body.cover,
  };
  User.create(book)
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the book."
    });
  });
};

exports.findAll = (req, res) => {
  Book.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Books."
      });
    });
};
exports.findOne = (req, res) => {
  const id = req.params.id;
  Book.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Book with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Book with id=" + id
      });
    });
};
exports.update = (req, res) => {
  const id = req.params.id;

  Book.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Book was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Book with id=${id}. Maybe Book was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Book with id=" + id
      });
    });
};
exports.delete = (req, res) => {
  const id = req.params.id;
  Book.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Book was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Book with id=${id}. Maybe Book was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Book with id=" + id
      });
    });
};
exports.deleteAll = (req, res) => {
  Book.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Books were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all books."
      });
    });
};
exports.addItemToCart = async (req, res) => {
  const {
      id
  } = req.body;
  const quantity = Number.parseInt(req.body.quantite);
  try {
      let cart = await this.bookCart();
      let bookDetails = await Book.findByPk(id);
           if (!bookDetails) {
          return res.status(500).json({
              type: "Not Found",
              msg: "Invalid request"
          })
      }
      if (cart) {
          //---- Check if index exists ----
          const indexFound = cart.items.findIndex(item => item.id.id == id);
          // Ici on teste si la quantité inférieure à 0, on élimine le livre de la liste
          if (indexFound !== -1 && quantity <= 0) {
              cart.items.splice(indexFound, 1);
              if (cart.items.length == 0) {
                  cart.subTotal = 0;
              } else {
                  cart.subTotal = cart.items.map(item => item.total).reduce((acc, next) => acc + next);
              }
          }
          // Là on teste si le livre existe, on met à jour la quantité existante avec la quantité totale
          else if (indexFound !== -1) {
              cart.items[indexFound].quantity = cart.items[indexFound].quantity + quantity;
              cart.items[indexFound].total = cart.items[indexFound].quantity * bookDetails.prix;
              cart.items[indexFound].prix = bookDetails.prix
              cart.subTotal = cart.items.map(item => item.total).reduce((acc, next) => acc + next);
          }
          
          else if (quantity > 0) {
              cart.items.push({
                  id: id,
                  quantity: quantity,
                  gender: gender,
                  cover: cover,
                  prix: bookDetails.prix,
                  total: parseInt(bookDetails.prix * quantity)
              })
              cart.subTotal = cart.items.map(item => item.total).reduce((acc, next) => acc + next);
          }
          else {
              return res.status(400).json({
                  type: "Invalid",
                  msg: "Invalid request"
              })
          }
          let data = await cart.save();
          res.status(200).json({
              type: "success",
              mgs: "Process successful",
              data: data
          })
      }
      //------------ This creates a new cart and then adds the item to the cart that has been created------------
      else {
          const cartData = {
              items: [{
                  id: id,
                  quantity: quantity,
                  gender: gender,
                  cover: cover,
                  total: parseInt(bookDetails.prix * quantity),
                  prix: bookDetails.prix
              }],
              subTotal: parseInt(bookDetails.prix * quantity)
          }
          cart = await cartRepository.addItem(cartData)
          // let data = await cart.save();
          res.json(cart);
      }
  } catch (err) {
      console.log(err)
      res.status(400).json({
          type: "Invalid",
          msg: "Something went wrong",
          err: err
      })
  }
}