import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TaskCardComponent } from '../task-card/task-card.component';
import { TaskFetcherService } from '../services/task-fetcher.service';
import { TaskItem } from '../services/TaskItem';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-task-list',
  imports: [TaskCardComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent implements OnInit,OnDestroy {
    taskList:Array<TaskItem>=[];
    @Input() subjectKey!:string;
    subscription!: Subscription;
    // subject!: Subject<Array<TaskItem>>;
    constructor(private taskFetcher:TaskFetcherService)
    {

    }
    ngOnInit(): void {
        console.log("In Task List Component init");
        // Attempt to get subject for key specified
        if (this.subjectKey == undefined)
        {
            this.subjectKey = "ALL"
        }
        // this.taskFetcher.taskDatabase.intializeProjectSub(this.subjectKey);
        const subjectRef = this.taskFetcher.taskDatabase.getSubject(this.subjectKey)!;
        this.subscription = subjectRef.subscribe({
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

    ngOnDestroy(): void {
        this.subscription.unsubscribe()
    }
}
