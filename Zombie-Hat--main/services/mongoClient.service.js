//Service to conenct to mognoDB
const mongoose = require("mongoose");
const MONGOO_URL = process.env.MONGOO_URL;
const connectToMongo =async ()=>{
    mongoose.connect(MONGOO_URL, { dbName: "yourDbName" }).then(() => {
        console.log("Connected Successfully to the Database");
      });
}


  module.exports = connectToMongo