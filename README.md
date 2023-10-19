# TODO - no design!!!!!!!

node-cache

1.  Create episode page

2.  fix 2 things episode-from-api and season-from-api must be added again and checked
3.  refactor code (another service or 2 if needed and more order also no double code)

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

components:
header
show (with image + favorite button + ...)

export interface Show {
id: number;
name: string;
seasons: Season[];
}

interface Season {
id: string;
number: number;
episodes: Episode[];
}

interface Episode {
id: string;
name: string;
}
