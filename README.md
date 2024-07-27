# Snkr-Cartel API

## Description
Snkr-Cartel API is a web application made with Nodejs that allows users to manage and view a collection of sneakers. The API provides endpoints for creating, reading, updating, and deleting sneaker records in a Firestore database.


## Endpoints
### GET /: Welcome message from the API.
### POST /create: Create a new sneaker record.
### GET /read/all: Retrieve all sneaker records.
### GET /read/:id: Retrieve a sneaker record by its ID.
### POST /update: Update the price of a sneaker by ID.
### DELETE /delete/:id: Delete a sneaker record by its ID.


# Testing with Postman
To test the API endpoints, you can use Postman, a popular API client. Follow these steps:

Install Postman: If you haven't installed Postman, you can download it.

Create a New Request:

Method: Select the HTTP method (e.g., GET, POST).
URL: Enter the endpoint URL (e.g., http://localhost:3001/create).
Set Headers and Body:
Headers: Set the Content-Type to application/json.
Body: For POST and PUT requests, enter the JSON data in the request body.
Send Request: Click on the "Send" button to make the request.

View Response: Check the response section in Postman to see the results.

