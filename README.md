# TODO

# options:

## api

- implement search route

## ui

- fix resolver needs to be a function (check deprecated)

- search by name - every keystroke, from second character, call api get to search (api+ui)

- responsive in other pages , show page already with episodes of first season

- when going to previous page i want episodes from the same season i just entered the episode from
  season 1 press episode 1 --> go to episode 1 of first season
  pressing back --> show all episodes of same season (1 in that case)

## later

- transfter to nestjs
- add authentication (access token, refresh token, jwt)

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

pages:
home
show
profile
login / register
