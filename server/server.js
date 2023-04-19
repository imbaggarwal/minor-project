const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const multer = require("multer");
const mongoose = require("mongoose");
const { response } = require("express");
const encrypt = require("mongoose-encryption");

//express server set-up
const app = express();
var loggedInUser = [];
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
    password: String,
});

const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    image: String
});

const bidSchema = new mongoose.Schema({
    productName: String,
    bidPrice: Number,
    bidderID: String,
    productIMG: String,
    highBid: Number
})

const secret = "Thisisourlittlesecret.";
userSchema.plugin(encrypt, { secret: secret, encryptedFields: ['password'] });

const User = mongoose.model("User", userSchema);
const Product = mongoose.model("Product", productSchema);
const Bid = mongoose.model("Bid", bidSchema);

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

app.get("/bids",function(req,res){

    async function getBids(){
        const Bids = await Bid.find({bidderID: loggedInUser.email});
        return Bids;
    }

    
    getBids().then(function(result){
        console.log(result);
        res.send(result);
    })
})

app.post("/signup", function (req, res) {//data from signup
    async function registerUsers(){
        if (!req.body.username || !req.body.password || !req.body.phone || !req.body.name) {
            throw new Error('Required fields are missing.');
        }
        const Users = await User.findOne({email: req.body.username})
        return Users;
    }
    
    registerUsers().then(function(existUser){
        if(existUser){
            // res.send("User already exists");
            res.send("found");

            // res.redirect("/signup");
        }
        else{
            const newUser = new User({
                email: req.body.username,
                password: req.body.password,
                mobile: req.body.phone,
                name: req.body.name
            });
            newUser.save();
            // res.redirect("/");
            res.send("registered");
        }
    })
    .catch(function(error) {
        console.log(error);
        res.status(400).send(error.message);
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
                loggedInUser= foundUsers;
                // console.log(loggedInUser);
                res.send(foundUsers);
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

    async function updatePrice(){
        const Price = await Product.updateOne({name: req.body.productName}, {price: req.body.bid});
        return Price;
    }

    updatePrice().then(function(foundItem){
        async function updatedBid(){
            const Item = await Bid.updateOne({productName: req.body.productName, bidderID: req.body.bidder}, {bidPrice: req.body.bid});
            return Item;
        }

        async function updateHighBid(){
            const High = await Bid.updateMany({productName: req.body.productName}, {highBid:req.body.bid});
            return High;
        }
        console.log("FoundItem: "+foundItem.acknowledged);
        if(foundItem.acknowledged){
            console.log(foundItem);
            updatedBid().then(function(foundBid){
            if(foundBid.modifiedCount==1){
                console.log("Yes");
                //if(foundBid.productName === req.body.productName && foundBid.bidderID === req.body.bidder && foundBid.bidPrice === req.body.bid){
                    updateHighBid().then(function(highBid){
                        console.log(highBid);
                        res.send(highBid);
                    });
                //}
            }
            else{
                console.log("Entered else");
                const newBid = new Bid({
                    productName: req.body.productName,
                    bidPrice: req.body.bid,
                    bidderID: req.body.bidder,
                    productIMG: req.body.image,
                    highBid: req.body.bid
                })
            
                newBid.save();
                console.log(newBid);
                updateHighBid().then(function(highBid){
                    console.log(highBid);})
                res.send(newBid);
            }
        });
        }
        
    })
});


app.put("/bids",function(req,res){
    async function updatedBid(){
        const Item = await Bid.updateOne({productName: req.body.productName, bidderID: req.body.bidder}, {bidPrice: req.body.bid});
        return Item;
    }
    async function updateHighBid(){
        const High = await Bid.updateMany({productName: req.body.productName}, {highBid:req.body.bid});
        return High;
    }

    async function updatePrice(){
        const Price = await Product.updateOne({name: req.body.productName}, {price: req.body.bid});
        return Price;
    }
    updatedBid().then(function(foundBid){
        if(foundBid.modifiedCount == 1){
            updatePrice().then(function(updatedPrice){
                if(updatedPrice.modifiedCount==1){
                    updateHighBid().then(function(highBid){
                        console.log(highBid);
                        res.send(highBid);
                    });
                }
               
            })    
        }
        else{
            res.send("error");
        }
    });

   
});

app.post("/bids",function(req,res){
    console.log(req.body);
    async function deleteBid(){
        const bid = await Bid.deleteOne({productName: req.body.productName, bidderID: req.body.bidder});
        return bid;
    }
    deleteBid().then(function(deletedBid){
        if(deletedBid){
            // res.send("User already exists");
            console.log("Deleted");
            res.send(deletedBid);

            //res.redirect("/signup");
        }
        else{
           res.send("error");
        }
    });

});


app.listen(5000, function () {
    
    console.log("server started on port 5000");
});
