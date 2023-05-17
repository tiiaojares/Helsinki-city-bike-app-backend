const mongoose = require('mongoose');

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

module.exports = Station;