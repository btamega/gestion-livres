const { mongoose } = require(".");

module.exports = mongoose=>{
    const Role = mongoose.model(
        "Roles",
        mongoose.Schema({
            title:String,
        },{
            timestamps: true
        })
    );
    return Role;
}