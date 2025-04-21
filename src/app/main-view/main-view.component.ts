import { Component } from '@angular/core';
import { TaskListComponent } from '../task-list/task-list.component';
import { TimePlayerComponent } from "../time-player/time-player.component";

@Component({
  selector: 'app-main-view',
  imports: [TaskListComponent, TimePlayerComponent],
  templateUrl: './main-view.component.html',
  styleUrl: './main-view.component.scss'
})
export class MainViewComponent {

}
