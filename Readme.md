

## Pre-requisites

- Install [Node.js](https://nodejs.org/en/) version latest
- [Install and run MongoDB](https://www.mongodb.com/docs/manual/installation/) on your system. This repo works on an instance running on `localhost:27017`

## Environment vars

`DB_ADDRESS=mongodb://127.0.0.1:27017/`
`DB_NAME=population`

## Installation

- Install dependencies: `npm install`

# Data population

- To download files from s3 bucket `aws s3 cp s3://backend-assignment . --recursive`
- Place your downloaded files in below folder structures
    - Place all the state geo json files in data/states folder
    - Place the people file in data/peoples folder
- Execute data/scripts in below order
    - `node ./states.js`
    - `node ./individual.js`
- Open the mongodb client and execute data/scripts/indexes.sql
- Check the mongodb if records are fully populated before proceeding to next step

# Start the appliction in dev server

- Run in DEV environment : `npm run dev`

# Swagger url

- http://localhost:8001/swagger/#/

# API testing

- State API testing : `http://localhost:8001/api/states`
- People API testing : `http://localhost:8001/api/peoples?state_id={6500921dc73bd5d3bbf47e75}` - id from above api
- To import in postman please use Population.postman_collection.json file

# Outputs

- Outputs can be viewed at data/outputs folder

# Build docker image

- Building the image: `docker build -t {repo name}:{image name}/{version} .`

# Running the application

The application is built with Node.js and already has all environment configured with docker. To start the application you will need `docker` and `docker-compose` installed on the machine. Having that you may run:

```shell
docker-compose up -d
```

# Kubernetes deployment

Note : You need an existing cluster to run this step and that cluster should be accessible where you execute below command. it should have "population-analysis" namespace created

```shell
sh system/deploy.sh
```
