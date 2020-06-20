# findmynearest parkrun

[![Build Status](https://travis-ci.com/scottbanyard/findmynearest-parkrun.svg?branch=master)](https://travis-ci.com/scottbanyard/findmynearest-parkrun)

A mapping application that allows you to find your nearest parkrun from a given location.

You can visit this application <a href="https://findmynearest-parkrun.firebaseapp.com/" target="\_blank">here</a>.

NOTE: This project is still ongoing!

### TODO:
- ~~Create a field to enter a location and plot on map~~
- ~~Use an existing algorithm to calculate distance between two co-ordinates~~
- ~~Highlight the top 3 parkrun points on the map that are the closest~~
- ~~Create an accessible colour scheme for points~~
- Implement a legend
- ~~Aggregate parkrun feature layer on zoom~~
- ~~Toggle clustering~~
- Create a general config file for URLs and cluster configurations
- ~~Dockerise~~
- (Advanced) Draw a route to get to the parkrun onto the map
- (Advanced) Different modes of transport to consider?

### Docker Instructions
- Clone this repository
- Install Docker and docker-compose
- Retrieve a free Mapbox access token by <a href="https://account.mapbox.com/auth/signup/" target="\_blank">signing up</a>
- Create a file called `.env` in the root of this repository and insert the variable `MAPBOX_TOKEN` with your Mapbox access token (e.g. MAPBOX_TOKEN="example token")
- Run `docker-compose up -d` to spin the app up!

### Development Instructions
- Clone this repository
- Install Node.js
- Run `npm install`
- Retrieve a free Mapbox access token by <a href="https://account.mapbox.com/auth/signup/" target="\_blank">signing up</a>
- Create a file called `.env` in the root of this repository and insert the variable `MAPBOX_TOKEN` with your Mapbox access token (e.g. MAPBOX_TOKEN="example token")
- Run `npm start` to get started!

### Tech Used
- ReactJS
- TypeScript (with TSlint)
- <a href="https://github.com/uber/react-map-gl" target="\_blank">react-map-gl</a> which is a wrapper around Mapbox GL
- <a href="https://github.com/manuelbieh/geolib" target="\_blank">geolib</a> to calculate distances between points
- MaterialUI
- Webpack
- Travis CI/CD
- Docker & docker-compose
