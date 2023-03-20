# Geocoder

Geocoder reads a CSV file containing Finnish place names, makes a request to a geocoding API to retrieve the latitude and longitude coordinates for each place and writes the results back to a new CSV file.

## Requirements

Here is the link to the technical description of the geocoding API v2 of the National Land Survey of Finland: https://www.maanmittauslaitos.fi/kartat-ja-paikkatieto/ammattilaiskayttajille/paikkatietojen-rajapintapalvelut/geokoodauspalvelu

To use the API, you will need an API key: https://www.maanmittauslaitos.fi/rajapinnat/api-avaimen-ohje

Log in to your My Account service: https://omatili.maanmittauslaitos.fi/user/new/avoimet-rajapintapalvelut?lang=fi

## Usage

Run `node index.js` to run the script.

## Response format

```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "id": "P_10581656",
      "properties": {
        "placeId": 10581656,
        "placeVersionId": 2,
        "placeType": 2020115,
        "placeTypeDescription": 2020115,
        "placeTypeCategory": 2,
        "placeTypeGroup": 202,
        "placeTypeSubgroup": 20201,
        "placeElevation": 83,
        "tm35MapSheet": "M4212G1",
        "gslsMapSheet": "212309C",
        "rescueGridSquare": "21N4B3",
        "municipality": "837",
        "subregion": "064",
        "region": "06",
        "scaleRelevance": 50000,
        "placeCreationTime": "2008-12-05T22:00:00Z",
        "placeModificationTime": "2016-12-28T07:53:12Z",
        "placeDeletionTime": null,
        "name": [
          {
            "placeNameId": 40581656,
            "placeNameVersionId": 1,
            "spelling": "Tammerkoski",
            "language": "fin",
            "languageOfficiality": 1,
            "languageDominance": 1,
            "placeNameSource": 1,
            "placeNameStatus": 5,
            "placeNameCreationTime": "2008-12-05T22:00:00Z",
            "placeNameModificationTime": "2008-12-05T22:00:00Z",
            "placeNameDeletionTime": null
          }
        ],
        "source": "geographic-names",
        "gid": "nlsfi:geographic-names#1",
        "distance": null,
        "rank": 1,
        "country": "Suomi",
        "country_gid": "whosonfirst:country:85633143",
        "continent": "Eurooppa",
        "continent_gid": "whosonfirst:continent:102191581",
        "country_a": "FIN",
        "label": "Tammerkoski",
        "match_type": "exact",
        "accuracy": "point",
        "similarity": 0.9090909090909091,
        "confidence": 0.8,
        "label:region": "Pirkanmaa",
        "label:subregion": "Tampere",
        "label:municipality": "Tampere",
        "label:placeType": "Koski",
        "label:placeTypeDescription": "Vuolas, aaltoileva ja kohiseva, yleensä kivikkoinen joen osa; putous.",
        "label:placeTypeCategory": "Vedet",
        "label:placeTypeGroup": "Virtavedet",
        "label:placeTypeSubgroup": "Virtavedet"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [327726.89, 6822723.969]
      }
    }
  ],
  "geocoding": {
    "status": "success",
    "metadata": [
      {
        "rawTerm": "tammerkoski",
        "searchTerm": "tammerkoski",
        "searchTermParts": ["tammerkoski"],
        "seartchTermPartCount": 1,
        "matchedParts": [],
        "matchingCodelists": {},
        "similarTerms": [
          {
            "text": "Tammela",
            "similarity": 0.3333333432674408,
            "word_similarity": 0.625,
            "count": 1
          },
          {
            "text": "Koski",
            "similarity": 0.2857142984867096,
            "word_similarity": 0.6666666865348816,
            "count": 1
          }
        ]
      }
    ],
    "sources": {
      "geographic-names": {
        "status": "success",
        "duration": 350,
        "links": []
      }
    },
    "query": {
      "sources": "geographic-names",
      "crs": "EPSG:3067",
      "requestCrs": "http://www.opengis.net/def/crs/EPSG/0/4326",
      "scaleDenominator": 5000,
      "excludesMaps": {},
      "text": "tammerkoski",
      "querySize": 10
    },
    "version": "1.0",
    "attribution": "https://www.maanmittauslaitos.fi/en/opendata-licence-cc40",
    "engine": {
      "name": "maanmittauslaitos.fi/geocoding",
      "author": "National Land Survey of Finland",
      "version": "1.0"
    },
    "timestamp": 1679059851630
  }
}
```