# Simple Cloud Drive Application

## Overview

This project is a simplified version of Google Drive, allowing users to log in, upload files, and manage them. The application supports file sharing, viewing, renaming, and deleting. It is built using React for the frontend, Node.js for the backend, and MongoDB for the database.

## Features

- User Authentication (Login)
- File Upload (Max size: 5 MB per file)
- View and manage uploaded files
- Maximum storage capacity: 50 MB per user
- Share files with other users by generating links
- View file details and download
- Owner can rename and delete files
- Display content of `.txt` files and images (`.png`, `.jpg`)

## Tech Stack

- **Frontend**: React
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- MongoDB (locally or a MongoDB Atlas account)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/simple-cloud-drive.git
   cd simple-cloud-drive
   ```

2. **Install backend dependencies**

   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

### Configuration

1. **Backend configuration**

   - Create a `.env` file in the `backend` directory with the following content:
     ```env
     PORT=5000
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     ```

2. **Frontend configuration**
   - Create a `.env` file in the `frontend` directory with the following content:
     ```env
     REACT_APP_API_URL=http://localhost:5000/api
     ```

### Running the Application

1. **Start the backend server**

   ```bash
   cd backend
   npm start
   ```

2. **Start the frontend server**

   ```bash
   cd ../frontend
   npm start
   ```

3. **Access the application**
   - Open your web browser and navigate to `http://localhost:3000`

## API Endpoints

### Authentication

- **POST** `/api/auth/login`: Login a user

### File Management

- **GET** `/api/files`: Get a list of user files
- **POST** `/api/files/upload`: Upload a new file
- **GET** `/api/files/:id`: Get file details
- **PUT** `/api/files/:id/rename`: Rename a file
- **DELETE** `/api/files/:id`: Delete a file
- **POST** `/api/files/:id/share`: Share a file with another user

### Usage

1. **Login**

   - Use the login form to access your account.

2. **Upload Files**

   - Click on the "Upload" button and select a file (maximum size: 5 MB).

3. **Manage Files**

   - View your files on the dashboard.
   - Click on a file to see details, rename, or delete it.
   - For text files and images, the content will be displayed.

4. **Share Files**
   - Generate a shareable link and send it to other users.

## Screenshots

### Login Page

![Login Page](screenshots/login.png)

### Dashboard

![Dashboard](screenshots/dashboard.png)

### File Details

![File Details](screenshots/file-details.png)

## License

This project is licensed under the MIT License.

## Contributing

Feel free to submit issues and pull requests. Contributions are welcome!

## Acknowledgements

- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)

## Contact

For any inquiries, please contact [your-email@example.com](mailto:your-email@example.com).
