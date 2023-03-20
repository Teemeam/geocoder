const fs = require('fs');
const axios = require('axios');
const Papa = require('papaparse');
const proj4 = require('proj4');
require('dotenv').config();

const filePath = process.argv[2]; // Path to CSV file

const baseUrl = 'https://avoin-paikkatieto.maanmittauslaitos.fi/geocoding/v2/pelias/search'; // Base URL for the geocoding API
const sources = process.argv[3]; // Data sources to use for the geocoding query
const crs = 'EPSG:3067'; // Coordinate reference system for the input data
const lang = 'fi'; // Language for the geocoding query

// Define the coordinate systems
proj4.defs('EPSG:3067', '+proj=utm +zone=35 +ellps=GRS80 +units=m +no_defs');
proj4.defs('EPSG:4326', '+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs');

const main = async () => {
  // Read the CSV file as a string
  const csvString = fs.readFileSync(`input/${filePath}`, 'utf-8');

  // Parse the CSV data using PapaParse library
  const results = Papa.parse(csvString, { header: true }).data;

  // Define an empty array to store the output rows
  const outputRows = [];

  // Loop through each row in the input data
  for (const row of results) {
    const text = encodeURIComponent(row.placeName);

    // Send a GET request to the geocoding API
    const response = await axios.get(
      `${baseUrl}?text=${text}&sources=${sources}&crs=${crs}&lang=${lang}&api-key=${process.env.API_KEY}`
    );

    // Extract the features from the API response
    const features = response.data.features;

    // If at least one feature was found, extract its coordinates and convert them to EPSG:4326
    if (features.length > 0) {
      const coords = features[0].geometry.coordinates;
      const [lng, lat] = proj4('EPSG:3067', 'EPSG:4326', [coords[0], coords[1]]);
      row.lat = lat;
      row.lng = lng;
    } else {
      row.lat = '';
      row.lng = '';
    }

    // Add the row to the output array
    outputRows.push(row);
  }

  // Convert the output data back to CSV format
  const outputCsv = Papa.unparse(outputRows, { header: true });

  // Write the output CSV data to a file
  fs.writeFileSync(`output/${filePath}`, outputCsv);
};

main();
