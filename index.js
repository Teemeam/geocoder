import axios from 'axios';
import Papa from 'papaparse';
import fs from 'fs';

const inputFilename = 'places.csv';
const outputFilename = 'geocodedPlaces.csv';

const baseUrl = 'https://avoin-paikkatieto.maanmittauslaitos.fi/geocoding/v2/pelias/search';
const apiKey = '';

const main = async () => {
  // Load the CSV file as a string using fs module
  const csvString = fs.readFileSync(inputFilename, 'utf-8');

  // Parse the CSV string using PapaParse
  const results = Papa.parse(csvString, { header: true }).data;

  // Process each row in the CSV
  const outputRows = [];
  for (const row of results) {
    // Get the coordinates for the place using the Maanmittauslaitos API
    const response = await axios.get(`${baseUrl}?text=${row.placeName}&sources=geographic-names&crs=EPSG:3067&lang=fi&api-key=${apiKey}`);

    // Extract the coordinates from the API response
    const features = response.data.features;
    if (features.length > 0) {
      const coords = features[0].geometry.coordinates;
      row.latitude = coords[1];
      row.longitude = coords[0];
    } else {
      row.latitude = '';
      row.longitude = '';
    }

    // Add the row to the output array
    outputRows.push(row);
  }

  // Convert the output rows to CSV using PapaParse
  const outputCsv = Papa.unparse(outputRows, { header: true });

  // Write the output CSV to a file
  fs.writeFileSync(outputFilename, outputCsv);
};

main();
