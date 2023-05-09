require('dotenv').config();

const express = require('express');
const app = express();


// get the station-data from the mongoDB
const mongoose = require('mongoose');
mongoose.set('strictQuery',false);

const cors = require('cors');
app.use(cors());

const url = process.env.MONGODB_URI;

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB');
  })
  .catch((error => {
    console.log('error connecting to MongoDB:', error.message);
  }))

const stationSchema = new mongoose.Schema({
  ID: Number,
  Nimi: String,
  Osoite: String,
  Kaupunki: String,
  Kapasiteet: Number,
 
})

const Station = mongoose.model('Station', stationSchema);

//get All stations
app.get('/api/stations', (request, response) => {
  Station.find({})
    .then(stations => {
      response.json(stations)
      console.log("stations: ", stations.length)
    })
    .catch((error => {
      console.log('error trying to find data:', error.message);
    }))
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

