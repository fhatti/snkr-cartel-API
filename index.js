const express = require("express");
const app = express();
const cors = require("cors")
const Sneaker = require("./models/sneaker");

const admin = require("firebase-admin");
const serviceAccount = require("./key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
app.use(cors({ origin: 'http://localhost:5173' })); // restricted to specific origin e.g. snkr-cartel dev server
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

app.get("/", (req, res) => {
  res.send("Hello from Snkr-Cartel API");
});
app.post("/create", async (req, res) => {
  try {
    console.log(req.body);
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
    const response = await db.collection("sneakers").add(sneakerData);
    res.send(response);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.get("/read/all", async (req, res) => {
  try {
       console.log("Received request for /read/all");
    const sneakerRef = db.collection("sneakers");
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

app.get("/read/:id", async(req,res) =>
{
   try {
    console.log("Received request for /read/:id")
    const sneakerRef  = db.collection("sneakers").doc(req.params.id);
    const response = await sneakerRef.get()
    res.send(response.data())
   } catch (error) {
    res.send(error);
   } 
} )


app.post("/update", async(req, res) => {
    try {
        console.log("Received request for /update")
        const id = req.body.id
        const salePrice = 60
        const sneakerRef =  await db.collection("sneakers").doc(id).update({
            price: salePrice 
        })
        res.send(sneakerRef)
    } catch (error) {
        res.send(error)
    }
})

app.delete("/delete/:id", async(req,res) => {
try {
    console.log("Received request for /detele/:id")
    const response = await db.collection("sneakers").doc(req.params.id).delete()
    res.send(response)
} catch (error) {
    res.send(error)
}
})