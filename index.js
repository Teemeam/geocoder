const fs = require('fs');
const axios = require('axios');
const Papa = require('papaparse');
const proj4 = require('proj4');
require('dotenv').config();

const crs = 'EPSG:3067'; // Coordinate reference system for the input data
const lang = 'fi'; // Language for the geocoding query

// Define the coordinate systems
proj4.defs('EPSG:3067', '+proj=utm +zone=35 +ellps=GRS80 +units=m +no_defs');
proj4.defs('EPSG:4326', '+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs');

const main = async () => {
  const filePath = process.argv[2]; // Path to CSV file
  const sources = process.argv[3]; // Data sources to use for the geocoding query
  const operation = process.argv[4]; // Operation to perform (either 'geocode' or 'reverse')

  // Base URL for the geocoding API
  const baseUrl =
    operation === 'geocode'
      ? 'https://avoin-paikkatieto.maanmittauslaitos.fi/geocoding/v2/pelias/search'
      : 'https://avoin-paikkatieto.maanmittauslaitos.fi/geocoding/v2/pelias/reverse';

  // Read the CSV file as a string
  const csvString = fs.readFileSync(`input/${filePath}`, 'utf-8');

  // Parse the CSV data
  const results = Papa.parse(csvString, { header: true }).data;

  // Define an empty array to store the output rows
  const outputRows = [];

  // Loop through each row in the input data
  for (const row of results) {
    if (operation === 'geocode') {
      // Encode string as a URI component
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
        const [lon, lat] = proj4('EPSG:3067', 'EPSG:4326', [coords[0], coords[1]]);
        row.lat = lat;
        row.lon = lon;
      } else {
        row.lat = '';
        row.lon = '';
      }

      // Add the row to the output array
      outputRows.push(row);
    } else {
      // Convert coordinates to EPSG:3067
      const [lon, lat] = proj4('EPSG:4326', 'EPSG:3067', [
        parseFloat(row.lon),
        parseFloat(row.lat),
      ]);

      // Send a GET request to the reverse geocoding API
      const response = await axios.get(
        `${baseUrl}?point.lat=${lat}&point.lon=${lon}&boundary.circle.radius=10&sources=${sources}&request-crs=${crs}&crs=${crs}&lang=${lang}&api-key=${process.env.API_KEY}`
      );

      // Extract the features from the API response
      const features = response.data.features;

      // If at least one feature was found, extract its address
      if (features.length > 0) {
        const properties = features[0].properties;
        row.address = `${properties['osoite.Osoite.katunimi']} ${properties['osoite.Osoite.katunumero']}`;
      } else {
        row.address = '';
      }

      // Add the row to the output array
      outputRows.push(row);
    }
  }

  // Convert the output data back to CSV format
  const outputCsv = Papa.unparse(outputRows, { header: true });

  // Write the output CSV data to a file
  fs.writeFileSync(`output/${filePath}`, outputCsv);
};

main();
