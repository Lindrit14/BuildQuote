Sure, here's a README for your project:

---

# Invoice Management System

## Overview

The Invoice Management System is a web application designed to help users create and manage offers ("Angebote") and invoices ("Rechnungen"). The system allows users to create new documents, edit existing ones, and convert offers into invoices. The application also includes user management features, allowing users to update their profile information.

## Features

- **Create Offers and Invoices**: Users can create new offers and invoices with detailed information about the client, project, and items.
- **Edit Documents**: Users can edit existing offers and invoices.
- **Convert Offers to Invoices**: Easily convert an offer into an invoice.
- **User Management**: Users can update their profile information.
- **PDF Generation**: Save offers and invoices as PDF files.

## Technologies Used

- **Frontend**: React, TailwindCSS
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: Passport.js
- **PDF Generation**: html2pdf.js

## Installation

### Prerequisites

- Node.js
- MongoDB

### Steps

1. **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2. **Install backend dependencies**:
    ```bash
    cd backend
    npm install
    ```

3. **Install frontend dependencies**:
    ```bash
    cd ../frontend
    npm install
    ```

4. **Set up environment variables**:

    Create a `.env` file in the `backend` directory and add the following variables:
    ```env
    PORT=5000
    MONGODB_URI=<your-mongodb-uri>
    SESSION_SECRET=<your-session-secret>
    ```

5. **Run the backend server**:
    ```bash
    cd backend
    npm start
    ```

6. **Run the frontend server**:
    ```bash
    cd ../frontend
    npm start
    ```

## Usage

1. **Login**: Start by logging in to the application.
2. **Create Document**: Navigate to the dashboard and create a new offer or invoice.
3. **Edit Document**: Click on any document in the list to edit it.
4. **Convert Offer to Invoice**: Click the "Convert to Invoice" button on any offer to create a corresponding invoice.
5. **Download PDF**: Save any document as a PDF.

## API Endpoints

### User Routes

- `POST /api/users` - Create a new user
- `GET /api/users` - Get all users
- `PUT /api/users/:id` - Update a user
- `DELETE /api/users/:id` - Delete a user
- `GET /getCurrentUser` - Get the current logged-in user

### Offer Routes

- `POST /angebot/createAngebot` - Create a new offer
- `GET /angebot/getAngebote` - Get all offers for the logged-in user
- `PUT /angebot/updateAngebot/:id` - Update an offer
- `POST /angebot/convertAngebotToRechnung/:id` - Convert an offer to an invoice

## File Structure

```plaintext
.
├── backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── .env
│   └── app.js
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── context
│   │   ├── pages
│   │   ├── App.js
│   │   └── index.js
│   └── public
└── README.md
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a pull request

