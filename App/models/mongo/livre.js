const { mongoose } = require(".");

module.exports = mongoose=>{
    const Livre = mongoose.model(
        "livres",
        mongoose.Schema({
            title:String,
            gender:String,
            cover:String,
            auteurs:[],
        },{
            timestamps: true
        })
    );
    return Livre;
}