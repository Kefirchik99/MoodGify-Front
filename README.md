# MoodGify - Front-End

This is the front-end of the MoodGify web application, built with React.js and Vite. It allows users to log their moods, receive GIF suggestions based on their mood, and track their mood history. The front-end interacts with Firebase for authentication and Firestore for data storage.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

## Features

- Log moods and retrieve mood history.
- Suggest GIFs based on the user's mood.
- Firebase authentication (Google and Email/Password).
- Responsive design.

## Technologies

- **React.js** (via Vite)
- **Firebase** (Authentication, Firestore)
- **Giphy API** (for GIF suggestions)
- **SCSS** (for styling)

## Getting Started

To get the project up and running locally, follow these steps.

### Prerequisites

- [Node.js](https://nodejs.org/) (version 16.x or higher)
- npm or yarn installed globally
- A GitHub account

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/moodgify-frontend.git
    cd moodgify-frontend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Run the development server:

    ```bash
    npm run dev
    ```

4. Open `http://localhost:3000` in your browser.

## Project Structure

```plaintext
frontend/
├── public/               # Static assets
├── src/
│   ├── assets/           # Images, icons, etc.
│   ├── App.jsx           # Main App component
│   ├── firebase.js       # Firebase configuration
│   ├── index.css         # Global styles
│   └── main.jsx          # Application entry point
├── .gitignore            # Ignore node_modules and build files
├── package.json          # Project dependencies
├── vite.config.js        # Vite configuration
└── README.md             # Project documentation
Environment Variables
You need to set up a .env file in the root of the frontend/ folder with the following keys:

env
Copy code
VITE_API_URL=http://localhost:5000
VITE_GIPHY_API_KEY=your_giphy_api_key_here
Contributing
Fork the project.
Create a new branch for your feature: git checkout -b feature/AmazingFeature.
Commit your changes: git commit -m 'Add some AmazingFeature'.
Push to the branch: git push origin feature/AmazingFeature.
Open a pull request.

License
This project is licensed under the MIT License. See LICENSE for details.
