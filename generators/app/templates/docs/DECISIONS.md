# DECISIONS #

In this document we've described the decisions we made regarding certain problems when it comes to this boiler plate.

### We agreed we'll use Fluxible-Router for our routing ###

**Why:** because Fluxible-Router works out of the box with Fluxible/React. It is fairly easy to make the app isomorphic and to make sure the correct actions are being triggered when entering a route.
**Alternatives:** we did consider react-router for a while, but concluded that we need to spend more time using both routers to make the "perfect" decision.
**Risks:** find out that react-router solves some problems we couldn't define at the time of the decision, leading to a rewrite of our router.js, server.js and all components that use links.
