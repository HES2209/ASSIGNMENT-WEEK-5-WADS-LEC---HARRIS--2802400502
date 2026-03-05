import fs from 'fs';
import path from 'path';

interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  subject: string;
  status: 'pending' | 'completed' | 'submitted';
  createdAt: string;
  updatedAt: string;
}

const dbPath = path.join(process.cwd(), 'data', 'assignments.json');

// Ensure data directory exists
const ensureDataDir = () => {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
};

// Initialize database file if it doesn't exist
const initDB = () => {
  ensureDataDir();
  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify([], null, 2));
  }
};

// Read all assignments
export const getAllAssignments = (): Assignment[] => {
  initDB();
  try {
    const data = fs.readFileSync(dbPath, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
};

// Get assignment by ID
export const getAssignmentById = (id: string): Assignment | null => {
  const assignments = getAllAssignments();
  return assignments.find(a => a.id === id) || null;
};

// Create new assignment
export const createAssignment = (assignment: Omit<Assignment, 'id' | 'createdAt' | 'updatedAt'>): Assignment => {
  const assignments = getAllAssignments();
  const newAssignment: Assignment = {
    ...assignment,
    id: `assign_${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  assignments.push(newAssignment);
  saveAssignments(assignments);
  return newAssignment;
};

// Update assignment
export const updateAssignment = (id: string, updates: Partial<Assignment>): Assignment | null => {
  const assignments = getAllAssignments();
  const index = assignments.findIndex(a => a.id === id);
  
  if (index === -1) {
    return null;
  }
  
  assignments[index] = {
    ...assignments[index],
    ...updates,
    id: assignments[index].id,
    createdAt: assignments[index].createdAt,
    updatedAt: new Date().toISOString(),
  };
  
  saveAssignments(assignments);
  return assignments[index];
};

// Delete assignment
export const deleteAssignment = (id: string): boolean => {
  const assignments = getAllAssignments();
  const index = assignments.findIndex(a => a.id === id);
  
  if (index === -1) {
    return false;
  }
  
  assignments.splice(index, 1);
  saveAssignments(assignments);
  return true;
};

// Save assignments to file
const saveAssignments = (assignments: Assignment[]) => {
  ensureDataDir();
  fs.writeFileSync(dbPath, JSON.stringify(assignments, null, 2));
};

export type { Assignment };
