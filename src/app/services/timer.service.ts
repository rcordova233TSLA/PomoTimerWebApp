import { Injectable } from '@angular/core';
import { interval, Observable,Subject,Subscription,take } from 'rxjs';
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
    configuredDuration!: number //seconds
    activeInterval:Observable<number>|null=null;
    state:TimerState=TimerState.OFF;
    internalSubscription!:Subscription;
    internalCounter:number = 0;
    stateSubject:Subject<TimerState>;
    constructor() {
        this.stateSubject = new Subject<TimerState>;
        this.stateSubject.next(TimerState.OFF)
    }
    getStateSubject()
    {
        return this.stateSubject
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
            this.internalSubscription = this.activeInterval.subscribe((count)=>{
                this.internalCounter = count;
                console.log("Internal Counter before if finished: %d",this.internalCounter);
                if ((this.internalCounter+1) == this.configuredDuration)
                {
                    // Finished logic....
                    this.state == TimerState.FINISHED
                    this.stateSubject.next(TimerState.FINISHED);
                    console.log("TimerFinished");
                }
                console.log('internal counter %d',this.internalCounter);
                console.log("TimerState: %d",this.state) 
            })	
        }
    }
    StartTimer():Observable<number>
    {
        if (this.startTime == null)
        {
            // Fresh start after reset or upon first start
            this.startTime = Date.now()/1000
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
        this.internalSubscription.unsubscribe()
    }
    
    ResetTimer()
    {
        this.state = TimerState.OFF;
        if (this.internalSubscription!=undefined || this.internalSubscription!=null)
        {
            this.internalSubscription.unsubscribe()
        }
        this.activeInterval = null;
        this.startTime = null;
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
