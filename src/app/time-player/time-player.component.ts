import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { TimerService, TimerState } from '../services/timer.service';
import { Subscription } from 'rxjs';
import { Duration } from './TimerConfiguration';
const ORIGINAL_BUTTON_STATE = {start:true,pause:false,restart:false}
@Component({
  selector: 'app-time-player',
  imports: [],
  templateUrl: './time-player.component.html',
  styleUrl: './time-player.component.scss'
})
export class TimePlayerComponent implements OnDestroy,OnChanges,OnInit{
    @Input() configuration:Duration = {minutes:25,seconds:0};
    minutesLeft!:number;
    secondsLeft!:number;
    stateSub!:Subscription
    timeLeftSub!:Subscription
    timerState!:TimerState;
    canStart:boolean= ORIGINAL_BUTTON_STATE.start;
    canPause:boolean=ORIGINAL_BUTTON_STATE.pause;
    canRestart:boolean = ORIGINAL_BUTTON_STATE.restart
    message:string="Timer idle";
    constructor(private timerService:TimerService){}
    ngOnInit(): void {
        console.log("TimerPlayer is being initialized");
        
        this.timerService.configureTimer(this.configuration.minutes,this.configuration.seconds)
        this.resetDisplay();
        this.stateSub = this.timerService.getStateSubject().subscribe((state)=>
            {
                console.log(`State:${state}`);
                this.monitorTimerState(state)
            }
        )
        this.timeLeftSub = this.timerService.getTimeLeftSubject().subscribe(
            (timeLeft)=>{
            this.minutesLeft = timeLeft.minutes
            this.secondsLeft = timeLeft.seconds
            })
    }
    ngOnDestroy(): void {
        console.log("TimerPlayer is being destroyed!");
        this.unsubscribe(this.stateSub);
        this.unsubscribe(this.timeLeftSub);
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
    monitorTimerState(state:TimerState)
    {
        console.log(`In monitorTimerState: ${state}`);
        
        if (state==TimerState.RUNNING)
        {
            this.canStart = false;
            this.canPause = true;
            this.canRestart = true;
            this.message = "Timer is running!"
        }
        else if (state == TimerState.PAUSED)
        {
            this.canPause  = false;
            this.canStart = true;
            this.canRestart = true;
            this.message = "Timer is paused!"
        }
        else if (state == TimerState.FINISHED)
        {
            this.resetButtonStates()
            this.resetDisplay()
            this.message = "Timer is finished!"
            // Other finish logic relating to tasks
        }else if (state == TimerState.RESTART)
        {
            this.resetButtonStates()
            this.resetDisplay()
            this.message = "Timer is Restarted!"
        }else if (state == TimerState.OFF)
        { 
            this.message="Timer idle"
        }
    }
    resetButtonStates()
    {
        this.canStart = ORIGINAL_BUTTON_STATE.start;
        this.canPause = ORIGINAL_BUTTON_STATE.pause;
        this.canRestart = ORIGINAL_BUTTON_STATE.restart;
    }
    resetDisplay()
    {
        this.minutesLeft = this.configuration.minutes
        this.secondsLeft = this.configuration.seconds
    }
    unsubscribe(subscription:Subscription)
    {
        if (subscription!=undefined || subscription!=null)
        {
                subscription.unsubscribe();
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
        this.timerService.PauseTimer()
    }

    onResetButton()
    {
        this.timerService.ResetTimer()
        this.resetDisplay()
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
