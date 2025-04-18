import { Routes } from '@angular/router';
import { TaskCardComponent } from './task-card/task-card.component';
import { TestCardGenComponent } from './test-card-gen/test-card-gen.component';
import { AddEditTaskComponent } from './add-edit-task/add-edit-task.component';
import { MainViewComponent } from './main-view/main-view.component';

export const routes: Routes = [{path:'taskCard',component:TaskCardComponent},
    {path:'',component:MainViewComponent},
    {path:'testcardgen',component:TestCardGenComponent},
    {path:'addTask',component:AddEditTaskComponent},
    {path:'editTask/:id',component:AddEditTaskComponent}
];
