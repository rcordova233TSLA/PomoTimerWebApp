import { Routes } from '@angular/router';
import { TaskCardComponent } from './task-card/task-card.component';
import { TestCardGenComponent } from './test-card-gen/test-card-gen.component';
import { AddEditTaskComponent } from './add-edit-task/add-edit-task.component';

export const routes: Routes = [{path:'taskCard',component:TaskCardComponent},
    {path:'testcardgen',component:TestCardGenComponent},
    {path:'addTask',component:AddEditTaskComponent},
    {path:'editTask/:id',component:AddEditTaskComponent}
];
