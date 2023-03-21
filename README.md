# Geocoder

Geocoder reads a CSV file containing Finnish place names, makes a request to a geocoding API to retrieve the latitude and longitude coordinates for each place and writes the results back to a new CSV file.

## Table of Contents

1. [Requirements](#requirements)
2. [Usage](#usage)
    1. [Geocoding](#geocoding)
        1. [Geographic names](#geographic-names)
        2. [Road addresses](#road-addresses)
        3. [Building addresses](#building-addresses)
    2. [Reverse geocoding](#reverse-geocoding)
        1. [Building addresses](#building-addresses-1)
3. [Response format](#response-format)
    1. [Geocoding](#geocoding-1)
    2. [Reverse geocoding](#reverse-geocoding-1)

## Requirements

Here is the link to the technical description of the geocoding API v2 of the National Land Survey of Finland: https://www.maanmittauslaitos.fi/kartat-ja-paikkatieto/ammattilaiskayttajille/paikkatietojen-rajapintapalvelut/geokoodauspalvelu

To use the API, you will need an API key: https://www.maanmittauslaitos.fi/rajapinnat/api-avaimen-ohje

Log in to your My Account service: https://omatili.maanmittauslaitos.fi/user/new/avoimet-rajapintapalvelut?lang=fi

## Usage

Run `npm install` to install dependencies.

Create a _.env_ file in the project's root folder and store your API key in that file:

```
API_KEY=XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
```

### Geocoding

#### Geographic names

Run `npm run names` to retrieve the coordinates for each geographic location. This will read the _geographic-names.csv_ file and use the National Land Survey's [geographic names](https://www.maanmittauslaitos.fi/kartat-ja-paikkatieto/asiantuntevalle-kayttajalle/tuotekuvaukset/nimisto) as the data source.

#### Road addresses

Run `npm run road-addresses` to retrieve the coordinates for each road address. This will read the _interpolated-road-addresses.csv_ file and use the Population Information System's [real estate, building, and spatial information](https://dvv.fi/kiinteisto-rakennus-ja-paikkatiedot) as the data source.

#### Building addresses

Run `npm run building-addresses` to retrieve the coordinates for each building address. This will read the _addresses.csv_ file and use the [Topographic database](https://www.maanmittauslaitos.fi/kartat-ja-paikkatieto/asiantuntevalle-kayttajalle/tuotekuvaukset/maastotietokanta-0) as the data source.

### Reverse geocoding

#### Building addresses

Run `npm run reverse` to retrieve the closest building address for each coordinate (in 10 meter radius). This will read the _reverse.csv_ file.

## Response format

### Geocoding

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

### Reverse geocoding

```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "rakennustunnus": "103036836W",
        "kiinteistotunnus": "09100200960009",
        "kuntanimiFin": "Helsinki",
        "kuntanimiSwe": "Helsingfors",
        "kuntatunnus": "091",
        "osoite.Osoite.katunimi": "Mannerheimintie",
        "osoite.Osoite.katunumero": "3",
        "osoite.Osoite.jarjestysnumero": "1",
        "osoite.Osoite.kieli": "fin",
        "osoite.Osoite.postinumero": "00100",
        "osoite.Osoite#2.katunimi": "Mannerheimvägen",
        "osoite.Osoite#2.katunumero": "3",
        "osoite.Osoite#2.jarjestysnumero": "1",
        "osoite.Osoite#2.kieli": "swe",
        "osoite.Osoite#2.postinumero": "00100",
        "osoite.Osoite#3.katunimi": "Aleksanterinkatu",
        "osoite.Osoite#3.katunumero": "23",
        "osoite.Osoite#3.jarjestysnumero": "2",
        "osoite.Osoite#3.kieli": "fin",
        "osoite.Osoite#3.postinumero": "00100",
        "osoite.Osoite#4.katunimi": "Alexandersgatan",
        "osoite.Osoite#4.katunumero": "23",
        "osoite.Osoite#4.jarjestysnumero": "2",
        "osoite.Osoite#4.kieli": "swe",
        "osoite.Osoite#4.postinumero": "00100",
        "source": "addresses",
        "gid": "nlsfi:addresses#1",
        "distance": 9.385703304198744e-10,
        "rank": 1,
        "country": "Suomi",
        "country_gid": "whosonfirst:country:85633143",
        "continent": "Eurooppa",
        "continent_gid": "whosonfirst:continent:102191581",
        "country_a": "FIN",
        "label": "Mannerheimintie 3 (Helsinki)",
        "match_type": "exact",
        "accuracy": "point",
        "municipality": "091",
        "label:kuntatunnus": "Helsinki",
        "label:municipality": "Helsinki"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [385746.0, 6672025.0]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "rakennustunnus": "1030368412",
        "kiinteistotunnus": "09100200960031",
        "kuntanimiFin": "Helsinki",
        "kuntanimiSwe": "Helsingfors",
        "kuntatunnus": "091",
        "osoite.Osoite.katunimi": "Aleksanterinkatu",
        "osoite.Osoite.katunumero": "21",
        "osoite.Osoite.jarjestysnumero": "1",
        "osoite.Osoite.kieli": "fin",
        "osoite.Osoite.postinumero": "00100",
        "osoite.Osoite#2.katunimi": "Alexandersgatan",
        "osoite.Osoite#2.katunumero": "21",
        "osoite.Osoite#2.jarjestysnumero": "1",
        "osoite.Osoite#2.kieli": "swe",
        "osoite.Osoite#2.postinumero": "00100",
        "source": "addresses",
        "gid": "nlsfi:addresses#2",
        "distance": 22.999999999883585,
        "rank": 2,
        "country": "Suomi",
        "country_gid": "whosonfirst:country:85633143",
        "continent": "Eurooppa",
        "continent_gid": "whosonfirst:continent:102191581",
        "country_a": "FIN",
        "label": "Aleksanterinkatu 21 (Helsinki)",
        "match_type": "exact",
        "accuracy": "point",
        "municipality": "091",
        "label:kuntatunnus": "Helsinki",
        "label:municipality": "Helsinki"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [385769.0, 6672025.0]
      }
    }
  ],
  "geocoding": {
    "status": "success",
    "metadata": [],
    "sources": {
      "addresses": {
        "status": "success",
        "duration": 11,
        "links": []
      }
    },
    "query": {
      "limit": 10,
      "radius": 10.0,
      "searchGeometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [385771.0000000001, 6672024.999999999],
            [385770.5196320102, 6672020.122741949],
            [385769.0969883129, 6672015.43291419],
            [385766.7867403077, 6672011.110744174],
            [385763.6776695298, 6672007.322330469],
            [385759.8892558256, 6672004.213259691],
            [385755.56708580925, 6672001.903011686],
            [385750.87725805055, 6672000.480367989],
            [385746.0000000001, 6671999.999999999],
            [385741.1227419497, 6672000.480367989],
            [385736.432914191, 6672001.903011686],
            [385732.1107441746, 6672004.213259691],
            [385728.32233047043, 6672007.322330469],
            [385725.21325969254, 6672011.110744174],
            [385722.90301168733, 6672015.43291419],
            [385721.48036799004, 6672020.122741949],
            [385721.0000000001, 6672024.999999999],
            [385721.48036799004, 6672029.877258049],
            [385722.90301168733, 6672034.567085808],
            [385725.21325969254, 6672038.8892558245],
            [385728.32233047043, 6672042.677669529],
            [385732.1107441746, 6672045.786740307],
            [385736.432914191, 6672048.096988312],
            [385741.1227419497, 6672049.519632009],
            [385746.0000000001, 6672049.999999999],
            [385750.87725805055, 6672049.519632009],
            [385755.56708580925, 6672048.096988312],
            [385759.8892558256, 6672045.786740307],
            [385763.6776695298, 6672042.677669529],
            [385766.7867403077, 6672038.8892558245],
            [385769.0969883129, 6672034.567085808],
            [385770.5196320102, 6672029.877258049],
            [385771.0000000001, 6672024.999999999]
          ]
        ]
      },
      "focusPoint": {
        "type": "Point",
        "coordinates": [385746.0000000001, 6672024.999999999]
      },
      "sources": "addresses",
      "lang": "fin",
      "crs": "EPSG:3067",
      "requestCrs": "EPSG:3067",
      "scaleDenominator": 5000,
      "excludesMaps": {}
    },
    "version": "2.0.1",
    "attribution": "https://www.maanmittauslaitos.fi/en/opendata-licence-cc40",
    "engine": {
      "name": "maanmittauslaitos.fi/geocoding",
      "author": "National Land Survey of Finland",
      "version": "2.0.1"
    },
    "timestamp": 1679320037779
  }
}
```