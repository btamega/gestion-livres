const { mongoose } = require(".");
/*
 * Un auteur a plusieurs roles et il n'effectue pas de modification 
 * spécifiques aux statuts donc, nous choisirons l'association d'intégration
 * A chaque auteur, nous lui associons la liste des livres desquels il est auteur
*/
module.exports = mongoose=>{
    const Auteur = mongoose.model(
        "Auteurs",
        mongoose.Schema({
            statuts:[],
            livres:[],
        },{
            timestamps: true
        })
    );
    return Auteur;
}