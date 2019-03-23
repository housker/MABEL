# MABEL

![Imgur](https://i.imgur.com/v7VJa68.png)

> [Data visualization and e-contracts to connect local farmers to markets](https://housker.github.io/)


Note: The following organizes what I hope to achieve, though many of these features are a work in progress. Mabel aspires to provide farmers with the kind of information they need to develop local markets. It uses climate, species, and soil data, as well as satellite imagery to predict yield. It also uses economic indicators, commodity prices and futures to predict revenue. It utilizes third-party payment systems and e-contracts to facilitate and track user-specific transactions.


### How It Works

Using an interactive Leaflet map in the Angular6 UI, users plot the allocation of their land parcels. Suggestions are provided based on three factors: user's crop rotation history, yield forecasts for specific crops in that region, and prices for spot and futures for each crop or commodity. A deep learning framework comprising Long-short Term Memory (LSTM) for yield forecast, Convolutional Neural Network (CNN) for mean yield, and Gaussian Process (GP) for error correction predicts a rate of return (yield in bushels per acre) which can then be multiplied by the user's land allocations. Continual improvement of forecasts' accuracy is built in through suppliers' selling history and correlations derrived from APIs for climate (World Bank's Climate Data) and soil (Soilgrids). 


Neighbors' activities are visible in a calendar styled to indicate the week's weather conditions, as are the shipping routes in the map, and the bids and asks of all buyers and suppliers in the area. This permits the coordination and pooling resources if desired, and live updates to planned delivery routes.


The creation of spot and futures contracts (subject to review) are triggered when bid and ask prices in the ledgerbook overlap. This ledgerbook is maintained in a PostgreSQL databse enabled with PostGIS for geolocation-dependent calculations. The ledgerbook is cached for scalable, quick access to live updates during market hours. These contracts can be fulfilled through the Paypal API.


Each feature lends itself to a microservices architecture programmed in Golang.


### How To Use It

Ensure you have installed Angular CLI, Go, and PostgreSQL.

Create a database named "mabel" with the CREATE DATABASE command, and from the mabel/database directory run the following, replacing "adellehousker" with your username:
```
$ psql -U adellehousker -d mabel < schema.sql
```

From mabel/client directory run:
```
$ ng build --deploy-url /static/
```

From the root directory start the server:
```
$ go build
$ ./mabel
```


### Test

```
$ ng test
```


### What Works

+ Leaflet map
+ Go routing
+ PostgreSQL schema

### What Doesn't Work

+ gRPC Microservices
+ APIs
+ Jenking CI/CD and Kubernetes

### Contributing

This application is still in its earliest stages, but can easily be seperated into microservices:

+ Yield prediction
+ Payments
+ Route Logistics

### License

Mabel is licensed under the MIT License. See LICENSE for more information.
