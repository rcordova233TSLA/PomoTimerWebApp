import { Routes } from '@angular/router';
import { TaskCardComponent } from './task-card/task-card.component';
import { TestCardGenComponent } from './test-card-gen/test-card-gen.component';
import { AddEditTaskComponent } from './add-edit-task/add-edit-task.component';
import { MainViewComponent } from './main-view/main-view.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TimePlayerComponent } from './time-player/time-player.component';

export const routes: Routes = [{path:'taskCard',component:TaskCardComponent},
    {path:'',component:MainViewComponent},
    // {path:'',component:TaskListComponent},
    {path:'testTaskList',component:TaskListComponent},
    {path:'testcardgen',component:TestCardGenComponent},
    {path:'testTimer',component:TimePlayerComponent},
    {path:'addTask',component:AddEditTaskComponent},
    {path:'editTask/:id',component:AddEditTaskComponent}
];
