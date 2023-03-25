<h3 align="center">
	findmynearest-parkrun
</h3>

<p align="center">
	<strong>
		<a href="https://findmynearest-parkrun.firebaseapp.com/">Website</a>
		•
		<a href="https://www.parkrun.org.uk/">Parkrun</a>
	</strong>
</p>
<p align="center">
	<img
		alt="Build Status"
		src="https://github.com/scottbanyard/findmynearest-parkrun/actions/workflows/firebase-hosting-master.yml/badge.svg?branch=master"></a>
</p>

<p align="center">
	<img src="https://github.com/scottbanyard/findmynearest-parkrun/blob/master/resources/demo.gif">
</p>

## Overview

A geospatial web-application where you can find your nearest parkrun with ease - all you need to do is provide an address.

To learn more about the features of findmynearest-parkrun, take a look at [the website](https://findmynearest-parkrun.firebaseapp.com/).

## Installation and usage

- Install Docker and docker-compose
- Retrieve a free Mapbox access token by <a href="https://account.mapbox.com/auth/signup/" target="\_blank">signing up</a>
- Create a file called `.env` in the root of this repository and insert the variable `MAPBOX_TOKEN` with your Mapbox access token (e.g. `MAPBOX_TOKEN="example token"`)
- Run `docker-compose up -d` to spin the app up!

## Development setup

- Install Node.js (v16.14.2)
- Run `npm ci` to install dependencies correctly
- Retrieve a free Mapbox access token by <a href="https://account.mapbox.com/auth/signup/" target="\_blank">signing up</a>
- Create a file called `.env` in the root of this repository and insert the variable `MAPBOX_TOKEN` with your Mapbox access token (e.g. MAPBOX_TOKEN="example token")
- Run `npm start` to get started!

This runs the web-application using Webpack's development server.

## Technologies

- ReactJS
- TypeScript (with TSlint)
- <a href="https://github.com/uber/react-map-gl" target="\_blank">react-map-gl</a> which is a wrapper around Mapbox GL
- <a href="https://github.com/manuelbieh/geolib" target="\_blank">geolib</a> to calculate distances between points
- MaterialUI
- Webpack
- Travis CI/CD
- Docker & docker-compose
