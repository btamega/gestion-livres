const { mongoose } = require(".");
/*
 * Un utilisateur a plusieurs roles et il effectue des opérations selon 
 * ses roles donc, l'association par référencement est idéal pour ce cas
 */
module.exports = mongoose=>{
    const User = mongoose.model(
        "Users",
        mongoose.Schema({
            firstName:String,
            lastName:String,
            dateNaissance:Date,
            address:String,
            roles : [
                {
                    type : mongoose.Schema.Types.ObjectId,
                    ref:"Role"
                }
            ]
        },{
            timestamps: true
        })
    );
    return User;
}