// import { Injectable } from '@angular/core';
// import { Task } from './task.model';

// @Injectable({
//   providedIn: 'root',
// })
// export class TaskService {
//   private tasks: Task[] = [
//     {
//       id: 1,
//       date: '2023-12-01',
//       entityName: 'ABC Corp',
//       taskType: 'Call',
//       time: '10:00 AM',
//       contactPerson: 'John Doe',
//       note: '',
//       status: 'Open',
//     },
//     {
//       id: 2,
//       date: '2023-12-02',
//       entityName: 'XYZ Inc',
//       taskType: 'Meeting',
//       time: '2:00 PM',
//       contactPerson: 'Jane Smith',
//       note: 'Discuss project roadmap.',
//       status: 'Closed',
//     },
//   ]; 

//   constructor() {}

//   getTasks(): Task[] {
//     return this.tasks;
//   }

//   addTask(task: Task): void {
//     task.id = this.generateTaskId();
//     this.tasks.push(task);
//   }

//   updateTask(updatedTask: Task): void {
//     const index = this.tasks.findIndex((task) => task.id === updatedTask.id);
//     if (index !== -1) {
//       this.tasks[index] = updatedTask;
//     }
//   }

//   deleteTask(taskId: number): void {
//     this.tasks = this.tasks.filter((task) => task.id !== taskId);
//   }

//   private generateTaskId(): number {
//     return this.tasks.length > 0
//       ? Math.max(...this.tasks.map((task) => task.id)) + 1
//       : 1;
//   }
// }

// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { environment } from '../environments/environment';
// import { Observable } from 'rxjs';

// export interface Task {
//   id?: number;
//   entity_name: string;
//   task_type: string;
//   date: string;
//   time: string;
//   contact_person: string;
//   note?: string;
//   status: string;
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class TaskService {
//   private apiUrl = `${environment.backendUrl}/tasks`;

//   constructor(private http: HttpClient) {}

//   getTasks(): Observable<Task[]> {
//     return this.http.get<Task[]>(this.apiUrl);
//   }

//   addTask(task: Task): Observable<Task> {
//     return this.http.post<Task>(this.apiUrl, task);
//   }

//   updateTask(id: number, task: Task): Observable<Task> {
//     return this.http.put<Task>(`${this.apiUrl}/${id}`, task);
//   }

//   deleteTask(id: number): Observable<void> {
//     return this.http.delete<void>(`${this.apiUrl}/${id}`);
//   }
// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Task } from './task.model';
import { environment } from '../environments/environment';

@Injectable({ 
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = `${environment.backendUrl}/tasks`;

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl).pipe(
      map((tasks: any[]) =>
        tasks.map((task) => ({
          id: task.id,
          entityName: task.entity_name,
          taskType: task.task_type,
          date: task.date,
          time: task.time,
          contactPerson: task.contact_person,
          note: task.note,
          status: task.status,
        }))
      )
    );
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, {
      entity_name: task.entityName,
      task_type: task.taskType,
      date: task.date,
      time: task.time,
      contact_person: task.contactPerson,
      note: task.note,
      status: task.status,
    });
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${task.id}`, {
      entity_name: task.entityName,
      task_type: task.taskType,
      date: task.date,
      time: task.time,
      contact_person: task.contactPerson,
      note: task.note,
      status: task.status,
    });
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
