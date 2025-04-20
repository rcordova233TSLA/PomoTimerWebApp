import { Component } from '@angular/core';
import { TimePlayerComponent } from '../time-player/time-player.component';
import { FormsModule } from '@angular/forms';
import { TimerConfig } from '../time-player/TimerConfiguration';
const TEST_TIME:TimerConfig = {minutes:0,seconds:5}
@Component({
  selector: 'app-test-timer',
  imports: [TimePlayerComponent,FormsModule],
  templateUrl: './test-timer.component.html',
  styleUrl: './test-timer.component.scss'
})
export class TestTimerComponent {
    minutesInput:number=TEST_TIME.minutes;
    secondsInput:number = TEST_TIME.seconds;
    configuration:TimerConfig = {minutes:TEST_TIME.minutes,seconds:TEST_TIME.seconds}
    constructor(){
        
    }
    onSetTimerButton()
    {
        console.log(this.minutesInput);
        console.log(this.secondsInput);
        this.configuration = {minutes:this.minutesInput,seconds:this.secondsInput}        
    }
}
