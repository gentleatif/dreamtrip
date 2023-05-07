require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const cloudinary = require("cloudinary");
const upload = require("./handlers/multer");
const path = require("path");
const findOrCreate = require("mongoose-findorcreate");

const app = express();
// for reading json data
app.use(express.json());

app.use(bodyParser.json());
// for reading form data

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
// serving static file
app.use(express.static("public"));

app.set("view engine", "ejs");
cloudinary.config({
  cloud_name: "dls1eiwbq",
  api_key: "447414382585189",
  api_secret: "3ByHVVddMdt_2wb8-KwRYgP_rF4",
  secure: true,
});

// connecting to mongodb Atlas
mongoose.connect(
  "mongodb+srv://dreamtrip:a822682000@cluster0.o0zy1.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// creating DestinationSchema
const DestinationSchema = new mongoose.Schema({
  imagePath: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});
// creating product collections

const Destination = new mongoose.model("Destination", DestinationSchema);
const CustomerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobileNo: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});
// creating customer collections

const Customer = new mongoose.model("Customer", CustomerSchema);

app.get("/", function (req, res) {
  res.render("home");
});

app.get("/about", function (req, res) {
  res.render("aboutus");
});
app.get("/contact", function (req, res) {
  res.render("contactus");
});

// define empty variable will be used in /question n finally in result
let category = [];

app.post("/question", async function (req, res) {
  // console.log(category);
  category.push(req.body.category);
  res.redirect("/results");
});

app.get("/results", function (req, res) {
  // console.log(category[0]);
  Destination.find(
    {
      category: category[0],
    },
    function (err, foundDest) {
      if (err) {
        console.log(err);
      } else {
        // console.log(foundDest);
        res.render("result", {
          destination: foundDest,
        });
      }
    }
  );
});

app.get("/home", function (req, res) {
  category.length = 0;
  // console.log("question visit means home vist= "+category);
  res.render("question");
});
//  product uploads directly from device setup

app.get("/upload", function (req, res) {
  res.render("upload");
});
//

app.post("/contact", function (req, res) {
  const newCustomer = new Customer({
    name: req.body.name,
    email: req.body.email,
    mobileNo: req.body.moibleNo,
    message: req.body.message,
  });
  newCustomer.save();
  res.render("thanks");
});
app.post("/upload", upload.single("image"), async function (req, res) {
  const result = await cloudinary.v2.uploader.upload(req.file.path);
  const newDestination = new Destination({
    imagePath: result.secure_url,
    location: req.body.name,
    price: req.body.price,
    category: req.body.category,
  });
  newDestination.save();
  res.redirect("/upload");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log(`server is running on ${PORT}`);
});
