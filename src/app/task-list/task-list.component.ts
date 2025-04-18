import { Component, OnInit } from '@angular/core';
import { TaskCardComponent } from '../task-card/task-card.component';
import { TaskFetcherService } from '../services/task-fetcher.service';
import { TaskItem } from '../services/TaskItem';

@Component({
  selector: 'app-task-list',
  imports: [TaskCardComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent implements OnInit {
    taskList!:Array<TaskItem>;

    constructor(private taskFetcher:TaskFetcherService){}
    ngOnInit(): void {
        this.taskList = this.taskFetcher.getTasksAsList();
    }
}
