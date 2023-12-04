# TODO

# options:

## api

- add base route of api (make more sense) /api
- add jwt auth
- make few shows filters to use in the links

## ui

- authentication users (access token & refresh token(node-cache) )

- responsive in other pages

- fix phone display

- make few shows filters to use in the links

## later

- transfter to nestjs
- add authentication (access token, refresh token, jwt)

https://www.section.io/engineering-education/how-to-build-authentication-api-with-jwt-token-in-nodejs/
https://www.npmjs.com/package/jsonwebtoken

login / register:
create refresh token for unlimited time - return this in response and saved in MongoDB
create access token for 15 minutes - return this in response

every other api call:
bring access token and validate it

every 15 minutes:
bring valid refresh token
create access token for 15 minutes - return this in response

DB RefreshToken:
used: number

### ==================================================================================

# General planning

## route shows

shows - all shows

shows/id - specific show

shows/id/seasons - specific show seasons -->

## route seasons

seasons/id/episodes all episodes of specific season

## route episodes

episode/id specific episode

## DB:

JSON - best if we need fast development and we don't realy care
or
mongoDB - best if we want to do best practice

## Cache:

redis - best if we want to store cache of data (not so good if the data is based on the user)
node-cache

pages:
home
show
episode
profile

popups:
login / register
