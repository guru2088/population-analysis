db.people.createIndex({ location: "2dsphere" })
db.states.createIndex({ geometry: "2dsphere" })