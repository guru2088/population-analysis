const fs = require("fs");
const csv = require("csv-parser");
require('dotenv').config()

const { MongoClient } = require("mongodb");
const url = process.env.DB_ADDRESS;
const client = new MongoClient(url);
const database = process.env.DB_NAME;

async function insertData(data) {
  let result = await client.connect();
  let db = result.db(database);
  let collection = db.collection("people");
  let response = await collection.insertOne(data);
  return response;
}

fs.createReadStream("../peoples/individuals.csv")
  .pipe(csv())
  .on("data", async function (data) {
    try {
      const coordinates = data._4.split("}")[0].split(":")[1];
      let firstCoord = coordinates
        .split(",")[0]
        .substring(1, coordinates.split(",")[0].length);
      let secondCoord = coordinates
        .split(",")[1]
        .substring(0, coordinates.split(",")[1].length - 1);

      const result = await insertData({
        fName: data.first_name,
        lName: data.last_name,
        location: {
          coordinates: [Number(firstCoord), Number(secondCoord)],
          type: "Point",
        },
      });
      console.log(result);
    } catch (err) {
      console.log("Error on parsing - ", err);
    }
  })
  .on("end", function () {
    console.log("Finishsed importing data");
  });

