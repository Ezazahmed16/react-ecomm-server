const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://admin:tkAUVq8h8rueuD8M@cluster0.4r1x5jp.mongodb.net/";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
  await client.connect();

  // Database Name
  const store = client.db('store');
  // Collection Name
  const category = store.collection('category');
  const products = store.collection('products');
  const bigDiscounts = store.collection('bigDiscounts');


  // Get, Post, Delete - Category
  app.get('/categories', async (req, res) => {
    const result = await category.find({}).toArray();
    res.json(result);
  });

  app.post('/categories', async (req, res) => {
    const newCategory = req.body;
    const result = await category.insertOne(newCategory);
    res.json(result);
  });

  app.delete('/categories/:id', async (req, res) => {
    const id = req.params.id;
    const result = await category.deleteOne({ _id: new ObjectId(id) });
    res.json(result);
  });

  // Get, Post - Products
  app.get('/products', async (req, res) => {
    const result = await products.find({}).toArray();
    res.json(result);
  });

  app.post('/products', async (req, res) => {
    const newProduct = req.body;
    const result = await products.insertOne(newProduct);
    res.json(result);
  });

  // Get, Delete, Put - Single Product by ID
  app.get('/products/:id', async (req, res) => {
    const id = req.params.id;
    const result = await products.findOne({ _id: new ObjectId(id) });
    res.json(result);
  });

  app.delete('/products/:id', async (req, res) => {
    const id = req.params.id;
    const result = await products.deleteOne({ _id: new ObjectId(id) });
    res.json(result);
  });

  app.put('/products/:id', async (req, res) => {
    const id = req.params.id;
    const updatedProduct = req.body;
    const result = await products.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedProduct }
    );
    res.json(result);
  });

  // Get - Products by Category
  app.get('/products/category/:categoryId', async (req, res) => {
    const categoryId = req.params.categoryId;
    const result = await products.find({ categoryId: categoryId }).toArray();
    res.json(result);
  });

  // Get, Post, Put, Delete - Big Discounts by Product ID
  app.get('/bigDiscounts/:productId', async (req, res) => {
    const productId = req.params.productId;
    const result = await bigDiscounts.findOne({ productId: productId });
    res.json(result);
  });

  app.post('/bigDiscounts', async (req, res) => {
    const newBigDiscount = req.body;
    const result = await bigDiscounts.insertOne(newBigDiscount);
    res.json(result);
  });

  app.put('/bigDiscounts/:productId', async (req, res) => {
    const productId = req.params.productId;
    const updatedBigDiscount = req.body;
    const result = await bigDiscounts.updateOne(
      { productId: productId },
      { $set: updatedBigDiscount }
    );
    res.json(result);
  });

  app.delete('/bigDiscounts/:productId', async (req, res) => {
    const productId = req.params.productId;
    const result = await bigDiscounts.deleteOne({ productId: productId });
    res.json(result);
  });


  app.get('/', (req, res) => {
    res.send('Testing');
  });

  app.listen(port, () => {
    console.log(`Server Port:${port}`);
  });
}
run().catch(console.dir);
