require('dotenv').config();

const express = require('express');
const app = express();

const mongoose = require('mongoose');
//mongoose.set('strictQuery',false);

const cors = require('cors');
app.use(cors());


// get the station-data from the mongoDB

const url_station = process.env.MONGODB_URI;
const DB1 = mongoose.createConnection(url_station);

const stationSchema = new mongoose.Schema({
  ID: Number,
  Nimi: String,
  Osoite: String,
  Kaupunki: String,
  Kapasiteet: Number,
 
})

const Station = DB1.model('Station', stationSchema);

// get the journey-data from the mongoDB

const url_journey = process.env.MONGODB_JOURNEY_URI;
const DB2 = mongoose.createConnection(url_journey);

const journeySchema= new mongoose.Schema({
  departure_id: String,
  departure_name: String,
  return_id: String,
  return_name: String,
  distance: String,
  duration: String
})

const Journey = DB2.model('Journey', journeySchema)

//get All stations
app.get('/api/stations', (request, response) => {
  Station.find({})
    .then(stations => {
      response.json(stations)
      console.log("stations: ", stations.length)
    })
    .catch((error => {
      console.log('error trying to find station data:', error.message);
    }))
})

app.get('/api/stations/:id', (request, response) => {
  const id = request.params.id
  Station.find({ID: id})
    .then(station => {
      response.json(station)
      console.log("selected station: ", station)
    })
    .catch((error => {
      console.log('error trying to find selected station data:', error.message);
    }))
})

// get all journeys, but show only the first 1000 
app.get('/api/journeys', (request, response) => {
  Journey.find({})
    .limit(1000)
    .then(journeys => {
      const journeysToFrontend = journeys.slice(0, 1000);
      response.json(journeysToFrontend)
      console.log("1000 from all journeys sent to frontend")
    })
    .catch((error => {
      console.log('error trying to find journey data:', error.message);
    }))
})

// get all journeys based on the departure and return satation
app.get('/api/journeys/find/:dep/:ret', (request, response) => {
  const departureStation = request.params.dep
  const returnStation = request.params.ret
  console.log("url dep: ", request.params.dep)
  console.log("url ret: ", request.params.ret)
  
  Journey.find({departure_name: departureStation, return_name: returnStation})
    .then(journeys => {
      response.json(journeys)
      console.log("journeys based on the departure and return station: ", journeys.length)
    })
    .catch((error => {
      console.log('error trying to find journey data based on departure and return station:', error.message);
    }))
})


// get all journeys based on the departure_id
app.get('/api/journeys/departure/:id', (request, response) => {
  const id = request.params.id
  console.log("id: ", id)
  Journey.find({departure_id: id})
    .then(journeys => {
      response.json(journeys)
      console.log("journeys based on the departure station id: ", journeys.length)
    })
    .catch((error => {
      console.log('error trying to find journey data based on departure id:', error.message);
    }))
})

//get all journeys based on the return_id
app.get('/api/journeys/return/:id', (request, response) => {
  const id = request.params.id
  Journey.find({return_id: id})
    .then(journeys => {
      response.json(journeys)
      console.log("id: ", id)
      console.log("journeys based on the return station id: ", journeys.length)
    })
    .catch((error => {
      console.log('error trying to find journey data based on return id:', error.message);
    }))
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

