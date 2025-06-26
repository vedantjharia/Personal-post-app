# Personal Post App

A full-stack web application that allows users to register, log in, create and manage personal posts, like/unlike posts, and update their profile with a profile picture. The backend is built with **Node.js**, **Express**, and **MongoDB**, while the frontend uses **EJS** templating and **Tailwind CSS** for styling.

---

## Features

- **User Registration & Login:**  
  Secure registration and login system with password hashing using bcrypt and JWT-based authentication.

- **Profile Management:**  
  Users can update their profile information and upload a profile picture.

- **Post Creation & Management:**  
  Authenticated users can create, edit, and delete their own posts.

- **Like/Unlike Posts:**  
  Users can like or unlike posts, with the like count displayed on each post.

- **Responsive UI:**  
  Clean and modern interface styled with Tailwind CSS.

- **Session Management:**  
  JWT tokens are stored in cookies for secure session handling.

---

## Tech Stack

- **Backend:**  
  - Node.js  
  - Express.js  
  - MongoDB & Mongoose  
  - JWT for authentication  
  - Bcrypt for password hashing  
  - Multer for file uploads

- **Frontend:**  
  - EJS templating  
  - Tailwind CSS

---

## Getting Started

### Prerequisites

- Node.js and npm installed
- MongoDB installed and running

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/<your-username>/<repo-name>.git
   cd <repo-name>
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Set up environment variables:**  
   Create a `.env` file for sensitive data (if needed, e.g., JWT secret, MongoDB URI).

4. **Start the server:**
   ```sh
   node app.js
   ```
   The app will run on [http://localhost:3000](http://localhost:3000).

---

## Folder Structure

```
backend2 (personal post app)/
│
├── models/
│   ├── user.js
│   └── post.js
├── config/
│   └── multerconfig.js
├── public/
│   └── (static files)
├── views/
│   ├── index.ejs
│   ├── login.ejs
│   ├── profile.ejs
│   └── profile_update.ejs
├── app.js
└── package.json
```

---

## Usage

- **Register:**  
  Go to `/` and fill out the registration form.

- **Login:**  
  Go to `/login` and enter your credentials.

- **Profile:**  
  After logging in, access your profile at `/profile` to view and manage your posts.

- **Create/Edit Posts:**  
  Use the profile page to create new posts or edit existing ones.

- **Upload Profile Picture:**  
  Go to `/profile/upload` to upload or update your profile picture.

---

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## License

This project is licensed under the MIT License.
