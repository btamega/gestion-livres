const jwt = require("jsonwebtoken")
const secret = require("../controller/authentificationController");
const db = require("../models");
const User = db.user;
 verifyToken=(req,res,next) =>{
    let token = req.headers['x-access-token'];
    if (!token) {
        return res.status(403).send({
            message: "Aucun jeton fourni"
        });
    }
    jwt.verify(token,secret.secret,(err,decoded)=>{
        if (err) {
            return res.status(401).send({
                erreur : "Pas de permission"
            })
        }
        req.id = decoded.id;

        next();
    })
}

 isAdmin=(req,res,next) =>{
    User.findByPk(req.id).then(user =>{
        user.getRoles().then(roles=>{
            for (let index = 0; index < roles.length; index++) {
                if (roles[i].roleName=="Admin") {
                    next();
                    return;
                }
            }
            res.status(403).send({
                erreur : "Vous n'avez pas le rôle d'administrateur"
            })
        })
    })
    if (!token) {
        return res.status(403).send({
            message: "Aucun jeton fourni"
        });
    }
    jwt.verify(token,secret,(err,decoded)=>{
        if (err) {
            return res.status(401).send({
                erreur : "Pas de permission"
            })
        }
        req.id = decoded.id;

        next();
    })
}