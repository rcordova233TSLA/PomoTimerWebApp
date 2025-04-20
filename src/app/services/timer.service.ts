import { Injectable } from '@angular/core';
import { interval, Observable,Subject,Subscription,take } from 'rxjs';
import { TimerConfig } from '../time-player/TimerConfiguration';
export enum TimerState
{
    OFF,
    PAUSED,
    RUNNING,
    FINISHED
}
@Injectable({
  providedIn: 'root'
})
export class TimerService {
    startTime: number|null = null
    // Duration in seconds 
    configuredDuration!: number 
    activeInterval:Observable<number>|null=null;
    state:TimerState=TimerState.OFF;
    counterSubscription!:Subscription;
    stateSubject:Subject<TimerState>;
    timeLeftSub:Subject<TimerConfig>
    internalCounter:number = 0;

    constructor() {
        this.timeLeftSub = new Subject<TimerConfig>; 
        this.stateSubject = new Subject<TimerState>;
        this.stateSubject.next(TimerState.OFF)
    }
    getStateSubject()
    {
        return this.stateSubject
    }
    getTimeLeftSubject()
    {
        return this.timeLeftSub
    }
    configureTimer(minutes:number,seconds:number)
    {
        this.configuredDuration = minutes*60+seconds;

    }
    createNewInterval(seconds:number):Observable<number>
	{
        const newInterval = interval(1000); //emit every second
        const intervalTake = newInterval.pipe(take(seconds));
        return intervalTake;
    }
    startInternalCounter()
    {

        if (this.activeInterval!= null)
        {
            this.counterSubscription = this.activeInterval.subscribe(
            {
                next:this.pumpCounter.bind(this),
                error: (error)=>{console.log(error);},
                complete:this.onTimerComplete.bind(this)
            })	
        }
    }
    /**
     * Counter logic for each interval increment
     * @param count:number
     */
    pumpCounter(count:number)
    {
        this.internalCounter = count;
        console.log('internal counter %d',this.internalCounter);
        console.log("TimerState: %d",this.state)
        const timeLeft = this.getRemainingTime(count+1)
        this.timeLeftSub.next(timeLeft) 
    }
    onTimerComplete()
    {
        console.log("Internal Counter before if finished: %d",this.internalCounter);
        if (this.isTimerFinished())
        {
            // Finished logic....
            this.state == TimerState.FINISHED
            this.stateSubject.next(TimerState.FINISHED);
            console.log("TimerFinished");
        }
    }
    /**
     * 
     * @returns Observable of active interval being used by timer service
     */
    //TODO make this method less confusing.... split up into smaller functions
    StartTimer():Observable<number>
    {
        if (this.startTime == null)
        {
            // Fresh start after reset or upon first start
            // this.startTime = Date.now()/1000
            this.activeInterval = this.createNewInterval(this.configuredDuration);
            this.startInternalCounter()
        }
        else
        {
            //Assuming a pause/start has happened
            // const currentTime = Date.now()/1000
            const timeLeft:number = this.configuredDuration - (this.internalCounter+1) //Counter starts at 0
            this.activeInterval = this.createNewInterval(timeLeft)
            this.startInternalCounter()
        }
        this.state = TimerState.RUNNING
        this.stateSubject.next(TimerState.RUNNING)
        return this.activeInterval;
    }

    PauseTimer()
    {
        this.state = TimerState.PAUSED
        this.activeInterval = null;
        this.counterSubscription.unsubscribe()
    }
    
    ResetTimer()
    {
        this.state = TimerState.OFF;
        if (this.counterSubscription!=undefined || this.counterSubscription!=null)
        {
            this.counterSubscription.unsubscribe()
        }
        this.activeInterval = null;
        this.startTime = null;
    }
    //TODO implement cleanup function
    /**
     * Unsubscribe from internal subscription, if not null/undefined. Set activeInterval and startTime to null
     */
    cleanUp():void
    {
        if (this.counterSubscription!=undefined || this.counterSubscription!=null)
        {
            this.counterSubscription.unsubscribe()
        }
        this.activeInterval = null;
        this.startTime = null;
    }
    //TODO replace isTimerRunning/Paused with getState and move check to caller of service method 
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
    /**
     * 
     * @returns true if internal counter reaches configured duration time
     */
    isTimerFinished():boolean
    {
        if ((this.internalCounter+1) == this.configuredDuration)
        {
            return true;
        }
        return false;
    }
    updateState(state:TimerState)
    {
        this.state = state;
        this.stateSubject.next(state);
    }
    getMinutesLeft(count:number)
    {
        const minutesLeft = this.configuredDuration
        return Math.floor(minutesLeft/60)
    }
    /**
     * 
     * @param count number corresponding to seconds passed
     * @returns Object with minutes and seconds properties
     */
    getRemainingTime(count:number):TimerConfig
    {
        const remainingTime = this.configuredDuration-count
        const minutesLeft = Math.floor(remainingTime/60)
        const secondsLeft = remainingTime%60
        return {minutes:minutesLeft,seconds:secondsLeft}
    }
}
