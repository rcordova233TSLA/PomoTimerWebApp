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
        if (window.localStorage.getItem('Database'))
        {
            this.taskMap = storageSaver.getTaskMapFromStorage()
        }
        else
        {
            this.taskMap = new Map<number,TaskItem>();
        }
        // this.testMapSaving()
	}
    createTask()
    {
        const maxId = this.getMaxId();
        let newTask:TaskItem = new TaskItem(maxId+1)
        return newTask;
    }
    getTask(id:number):TaskItem|null
    {
        let taskReturned:any = null;
        for (const [key,task] of this.taskMap)
        {
            if (id == key)
            {
                taskReturned = task;
            }
        }
        return taskReturned
    }
    /**
     * 
     * @returns current max id or 0 if no tasks in map
     */
    getMaxId():number
    {
        let maxId:number
        if (this.taskMap.keys.length==0)
        {
            maxId=0;
        }
        else
        {
            maxId = Math.max(...Array.from(this.taskMap.keys()));
        }
        return maxId;
    }
    addTask(task:TaskItem):void
    {
        this.taskMap.set(task.id,task);
        this.storageSaver.saveTaskMapToStorage(this.taskMap);
    }

    getTasksAsList()
    {
        return Array.from(this.taskMap.values())
    }
    testMapSaving()
    {
        this.taskMap.set(1, new TaskItem(1))
        console.log("Map before storage save");
        console.log(this.taskMap);
        this.storageSaver.saveTaskMapToStorage(this.taskMap);
        console.log("Map after storage save");
        this.taskMap = this.storageSaver.getTaskMapFromStorage();
        console.log(this.taskMap);
    }
}
