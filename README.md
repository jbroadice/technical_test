
# Technical Test
## Requirements
- Node ~14.0.0
- Linux / mac OS
## Installation

 - Install dependencies using `npm install`
 - Modify `.env` with your database credentials
 - Install the DB schema, and seed the data using `npm run db:init`
 - Build and run the application using `npm run build && npm run start`
 - Visit http://localhost:3000

  

## Tasks

1. Create an Application that connects to MySQL

2. Create a routine that receive: Range Date, Status and Location (The fields must be optional to the final user) and return the list of invoices with the following information: Location name, date, status and total invoice value.

3. Create a routine that receive the location id and return the sum of invoice values grouped by status.

4. Create a simple list page to show the result

  

## Info

- The structure or the DB with some examples can be find on /dump

- Use the framework of your preference

- Submit your code via pull request

- List on README.md all files with your own code

  

Good luck :)
