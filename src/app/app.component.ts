import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskCardComponent } from "./task-card/task-card.component";
import { TestCardGenComponent } from './test-card-gen/test-card-gen.component';
import { NavbarComponent } from "./navbar/navbar.component";
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone:true
})
export class AppComponent {
  title = 'PomoTimerWebApp';
}
