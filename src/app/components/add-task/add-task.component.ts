// import { Component, Inject } from '@angular/core';
// import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { FormsModule } from '@angular/forms';
// import { Task } from '../../task.model';
// import { MatSelectModule } from '@angular/material/select';
// import { CommonModule } from '@angular/common';


// @Component({
//   selector: 'app-add-task',
//   standalone: true,
//   imports: [MatFormFieldModule, MatInputModule, FormsModule, MatSelectModule, CommonModule, MatInputModule], // Remove MatDialogRef from here
//   templateUrl: './add-task.component.html',
//   styleUrls: ['./add-task.component.css'],
// })
// export class AddTaskComponent {
//   task = { date: '', entityName: '', taskType: '', time: '', contactPerson: '', note: '', status: '' };

//   // constructor(public dialogRef: MatDialogRef<AddTaskComponent>) {}
//   isEdit = false; // Tracks whether the component is in edit mode

//   constructor(
//     public dialogRef: MatDialogRef<AddTaskComponent>,
//     @Inject(MAT_DIALOG_DATA) public data: Task | null // Injects data passed to the dialog
//   ) {}

//   ngOnInit(): void {
//     if (this.data) {
//       // If data is provided, set the component to edit mode
//       this.isEdit = true;
//       this.task = { ...this.data }; // Populate the task with the data passed
//     }
//   }

//   save(): void {
//     this.dialogRef.close(this.task);
//   }

//   cancel(): void {
//     this.dialogRef.close();
//   }

//   isFormValid(): boolean {
//     return (
//       !!this.task.entityName &&
//       !!this.task.taskType &&
//       !!this.task.date &&
//       !!this.task.time &&
//       !!this.task.contactPerson &&
//       !!this.task.status
//     );
//   }
// }

import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { Task } from '../../task.model';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../task.service';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatSelectModule, CommonModule],
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent implements OnInit {
  task: Task = {
    id: 0,
    date: '',
    entityName: '',
    taskType: '',
    time: '',
    contactPerson: '',
    note: '',
    status: '',
  };
  isEdit = false; // Tracks whether the component is in edit mode

  constructor(
    private taskService: TaskService, // Inject TaskService for API integration
    public dialogRef: MatDialogRef<AddTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task | null // Injects data passed to the dialog
  ) {}

  ngOnInit(): void {
    if (this.data) {
      // If data is provided, set the component to edit mode
      this.isEdit = true;
      this.task = { ...this.data }; // Populate the task with the data passed
    }
  }

  save(): void {
    if (this.isEdit) {
      // Update the task if in edit mode
      this.taskService.updateTask(this.task).subscribe(() => {
        this.dialogRef.close(this.task); // Close the dialog and pass the updated task
      });
    } else {
      // Add a new task if in add mode
      this.taskService.addTask(this.task).subscribe(() => {
        this.dialogRef.close(this.task); // Close the dialog and pass the new task
      });
    }
  }

  cancel(): void {
    this.dialogRef.close(); // Close the dialog without saving
  }

  isFormValid(): boolean {
    // Validate the form before enabling the save button
    return (
      !!this.task.entityName &&
      !!this.task.taskType &&
      !!this.task.date &&
      !!this.task.time &&
      !!this.task.contactPerson &&
      !!this.task.status
    );
  }
}
