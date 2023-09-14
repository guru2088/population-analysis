import { Request, Response } from "express";
import { TDebug } from "../log";
import { Swagger20Request } from "swagger-tools";
import * as HttpStatus from "http-status-codes";
let mongodb = require("mongodb");
import 'dotenv/config'

const debug = new TDebug("app:src:controllers:main");

export async function getStates(
  req: Request & Swagger20Request,
  res: Response
): Promise<any> {
  let stateDocs = [];
  const client = new mongodb.MongoClient(process.env.DB_ADDRESS);
  try {
    // Get the database and collection on which to run the operation
    const db = client.db(process.env.DB_NAME);
    const states = db.collection("states");
    // Query for states that have a empty condition
    const query = {};
    const options = {
      // Sort returned documents in ascending order by name (A->Z)
      sort: { name: 1 },
      // Include only the `name` field in each returned document
      projection: {  name: 1 },
    };
    // Execute query

    stateDocs = await states.find(query, options).toArray();

  } finally {
    await client.close();
    res.send({ states : stateDocs });
  }
}

export async function getPeoples(
  req: Request & Swagger20Request,
  res: Response
): Promise<any> {

  const client = new mongodb.MongoClient(process.env.DB_ADDRESS);
  let peopleDocs;
  let peopleCount;
  try {
    const db = client.db(process.env.DB_NAME);
    const states = db.collection("states");
    const people = db.collection("people");
    const query = {"_id" : new mongodb.ObjectId(req.query.state_id)}
    const stateDoc = await states.findOne(query)
    if(!stateDoc.geometry)  throw new Error('Invalid state id ...');

    // Using toArray is not a good practicse, we should always use limit and skip for pagination. 
    // But not sure if that is needed for this task or not
    // So using toArray only() for this homework

    peopleDocs = await people.find( { location: { $geoWithin: { $geometry: stateDoc.geometry } } } ).toArray()
    peopleCount = await people.find( { location: { $geoWithin: { $geometry: stateDoc.geometry } } } ).count()

  } finally {
    await client.close();
    res.send({ peoples : {count: peopleCount , data : peopleDocs } });
  }
}
