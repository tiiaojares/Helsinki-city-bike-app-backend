const mongoose = require('mongoose');

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

module.exports = Journey;