# Assignment Log Book API

A modern REST API built with Next.js 15 for managing assignments in an assignment log book application.

## Features

- ✅ List all assignments
- ✅ Create new assignments
- ✅ View assignment details
- ✅ Update assignments
- ✅ Delete assignments
- ✅ OpenAPI/Swagger documentation
- ✅ Error handling and validation
- ✅ JSON-based data persistence

## Tech Stack

- **Framework**: Next.js 15.1
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **API Documentation**: OpenAPI/Swagger
- **Data Storage**: JSON file-based

## Project Structure

```
logbook-assignment/
├── app/
│   ├── api/
│   │   ├── assignments/
│   │   │   ├── route.ts              # GET, POST endpoints
│   │   │   └── [id]/route.ts         # GET, PUT, DELETE endpoints
│   │   └── swagger/
│   │       └── route.ts              # Swagger spec endpoint
│   └── docs/
│       └── page.tsx                  # Swagger UI documentation
├── lib/
│   ├── db.ts                         # Database operations
│   └── swagger-spec.ts               # OpenAPI specification
├── public/
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd logbook-assignment
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

The server will start at [http://localhost:3000](http://localhost:3000).

## API Design

### Assignment Model

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique assignment identifier (auto-generated) |
| `title` | string | Assignment title |
| `description` | string | Detailed description of the assignment |
| `dueDate` | string | Due date (ISO 8601 format) |
| `subject` | string | Subject or course name |
| `status` | enum | Status: `pending`, `completed`, or `submitted` |
| `createdAt` | string | Creation timestamp (ISO 8601) |
| `updatedAt` | string | Last update timestamp (ISO 8601) |

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/assignments` | List all assignments |
| POST | `/api/assignments` | Create a new assignment |
| GET | `/api/assignments/{id}` | Get assignment details |
| PUT | `/api/assignments/{id}` | Update an assignment |
| DELETE | `/api/assignments/{id}` | Delete an assignment |

## API Documentation

### Interactive API Documentation

Visit [http://localhost:3000/docs](http://localhost:3000/docs) for the interactive Swagger UI documentation.

### Get All Assignments

```bash
curl http://localhost:3000/api/assignments
```

**Success Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "assign_1709296800000",
      "title": "Assignment 1",
      "description": "Complete the task",
      "dueDate": "2024-03-15",
      "subject": "Web Application Development",
      "status": "pending",
      "createdAt": "2024-03-01T10:00:00.000Z",
      "updatedAt": "2024-03-01T10:00:00.000Z"
    }
  ],
  "message": "Assignments retrieved successfully"
}
```

### Create Assignment

```bash
curl -X POST http://localhost:3000/api/assignments \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Assignment 1",
    "description": "Complete the task",
    "dueDate": "2024-03-15",
    "subject": "Web Application Development",
    "status": "pending"
  }'
```

**Success Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "assign_1709296800000",
    "title": "Assignment 1",
    "description": "Complete the task",
    "dueDate": "2024-03-15",
    "subject": "Web Application Development",
    "status": "pending",
    "createdAt": "2024-03-01T10:00:00.000Z",
    "updatedAt": "2024-03-01T10:00:00.000Z"
  },
  "message": "Assignment created successfully"
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Missing required fields: title, description, dueDate, subject"
}
```

### Get Assignment Detail

```bash
curl http://localhost:3000/api/assignments/assign_1709296800000
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "assign_1709296800000",
    "title": "Assignment 1",
    "description": "Complete the task",
    "dueDate": "2024-03-15",
    "subject": "Web Application Development",
    "status": "pending",
    "createdAt": "2024-03-01T10:00:00.000Z",
    "updatedAt": "2024-03-01T10:00:00.000Z"
  },
  "message": "Assignment retrieved successfully"
}
```

**Error Response (404):**
```json
{
  "success": false,
  "message": "Assignment not found"
}
```

### Update Assignment

```bash
curl -X PUT http://localhost:3000/api/assignments/assign_1709296800000 \
  -H "Content-Type: application/json" \
  -d '{
    "status": "completed"
  }'
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "assign_1709296800000",
    "title": "Assignment 1",
    "description": "Complete the task",
    "dueDate": "2024-03-15",
    "subject": "Web Application Development",
    "status": "completed",
    "createdAt": "2024-03-01T10:00:00.000Z",
    "updatedAt": "2024-03-01T12:00:00.000Z"
  },
  "message": "Assignment updated successfully"
}
```

**Error Response (404):**
```json
{
  "success": false,
  "message": "Assignment not found"
}
```

### Delete Assignment

```bash
curl -X DELETE http://localhost:3000/api/assignments/assign_1709296800000
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Assignment deleted successfully"
}
```

**Error Response (404):**
```json
{
  "success": false,
  "message": "Assignment not found"
}
```

## Testing

See [TESTING.md](./TESTING.md) for comprehensive testing guide with success and error scenarios.

## Scripts

```bash
# Development
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint
npm run lint
```

## Error Handling

The API uses standard HTTP status codes:

- **200 OK**: Request successful
- **201 Created**: Resource created successfully
- **400 Bad Request**: Invalid input or missing required fields
- **404 Not Found**: Resource not found
- **500 Internal Server Error**: Server error

## Data Persistence

Assignments are stored in a JSON file at `data/assignments.json`. The file is automatically created on first request.

## Author

Harris E.S - BINUS University

## License

MIT
