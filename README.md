# findmynearest parkrun

A mapping application that allows you to find your nearest parkrun from a given location.

You can visit this application <a href="https://findmynearest-parkrun.firebaseapp.com/" target="_blank">here</a>. 

NOTE: This project is still ongoing!

### TODO:
- Field to enter a location / retrieve current location from browser
- Algorithm to calculate distance between two co-ordinates
- Highlight the parkrun point on the map that is the closest (by walking)
- (Advanced) draw a route to get to the parkrun onto the map
- (Advanced) Different modes of transport to consider?

### Instructions
- Clone this repository
- Ensure you have Node.js installed (with npm)
- Run `npm install`
- Request a free Mapbox access token by <a href="https://account.mapbox.com/auth/signup/" target="_blank">signing up</a>
- Create a file called `.env` in the root of this repository
- Open the `.env` file and insert the variable `MAPBOX_TOKEN` with your Mapbox access token (e.g. MAPBOX_TOKEN="example token")
- Run `npm start` to get started!

### Tech Used
- ReactJS
- TypeScript (with TSlint)
- <a href="https://github.com/uber/react-map-gl" target="_blank">react-map-gl</a> which is a wrapper around Mapbox GL
- MaterialUI
- Webpack
- Husky (Git hooks)
