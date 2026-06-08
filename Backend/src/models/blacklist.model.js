const mongoose = require("mongoose")


const blackListTokenSchema = new mongoose.Schema({
    token : {
        type : String,
        required : [true, "token is require to be added in the blcklist"]
    }},{
        timestamps : true
    
})

const tokenBlackListModel = mongoose.model("blackListToken", blackListTokenSchema)

module.exports = tokenBlackListModel