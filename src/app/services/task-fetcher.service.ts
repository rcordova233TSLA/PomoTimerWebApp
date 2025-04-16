import { Injectable } from '@angular/core';
import { TaskItem } from './TaskItem';
import { StorageSaverService } from './storage-saver.service';

@Injectable({
  providedIn: 'root'
})
export class TaskFetcherService {
	taskMap:Map<number,TaskItem>;
	// Get from local storage
	saveToUnkownProj()
	{
		
	}
	saveToSpecProj()
	{

	}
	constructor(private storageSaver:StorageSaverService) 
	{
		// Get map from local storage or initialize to empty
        this.taskMap = new Map<number,TaskItem>();
        this.testMapSaving()
	}
    
    testMapSaving()
    {
        this.taskMap.set(1, new TaskItem(1,"test"))
        console.log("Map before storage save");
        console.log(this.taskMap);
        this.storageSaver.saveTaskMapToStorage(this.taskMap);
        console.log("Map after storage save");
        this.taskMap = this.storageSaver.getTaskMapFromStorage();
        console.log(this.taskMap);
    }
}
