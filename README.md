# Blog System

This project demonstrates a basic blogging platform built with **Express**, **EJS** templates and **MongoDB** via `mongoose`.

## Features

- User registration and login stored in a cookie‑based session.
- Create, edit and delete articles.
- Leave comments on blog posts.
- Simple MongoDB schemas located in `lib/db.js`.

## Running

Install dependencies with `npm install` and start the server with `npm start`.
The application listens on port `3000` by default.

## Docker

You can run the project along with a MongoDB instance using Docker Compose.

```bash
docker-compose up --build
```

This will start the blog on port `3000` and a MongoDB database stored in the
`mongo-data` volume.

