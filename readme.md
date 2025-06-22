A production-ready RESTful API for managing library resources built with Express.js, TypeScript, and MongoDB. This system provides comprehensive book management capabilities with robust validation, real-time availability tracking, and detailed borrowing records.

---

## Technology Stack

| Component          | Technology               |
|--------------------|--------------------------|
| **Runtime**        | Node.js (v18+)           |
| **Framework**      | Express.js               |
| **Language**       | TypeScript               |
| **Database**       | MongoDB (Mongoose ODM)   |
| **Validation**     | Mongoose Schema Validation |
| **Data Processing**| MongoDB Aggregation Pipeline |

---

## Core Features

- **Comprehensive Book Management**: Full CRUD operations for library inventory
- **Intelligent Borrowing System**: 
  - Real-time quantity validation
  - Automatic availability status updates
  - Due date enforcement
- **Advanced Query Capabilities**:
  - Genre-based filtering
  - Multi-field sorting (title, creation date)
  - Results limitation
- **Reporting & Analytics**:
  - Aggregate borrowing statistics
  - Real-time availability tracking
- **Type-Safe Architecture**: End-to-end TypeScript implementation
- **RESTful Design**: Standardized API conventions and response formats

---

## Project Structure

```
library-management-api/
├── models/          # Database schemas (Book, Borrow)
├── controller/     # Business logic handlers
├── interfaces/     # Custom middleware (error, validation)
├── app.ts           # Express application configuration
├── server.ts        # Server entry point
└── README.md        # Project documentation
```

---

## API Documentation

### Book Management

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/books` | POST | Create new book |
| `/api/books` | GET | Get all books (filter/sort) |
| `/api/books/:bookId` | GET | Get single book details |
| `/api/books/:bookId` | PUT | Update book information |
| `/api/books/:bookId` | DELETE | Remove book from system |

**Create Book Example**
```http
POST /api/books
Content-Type: application/json

{
  "title": "A Brief History of Time",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "copies": 7
}
```

### Borrow Operations

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/borrow` | POST | Borrow book copies |
| `/api/borrow` | GET | Get borrowing summary |

**Borrow Books Example**
```http
POST /api/borrow
Content-Type: application/json

{
  "book": "64ab3f9e2a4b5c6d7e8f9012",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}
```

**Borrowing Constraints**
- Validates available copies
- Prevents over-borrowing
- Automatically updates book availability
- Tracks due dates

---

## Response Formats

**Success Response**
```json
{
  "success": true,
  "data": {
    "title": "Clean Code",
    "available": true,
    "copies": 3
  }
}
```

**Error Handling**
```json
{
  "success": false,
  "message": "Insufficient copies available",
  "error": {
    "availableCopies": 2,
    "requested": 3
  }
}
```

---

## Business Logic Highlights

1. **Inventory Integrity**
   - Real-time copy validation
   - Automatic availability status updates
   - Prevention of negative inventory

2. **Borrowing System**
   - Quantity-based borrowing limits
   - Due date enforcement
   - Atomic inventory updates

3. **Reporting**
   - Aggregate borrowing statistics
   - Title-based quantity reporting
   - Real-time availability status

---

## Getting Started

### Prerequisites
- Node.js v18+
- MongoDB instance (local or cloud)

### Installation
```bash
git clone https://github.com/Ashiqur2812/library_management
cd library-management
npm install
```

### Configuration
Create `.env` file:
```env
PORT=4000
DATABASE_URL=mongodb://localhost:27017/library
```

### Execution
```bash
npm run dev
```
Server starts at: `http://localhost:4000`

---

## Roadmap & Future Enhancements

- **User Authentication**: JWT-based access control
- **Role Management**: Admin/Librarian/Patron roles
- **Fine Calculation System**: Late return penalties
- **Pagination**: Large dataset handling
- **API Documentation**: Swagger/OpenAPI implementation
- **Reservation System**: Hold requests for unavailable items

---

## Author
**MD Ashiqur Rahman**  
Backend Developer  
[GitHub Profile](https://github.com/Ashiqur2812)
```
This README provides a clear, structured overview of your Library Management System API, highlighting its features, structure, and usage. It maintains a professional tone while ensuring that all necessary information is easily accessible to developers and users alike. Feel free to adjust any sections as needed!