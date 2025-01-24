# URL Shortener

A simple URL shortener application built with Node.js, Express, and a JSON-based data store.

## Features

- **Shorten URLs**: Convert long URLs into short, easy-to-share links.
- **Custom Short Codes**: Optionally provide a custom short code for your URL.
- **Redirect**: Access the original URL by visiting the shortened link.
- **CRUD Operations**: Create, read, update, and delete shortened links.
- **Persistent Storage**: Links are stored in a JSON file (`data.json`) for persistence.

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/pr0G-alt/URL-Shortener.git
   cd URL-Shortener
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Run the server**:

   ```bash
   npm start
   ```

   The server will start on port `3000`. You can access it at `http://localhost:3000`.

## API Endpoints

### 1. **Get All Links**

- **Endpoint**: `GET /getAllLinks`
- **Description**: Retrieve all shortened links.
- **Response**:
  ```json
  {
    "status": "success",
    "results": 2,
    "data": {
      "links": [
        {
          "shortCode": "xyz123",
          "url": "https://example.net",
          "createdAt": "2025-01-23T12:00:00.000Z",
          "updatedAt": "2025-01-23T12:00:00.000Z"
        },
        {
          "shortCode": "abc123",
          "url": "https://example.com",
          "createdAt": "2025-01-24T12:00:00.000Z",
          "updatedAt": "2025-01-24T12:00:00.000Z"
        }
      ]
    }
  }
  ```

### 2. **Get a Specific Link**

- **Endpoint**: `GET /getLink/:shortCode`
- **Description**: Retrieve details of a specific shortened link by its short code.
- **Response**:
  ```json
  {
    "status": "success",
    "data": {
      "link": {
        "shortCode": "abc123",
        "url": "https://example.com",
        "createdAt": "2025-01-24T12:00:00.000Z",
        "updatedAt": "2025-01-24T12:00:00.000Z"
      }
    }
  }
  ```

### 3. **Shorten a URL**

- **Endpoint**: `POST /shorten`
- **Description**: Create a new shortened link.
- **Request Body**:
  ```json
  {
    "url": "https://example.com",
    "shortCode": "abc123" // Optional
  }
  ```
- **Response**:
  ```json
  {
    "status": "success",
    "data": {
      "link": {
        "shortCode": "abc123",
        "url": "https://example.com",
        "createdAt": "2025-01-24T12:00:00.000Z",
        "updatedAt": "2025-01-24T12:00:00.000Z"
      }
    }
  }
  ```

### 4. **Redirect to Original URL**

- **Endpoint**: `GET /:shortCode`
- **Description**: Redirect to the original URL associated with the short code.
- **Response**: Redirects to the original URL.

### 5. **Update a Link**

- **Endpoint**: `PATCH /:shortCode`
- **Description**: Update the URL or short code of an existing link.
- **Request Body**:
  ```json
  {
    "url": "https://newexample.com", // Optional
    "shortCode": "newcode" // Optional
  }
  ```
- **Response**:
  ```json
  {
    "status": "success",
    "data": {
      "link": {
        "shortCode": "newcode",
        "url": "https://newexample.com",
        "createdAt": "2025-01-24T12:00:00.000Z",
        "updatedAt": "2025-01-24T12:30:00.000Z"
      }
    }
  }
  ```

### 6. **Delete a Link**

- **Endpoint**: `DELETE /:shortCode`
- **Description**: Delete a shortened link by its short code.
- **Response**:
  ```json
  {
    "status": "success",
    "data": null
  }
  ```

## Data Storage

All shortened links are stored in a JSON file (`data.json`) located in the `data` directory. This file is automatically updated whenever a link is created, updated, or deleted.

## Contact

If you have any questions, suggestions, or issues, feel free to reach out:

- **Email**: pr0.G@outlook.com
- **GitHub**: [pr0G-alt](https://github.com/pr0G-alt)
- **LinkedIn**: [Youssef Tawakal](https://www.linkedin.com/in/yousseftawakal/)
