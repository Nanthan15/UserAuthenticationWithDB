const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://Nanthan:N@nthan@26051981@cluster0.l5ffxlc.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});