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

  // Get all Categories
  app.get('/categories', async (req, res) => {
    const result = await category.find({}).toArray();
    res.json(result);
  });

  // Get All Products
  app.get('/products', async (req, res) => {
    const result = await products.find({}).toArray();
    res.json(result)
  })

  //Get Single Product By ID
  app.get('/products/:id', async (req, res) => {
    const id = req.params.id
    const result = await products.findOne({ _id: new ObjectId(id) });
    res.json(result)
  })

  // POST Single Product
  app.post('/products', async (req, res) => {
    const product = req.body;
    const result = await products.insertOne(product)
    res.json(result)
  })




}

app.get('/', (req, res) => {
  res.send('Testing');
});

app.listen(port, () => {
  console.log(`Server Port:${port}`);
});

run().catch(console.dir);


















// Get All Products
// app.get('/products', async (req, res) => {
//   const result = await products.find({}).toArray();
//   res.json(result);
// });

// Get Products By Id
// app.get('/products/:id', async (req, res) => {
//   const id = req.params.id;
//   const result = await products.findOne({ _id: new ObjectId(id) });
//   if (result) {
//     res.json(result);
//   } else {
//     res.status(404).json({ message: 'Product not found' });
//   }
// });

// Post Single Products
// app.post('/products', async (req, res) => {
//   const product = req.body;
//   const result = await products.insertOne(product);
//   if (result) {
//     res.json(result);
//   } else {
//     res.status(404).json({ message: 'Product not found' });
//   }
// });
