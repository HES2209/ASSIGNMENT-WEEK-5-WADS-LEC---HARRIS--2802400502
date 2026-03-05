import { NextRequest, NextResponse } from 'next/server';
import { getAssignmentById, updateAssignment, deleteAssignment } from '@/lib/db';

// GET /api/assignments/[id] - Get assignment detail
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const assignment = getAssignmentById(id);

    if (!assignment) {
      return NextResponse.json(
        {
          success: false,
          message: 'Assignment not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: assignment,
        message: 'Assignment retrieved successfully',
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to retrieve assignment',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// PUT /api/assignments/[id] - Update assignment
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();

    const assignment = getAssignmentById(id);
    if (!assignment) {
      return NextResponse.json(
        {
          success: false,
          message: 'Assignment not found',
        },
        { status: 404 }
      );
    }

    const updatedAssignment = updateAssignment(id, {
      title: body.title ?? assignment.title,
      description: body.description ?? assignment.description,
      dueDate: body.dueDate ?? assignment.dueDate,
      subject: body.subject ?? assignment.subject,
      status: body.status ?? assignment.status,
    });

    return NextResponse.json(
      {
        success: true,
        data: updatedAssignment,
        message: 'Assignment updated successfully',
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to update assignment',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// DELETE /api/assignments/[id] - Delete assignment
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const assignment = getAssignmentById(id);

    if (!assignment) {
      return NextResponse.json(
        {
          success: false,
          message: 'Assignment not found',
        },
        { status: 404 }
      );
    }

    const deleted = deleteAssignment(id);

    if (!deleted) {
      return NextResponse.json(
        {
          success: false,
          message: 'Failed to delete assignment',
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Assignment deleted successfully',
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to delete assignment',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
