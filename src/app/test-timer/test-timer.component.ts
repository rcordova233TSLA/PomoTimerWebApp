import { Component } from '@angular/core';
import { TimePlayerComponent } from '../time-player/time-player.component';
import { FormsModule } from '@angular/forms';
import { TimerConfig } from '../time-player/TimerConfiguration';
@Component({
  selector: 'app-test-timer',
  imports: [TimePlayerComponent,FormsModule],
  templateUrl: './test-timer.component.html',
  styleUrl: './test-timer.component.scss'
})
export class TestTimerComponent {
    minutesInput:number=25;
    secondsInput:number = 0;
    configuration:TimerConfig = {minutes:25,seconds:0}
    constructor(){
        
    }
    onSetTimerButton()
    {
        console.log(this.minutesInput);
        console.log(this.secondsInput);
        this.configuration = {minutes:this.minutesInput,seconds:this.secondsInput}        
    }
}
