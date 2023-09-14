
const path = require('path');
const fs = require('fs');
const directoryPath = path.join(__dirname, '../states');


const { MongoClient } = require("mongodb");
const url = process.env.DB_ADDRESS;
const client = new MongoClient(url);
const database = process.env.DB_NAME;


async function insertData(data) {
    let result = await client.connect();
    let db = result.db(database);
    let collection = db.collection("states");
    let response = await collection.insertOne(data);
    return response;
}

fs.readdir(directoryPath, function (err, files) {
    if (err) return console.log('Unable to scan directory: ' + err);
    files.forEach( async function (file) {
        let rawdata = fs.readFileSync(path.join(__dirname, '../states',file));
        let student = JSON.parse(rawdata);
        const result = await insertData({"geometry":{"coordinates":student.features[0].geometry.coordinates,"type":student.features[0].geometry.type},"name":student.features[0].properties.name});
        console.log(result)

    });
});