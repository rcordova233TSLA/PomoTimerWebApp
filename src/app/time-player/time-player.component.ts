import { Component, Input, OnDestroy } from '@angular/core';
import { TimerService } from '../services/timer.service';
import { Observable, Subscription, take, timer } from 'rxjs';

@Component({
  selector: 'app-time-player',
  imports: [],
  templateUrl: './time-player.component.html',
  styleUrl: './time-player.component.scss'
})
export class TimePlayerComponent implements OnDestroy{
    @Input() scheduledMinutes:number=25
    @Input() timerSeconds:number = 0
    minutesLeft:number;
    secondsLeft:number;
    currentSub!: Subscription
    constructor(private timerService:TimerService){
        timerService.configureTimer(this.scheduledMinutes,this.timerSeconds)
        this.minutesLeft = this.scheduledMinutes
        this.secondsLeft = this.timerSeconds
    }

    ngOnDestroy(): void {
        if (this.currentSub!=undefined || this.currentSub!=null)
        {
            this.currentSub.unsubscribe();
        }
    }

    onStartButton()
	{
        const intervalObservable = this.timerService.StartTimer()
        this.currentSub = intervalObservable.subscribe(
            (secondsPassed)=>{
                console.log(secondsPassed);
                this.updateTimeFields()
            }
        )
    }
    updateTimeFields()
    {
        const updatedTime = (this.minutesLeft*60+this.secondsLeft) -1;
        this.minutesLeft = Math.floor(updatedTime/60)
        this.secondsLeft = updatedTime%60
    }
    onPauseButton()
    { 
        this.currentSub.unsubscribe()
        this.timerService.StopTimer()
    }

    onResetButton()
    {
        this.currentSub.unsubscribe()
        this.timerService.ResetTimer()
        this.minutesLeft = this.scheduledMinutes // change to scheduledMinutes
        this.secondsLeft = this.timerSeconds // change to scheduledSeconds
    }
}
