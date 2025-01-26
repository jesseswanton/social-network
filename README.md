# 17 NoSQL: Social Network API

This is an API for a social media network built using Express.js, MongoDB, and Mongoose.

It allows users to create accounts, post thoughts, interact with other users by adding friends, and react to thoughts.

## Table of Contents

- [Installation](#installation)
- [API Routes](#api-routes)
- [Seed the Database](#seed-the-database)

## Installation

Requires the following:
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/try/download/community)

1. Clone the repository:
    ```bash
    git clone git@github.com:jesseswanton/social-network.git
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the application:
    ```bash
    npm run start
    ```

### Users Routes

You can test the following routes with [Insomnia](https://insomnia.rest/):

Example: http://localhost:3000/api/users
3000 is the port where your server is running.

**[Walkthrough video](https://drive.google.com/file/d/1htGrLKGh-LXch3HX2rFbj36_H6EIfhv1/view?usp=sharing)**


- **GET `/api/users`**: Retrieve all users.
- **GET `/api/users/userId`**: Retrieve a specific user by ID.
- **POST `/api/users`**: Create a new user.
- **PUT `/api/users/userId`**: Update a user by ID.
- **DELETE `/api/users/userId`**: Delete a user by ID.

### Friendship Routes

- **PUT `/api/users/userId/friends/friendId`**: Add a friend to the user's friend list.
- **DELETE `/api/users/userId/friends/friendId`**: Remove a friend from the user's friend list.

### Thoughts Routes

- **GET `/api/thoughts`**: Retrieve all thoughts.
- **GET `/api/thoughts/thoughtId`**: Get a thought by ID.
- **POST `/api/thoughts`**: Create a new thought.
- **PUT `/api/thoughts/thoughtId`**: Update a thought by ID.
- **DELETE `/api/thoughts/thoughtId`**: Delete a  thought by ID.

### Reactions Routes

- **POST `/api/thoughts/thoughtId/reactions`**: Add a reaction to a specific thought.
- **DELETE `/api/thoughts/thoughtId/reactions/reactionId`**: Delete a reaction from a specific thought.


## Seed the Database

You can seed the database with initial data using the `seed.js` script.

1. Run the seeding script:
    ```bash
    npm run seed
    ```
