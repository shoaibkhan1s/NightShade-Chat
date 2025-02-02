# NightShade Chat Application

A sleek and stylish chat application with a vibrant UI that allows users to communicate seamlessly. The project is built using Node.js, Express, and EJS template engine.

## Features

- Interactive chat interface with sent and received message differentiation
- User type selection for messaging
- Scrollable chat view
- Edit and delete message options
- Smooth animations for a polished user experience

## Prerequisites

Ensure that you have the following installed:

- Node.js (v14 or higher)
- npm (Node Package Manager)

## Setup Instructions

1. **Clone the Repository:**

   ```bash
   git clone <repository-url>
   cd NightShade-Chat
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Environment Variables:** Create a `.env` file in the root directory and add the following variables:

   ```env
   PORT=3000
   CORS_ORIGIN=* //Allow all domains
   ```

4. **Start the Server:**

   ```bash
   node index.js
   ```

   The application will be accessible at `http://localhost:3000`

## Project Structure

```
NightShade-Chat
├── public
├── routes
├── views
│   └── index.ejs
├── app.js
└── package.json
```

## Sample API Requests

### 1. POST `/messages`

**Description:** Send a new message.

**Request Body:**

```json
{
  "message": "Hello, World!",
  "sentFrom": "Shoaib",
  "sentTo": "Kevin"
}
```

**Response:**

```json
{
  "status": "success",
  "message": "Message sent successfully."
}
```

### 2. DELETE `/message/:id`

**Description:** Delete a specific message by its ID.

**Request:**

```bash
DELETE /message/1
```

**Response:**

```json
{
  "status": "success",
  "message": "Message deleted successfully."
}
```

### 3. GET `/messages`

**Description:** Retrieve all chat messages.

**Response:**

```json
[
  {
    "message": "Hello, World!",
    "sentFrom": "Shoaib",
    "sentTo": "Kevin",
    "instance": "2025-02-01T14:00:00.000Z"
  }
]
```

## Scripts

- **Start the server:**
  ```bash
  node index.js
  ```

## Dependencies

- Express
- EJS
- Cors
- Dotenv
- Method-Override

## Notes

Ensure that the user dropdown options (`sentFrom` and `sentTo`) do not allow the same user to send a message to themselves by design.

