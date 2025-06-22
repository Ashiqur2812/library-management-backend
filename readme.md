````markdown
#  Library Management API

A robust and developer-friendly **Library Management System** built using **Express.js**, **TypeScript**, and **MongoDB** (via **Mongoose**). This API allows users to manage books and borrowing records with proper validation, business logic enforcement, and efficient querying.

---

##  Tech Stack

- **Backend**: Node.js, Express.js
- **Language**: TypeScript
- **Database**: MongoDB (Mongoose ODM)
- **Tools & Features**:
  - Schema Validation
  - Business Logic Enforcement
  - Mongoose Middleware (pre, post)
  - Aggregation Pipeline
  - Filtering & Sorting
  - Static/Instance Methods

---

##  Features

 Create, Read, Update, Delete (CRUD) operations for books  
 Borrow books with quantity control and due date  
 Smart availability tracking (based on available copies)  
 Aggregated report of borrowed books  
 Genre filtering and dynamic sorting  
 Standardized success and error response formats  
 Fully typed with TypeScript for safety and scalability  

---

##  Project Structure

```bash
 library-management-api
 ┣ models         # Mongoose models for Book and Borrow
 ┣ routes         # Express routes for Book and Borrow APIs
 ┣ controllers    # Logic for handling requests
 ┣ middlewares    # Error and validation middleware
 ┣ app.ts         # Main Express app configuration
 ┣ server.ts      # Entry point for server
 ┗ README.md      # Project documentation
````

---

##  API Endpoints & Examples

### 1.  Create a Book

```http
POST /api/books
```

**Request Body**:

```json
{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "description": "An overview of cosmology and black holes.",
  "copies": 5
}
```

**Response**: Book object with timestamps

---

### 2.  Get All Books (Supports Filtering, Sorting)

```http
GET /api/books?filter=FANTASY&sortBy=createdAt&sort=desc&limit=5
```

* **filter**: by genre
* **sortBy**: any field like `createdAt`, `title`
* **sort**: `asc` or `desc`
* **limit**: number of books to return

---

### 3.  Get a Book by ID

```http
GET /api/books/:bookId
```

---

### 4. Update a Book

```http
PUT /api/books/:bookId
```

**Request Body**:

```json
{ "copies": 10 }
```

---

### 5. Delete a Book

```http
DELETE /api/books/:bookId
```

---

### 6. Borrow a Book

```http
POST /api/borrow
```

**Request Body**:

```json
{
  "book": "64ab3f9e2a4b5c6d7e8f9012",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}
```

 Checks available copies
 Updates book availability if copies become 0
 Records borrow history with timestamps

---

### 7. Borrowed Books Summary (Aggregation)

```http
GET /api/borrow
```

Returns:

* `title`
* `isbn`
* `totalQuantity` borrowed

---

## Error Response Format (Example)

```json
{
  "message": "Validation failed",
  "success": false,
  "error": {
    "name": "ValidationError",
    "errors": {
      "copies": {
        "message": "Copies must be a positive number",
        "kind": "min",
        "value": -5
      }
    }
  }
}
```

---

## Business Logic Highlights

* Borrow operation enforces:

  * Positive copy validation
  * Availability check
  * Quantity deduction from original stock
  * Automatic toggle of `available: false` when stock is 0
* Book updates only allow meaningful changes
* Borrow summaries use MongoDB aggregation for performance

---

## Getting Started

### Prerequisites

* Node.js (v18+)
* MongoDB local or Atlas cluster

### Installation

```bash
git clone https://github.com/Ashiqur2812/library_management
cd library-management
npm install
```

###  Setup

Create `.env` file:

```env
PORT=4000
DATABASE_URL=mongodb://localhost:27017/library
```

---

###  Run the App

```bash
npm run dev
```

App runs at: `http://localhost:4000`

---

##  Future Improvements (Optional Ideas)

* JWT-based Authentication
* Role-based access (admin, librarian, member)
* Return & fine tracking system
* Pagination for large data
* Swagger API documentation

---

## Author

**MD Ashiqur Rahman**
Sociology Master's Student | Junior Web Developer

---

