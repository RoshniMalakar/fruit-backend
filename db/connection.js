const mongoose = require("mongoose");
const db =
  "mongodb://f:1234@ac-ofikuvo-shard-00-00.qst9lev.mongodb.net:27017,ac-ofikuvo-shard-00-01.qst9lev.mongodb.net:27017,ac-ofikuvo-shard-00-02.qst9lev.mongodb.net:27017/?ssl=true&replicaSet=atlas-8p0xev-shard-0&authSource=admin&appName=Cluster0";
mongoose
  .connect(db, {})
  .then(() => {
    console.log("Database Connect");
  })
  .catch((error) => {
    console.log(error.message);
  });
