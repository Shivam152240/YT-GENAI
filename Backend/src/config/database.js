const mongoose = require("mongoose");
async function connectTodb() {
    try{
        await mongoose.connect(process.env.MONGO_URI)
         
        console.log("Mongodb connected")
    }catch(err){
        console.log("mongodb connection failed", err)
    };
    
}
module.exports = connectTodb;