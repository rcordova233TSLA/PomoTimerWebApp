import { Component } from '@angular/core';
import { TimePlayerComponent } from '../time-player/time-player.component';
import { Duration } from '../time-player/TimerConfiguration';
const workConfig:Duration = {minutes:25,seconds:0}
const shortBreakConfig:Duration = {minutes:5,seconds:0}
const longBreakConfig:Duration = {minutes:15,seconds:0}

@Component({
  selector: 'app-sprint-break-view',
  imports: [TimePlayerComponent],
  templateUrl: './sprint-break-view.component.html',
  styleUrl: './sprint-break-view.component.scss'
})
export class SprintBreakViewComponent {
    configuration:Duration = workConfig
    overrideTimer: boolean =false;
    onWork()
    {
        this.configuration = workConfig;
        this.overrideTimer = true;

    }
    onShort()
    {
        this.configuration = shortBreakConfig;
        this.overrideTimer = true;
    }
    onLong()
    {
        this.configuration = longBreakConfig;
        this.overrideTimer = true;
    }
}
