# Parra Node Quickstart

## Installation

From the project root directory run `npm install`

## Usage

#### Node

Run with node: `npm start`

#### Docker

Build the docker image: `docker build -t parra-node-quickstart .`
Run with docker: `docker run -P parra-node-quickstart`
Run with docker (detached): `docker run -d parra-node-quickstart`

## Testing

#### Testing with Jest

Run `npm test`

#### Testing with Docker and Curl

Once you see `Running on port 80`, you can verify the endpoint works by running `curl -X POST http://localhost/v1/parra/auth/token`. Then returned value
