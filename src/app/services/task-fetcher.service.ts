import { Injectable } from '@angular/core';
import { TaskItem } from './TaskItem';
import { StorageSaverService } from './storage-saver.service';
import { TaskDatabase } from './TaskDatabase';

@Injectable({
  providedIn: 'root'
})
export class TaskFetcherService {
	// taskMap:Map<String,Array<TaskItem>>;
    taskDatabase:TaskDatabase;
	// Get from local storage
	saveToUnkownProj()
	{
		
	}
	saveToSpecProj()
	{

	}
	constructor(private storageSaver:StorageSaverService) 
	{

        /*
		// Get map from local storage or initialize to empty
        if (storageSaver.isDataInStorage())
        {
            this.taskMap = storageSaver.getAllData();
        }
        else
        {
            this.taskMap = new Map<string,Array<TaskItem>>();
        }
        */
        this.taskDatabase = new TaskDatabase();


        /*
        if (window.localStorage.getItem('Database'))
        {
            this.taskMap = storageSaver.getTaskMapFromStorage()
        }
        else
        {
            this.taskMap = new Map<number,TaskItem>();
        }
        // this.testMapSaving()
        */
	}
    /* 
    Task Add/Edit Functions
    */
    createTask()
    {
        const nextAvailableId = this.taskDatabase.getNextAvailableId();
        console.log(`nextAvailableId: ${nextAvailableId}`);
        
        let newTask:TaskItem = new TaskItem(nextAvailableId);
        return newTask;
    }
    getTask(id:number):TaskItem|null
    {
        let taskReturned:TaskItem|null;
        taskReturned = this.taskDatabase.getTask(id);
        return taskReturned
    }





    /**
     * 
     * @param task TaskItem to add to map and local storage 
     * @param project Project to assign task under, defaults to NoProject
     */
    addTask(task:TaskItem,project:string="NoProject"):void
    {
        this.taskDatabase.addToMap(task,project);
        //Push update to localstorage 
        // this.storageSaver.updateProject(project,taskArray);
    }
/*
    getListForProject(project:string):Array<TaskItem>
    {
        const listToReturn:Array<TaskItem>|undefined = this.taskMap.get(project);
        if (listToReturn == undefined)
        {
            return new Array<TaskItem>();
        }
        return listToReturn;

    }


*/
/*    
    getMaxId():number
    {
        let maxId:number;
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
*/
}
