const express = require("express");
const app = express();
const cors = require("cors");
const Sneaker = require("./models/sneaker");

const admin = require("firebase-admin");
const serviceAccount = require("./key.json");

const bodyParser = require("body-parser")

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
app.use(cors({ origin: "http://localhost:5173" })); // restricted to specific origin e.g. snkr-cartel dev server
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

app.get("/", (req, res) => {
  res.send("Hello from Snkr-Cartel API");
});

app.post("/shop-items/create", async (req, res) => {
  try {
    console.log("Received request for /shop-items/create");
    const { name, price, rating, reviewsNr, imgUrl, stock, brand } = req.body;
    const newSneaker = new Sneaker(
      name,
      price,
      rating,
      reviewsNr,
      imgUrl,
      stock,
      brand
    );
    const sneakerData = newSneaker.toPlainObject();
    const response = await db.collection("shopItems").add(sneakerData);
    res.send(response);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Read all items from Shop
app.get("/read/shop-items/all", async (req, res) => {
  try {
    console.log("Received request for /read/shop-items/all");
    const sneakerRef = db.collection("shopItems");
    const response = await sneakerRef.get();
    let responseArry = [];
    response.forEach((doc) => {
      responseArry.push(doc.data());
    });
    res.send(responseArry);
  } catch (error) {
    res.send(error);
  }
});

// Read all items by ID from Shop
app.get("/read/shop-items/:id", async (req, res) => {
  try {
    console.log("Received request for /read/shop-items/:id");
    const sneakerRef = db.collection("shopItems").doc(req.params.id);
    const response = await sneakerRef.get();
    res.send(response.data());
  } catch (error) {
    res.send(error);
  }
});

// Update items  by ID from Shop -> update price to salePrice
app.post("/update/shop-items/", async (req, res) => {
  try {
    console.log("Received request for /update/shop-items/");
    const id = req.body.id;
    const salePrice = 60;
    const sneakerRef = await db.collection("shopItems").doc(id).update({
      price: salePrice,
    });
    res.send(sneakerRef);
  } catch (error) {
    res.send(error);
  }
});

// Delete items  by ID from Shop
app.delete("/delete/shop-items/:id", async (req, res) => {
  try {
    console.log("Received request for /detele/shop-items/:id");
    const response = await db
      .collection("shopItems")
      .doc(req.params.id)
      .delete();
    res.send(response);
  } catch (error) {
    res.send(error);
  }
});


// Create items for Marketplace DB
app.post("/marketplace-items/create", async (req, res) => {
  try {
    console.log("Received request for /marketplace-items/create");
    const { name, price, rating, reviewsNr, imgUrl, stock, brand, userId, email, image } = req.body;
    const newSneaker = new Sneaker(
      name,
      price,
      rating,
      reviewsNr,
      imgUrl,
      stock,
      brand,
      userId,
      email,
      image,
    );
    const sneakerData = newSneaker.toPlainObject();
    const response = await db.collection("marketplaceItems").add(sneakerData);
    res.send(response);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});


// Read all items from Marketplace
app.get("/read/marketplace-items/all", async (req, res) => {
  try {
    console.log(" Reiceved request for /read/marketplace-items/all");
    const sneakerRef = db.collection("marketplaceItems");
    const response = await sneakerRef.get();
    let responseArry = [];
    response.forEach((doc) => {
      responseArry.push(doc.data());
    });
    res.send(responseArry);
  } catch (error) {
    res.send(error);
  }
});

// Read item by id from Marketplace
app.get("/read/marketplace-items/:id", async (req, res) => {
  try {
    console.log("Received request for /read/marketplace-items/:id");
    const sneakerRef = db.collection("marketplaceItems").doc(req.params.id);
    const response = await sneakerRef.get();
    res.send(response.data());
  } catch (error) {
    res.send(error);
  }
});

// Update item from Marketplace
app.post("/update/marketplace-items/", async (req, res) => {
  try {
    console.log("Received request for /update/marketplace-items/");
    const id = req.body.id;
    const newName = "Off White";
    const sneakerRef = await db.collection("marketplaceItems").doc(id).update({
    name: newName,
    });
    res.send(sneakerRef);
  } catch (error) {
    res.send(error);
  }
});

// Delete items  by ID from Marketplace
app.delete("/delete/marketplace-items/:id", async (req, res) => {
  try {
    console.log("Received request for /detele/marketplace-items/:id");
    const response = await db
      .collection("marketplaceItems")
      .doc(req.params.id)
      .delete();
    res.send(response);
  } catch (error) {
    res.send(error);
  }
});