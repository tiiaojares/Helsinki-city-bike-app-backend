# Helsinki city bike -app (backend)
**This is the backend part of the Solita Dev Academy Finland 2023 pre-assignment task.**  
You can find the app from: https://helsinki-city-bike-app-8403.onrender.com/

<img width="640" alt="helsinki_city_bike" src="https://github.com/tiiaojares/Helsinki-city-bike-app-backend/assets/123379881/25abb078-0f28-4469-b90c-220f64f6f6b4">


**To run the backend:**
- git clone https://github.com/tiiaojares/countries-and-weather-backend.git
- npm install
- create .env file to the root and add the information I have given to you (this is needed to make the database connection work)
- npm run dev

**To run the frontend:**
- git clone https://github.com/tiiaojares/Helsinki-city-bike-app-frontend.git
- cd Helsinki-city-bike
- npm install
- npm start

**Teknologies:**
- Backend: Node.js, Express, Mongoose
- Frontend: JavaScript, React, Axios, Bootstrap


Helsinki City Bike App is a responsive application that allows you to view information about city bike stations and the trips made between them. Additionally, the app provides the ability to add new stations and trip data. The existing station and trip data have been loaded into a MongoDB database from publicly available datasets (CSV files) shared by City Bike Finland. However, due to the limited space in the free version of the database, not all trip data from the files could be transferred.

The app allows you to browse all city bike stations and search for stations based on their ID, name, address, or capacity. It is also possible to change the sorting order of the displayed list based on columns, either in ascending or descending order. Clicking on a station opens detailed statistics about trips departing from and returning to that station.

Regarding trips, the app displays information for the first 15 trips on a list. It is also possible to perform an "advanced search" to find information about trips between a specific departure station and return station. The sorting order of more detailed trip information can also be changed based on a column in ascending or descending order.

Adding new stations and trip data is also possible, but unfortunately, due to the limited space in the database, saving trip data is currently not supported. However, saving new city bike stations works as intended.

Through this project, I learned a lot, such as CSV file validation and the use of NoSQL databases (transferring data to the database and making various queries). However, I have little experience in writing tests, so I decided to exclude that from this project for now. My plan is to delve into testing next, and in the next project, I will focus specifically on testing.
