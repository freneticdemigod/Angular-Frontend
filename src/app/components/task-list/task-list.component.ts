// import { Component, OnInit, ViewChild } from '@angular/core';
// import { MatDialog } from '@angular/material/dialog';
// import { MatTableDataSource } from '@angular/material/table';
// import { MatSort } from '@angular/material/sort';
// import { AddTaskComponent } from '../add-task/add-task.component';
// import { TaskService } from '../../task.service';
// import { MatTableModule } from '@angular/material/table';
// import { MatButtonModule } from '@angular/material/button';
// import { MatDialogModule } from '@angular/material/dialog';
// import { MatIconModule } from '@angular/material/icon';
// import { Task } from '../../task.model';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { MatInputModule } from '@angular/material/input';

// @Component({
//   selector: 'app-task-list',
//   standalone: true,
//   imports: [CommonModule, MatTableModule, MatButtonModule, MatDialogModule, MatIconModule, FormsModule, MatInputModule],
//   templateUrl: './task-list.component.html',
//   styleUrls: ['./task-list.component.css'],
// })
// export class TaskListComponent implements OnInit {
//   tasks: Task[] = []; // Stores all tasks
//   displayedColumns: string[] = [
//     'date',
//     'entityName',
//     'taskType',
//     'time',
//     'contactPerson',
//     'note',
//     'status',
//     'actions',
//   ]; // Table columns
//   dataSource: MatTableDataSource<Task>; // DataSource for table

//   @ViewChild(MatSort) sort!: MatSort; // Reference to MatSort directive

//   constructor(private taskService: TaskService, private dialog: MatDialog) {
//     this.dataSource = new MatTableDataSource(this.tasks);
//   }

//   ngOnInit(): void {
//     // Initialize tasks and data source
//     this.tasks = this.taskService.getTasks();
//     this.dataSource.data = this.tasks;
//   }

//   ngAfterViewInit(): void {
//     // Attach sorting to the data source
//     this.dataSource.sort = this.sort;
//   }

//   applyFilter(event: Event): void {
//     // Filter tasks based on input value
//     const filterValue = (event.target as HTMLInputElement).value;
//     this.dataSource.filter = filterValue.trim().toLowerCase();
//   }

//   openAddTaskDialog(): void {
//     // Open the Add Task modal
//     const dialogRef = this.dialog.open(AddTaskComponent, {
//       width: '400px',
//     });

//     dialogRef.afterClosed().subscribe((result: Task | undefined) => {
//       if (result) {
//         this.taskService.addTask(result);
//         this.dataSource.data = this.taskService.getTasks();
//       }
//     });
//   }

//   editTask(task: Task): void {
//     // Open the Add Task modal pre-filled for editing
//     const dialogRef = this.dialog.open(AddTaskComponent, {
//       width: '400px',
//       data: { ...task },
//     });

//     dialogRef.afterClosed().subscribe((result: Task | undefined) => {
//       if (result) {
//         this.taskService.updateTask(result);
//         this.dataSource.data = this.taskService.getTasks();
//       }
//     });
//   }

//   deleteTask(task: Task): void {
//     // Delete the task and update the filtered tasks
//     this.taskService.deleteTask(task.id);
//     this.dataSource.data = this.taskService.getTasks();
//   }

//   addNote(task: Task): void {
//     // Placeholder for adding a note to a task
//     const note = prompt('Enter a note for this task:');
//     if (note) {
//       this.taskService.updateTask({ ...task, note });
//       this.dataSource.data = this.taskService.getTasks();
//     }
//   }


//   editNote(task: Task): void {
//     task.isEditingNote = true; // Set editing mode to true
//   }

//   saveNote(task: Task): void {
//     task.isEditingNote = false; // Exit editing mode
//     if (task.note) {
//       this.taskService.updateTask(task); // Save the updated note
//       this.dataSource.data = this.taskService.getTasks(); // Refresh the data source
//     }
//   }
// }

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { AddTaskComponent } from '../add-task/add-task.component';
import { TaskService } from '../../task.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { TaskWithEditing } from '../../task.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatDialogModule, MatIconModule, FormsModule, MatInputModule],
  templateUrl: './task-list.component.html',
  providers: [TaskService],
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  tasks: TaskWithEditing[] = []; // Stores all tasks
  displayedColumns: string[] = [
    'date',
    'entityName',
    'taskType',
    'time',
    'contactPerson',
    'note',
    'status',
    'actions',
  ]; // Table columns
  dataSource: MatTableDataSource<TaskWithEditing>; // DataSource for table

  @ViewChild(MatSort) sort!: MatSort; // Reference to MatSort directive

  constructor(private taskService: TaskService, private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource(this.tasks);
  }

  ngOnInit(): void {
    // Initialize tasks and data source
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks.map((task) => ({ ...task, isEditingNote: false })); // Add isEditingNote
      this.dataSource.data = this.tasks;
    });
  }

  ngAfterViewInit(): void {
    // Attach sorting to the data source
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event): void {
    // Filter tasks based on input value
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openAddTaskDialog(): void {
    // Open the Add Task modal
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.taskService.addTask(result).subscribe(() => {
          this.taskService.getTasks().subscribe((tasks) => {
            this.tasks = tasks.map((task) => ({ ...task, isEditingNote: false })); // Refresh with isEditingNote
            this.dataSource.data = this.tasks;
          });
        });
      }
    });
  }

  editTask(task: TaskWithEditing): void {
    // Open the Add Task modal pre-filled for editing
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '400px',
      data: { ...task },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.taskService.updateTask(result).subscribe(() => {
          this.taskService.getTasks().subscribe((tasks) => {
            this.tasks = tasks.map((task) => ({ ...task, isEditingNote: false })); // Refresh with isEditingNote
            this.dataSource.data = this.tasks;
          });
        });
      }
    });
  }

  deleteTask(task: TaskWithEditing): void {
    // Delete the task and update the filtered tasks
    this.taskService.deleteTask(task.id).subscribe(() => {
      this.taskService.getTasks().subscribe((tasks) => {
        this.tasks = tasks.map((task) => ({ ...task, isEditingNote: false })); // Refresh with isEditingNote
        this.dataSource.data = this.tasks;
      });
    });
  }

  editNote(task: TaskWithEditing): void {
    task.isEditingNote = true; // Enable note editing
  }

  saveNote(task: TaskWithEditing): void {
    task.isEditingNote = false; // Disable note editing
    if (task.note) {
      this.taskService.updateTask(task).subscribe(() => {
        this.taskService.getTasks().subscribe((tasks) => {
          this.tasks = tasks.map((task) => ({ ...task, isEditingNote: false })); // Refresh with isEditingNote
          this.dataSource.data = this.tasks;
        });
      });
    }
  }
}
