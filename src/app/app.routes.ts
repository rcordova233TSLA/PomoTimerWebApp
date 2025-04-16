import { Routes } from '@angular/router';
import { TaskCardComponent } from './task-card/task-card.component';
import { TestCardGenComponent } from './test-card-gen/test-card-gen.component';

export const routes: Routes = [{path:'taskCard',component:TaskCardComponent},
    {path:'testcardgen',component:TestCardGenComponent}
];
