require("dotenv").config()
const app = require("./src/app")




const connectTodb = require("./src/config/database");
connectTodb();

app.get("/", (req, res)=>{
    res.send("hii i am backend")
})
const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`server is runing on port ${PORT}`)
})