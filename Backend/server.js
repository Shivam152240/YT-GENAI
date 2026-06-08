require("dotenv").config()
const app = require("./src/app")




const connectTodb = require("./src/config/database");
connectTodb();

app.get("/", (req, res)=>{
    res.send("hii i am backend")
})
app.listen(3000, ()=>{
    console.log("server is runing on port 3000 ")
})