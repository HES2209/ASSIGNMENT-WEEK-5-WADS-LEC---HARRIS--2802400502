export const swaggerSpec = {
  openapi: '3.0.0',
  info: {
    title: 'Assignment Log Book API',
    version: '1.0.0',
    description: 'REST API for managing assignments in an assignment log book application',
    contact: {
      name: 'Harris E.S',
      email: 'harris@binus.ac.id',
    },
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Development server',
    },
  ],
  paths: {
    '/api/assignments': {
      get: {
        summary: 'List all assignments',
        operationId: 'listAssignments',
        tags: ['Assignments'],
        responses: {
          '200': {
            description: 'Successful response with list of assignments',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    data: {
                      type: 'array',
                      items: { $ref: '#/components/schemas/Assignment' },
                    },
                    message: { type: 'string', example: 'Assignments retrieved successfully' },
                  },
                },
              },
            },
          },
          '500': {
            $ref: '#/components/responses/InternalServerError',
          },
        },
      },
      post: {
        summary: 'Create a new assignment',
        operationId: 'createAssignment',
        tags: ['Assignments'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['title', 'description', 'dueDate', 'subject'],
                properties: {
                  title: { type: 'string', example: 'Assignment 1' },
                  description: { type: 'string', example: 'Complete the task' },
                  dueDate: { type: 'string', format: 'date-time', example: '2024-03-15' },
                  subject: { type: 'string', example: 'Web Application Development' },
                  status: {
                    type: 'string',
                    enum: ['pending', 'completed', 'submitted'],
                    example: 'pending',
                  },
                },
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Assignment created successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    data: { $ref: '#/components/schemas/Assignment' },
                    message: { type: 'string', example: 'Assignment created successfully' },
                  },
                },
              },
            },
          },
          '400': {
            $ref: '#/components/responses/BadRequest',
          },
          '500': {
            $ref: '#/components/responses/InternalServerError',
          },
        },
      },
    },
    '/api/assignments/{id}': {
      get: {
        summary: 'Get assignment details',
        operationId: 'getAssignment',
        tags: ['Assignments'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' },
            description: 'Assignment ID',
          },
        ],
        responses: {
          '200': {
            description: 'Assignment found',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    data: { $ref: '#/components/schemas/Assignment' },
                    message: { type: 'string', example: 'Assignment retrieved successfully' },
                  },
                },
              },
            },
          },
          '404': {
            $ref: '#/components/responses/NotFound',
          },
          '500': {
            $ref: '#/components/responses/InternalServerError',
          },
        },
      },
      put: {
        summary: 'Update an assignment',
        operationId: 'updateAssignment',
        tags: ['Assignments'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' },
            description: 'Assignment ID',
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  title: { type: 'string', example: 'Updated Assignment 1' },
                  description: { type: 'string', example: 'Complete the updated task' },
                  dueDate: { type: 'string', format: 'date-time', example: '2024-03-20' },
                  subject: { type: 'string', example: 'Web Application Development' },
                  status: {
                    type: 'string',
                    enum: ['pending', 'completed', 'submitted'],
                    example: 'completed',
                  },
                },
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Assignment updated successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    data: { $ref: '#/components/schemas/Assignment' },
                    message: { type: 'string', example: 'Assignment updated successfully' },
                  },
                },
              },
            },
          },
          '404': {
            $ref: '#/components/responses/NotFound',
          },
          '500': {
            $ref: '#/components/responses/InternalServerError',
          },
        },
      },
      delete: {
        summary: 'Delete an assignment',
        operationId: 'deleteAssignment',
        tags: ['Assignments'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' },
            description: 'Assignment ID',
          },
        ],
        responses: {
          '200': {
            description: 'Assignment deleted successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    message: { type: 'string', example: 'Assignment deleted successfully' },
                  },
                },
              },
            },
          },
          '404': {
            $ref: '#/components/responses/NotFound',
          },
          '500': {
            $ref: '#/components/responses/InternalServerError',
          },
        },
      },
    },
  },
  components: {
    schemas: {
      Assignment: {
        type: 'object',
        properties: {
          id: { type: 'string', example: 'assign_1234567890' },
          title: { type: 'string', example: 'Assignment 1' },
          description: { type: 'string', example: 'Complete the task' },
          dueDate: { type: 'string', format: 'date-time', example: '2024-03-15' },
          subject: { type: 'string', example: 'Web Application Development' },
          status: {
            type: 'string',
            enum: ['pending', 'completed', 'submitted'],
            example: 'pending',
          },
          createdAt: { type: 'string', format: 'date-time', example: '2024-03-01T10:00:00Z' },
          updatedAt: { type: 'string', format: 'date-time', example: '2024-03-01T10:00:00Z' },
        },
      },
    },
    responses: {
      BadRequest: {
        description: 'Bad request - Invalid input',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                success: { type: 'boolean', example: false },
                message: { type: 'string', example: 'Missing required fields' },
              },
            },
          },
        },
      },
      NotFound: {
        description: 'Resource not found',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                success: { type: 'boolean', example: false },
                message: { type: 'string', example: 'Assignment not found' },
              },
            },
          },
        },
      },
      InternalServerError: {
        description: 'Internal server error',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                success: { type: 'boolean', example: false },
                message: { type: 'string', example: 'Internal server error' },
                error: { type: 'string' },
              },
            },
          },
        },
      },
    },
  },
};
