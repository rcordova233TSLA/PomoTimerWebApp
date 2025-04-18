import { Component, Input, OnInit } from '@angular/core';
import { TaskCardComponent } from '../task-card/task-card.component';
import { TaskFetcherService } from '../services/task-fetcher.service';
import { TaskItem } from '../services/TaskItem';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-task-list',
  imports: [TaskCardComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent implements OnInit {
    taskList:Array<TaskItem>=[];
    @Input() subjectKey!:string;
    subject!: Subject<Array<TaskItem>>;
    constructor(private taskFetcher:TaskFetcherService)
    {

    }
    ngOnInit(): void {
        console.log("In Task List Component");
        // Attempt to get subject for key specified
        if (this.subjectKey == undefined)
        {
            this.subjectKey = "ALL"
        }
        else
        {
            this.taskFetcher.taskDatabase.intializeProjectSub(this.subjectKey);
        }
        this.subject = this.taskFetcher.taskDatabase.getSubject(this.subjectKey)!;
        this.subject.subscribe({
            next: (v)=>{
            console.log("Got this value from subject")
            console.log(v);
            this.taskList = v;
            console.log("TaskList after subscribe value recieved");
            
            console.log(this.taskList);
                        
            }
        })
        console.log("TaskList is");
        
        console.log(this.taskList);
        
        // this.taskList = this.taskFetcher.getAllTasks();
    }
}
