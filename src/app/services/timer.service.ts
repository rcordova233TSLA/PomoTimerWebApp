import { Injectable } from '@angular/core';
import { interval, Observable,take } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TimerService {
    startTime: number|null = null 
    configuredDuration!: number //seconds
    activeInterval:Observable<number>|null=null;

    constructor() {}
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
    StartTimer():Observable<number>
    {
        if (this.startTime == null)
        {
            // Fresh start after reset or upon first start
            this.startTime = Date.now()
            this.activeInterval = this.createNewInterval(this.configuredDuration);	
        }
        else
        {
            //Assuming a pause/start has happened
            const currentTime = Date.now()
            const timeLeft:number = currentTime - this.startTime
            this.activeInterval = this.createNewInterval(timeLeft)
        }
        return this.activeInterval;
    }

    StopTimer()
    {
        this.activeInterval = null;
    }

    ResetTimer()
    {
        this.StopTimer()
        this.startTime = null;
    }
}
