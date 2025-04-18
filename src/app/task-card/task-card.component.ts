import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card'
@Component({
  selector: 'app-task-card',
  imports: [MatCardModule,CommonModule],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss',
  standalone:true
})
export class TaskCardComponent {
    @Input() id!:number;
    @Input() label!:string;
    @Input() description:string|null=null;
    @Input() project:string|null=null;
}
