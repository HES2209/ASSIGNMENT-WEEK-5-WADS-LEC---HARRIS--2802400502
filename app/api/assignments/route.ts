import { NextRequest, NextResponse } from 'next/server';
import { getAllAssignments, createAssignment } from '@/lib/db';

// GET /api/assignments - List all assignments
export async function GET(request: NextRequest) {
  try {
    const assignments = getAllAssignments();
    return NextResponse.json(
      {
        success: true,
        data: assignments,
        message: 'Assignments retrieved successfully',
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to retrieve assignments',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// POST /api/assignments - Create new assignment
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validation
    if (!body.title || !body.description || !body.dueDate || !body.subject) {
      return NextResponse.json(
        {
          success: false,
          message: 'Missing required fields: title, description, dueDate, subject',
        },
        { status: 400 }
      );
    }

    const assignment = createAssignment({
      title: body.title,
      description: body.description,
      dueDate: body.dueDate,
      subject: body.subject,
      status: body.status || 'pending',
    });

    return NextResponse.json(
      {
        success: true,
        data: assignment,
        message: 'Assignment created successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to create assignment',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
