const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
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

        

    }
    finally{

    }
}
motoRun().catch(console.dir())


app.get("/", (req, res) => {
  res.send("Welcome! Motor Parts Manufacturing Website");
});

app.listen(port);
