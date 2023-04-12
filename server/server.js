const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const data = require("./data.json");
const multer = require("multer");
const mongoose = require("mongoose");
const { response } = require("express");
const encrypt = require("mongoose-encryption");

//express server set-up
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("../client/public"));

//--------------file handling with multer-----------------
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "../client/public/productImages");
    },
    filename: (req, file, cb) => {
      console.log(file);
      const n = req.body.name.replace(/\s+/g, '');
      cb(null, n+ path.extname(file.originalname));
    },
  });
  //inside path name in database store as productImages/ImageName.png
  const upload = multer({ storage: storage });

// --------------------------------------------------------------------

mongoose.connect("mongodb://127.0.0.1:27017/auctionDB", { useNewUrlParser: true });


const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    mobile: String,
    password: String
});

const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    image: String
});

const secret = "Thisisourlittlesecret.";
userSchema.plugin(encrypt, { secret: secret, encryptedFields: ['password'] });

const User = mongoose.model("User", userSchema);
const Product = mongoose.model("Product", productSchema);

// --------------------------------------------------------------------

// app.get("/", function (req, res) {
//     res.sendFile("login");
    
// });



app.get("/products", function (req, res) {

    async function getProducts(){
        const Products = await Product.find({});
        return Products;
    }
    
    getProducts().then(function(result){
        res.send(result);
    })

    // console.log(getProducts());
   // res.sendFile(__dirname + "/data.json");
   
    
});


app.post("/signup", function (req, res) {//data from signup
    async function registerUsers(){
        const Users = await User.findOne({email: req.body.username})
        return Users;
    }
    registerUsers().then(function(existUser){
        if(existUser){
            // res.send("User already exists");
            res.send("found");

            //res.redirect("/signup");
        }
        else{
            const newUser = new User({
                email: req.body.username,
                password: req.body.password,
                mobile: req.body.phone,
                name: req.body.name
            });
            newUser.save();
            //res.redirect("/");
            res.send("registered");
        }
    });
});

app.post("/", function (req, res) {//data from login
    const username = req.body.username;
    const password = req.body.password;
    
    async function loginUsers(){
        const Users = await User.findOne({email: username});
        return Users;
    }
    
    loginUsers().then(function(foundUsers){
        if(foundUsers){
            if(foundUsers.password === password){
                //res.redirect("/products");
                res.send(foundUsers.name);
            }
            else{
                //res.redirect("/");
                res.send("error");
            }
        }
        else{
            //res.redirect("/");
            res.send("error");
            
        }
        
    });
});



app.post("/sell", upload.single("photo"), function (req, res) {
    const newProduct = new Product({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      image: "productImages/"+req.file.filename
    });
    newProduct.save();
    res.redirect("/products");
});

app.post("/products",function(req,res) {
    console.log(req.body);
  });

app.listen(5000, function () {
    console.log("server started on port 5000");
});
