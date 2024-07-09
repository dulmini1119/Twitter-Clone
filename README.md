# Twitter Clone

Welcome to the "Twitter Clone" project! This repository contains a simple Twitter clone built using React, Vite, Node.js, and MongoDB.

## Overview

This project replicates basic functionalities of Twitter, allowing users to post tweets, view notifications, and manage profiles.

## Features

- User authentication with login and signup functionality.
- Posting tweets and viewing a timeline.
- Notifications for new tweets and interactions.
- User profile management.

## Technologies Used

- React
- Vite
- Node.js
- MongoDB
- Cloudinary (for image handling)

## Getting Started

To explore this project and run the Twitter clone locally, follow these steps:

1. Clone or download this repository to your local machine:
   ```bash
   git clone https://github.com/dulmini1119/twitter-clone.git

2. Navigate to the project directory:
   ```bash
   cd twitter-clone

3. Backend Setup:
   - Navigate to the backend directory:
     ```bash
     cd backend

   - Install backend dependencies:
     ```bash
     npm install

   - Set up environment variables:<br/>
     Create a .env file in the backend directory and add the following:
   ```
      MONGO_URI=your_mongodburi(Add connection string into your application code)
      PORT=5000
      MONGODB_URI=your_mongodb_connection_string
      CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
      CLOUDINARY_API_KEY=your_cloudinary_api_key
      CLOUDINARY_API_SECRET=your_cloudinary_api_secret

4. Frontend Setup:
   - Navigate to the frontend directory:
     ```bash
       cd ../frontend
   - Install frontend dependencies:
     ```bash
       npm install

5. Start the development servers:
   - Start the backend server (from the backend directory):
     ```bash
     npm run dev
   - Start the frontend development server (from the frontend directory):
     ```bash
     npm run dev

6. Open your web browser and go to `http://localhost:3000` to view the Twitter clone.

     


