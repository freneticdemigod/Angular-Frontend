import { Component } from '@angular/core';
import { TaskListComponent } from './components/task-list/task-list.component';
// import { HttpClientModule } from '@angular/common/http';
import { provideHttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TaskListComponent], // Import TaskListComponent
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Task List Application';
}
