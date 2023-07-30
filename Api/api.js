let express = require('express');
let api = express();
let port = 2024;
let mongo = require('mongodb');
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const bodyParser = require('body-parser');
const cors = require('cors');
let {dbConnect ,getData, postData, updateOrder, deleteOrder} = require('./controller/dbcontroller')


api.use(bodyParser.json());
api.use(bodyParser.urlencoded({extended:true}));
api.use(cors());

const jwt = require("jsonwebtoken");

const JWT_SECRET =
  "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe";


let mongoUrl = "mongodb://127.0.0.1:27017/firstdb";

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((e) => console.log(e));

  require("./userDetails");

  const User = mongoose.model("UserInfo");

api.get('/', (req, res) => {
    res.send('Hiii boyz')
})



api.post("/register", async (req, res) => {
    const { fname,  email, password, Phone } = req.body;
  
    const encryptedPassword = await bcrypt.hash(password, 10);
    try {
      const oldUser = await User.findOne({ email });
  
      if (oldUser) {
        return res.json({ error: "User Exists" });
      }
      await User.create({
        fname,
        email,
        password: encryptedPassword,
        Phone,
      });
      res.send({ status: "ok" });
    } catch (error) {
      res.send({ status: "error" });
    }
  });
  
  api.post("/login-user", async (req, res) => {
    const { email, password } = req.body;
  
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ error: "User Not found" });
    }
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ email: user.email }, JWT_SECRET, {
        expiresIn: "15m",
      });
  
      if (res.status(201)) {
        return res.json({ status: "ok", data: token });
      } else {
        return res.json({ error: "error" });
      }
    }
    res.json({ status: "error", error: "InvAlid Password" });
  });
  
  api.post("/userData", async (req, res) => {
    const { token } = req.body;
    try {
      const user = jwt.verify(token, JWT_SECRET, (err, res) => {
        if (err) {
          return "token expired";
        }
        return res;
      });
      console.log(user);
      if (user == "token expired") {
        return res.send({ status: "error", data: "token expired" });
      }
  
      const useremail = user.email;
      User.findOne({ email: useremail })
        .then((data) => {
          res.send({ status: "ok", data: data });
        })
        .catch((error) => {
          res.send({ status: "error", data: error });
        });
    } catch (error) { }
  });
  api.get("/userDatagetcommand", async (req, res)=> {
    let query ={};
    let collection = "UserInfo";
    let output = await getData(collection,query);
    res.send(output)
  })

api.get('/category',async (req, res)=> {
    let query ={};
    let collection = "category";
    let output = await getData(collection,query);
    res.send(output)
})


api.get('/product', async(req, res)=> {
    let query = {};
    if(req.query.category_id){
        query={category_id:Number(req.query.category_id)}
    } else{
        query = {}
    }
    let collection = "product";
    let output = await getData(collection,query);
    res.send(output)
})

api.get('/product_name/:product_name', async(req, res)=> {
    let query = {};
    if(req.params.product_name){
        query={product_name:req.params.product_name}
    } else{
        query = {}
    }
    let collection = "product";
    let output = await getData(collection,query);
    res.send(output)
})

api.get('/filter/:category_id', async(req,res)=> {
    let category_id = Number(req.params.category_id)
    let lowcost = Number(req.query.lowcost)
    let highcost = Number(req.query.highcost)
    if(lowcost && highcost){
    query = {
        "category_id": category_id,
        $and:[{Price:{$gt:lowcost,$lt:highcost}}]
    } 
}  else{
    query = {}
}
 let collection = "product";
let output = await getData(collection,query);
    res.send(output)
})



api.get('/orders', async (req,res)=> {
    let query = {}
    if(req.query.email){
      query={email:req.query.email}
  }else{
      query = {}
  }
  
    let collection = "orders";
    let output = await getData(collection,query);
    res.send(output)
})





api.get('/detail/:id', async(req,res) => {
    let id = new mongo.ObjectId(req.params.id);
    let query = {_id:id}
    let collection = "product";
    let output = await getData(collection,query);
    res.send(output)
})


api.post('/placeorder', async(req, res)=>{
    let data = req.body;
    let collection = "orders";
    let response = await postData(collection,data)
    res.send(response)
})



api.put('/updateorder', async (req,res)=> {
    let collection = 'orders';
    let condition = {"_id":new mongo.ObjectId(req.body._id)}
    let data = {
        $set:{
            "status":req.body.status
        }
    }
    let output = await updateOrder(collection,condition,data)
    res.send(output)
})



api.delete('/deleteOrder/:id',async (req,res)=>{
    let collection = "orders"
    let condition = {"_id":new mongo.BSON.ObjectId(req.params.id)}
    let output = await deleteOrder(collection,condition)
    res.send(output)
})



api.listen(port,(err)=>{
    dbConnect()
    if(err) throw err;
    console.log(`server is running on port ${port}`)
})




