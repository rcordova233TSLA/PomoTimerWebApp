import { Injectable } from '@angular/core';
import { interval, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TimerService {
    timeObservable:Observable<number>
    constructor() { 
        this.timeObservable = interval(1000);
    }

    getTimerObservable():Observable<number>
    {
        return this.timeObservable;
    }
}
