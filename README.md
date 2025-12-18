#Fullstack Optio App (Vite + Express + TypeScript)

This project is a social web app that allows your friends to vote on your polls

The frontend is built using React with TypeScript and Vite for fast development and optimized production builds. Material UI is used for the user interface, React Router handles client-side routing, Axios is used for HTTP requests, and forms are handled using React Hook Form with Zod for validation.

The backend is built with Node.js and Express using TypeScript. MongoDB is used as the database with Mongoose as the ODM. Authentication is handled using JSON Web Tokens (JWT), request validation is done with Zod, and file uploads are supported via AWS S3. CORS and dotenv are used for environment configuration and cross-origin support.

The project is structured as a single repository with a frontend folder containing the Vite React application and a backend folder containing the Express API.

To run the project locally, install dependencies `npm install` and start the development servers using `npm run dev`. The frontend will be available at http://localhost:5173 and the backend at http://localhost:5000.
