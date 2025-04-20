import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { TimerService } from '../services/timer.service';
import { Observable, Subscription, take, timer } from 'rxjs';
import { TimerConfig } from './TimerConfiguration';
enum TimerState
{
    OFF,
    PAUSED,
    RUNNING
}
@Component({
  selector: 'app-time-player',
  imports: [],
  templateUrl: './time-player.component.html',
  styleUrl: './time-player.component.scss'
})
export class TimePlayerComponent implements OnDestroy,OnChanges{
    state:TimerState;
    @Input() configuration:TimerConfig = {minutes:25,seconds:0};
    minutesLeft!:number;
    secondsLeft!:number;
    currentSub!: Subscription
    constructor(private timerService:TimerService){
        timerService.configureTimer(this.configuration.minutes,this.configuration.seconds)
        this.setTimeBasedOfCfg();
        this.state = TimerState.OFF;
    }
    setTimeBasedOfCfg()
    {
        this.minutesLeft = this.configuration.minutes
        this.secondsLeft = this.configuration.seconds
    }
    ngOnChanges(changes: SimpleChanges): void {
        if(changes['configuration'])
        {
            console.log("timer config changed");
            this.onResetButton()
            console.log("Reset Timer");
            console.log("Configuring service to new config");
            this.timerService.configureTimer(this.configuration.minutes,this.configuration.seconds)
            
        }
    }
    ngOnDestroy(): void {
        if (this.currentSub!=undefined || this.currentSub!=null)
        {
            this.currentSub.unsubscribe();
        }
    }

    onStartButton()
	{
        if (!this.isTimerRunning())
        {
            this.state = TimerState.RUNNING;
            console.log("Starting Timer");
            const intervalObservable = this.timerService.StartTimer()
            this.currentSub = intervalObservable.subscribe(
                (secondsPassed)=>{
                    console.log(secondsPassed);
                    this.updateTimeFields()
                }
            )
        }
    }
    updateTimeFields()
    {
        const updatedTime = (this.minutesLeft*60+this.secondsLeft) -1;
        this.minutesLeft = Math.floor(updatedTime/60)
        this.secondsLeft = updatedTime%60
    }
    onPauseButton()
    {
        this.state = TimerState.PAUSED
        this.currentSub.unsubscribe()
        this.timerService.StopTimer()
    }

    onResetButton()
    {
        this.state = TimerState.OFF
        if (this.currentSub!=undefined || this.currentSub!=null)
        {
            this.currentSub.unsubscribe()
        }
        this.timerService.ResetTimer()
        this.setTimeBasedOfCfg()
    }
    isTimerRunning()
    {
        if(this.state==TimerState.RUNNING)
        {
            return true;
        }
        return false;
    }
    isTimerPaused()
    {
        if(this.state==TimerState.PAUSED)
        {
            return true;
        }
        return false;
    }
}
