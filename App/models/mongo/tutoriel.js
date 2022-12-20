const { mongoose } = require(".");

module.exports = mongoose=>{
    const Tutoriel = mongoose.model(
        "tutoriel",
        mongoose.Schema({
            titre:String,
            description:String,
            published:Boolean
        }));
            
    return Tutoriel;
}