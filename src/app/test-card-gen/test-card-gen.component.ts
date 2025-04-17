import { Component } from '@angular/core';
import { TaskFetcherService } from '../services/task-fetcher.service';

@Component({
  selector: 'app-test-card-gen',
  imports: [],
  templateUrl: './test-card-gen.component.html',
  styleUrl: './test-card-gen.component.scss',
  standalone: true
})
export class TestCardGenComponent {

    constructor(private taskFetcher:TaskFetcherService){}

}
