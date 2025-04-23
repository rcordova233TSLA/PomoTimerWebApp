import { Component } from '@angular/core';
import { WordViewComponent } from "../word-view/word-view.component";

@Component({
  selector: 'app-test-word-view',
  imports: [WordViewComponent],
  templateUrl: './test-word-view.component.html',
  styleUrl: './test-word-view.component.scss'
})
export class TestWordViewComponent {

}
