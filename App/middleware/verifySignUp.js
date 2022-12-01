const db = require("../models");
const Role = db.Role;
const User = db.user;

checkDuplicateUsernameOrEmail = (req,res,next) => {
    User.findOne({
        where : {
            username : req.body.username
        }
    }).then(user =>{
        if (user) {
            res.status(400).send({
                message : "Erreur, ce nom d'utilisateur existe déjà"
            });
            return;
        }
    });
    User.findOne({
        where : {
            email : req.body.email
        }
    }).then(user =>{
        if (user) {
            res.status(400).send({
                message : "Erreur, cette adresse email existe déjà"
            });
            return;
        }
        next();
    })
    
}

checkRolesExisted = (req, res, next) =>{
    if(req.body.role){
        for (let index = 0; index < req.body.role.length; index++) {
            if (!Role.includes(req.body.role[index])) {
                res.status(400).send({
                    message: "  Le role n'esxiste pas"
                });
                return;
            }
            
        }
    }
    next();

}

const verifySignUp={
    checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
    checkRolesExisted:checkRolesExisted
}
module.exports = verifySignUp;