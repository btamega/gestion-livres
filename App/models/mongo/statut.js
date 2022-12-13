const { mongoose } = require(".");

module.exports = mongoose=>{
    const Statut = mongoose.model(
        "Statuts",
        mongoose.Schema({
            title:String,
        },{
            timestamps: true
        })
    );
    return Statut;
}