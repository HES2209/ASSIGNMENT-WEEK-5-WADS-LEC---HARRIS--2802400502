# Testing Guide for Assignment Log Book API

This document provides comprehensive testing scenarios for all API endpoints, including success and error cases.

## Prerequisites

1. Ensure the API server is running: `npm run dev`
2. Server should be available at `http://localhost:3000`
3. Use curl, Postman, or any HTTP client to test the endpoints

## Test Scenarios

### 1. GET /api/assignments - List All Assignments

#### Test 1.1: Get assignments (Empty list)
**Scenario**: Retrieve assignments when no assignments exist

**Request**:
```bash
curl http://localhost:3000/api/assignments
```

**Expected Response**: `200 OK`
```json
{
  "success": true,
  "data": [],
  "message": "Assignments retrieved successfully"
}
```

---

#### Test 1.2: Get assignments (With data)
**Scenario**: Retrieve assignments after creating several

**Request**:
```bash
curl http://localhost:3000/api/assignments
```

**Expected Response**: `200 OK`
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

---

### 2. POST /api/assignments - Create Assignment

#### Test 2.1: Create assignment (Success)
**Scenario**: Create a new assignment with all required fields

**Request**:
```bash
curl -X POST http://localhost:3000/api/assignments \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Assignment 1",
    "description": "Complete the web development task",
    "dueDate": "2024-03-20",
    "subject": "Web Application Development",
    "status": "pending"
  }'
```

**Expected Response**: `201 Created`
```json
{
  "success": true,
  "data": {
    "id": "assign_1709296800000",
    "title": "Assignment 1",
    "description": "Complete the web development task",
    "dueDate": "2024-03-20",
    "subject": "Web Application Development",
    "status": "pending",
    "createdAt": "2024-03-01T10:00:00.000Z",
    "updatedAt": "2024-03-01T10:00:00.000Z"
  },
  "message": "Assignment created successfully"
}
```

---

#### Test 2.2: Create assignment (Missing title)
**Scenario**: Create assignment without required "title" field

**Request**:
```bash
curl -X POST http://localhost:3000/api/assignments \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Complete the task",
    "dueDate": "2024-03-20",
    "subject": "Web Application Development"
  }'
```

**Expected Response**: `400 Bad Request`
```json
{
  "success": false,
  "message": "Missing required fields: title, description, dueDate, subject"
}
```

---

#### Test 2.3: Create assignment (Missing description)
**Scenario**: Create assignment without required "description" field

**Request**:
```bash
curl -X POST http://localhost:3000/api/assignments \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Assignment 1",
    "dueDate": "2024-03-20",
    "subject": "Web Application Development"
  }'
```

**Expected Response**: `400 Bad Request`
```json
{
  "success": false,
  "message": "Missing required fields: title, description, dueDate, subject"
}
```

---

#### Test 2.4: Create assignment (Missing dueDate)
**Scenario**: Create assignment without required "dueDate" field

**Request**:
```bash
curl -X POST http://localhost:3000/api/assignments \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Assignment 1",
    "description": "Complete the task",
    "subject": "Web Application Development"
  }'
```

**Expected Response**: `400 Bad Request`
```json
{
  "success": false,
  "message": "Missing required fields: title, description, dueDate, subject"
}
```

---

#### Test 2.5: Create assignment (Missing subject)
**Scenario**: Create assignment without required "subject" field

**Request**:
```bash
curl -X POST http://localhost:3000/api/assignments \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Assignment 1",
    "description": "Complete the task",
    "dueDate": "2024-03-20"
  }'
```

**Expected Response**: `400 Bad Request`
```json
{
  "success": false,
  "message": "Missing required fields: title, description, dueDate, subject"
}
```

---

#### Test 2.6: Create assignment (Invalid JSON)
**Scenario**: Send invalid JSON payload

**Request**:
```bash
curl -X POST http://localhost:3000/api/assignments \
  -H "Content-Type: application/json" \
  -d '{invalid json}'
```

**Expected Response**: `500 Internal Server Error`
```json
{
  "success": false,
  "message": "Failed to create assignment",
  "error": "Unexpected token i in JSON at position 1"
}
```

---

#### Test 2.7: Create assignment (With custom status)
**Scenario**: Create assignment with custom status value

**Request**:
```bash
curl -X POST http://localhost:3000/api/assignments \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Assignment 1",
    "description": "Complete the task",
    "dueDate": "2024-03-20",
    "subject": "Web Application Development",
    "status": "submitted"
  }'
```

**Expected Response**: `201 Created`
```json
{
  "success": true,
  "data": {
    "id": "assign_1709296800001",
    "title": "Assignment 1",
    "description": "Complete the task",
    "dueDate": "2024-03-20",
    "subject": "Web Application Development",
    "status": "submitted",
    "createdAt": "2024-03-01T10:01:00.000Z",
    "updatedAt": "2024-03-01T10:01:00.000Z"
  },
  "message": "Assignment created successfully"
}
```

---

### 3. GET /api/assignments/{id} - Get Assignment Detail

#### Test 3.1: Get assignment (Valid ID)
**Scenario**: Retrieve assignment details with valid ID

*First, create an assignment and note its ID (e.g., assign_1709296800000)*

**Request**:
```bash
curl http://localhost:3000/api/assignments/assign_1709296800000
```

**Expected Response**: `200 OK`
```json
{
  "success": true,
  "data": {
    "id": "assign_1709296800000",
    "title": "Assignment 1",
    "description": "Complete the web development task",
    "dueDate": "2024-03-20",
    "subject": "Web Application Development",
    "status": "pending",
    "createdAt": "2024-03-01T10:00:00.000Z",
    "updatedAt": "2024-03-01T10:00:00.000Z"
  },
  "message": "Assignment retrieved successfully"
}
```

---

#### Test 3.2: Get assignment (Non-existent ID)
**Scenario**: Retrieve assignment with ID that doesn't exist

**Request**:
```bash
curl http://localhost:3000/api/assignments/assign_nonexistent
```

**Expected Response**: `404 Not Found`
```json
{
  "success": false,
  "message": "Assignment not found"
}
```

---

#### Test 3.3: Get assignment (Empty ID)
**Scenario**: Request assignment detail with empty ID

**Request**:
```bash
curl http://localhost:3000/api/assignments/
```

**Expected Response**: `404 Not Found` (Route not found)

---

### 4. PUT /api/assignments/{id} - Update Assignment

#### Test 4.1: Update assignment (Update status)
**Scenario**: Update assignment status from pending to completed

*First, create an assignment and note its ID*

**Request**:
```bash
curl -X PUT http://localhost:3000/api/assignments/assign_1709296800000 \
  -H "Content-Type: application/json" \
  -d '{
    "status": "completed"
  }'
```

**Expected Response**: `200 OK`
```json
{
  "success": true,
  "data": {
    "id": "assign_1709296800000",
    "title": "Assignment 1",
    "description": "Complete the web development task",
    "dueDate": "2024-03-20",
    "subject": "Web Application Development",
    "status": "completed",
    "createdAt": "2024-03-01T10:00:00.000Z",
    "updatedAt": "2024-03-01T10:05:00.000Z"
  },
  "message": "Assignment updated successfully"
}
```

---

#### Test 4.2: Update assignment (Update title and description)
**Scenario**: Update title and description

**Request**:
```bash
curl -X PUT http://localhost:3000/api/assignments/assign_1709296800000 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Assignment 1",
    "description": "Updated task description"
  }'
```

**Expected Response**: `200 OK`
```json
{
  "success": true,
  "data": {
    "id": "assign_1709296800000",
    "title": "Updated Assignment 1",
    "description": "Updated task description",
    "dueDate": "2024-03-20",
    "subject": "Web Application Development",
    "status": "completed",
    "createdAt": "2024-03-01T10:00:00.000Z",
    "updatedAt": "2024-03-01T10:05:30.000Z"
  },
  "message": "Assignment updated successfully"
}
```

---

#### Test 4.3: Update assignment (Non-existent ID)
**Scenario**: Update assignment that doesn't exist

**Request**:
```bash
curl -X PUT http://localhost:3000/api/assignments/assign_nonexistent \
  -H "Content-Type: application/json" \
  -d '{
    "status": "completed"
  }'
```

**Expected Response**: `404 Not Found`
```json
{
  "success": false,
  "message": "Assignment not found"
}
```

---

#### Test 4.4: Update assignment (Invalid JSON)
**Scenario**: Send invalid JSON in update request

**Request**:
```bash
curl -X PUT http://localhost:3000/api/assignments/assign_1709296800000 \
  -H "Content-Type: application/json" \
  -d '{invalid json}'
```

**Expected Response**: `500 Internal Server Error`
```json
{
  "success": false,
  "message": "Failed to update assignment",
  "error": "Unexpected token i in JSON at position 1"
}
```

---

#### Test 4.5: Update assignment (Partial update)
**Scenario**: Update only one field, others should remain unchanged

**Request**:
```bash
curl -X PUT http://localhost:3000/api/assignments/assign_1709296800000 \
  -H "Content-Type: application/json" \
  -d '{
    "status": "submitted"
  }'
```

**Expected Response**: `200 OK`
```json
{
  "success": true,
  "data": {
    "id": "assign_1709296800000",
    "title": "Updated Assignment 1",
    "description": "Updated task description",
    "dueDate": "2024-03-20",
    "subject": "Web Application Development",
    "status": "submitted",
    "createdAt": "2024-03-01T10:00:00.000Z",
    "updatedAt": "2024-03-01T10:06:00.000Z"
  },
  "message": "Assignment updated successfully"
}
```

---

### 5. DELETE /api/assignments/{id} - Delete Assignment

#### Test 5.1: Delete assignment (Valid ID)
**Scenario**: Delete an existing assignment

*First, create an assignment and note its ID*

**Request**:
```bash
curl -X DELETE http://localhost:3000/api/assignments/assign_1709296800000
```

**Expected Response**: `200 OK`
```json
{
  "success": true,
  "message": "Assignment deleted successfully"
}
```

---

#### Test 5.2: Delete assignment (Non-existent ID)
**Scenario**: Delete assignment that doesn't exist

**Request**:
```bash
curl -X DELETE http://localhost:3000/api/assignments/assign_nonexistent
```

**Expected Response**: `404 Not Found`
```json
{
  "success": false,
  "message": "Assignment not found"
}
```

---

#### Test 5.3: Delete assignment (Already deleted)
**Scenario**: Delete the same assignment twice

**First request (successful)**:
```bash
curl -X DELETE http://localhost:3000/api/assignments/assign_1709296800000
```

**Response**: `200 OK`

**Second request (error)**:
```bash
curl -X DELETE http://localhost:3000/api/assignments/assign_1709296800000
```

**Expected Response**: `404 Not Found`
```json
{
  "success": false,
  "message": "Assignment not found"
}
```

---

## Complete API Test Flow

Run these commands in sequence to test all functionality:

```bash
# 1. Get empty list
curl http://localhost:3000/api/assignments

# 2. Create first assignment
curl -X POST http://localhost:3000/api/assignments \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Assignment 1",
    "description": "Task 1",
    "dueDate": "2024-03-15",
    "subject": "WADS"
  }'
# Save the returned ID as ASSIGN_ID_1

# 3. Create second assignment
curl -X POST http://localhost:3000/api/assignments \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Assignment 2",
    "description": "Task 2",
    "dueDate": "2024-03-20",
    "subject": "WADS"
  }'
# Save the returned ID as ASSIGN_ID_2

# 4. Get all assignments
curl http://localhost:3000/api/assignments

# 5. Get specific assignment
curl http://localhost:3000/api/assignments/$ASSIGN_ID_1

# 6. Update assignment
curl -X PUT http://localhost:3000/api/assignments/$ASSIGN_ID_1 \
  -H "Content-Type: application/json" \
  -d '{
    "status": "completed"
  }'

# 7. Delete assignment
curl -X DELETE http://localhost:3000/api/assignments/$ASSIGN_ID_2

# 8. Verify deletion (should return 404)
curl http://localhost:3000/api/assignments/$ASSIGN_ID_2
```

## Error Handling Summary

| Status Code | Scenario | Response |
|-------------|----------|----------|
| 200 | Successful GET, PUT, DELETE | Returns success object with data/message |
| 201 | Successful POST (create) | Returns created assignment with ID |
| 400 | Missing required fields in POST | Returns error message about missing fields |
| 404 | Assignment not found | Returns "Assignment not found" error |
| 500 | Invalid JSON or server error | Returns error message with details |

## Notes

- All timestamps are in ISO 8601 format
- Assignment IDs are auto-generated with format `assign_<timestamp>`
- Data persists in `data/assignments.json`
- The `createdAt` timestamp never changes after creation
- The `updatedAt` timestamp updates on every modification
- Status values are: `pending`, `completed`, `submitted`
