// const { response } = require("express");
const express = require("express");
const path = require("path");
const { MongoClient } = require("mongodb");
const { Database } = require("mongo");
const { connect } = require("http2");

// Mongo stuff
const dbUrl =
  "mongodb+srv://louiseabrena:October161998@cluster0.gk5jn3v.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(dbUrl);

// set up Express app
const app = express();
const port = process.env.PORT || 8000;

// define important folder
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// set up public folder
app.use(express.static(path.join(__dirname, "public")));

// test Express App before going further
// by setting up a path when you get a certain page group
app.get("/", async (request, response) => {
  links = await getLinks();
  response.render("index", { title: "Home", menu: links });
});
app.get("/shop", async (request, response) => {
  links = await getLinks();
  products = await getItems();
  response.render("shop", {
    title: "Shop by Artist",
    menu: links,
    collection: products,
  });
});

app.get("/trade", async (request, response) => {
  links = await getLinks();
  response.render("trade", { title: "Trade", menu: links });
});
app.get("/contact", async (request, response) => {
  links = await getLinks();
  response.render("contact", { title: "Contact", menu: links });
});

app.get("/shop", async (request, response) => {
  links = await getItems();
  response.render("contact", { title: "Contact", menu: links });
});

// then set up the server listening //
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});

// MONGO
async function connection() {
  await client.connect();
  db = client.db("testdb");
  return db;
}

// retrieve all link
async function getLinks() {
  db = await connection();
  var results = db.collection("menuLinks").find({});
  res = await results.toArray();
  return res;
}

// SHOP DB
async function getItems() {
  db = await connection();
  var results = db.collection("PCcollections").find({});
  res = await results.toArray();
  return res;
}
