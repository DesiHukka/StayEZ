const express = require("express");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const cors = require("cors");
const Users = require("./models/Users/Users");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const download = require("image-downloader");
const multer = require("multer");
const Places = require("./models/Users/Places/Places");
const Bookings = require("./models/Bookings");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

const port = process.env.PORT || 8080;

// Defining Storage for Multer (File uploads)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const filename = Date.now() + Math.round(Math.random() * 999) + ".jpg";
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });

mongoose.connect(
  "mongodb+srv://prashant:VV-8571863740@cluster0.godfw.mongodb.net/bnb?retryWrites=true&w=majority&appName=Cluster0"
);

const jwtSecret = "fjslr47856fnb";

app.post("/register", async (req, res) => {
  const { name, email, pass } = req.body;
  const salt = await bcrypt.genSalt(10);
  const user = await Users.create({
    name,
    email,
    pass: await bcrypt.hash(pass, salt),
  });
  res.json(user);
});

app.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  const user = await Users.findOne({ email });
  if (user) {
    bcrypt
      .compare(pass, user.pass)
      .then((passOK) => {
        console.log(passOK);
        if (passOK) {
          const { email, _id, name } = user;

          jwt.sign({ email, _id, name }, jwtSecret, {}, (err, token) => {
            err
              ? console.log(err)
              : res.cookie("token", token).json({ email, _id, name });
          });
        }
      })
      .catch((err) => console.log(err));
  }
});

//Profile
app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (!token) res.json(null);
  jwt.verify(token, jwtSecret, {}, (err, userData) => {
    if (err) throw err;
    res.json(userData);
  });
});

//Account
app.get("/account");
//upload-by-link
app.post("/upload-by-link", async (req, res) => {
  const { imageLink } = req.body;
  const imageName = `${Date.now()}.jpg`;
  await download.image({
    url: imageLink,
    dest: `${__dirname}/uploads/${imageName}`,
  });
  res.json(imageName);
});

//upload
app.post(
  "/upload",
  upload.array("imageUploads", 12),
  function (req, res, next) {
    // req.files is array of `photos` files
    // req.body will contain the text fields, if there were any

    res.json(req.files);
  }
);

//POST /account/places
app.post("/account/places", async (req, res) => {
  const placeDetails = req.body;
  console.log(placeDetails);
  await Places.create(placeDetails);
  res.json(placeDetails);
});

//PUT /account/places
app.put("/account/places", async (req, res) => {
  const placeDetails = req.body;
  await Places.findOneAndUpdate({ _id: placeDetails.id }, placeDetails);
  const updatedUserPlaces = await Places.find({ owner: placeDetails.owner });
  console.log(updatedUserPlaces);
  res.json(updatedUserPlaces);
});

//GET /account/places
app.get("/account/places", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const { _id } = userData;
    const userPlaces = await Places.find({ owner: _id });
    res.json(userPlaces);
  });
});

// GET Place
app.get("/place/:id", async (req, res) => {
  const { id } = req.params;
  const place = await Places.findOne({ _id: id });
  res.json(place);
});

//GET Listings
app.get("/", async (req, res) => {
  const allPlaces = await Places.find({});
  res.json(allPlaces);
});

//GET Listing
app.get("/listing/:id", async (req, res) => {
  const { id } = req.params;
  const place = await Places.findOne({ _id: id });
  res.json(place);
});

//POST Booking
app.post("/booking", async (req, res) => {
  const booking = await Bookings.create(req.body);
  res.json(booking);
});

//POST my-bookings
app.post("/my-bookings", async (req, res) => {
  const user = req.body;
  const myBookings = await Bookings.find({ user: user }).populate("place");
  res.json(myBookings);
});

app.listen(port, () => console.log(`Server Connected to Port: ${port}`));
