## # Rebate System

This is a simple service to encourage customers to purchase specific types of organs by offering them additional free organs. The service is designed to read customer orders from CSV files and output the total number of organs the customer is to receive based on the bonus scheme.

## Installation

1. Clone the repository

2. Install dependencies: `npm install`

## Usage

- To run the application in dev mode
  `npm run dev input/order.csv`.
  OR
- To start the app
  `npm start input/order.csv`.

Note : file-path is optional. if you run `npm run dev` , it will run with default order file

## Testing

- To run unit tests, use the following command:
  `npm run test`
  This will run Jest test suites and output test results to the console.
- To run unit tests and get the coverage :
  `npm run test:coverage`

## Technical overview

**Node.js** chosen for this service because it is a fast and lightweight platform that is well-suited for building web services. Here we are using **csv-parse** package for csv file parsing. we are using **jest** for creating tests . The service uses **ESLint** to enforce code quality and consistency

## Solution

The project consists of three main parts :

1.  **app.js**: This module is responsible take the input and finally outputting the results to the console.
2.  **service.js**: This module is responsible for reading customer orders from CSV files, processing the orders, and calculating the final result with a bonus.
3.  **utils**: This part contains utility functionalities like validation, readCSV.

## Design Decisions

The project is designed with the following considerations:

1.  Readability: The code is written to be easily understood and readable by other developers.
2.  Simplicity: The code is designed to be simple and straightforward, without unnecessary complexity.
3.  Separation of Concerns: The code is divided into separate modules with distinct responsibilities to ensure maintainability.
4.  Testability: The code is designed to be easily tested using automated tests and whole tests gives allmost 100% coverage on services file
