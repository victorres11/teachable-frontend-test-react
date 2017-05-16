# teachable frontend test
## Assignment Requirements:

They want to be able to search the API and have the relevant gems show with the description of them, and links to their listed dependencies within this interface.

They want to be able to keep track of “favorites.” This means:

Adding search results to their favorites.

Reviewing their favorites and removing ones they no longer want.

Localstorage is fine for storage.


# Result:

This is hosted on Heroku and you can visit the working example via https://stark-ravine-30041.herokuapp.com/


![alt-text](https://d2ppvlu71ri8gs.cloudfront.net/items/2D2U2Q1R0U1s0D3i2A2s/Screen%20Recording%202017-05-15%20at%2009.18%20PM.gif?v=2198b3eb "Ruby Search API Example")

## Files of Interest:

`app/components/...`: Individual components and containers for front-end UI.

`styles/components/...`: Individual styles for components

`app/server/app.py`: Initializes app and makes index available. Also handles the api request to rubygems.org and handles CORS issues.
