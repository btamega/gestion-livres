const { mongoose } = require(".");

module.exports = mongoose=>{
    const Compte = mongoose.model(
        "Comptes",
        mongoose.Schema({
            email:String,
            password:String,
            statut:{
                type: String,
                enum: ['User', 'Admin'],
            },
        },{
            timestamps: true
        })
    );
    return Compte;
}