## Storing the Mapbox Token in TravisCI

We needed to store the Mapbox Token as an environment variable in TravisCI such that it can be used during build time. React uses a `.env` file to set environment variables.

### Instructions
- Install the Travis CLI
- Run the following command to encrypt the environment variable with TravisCI's public key - `travis encrypt "MAPBOX_TOKEN=<TOKEN>" --add --com`
- This command will add a env.global.secure environment variable to the `.travis.yml` file
- The TravisCI build will export and set this environment variable at the start - decrypting it using TravisCI's private key stored on their servers
- TravisCI will exporting the environment variable at system level e.g. `export MAP_TOKEN=<token>`, but this is not ingested by React at build time
- Therefore, using TravisCI's scripting functionality we can run a command to create a `.env` file and place the `MAP_TOKEN` environment variable inside, e.g. `echo MAP_TOKEN=$MAP_TOKEN >> .env`
- The `MAP_TOKEN` environment variable will then be bundled inside the React app at build time
