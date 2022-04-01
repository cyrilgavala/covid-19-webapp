# [Covid-19 webapp](https://covid-19-webapp.vercel.app)
## Introduction
This app was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and its source code can be found **[here](https://github.com/cyrilgavala/covid-19-webapp)**.

This is a simple React application containing various visualizations of simple Covid-19 data, which are 
web-scrapped from **[https://korona.gov.sk](https://korona.gov.sk)** using web-scrap application. Its source code 
can be found **[here](https://github.com/cyrilgavala/covid-19-web-scrap)**. Data are stored in cloud MongoDB 
database and there is a simple API for data retrieval. Repo for that API can be found 
**[here](https://github.com/cyrilgavala/covid-19-api)**.

## Content of application
### Summary stats
First element of the page are summary stats with daily difference according the previous day.

### Graphs
Second element of the page are graphs visualising retrieved data.
- First graph shows **positive percentage** of the PCR tests for every day.
- Second graph contains data about amount of PCR tests and amount of those confirmed as positive for every day.
- Third, and last graph, contains data about deaths caused by Covid-19.

## How to run
It's simple. Just run ```npm start``` from root directory in the command line.
