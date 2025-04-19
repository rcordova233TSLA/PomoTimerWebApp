import { Component } from '@angular/core';
import { TimerService } from '../services/timer.service';
import { Observable, Subscription, take, timer } from 'rxjs';

@Component({
  selector: 'app-time-player',
  imports: [],
  templateUrl: './time-player.component.html',
  styleUrl: './time-player.component.scss'
})
export class TimePlayerComponent {
    currentMinutes:number = 25;
    currentSeconds:number = 0;
    timerSub = new Subscription();
    numberToTake:Observable<number>;
    constructor(private timerService:TimerService){
        this.numberToTake = timerService.getTimerObservable().pipe(take(25));
        this.timerSub = this.numberToTake.subscribe((x)=>{
            console.log('Next val: ',x);
        });
    }
}
