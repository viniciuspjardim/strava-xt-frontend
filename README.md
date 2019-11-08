# Strava XT - Front-end

Strava XT is a web app that allow you to compare multiple Strava
activities. It uses the Strava V3 API to get the athlete data.

Currently this app can login into Strava using OAuth 2.0
and list the athlete activities like rides, runs, hikes and more.

The user can see the activity info like speed, moving time, distance,
etc. It also plots the GPS data on the map using Google Maps API and
draw the elevation data using Chart.js.

Multiple activities can be selected at the same time. They
are plotted in the same map and in the same charts for comparison.

Comparing the elevation of two rides:
<img src="https://user-images.githubusercontent.com/1520962/68496666-a0a45a00-0231-11ea-84d9-41159fbbec75.png" width="640"> 

This feature helps you to compare the same ride you did twice,
by showing the data side by side, but also give you a perspective on
different rides.

Selecting multiple activities:
<img src="https://user-images.githubusercontent.com/1520962/68496669-a13cf080-0231-11ea-9f28-59048b90015f.png" width="640">

## Features

* Connect to Strava API using OAuth 2 and JWT
* List all your activities and filter by date
* Compare multiple activities
* Draw the GPS data using Google Maps API
* Plot the elevation data using Chart.js
* Single Page Application
* Using Vue.js and reusable components

> The app is in pre-alpha state and is a personal project to learn Vue.js.

> This repository is the front-end part of the app. The back-end can be found [here](https://github.com/viniciuspjardim/strava-xt-backend).

## Gallery

See other images of the app [here](gallery.md).