const mongoose = require('mongoose')

if(process.argv.length < 3) {
    console.log('give password');
    process.exit(1);
}

const password = process.argv[2];

const url =
`mongodb+srv://tiiaojares:${password}@journeys.zwxpxgo.mongodb.net/?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url);

const journeySchema= new mongoose.Schema({
    departure_id: String,
    departure_name: String,
    return_id: String,
    return_name: String,
    distance: String,
    duration: String
})

const Journey = mongoose.model('Journey', journeySchema)

const {parse} = require('csv-parse');
const fs = require('fs');

const parser = parse({columns: true}, async function (err, journeys) {
    try {
        const filteredJourneys = journeys
            .filter(journey => parseInt(journey['Duration (sec.)']) > 10)
            .filter(journey => parseInt(journey['Covered distance (m)']) > 10)
            .map(journey => ({
                departure_id: journey['Departure station id'],
                departure_name: journey['Departure station name'],
                return_id: journey['Return station id'],
                return_name: journey['Return station name'],
                distance: journey['Covered distance (m)'],
                duration: journey['Duration (sec.)']
            }))
            .map(({ Departure, ...rest }) => rest)
            .map(({ Return, ...rest }) => rest);

        const savedJourneys = await Journey.insertMany(filteredJourneys);
        console.log("data saved to MongoDB: ", savedJourneys.length);
        mongoose.connection.close();
        console.log("mongoDB yhteys suljettu")
    } catch (error) {
        console.error(error);
    } 
})

fs.createReadStream(__dirname+'/2021-07.csv').pipe(parser);

