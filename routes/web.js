const { admin, userBoard } = require("../App/controller/userController");
const { verifyToken, isAdmin } = require("../App/middleware/authJWT");
const verifySignUp = require("../App/middleware/verifySignUp");

module.exports = app => {
    const books = require("../App/controller/bookController");
    const auteurs = require("../App/controller/auteurController");
    const genres = require("../App/controller/genreController");
    const editions = require("../App/controller/editionController");
    const auth = require("../App/controller/authentificationController");
    const users = require("../App/controller/userController");
    var router = require("express").Router();
    // Book routes
    router.post("/book", books.create);
    router.get("/books", books.findAll);
    router.get("/book/:id", books.findOne);
    router.put("/:id", books.update);
    router.delete("/book/:id", books.delete);
    router.delete("/book", books.deleteAll);
    // Auteur routes
    router.post("/auteur", auteurs.create);
    router.get("/auteurs", auteurs.findAll);
    router.get("/auteur/:id", auteurs.findOne);
    router.put("/:id", auteurs.update);
    router.delete("/auteur/:id", auteurs.delete);
    router.delete("/auteur", auteurs.deleteAll);
    // Edition routes
    router.post("/edition", editions.create);
    router.get("/editions", editions.findAll);
    router.get("/edition/:id", editions.findOne);
    router.put("/:id", editions.update);
    router.delete("/edition/:id", editions.delete);
    router.delete("/edition", editions.deleteAll);
    // Genre routes
    router.post("/genre", genres.create);
    router.get("/genres", genres.findAll);
    router.get("/genre/:id", genres.findOne);
    router.put("/:id", genres.update);
    router.delete("/genre/:id", genres.delete);
    router.delete("/genre", genres.deleteAll);
     // User routes
    router.post("/user", users.create);
    router.get("/command", users.findAll);
    router.get("/user/:id", users.findOne);
    router.put("/:id", users.update);
    router.delete("/user/:id", users.delete);
    router.delete("/user", users.deleteAll);
    router.post("/api/auth/register",[verifySignUp.checkDuplicateUsernameOrEmail,verifySignUp.checkRolesExisted],auth.Register);
    router.post("/api/auth/login",[verifySignUp.checkDuplicateUsernameOrEmail,verifySignUp.checkRolesExisted],auth.Login);
    router.post("/api/auth/logout",[verifySignUp.checkDuplicateUsernameOrEmail,verifySignUp.checkRolesExisted],auth.Logout);
    // Redirection des pages
    router.get("/api/admin/index",[
      verifyToken,isAdmin
    ],admin);
    router.get("/api/user/index",[
      verifyToken
    ],userBoard)
    app.use('/api', router);
   

  };