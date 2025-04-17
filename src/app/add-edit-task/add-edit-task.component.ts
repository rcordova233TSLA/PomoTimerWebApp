import { Component, OnInit } from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { TaskFetcherService } from '../services/task-fetcher.service';
import { TaskItem } from '../services/TaskItem';
enum State{
    EDIT,
    CREATE
}
@Component({
  selector: 'app-add-edit-task',
  imports: [FormsModule],
  templateUrl: './add-edit-task.component.html',
  styleUrl: './add-edit-task.component.scss'
})
export class AddEditTaskComponent implements OnInit{
    title!:string;
    task!:TaskItem;
    state!:State;
    constructor(private route:ActivatedRoute,
                private router:Router,
                private taskFetcher:TaskFetcherService
    ){}

    //Following hw5 example
    ngOnInit(): void {
        let id = this.route.snapshot.params['id'];
        if (id) 
        {
            // Check for valid task
            if (this.taskFetcher.getTask(id) == null)
            {
                console.log(`Task ${id} not found, going home`);
                this.router.navigate(['/'])
                

            }
            else
            {
                this.title = 'Edit Contact';
                this.task = this.taskFetcher.getTask(id)!;
                this.state = State.EDIT;
            }
        } 
        else
        {
          this.title = 'Add Contact';
          this.task = this.taskFetcher.createTask();
          this.state = State.CREATE;
        //   this.friend = this.provider.addFriend();
        }
    }

    onSubmit(form:NgForm)
    {
        if (!form.valid)
        {
            console.log("Form has missing values");
            
        }
        console.log("Adding task");
        
        //Save to list
        this.taskFetcher.addTask(this.task);
        this.router.navigate(['/'])
    }
    onCancel()
    {
        this.router.navigate(['/'])
    }
}
