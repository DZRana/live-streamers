# Live Streamers

A Twitch clone built with React that allows for the user to log in using their Twitch credentials, providing them with a list of their live followed streamers, the streamer's live stream, and their stream chat. The list will update at a set interval, updating each streamer's viewer count, any change in title, and adding new streamers who they follow that come online to the list.

## Live Demo

https://dzrana.github.io/live-streamers/

#### Sample:

![Live Streamers Demo](demo/l-s_demo.gif)

## Purpose

#### Overview:

I chose to build a Twitch clone as it was a great example of a single-page application that also used `OAuth authentication` to access its API and the logged in user's data.

#### Challenges:

Having never worked with `OAuth 2.0` before, I needed to figure out the step-by-step process of how exactly I would go from having the user log in through Twitch to then using what the request sent back to me to query the API. This app doesn't use a server so, after doing some research and going through their API's documentation, I found that I could use their `OAuth implicit code flow` procedure to do just that. At first, I found myself building arbitrary components to run tests with my API queries, but I later turned to `Postman`. This made it so much easier to test my queries, and I have found it to be essential when working with APIs.

#### Conclusion:

Using React to build out the Twitch clone was perfect as the site's functionality lent itself to it. I learned a lot about how `OAuth 2.0` worked and the flow from authentication to API access, as well as how invaluable `Postman` is to testing APIs.
