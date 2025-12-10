# Project 12 - working with ExpressJS

## Objective
Over the last two sprints, you built the front end for your "WTWR" project. The back-end projects will focus on creating a server for "WTWR". While working on this, you'll learn how to work with databases, set up security and testing, and deploy your web application on a remote machine. The goal of all this is to create a server with an API and user authorization.

At this stage, you'll:

- Set up an Express project
- Create a database and connect it to the server
- Configure the first routes and controllers

As a stretch goal, you'll refine your application's error handling, but this won't be due until Project 13.

## Project Structure
```
├── controllers/                # Route handlers
│   ├── clothingItems.js
│   └── users.js
├── middlewares/            # Custom middleware
│   └── auth.js
├── models/                   # Data schemas and models
│   ├── clothingItem.js
│   └── user.js
├── routes/                     # API routes
│   ├── clothingItems.js
│   ├── users.js
│   └── index.js
├── utils/                        # Utility functions
│   ├── config.js
│   └── errors.js
├── .editorconfig             # Editor configuration
├── .env                        # Environment variables
├── .eslintrc.js                # ESLint configuration
├── .gitignore                 # Git ignore rules
├── app.js                      # Application entry point
├── package.json            # Project dependencies
└── README.md             # Project documentation
```

## Running the Project
`npm run start` — to launch the server 

`npm run dev` — to launch the server with the hot reload feature

### Testing
Before committing your code, make sure you edit the file `sprint.txt` in the root folder. The file `sprint.txt` should contain the number of the sprint you're currently working on. For ex. 12

## API Documentation

Base URL: `http://localhost:3001`

### Users

#### Get All Users
Retrieves a list of all users in the database.

**Endpoint:** `GET /users`

**Request:**
- Method: GET
- Headers: None required
- Body: None

**Response (200 OK):**
```json
[
  {
    "_id": "6093136c5834af58c5b64606",
    "name": "Billy Boy",
    "avatar": "http://tcap.pbworks.com/f/1435170286/myAvatar.png",
    "__v": 0
  }
]
```

**Error Responses:**
- `500 Internal Server Error` - Database error

---

#### Get User by ID
Retrieves a specific user by their ID.

**Endpoint:** `GET /users/:userId`

**Request:**
- Method: GET
- Headers: None required
- Body: None
- URL Parameters: `userId` - MongoDB ObjectId of the user

**Example:** `GET /users/6093136c5834af58c5b64606`

**Response (200 OK):**
```json
{
  "_id": "6093136c5834af58c5b64606",
  "name": "Billy Boy",
  "avatar": "http://tcap.pbworks.com/f/1435170286/myAvatar.png",
  "__v": 0
}
```

**Error Responses:**
- `404 Not Found` - User not found
- `500 Internal Server Error` - Database error

---

#### Create User
Creates a new user in the database.

**Endpoint:** `POST /users`

**Request:**
- Method: POST
- Headers: `Content-Type: application/json`
- Body:
```json
{
  "name": "John Doe",
  "avatar": "https://example.com/avatar.jpg"
}
```

**Field Requirements:**
- `name` (required): String, 2-30 characters
- `avatar` (required): String, must be a valid URL

**Response (201 Created):**
```json
{
  "_id": "6093136c5834af58c5b64607",
  "name": "John Doe",
  "avatar": "https://example.com/avatar.jpg",
  "__v": 0
}
```

**Error Responses:**
- `400 Bad Request` - Invalid data (missing fields, invalid URL, name too short/long)
- `500 Internal Server Error` - Database error

---

### Clothing Items

#### Get All Items
Retrieves a list of all clothing items in the database.

**Endpoint:** `GET /items`

**Request:**
- Method: GET
- Headers: None required
- Body: None

**Response (200 OK):**
```json
[
  {
    "_id": "6093136c5834af58c5b64608",
    "name": "Winter Jacket",
    "weather": "cold",
    "imageUrl": "https://example.com/winter-jacket.jpg",
    "owner": "6093136c5834af58c5b64606",
    "likes": [],
    "createdAt": "2025-12-05T16:30:00.000Z",
    "__v": 0
  }
]
```

**Error Responses:**
- `500 Internal Server Error` - Database error

---

#### Create Item
Creates a new clothing item in the database.

**Endpoint:** `POST /items`

**Request:**
- Method: POST
- Headers: `Content-Type: application/json`
- Body:
```json
{
  "name": "Winter Jacket",
  "weather": "cold",
  "imageUrl": "https://example.com/winter-jacket.jpg"
}
```

**Field Requirements:**
- `name` (required): String, 2-30 characters
- `weather` (required): String, must be one of: `"hot"`, `"warm"`, `"cold"`
- `imageUrl` (required): String, must be a valid URL

**Note:** The `owner` field is automatically set from the authenticated user (currently hardcoded).

**Response (201 Created):**
```json
{
  "_id": "6093136c5834af58c5b64608",
  "name": "Winter Jacket",
  "weather": "cold",
  "imageUrl": "https://example.com/winter-jacket.jpg",
  "owner": "6093136c5834af58c5b64606",
  "likes": [],
  "createdAt": "2025-12-05T16:30:00.000Z",
  "__v": 0
}
```

**Error Responses:**
- `400 Bad Request` - Invalid data (missing fields, invalid URL, invalid weather type)
- `500 Internal Server Error` - Database error

---

#### Delete Item
Deletes a clothing item by its ID.

**Endpoint:** `DELETE /items/:itemId`

**Request:**
- Method: DELETE
- Headers: None required
- Body: None
- URL Parameters: `itemId` - MongoDB ObjectId of the item

**Example:** `DELETE /items/6093136c5834af58c5b64608`

**Response (200 OK):**
```json
{
  "message": "Item deleted successfully"
}
```

**Error Responses:**
- `404 Not Found` - Item not found
- `500 Internal Server Error` - Database error

---

#### Like Item
Adds the current user to the item's likes array.

**Endpoint:** `PUT /items/:itemId/likes`

**Request:**
- Method: PUT
- Headers: None required
- Body: None
- URL Parameters: `itemId` - MongoDB ObjectId of the item

**Example:** `PUT /items/6093136c5834af58c5b64608/likes`

**Note:** The user is automatically determined from the authenticated session (currently hardcoded). A user can only like an item once.

**Response (200 OK):**
```json
{
  "_id": "6093136c5834af58c5b64608",
  "name": "Winter Jacket",
  "weather": "cold",
  "imageUrl": "https://example.com/winter-jacket.jpg",
  "owner": "6093136c5834af58c5b64606",
  "likes": ["6093136c5834af58c5b64606"],
  "createdAt": "2025-12-05T16:30:00.000Z",
  "__v": 0
}
```

**Error Responses:**
- `404 Not Found` - Item not found
- `500 Internal Server Error` - Database error

---

#### Unlike Item
Removes the current user from the item's likes array.

**Endpoint:** `DELETE /items/:itemId/likes`

**Request:**
- Method: DELETE
- Headers: None required
- Body: None
- URL Parameters: `itemId` - MongoDB ObjectId of the item

**Example:** `DELETE /items/6093136c5834af58c5b64608/likes`

**Note:** The user is automatically determined from the authenticated session (currently hardcoded).

**Response (200 OK):**
```json
{
  "_id": "6093136c5834af58c5b64608",
  "name": "Winter Jacket",
  "weather": "cold",
  "imageUrl": "https://example.com/winter-jacket.jpg",
  "owner": "6093136c5834af58c5b64606",
  "likes": [],
  "createdAt": "2025-12-05T16:30:00.000Z",
  "__v": 0
}
```

**Error Responses:**
- `404 Not Found` - Item not found
- `500 Internal Server Error` - Database error

---

## Testing with Postman

1. **Start the server:** Run `npm run dev` in your terminal
2. **Import requests:** Create a new collection in Postman
3. **Set base URL:** Use `http://localhost:3001` as the base URL
4. **Test endpoints:** Follow the API documentation above for each endpoint

### Example Testing Flow:
1. Create a user: `POST /users`
2. Copy the user's `_id` from the response
3. Update the hardcoded user ID in `app.js` with your user's `_id`
4. Restart the server
5. Create clothing items: `POST /items`
6. Get all items: `GET /items`
7. Like an item: `PUT /items/:itemId/likes`
8. Unlike an item: `DELETE /items/:itemId/likes`
9. Delete an item: `DELETE /items/:itemId`

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
PORT=3001
MONGODB_USER=your_mongodb_username
MONGODB_PASSWORD=your_mongodb_password
MONGODB_URI=your_mongodb_connection_string
```

**Note:** The `.env` file is already in `.gitignore` and will not be committed to version control.
