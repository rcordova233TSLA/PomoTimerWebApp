import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { TimerService, TimerState } from '../services/timer.service';
import { Observable, Subscription, take, timer } from 'rxjs';
import { Duration } from './TimerConfiguration';
const ORIGINAL_BUTTON_STATE = {start:true,pause:false}
@Component({
  selector: 'app-time-player',
  imports: [],
  templateUrl: './time-player.component.html',
  styleUrl: './time-player.component.scss'
})
export class TimePlayerComponent implements OnDestroy,OnChanges{
    @Input() configuration:Duration = {minutes:25,seconds:0};
    minutesLeft!:number;
    secondsLeft!:number;
    currentSub!: Subscription
    stateSub:Subscription
    timeLeftSub:Subscription
    timerState!:TimerState;
    canStart:boolean= ORIGINAL_BUTTON_STATE.start;
    canPause:boolean=ORIGINAL_BUTTON_STATE.pause;
    constructor(private timerService:TimerService){
        timerService.configureTimer(this.configuration.minutes,this.configuration.seconds)
        this.setTimeBasedOfCfg();
        this.stateSub = timerService.getStateSubject().subscribe((state)=>
        {
            this.monitorTimerState(state)
        }
        )
        this.timeLeftSub = timerService.getTimeLeftSubject().subscribe((timeLeft)=>{
            this.minutesLeft = timeLeft.minutes
            this.secondsLeft = timeLeft.seconds
        })
    }
    monitorTimerState(state:TimerState)
    {
        if (state==TimerState.RUNNING)
        {
            this.canStart = false;
            this.canPause = true;
        }
        else if (state == TimerState.PAUSED)
        {
            this.canPause = false;
        }
        else if (state == TimerState.FINISHED)
        {
            this.canStart = ORIGINAL_BUTTON_STATE.start;
            this.canPause = ORIGINAL_BUTTON_STATE.pause;
            this.resetDisplay()
        }
    }
    resetDisplay()
    {
        this.minutesLeft = this.configuration.minutes
        this.secondsLeft = this.configuration.seconds
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
            console.log("Starting Timer");
            this.timerService.StartTimer()
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
        this.currentSub.unsubscribe()
        this.timerService.PauseTimer()
    }

    onResetButton()
    {
        if (this.currentSub!=undefined || this.currentSub!=null)
        {
            this.currentSub.unsubscribe()
        }
        this.timerService.ResetTimer()
        this.setTimeBasedOfCfg()
    }
    isTimerRunning()
    {
        
        if(this.timerState == TimerState.RUNNING)
        {
            return true;
        }
        return false;
    }
    isTimerPaused()
    {
        return this.timerService.isTimerPaused()
    }
}
