# Project 12 - Working with ExpressJS

## Objective

Over the last two sprints, you built the front end for your "WTWR" project. The back-end projects will focus on creating a server for "WTWR". While working on this, you'll learn how to work with databases, set up security and testing, and deploy your web application on a remote machine. The goal of all this is to create a server with an API and user authorization.

At this stage, you'll:

- Set up an Express project
- Create a database and connect it to the server
- Configure the first routes and controllers

As a stretch goal, you'll refine your application's error handling, but this won't be due until Project 13.

## Project Structure

```
controllers/
  - clothingItems.js    # Functions that define routes for clothing items
  - users.js            # Functions that define routes for users

models/
  - clothingItem.js     # Schema and model for clothing items
  - user.js             # Schema and model for users

routes/
  - clothingItems.js    # Request routing for clothing items
  - index.js            # Main router
  - users.js            # Request routing for users

utils/
  - errors.js           # Error handling utilities

app.js                  # Entry point - Express server configuration
```

## Technologies Used

- Node.js
- Express.js
- ESLint (Airbnb style guide)
- Prettier
- Nodemon
