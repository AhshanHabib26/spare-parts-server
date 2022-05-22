const express = require("express");
const cors = require("cors");
const jwt = require('jsonwebtoken');
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;


// middlle Ware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.USER_ADMIN}:${process.env.USER_PASS}@cluster0.b30yd.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});


async function motoRun(){
    try{

        await client.connect()

        const productCollection = client.db('MotoCollection').collection('products')
        const userCollection = client.db('MotoCollection').collection('user')
        const productsCollection = client.db('MotoCollection').collection('userproducts')

        app.get("/product", async (req, res) =>{
            const query = {}
            const data = productCollection.find(query)
            const result = await data.toArray()
            res.send(result)
        })


        app.get("/product/:id", async (req, res) => {
          const id = req.params.id;
          const query = { _id: ObjectId(id) };
          const result = await productCollection.findOne(query)
          res.send(result);
        });

        app.post('/user' , async(req, res) =>{
          const data = req.body
          const query = await userCollection.insertOne(data)
          res.send(query)
        })

        app.post('/userproducts' , async(req, res) =>{
          const data = req.body
          const query = await productsCollection.insertOne(data)
          res.send(query)
        })

        

    }
    finally{

    }
}
motoRun().catch(console.dir())


app.get("/", (req, res) => {
  res.send("Welcome! Motor Parts Manufacturing Website");
});

app.listen(port);
