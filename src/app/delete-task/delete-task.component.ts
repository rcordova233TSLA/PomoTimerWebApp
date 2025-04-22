import { Component, OnInit } from '@angular/core';
import { TaskCardComponent } from "../task-card/task-card.component";
import { TaskFetcherService } from '../services/task-fetcher.service';
import { TaskItem } from '../services/TaskItem';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete-task',
  imports: [TaskCardComponent,CommonModule],
  templateUrl: './delete-task.component.html',
  styleUrl: './delete-task.component.scss'
})
export class DeleteTaskComponent implements OnInit{
    task:TaskItem|null=null;
    constructor(private taskFetcher:TaskFetcherService, 
                private route:ActivatedRoute,
                private router:Router
            ){}
    ngOnInit(): void {
        let id = this.route.snapshot.params['id'];
        if (id)
        {
            this.task = this.taskFetcher.getTask(id); 
        } 
    }
    onDelete()
    {
        this.taskFetcher.deleteTask(this.task!)
        this.router.navigate(['/'])
    }
    onCancel()
    {
        this.router.navigate(['/'])
    }
}
