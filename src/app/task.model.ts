// export interface Task {
//     id: number; // Unique identifier for each task
//     date: string; // Task date
//     entityName: string; // Entity name associated with the task
//     taskType: string; // Type of task (e.g., Call, Meeting, etc.)
//     time: string; // Task time
//     contactPerson: string; // Contact person for the task
//     note: string; // Notes or additional information about the task
//     status: string; // Status of the task (e.g., Open, Closed)
//     isEditingNote?: boolean;
//   }
  
export interface Task {
  id: number;
  entityName: string;
  taskType: string;
  date: string;
  time: string;
  contactPerson: string;
  note?: string;
  status: string;
}

// Extend Task to include UI-specific properties
export interface TaskWithEditing extends Task {
  isEditingNote?: boolean; // Optional property for frontend use
}
