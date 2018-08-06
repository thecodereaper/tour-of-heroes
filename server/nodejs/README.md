# tour-of-heroes-tutorial

## Getting started

cd server/nodejs

touch .env

```
add the following into the .env file:

# Environment
NODE_ENV = development
PORT = 3001

# API
API_TITLE = Heroes API
API_DESCRIPTION = The Heroes API decription.
API_VERSION = v1.0
API_ROUTE_PREFIX = api
API_DOCUMENT_PATH = docs

# CosmosDB
COSMOSDB_HOST = https://your-host-name-for-cosmosDB/
COSMOSDB_AUTH_KEY = your-auth-key-for-cosmosDB
COSMOSDB_DATABASE = HeroesDB
```

```
Setup cosmosDB:

- Create database HeroesDB
- Create collection Heroes
```

npm install
npm start

## server

### Setup

```
mkdir server && cd server
npm init
tsc --init
tslint --init
```

### project dependencies

```
npm install body-parser --save
npm install class-validator --save
npm install documentdb --save
npm install dotenv --save
npm install reflect-metadata --save
npm install rxjs --save
npm install @nestjs/common --save
npm install @nestjs/core --save
npm install @nestjs/microservices --save
npm install @nestjs/swagger --save
npm install @nestjs/websockets --save
npm install class-transformer --save
npm install module-alias --save
```
### dev dependencies

```
npm install @types/body-parser --save-dev
npm install @types/documentdb --save-dev
npm install @types/dotenv --save-dev
npm install @types/node --save-dev
npm install tslint --save-dev
npm install typescript --save-dev
```

Validation pipe reference
https://github.com/nestjs/nest/blob/master/examples/01-cats-app/src/common/pipes/validation.pipe.ts
