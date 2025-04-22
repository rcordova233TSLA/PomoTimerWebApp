import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, min, Observable,Subject,Subscription,take } from 'rxjs';
import { Duration } from '../time-player/TimerConfiguration';
export enum TimerState
{
    OFF,
    PAUSED,
    RUNNING,
    FINISHED,
    RESTART
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
    stateSubject:BehaviorSubject<TimerState>;
    timeLeftSub:Subject<Duration>
    internalCounter:number = 0;

    constructor() {
        this.timeLeftSub = new Subject<Duration>; 
        this.stateSubject = new BehaviorSubject<TimerState>(TimerState.OFF);
        this.stateSubject.next(this.state)
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
        this.internalCounter++;
        // console.log('Pump:internal counter %d',this.internalCounter);
        // console.log("Pump:TimerState: %d",this.state)
        const timeLeft = this.getRemainingTime()
        this.timeLeftSub.next(timeLeft) 
    }
    onTimerComplete()
    {
        console.log("Internal Counter before if finished: %d",this.internalCounter);
        //TODO Consider getting rid of isTimerFinished
        if (this.isTimerFinished())
        {
            // Finished logic....
            this.state == TimerState.FINISHED
            this.stateSubject.next(TimerState.FINISHED);
            this.internalCounter = 0;
            console.log("TimerFinished");
        }
        // this.timeLeftSub.next(this.secondsAsDuration(this.configuredDuration));
    }
    /**
     * 
     * @returns Observable of active interval being used by timer service
     */
    //TODO make this method less confusing.... split up into smaller functions
    StartTimer():Observable<number>
    {
        // if (this.startTime == null)
        // {
        //     // Fresh start after reset or upon first start
        //     // this.startTime = Date.now()/1000
        //     this.activeInterval = this.createNewInterval(this.configuredDuration);
        //     this.startInternalCounter()
        // }
        // else
        // {
            //Assuming a pause/start has happened
            // const currentTime = Date.now()/1000
        // }
        let timeLeft:number;
        if (this.internalCounter == 0)
        {
            timeLeft = this.configuredDuration//Counter starts at 0

        }
        else
        {
            timeLeft = this.configuredDuration - (this.internalCounter) //Counter starts at 0

        }
        this.activeInterval = this.createNewInterval(timeLeft)
        this.startInternalCounter()
        this.updateState(TimerState.RUNNING)
        return this.activeInterval;
    }

    PauseTimer()
    {
        this.updateState(TimerState.PAUSED)
        this.activeInterval = null;
        this.counterSubscription.unsubscribe()
    }
    
    ResetTimer()
    {
        this.updateState(TimerState.RESTART);
        this.cleanUp();
        this.internalCounter = 0;
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
    /**
     * 
     * @returns true if internal counter reaches configured duration time
    */
   isTimerFinished():boolean
   {
        if ((this.internalCounter) == this.configuredDuration)
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
    /**
     * 
     * @param count number corresponding to seconds passed
     * @returns Object with minutes and seconds properties
     */
    getRemainingTime():Duration
    {
        const remainingTime = this.configuredDuration-this.internalCounter
        return this.secondsAsDuration(remainingTime)
    }
    secondsAsDuration(seconds:number):Duration
    {
        const minutesWhole = Math.floor(seconds/60)
        const remainingSeconds = seconds%60
        return {minutes:minutesWhole,seconds:remainingSeconds}
    }



    // Functions to consider deleting
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
}
