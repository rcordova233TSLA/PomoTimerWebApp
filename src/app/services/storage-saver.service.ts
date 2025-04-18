import { Injectable } from '@angular/core';
import { TaskItem } from "./TaskItem";
import { DatabaseKeys } from './TaskDatabase';
@Injectable({
  providedIn: 'root'
})
export class StorageSaverService {

    constructor() { }
    
    isDataInStorage():boolean
    {
        if (window.localStorage.length >0)
        {
            return true;
        }
        return false;
    }
    /**
     * 
     * @returns Get a map of all task items in local storage
     */
    getMapData(): Map<string,Array<TaskItem>>
    {
        const mapToReturn = new Map<string,Array<TaskItem>>;
        const storageSize = window.localStorage.length
        
        for (let i=0;i<storageSize;i++)
        {
            const key:string = window.localStorage.key(i)!;
            if (key == DatabaseKeys.TaskIds)
            {
                continue;
            }
            // Should be array of tasks, will fail if nontask items are in localstorage
            const val:Array<TaskItem> = this.getTasksForProj(key)!;
            mapToReturn.set(key!,val)	
        }
        return mapToReturn
    }
    
    getTaskIds():Array<number>
    {
        const taskIds:Array<number> = JSON.parse(window.localStorage.getItem(DatabaseKeys.TaskIds)!);
        return taskIds;
    }
    /**
     * 
     * @param key Project name to organize array value under
     * @param val Array of tasks to assign to key in local storage
     */
    updateProject(key:string,val:Array<TaskItem>):void
    {
        const arrayJsonStr:string = JSON.stringify(val);  
        window.localStorage.setItem(key,arrayJsonStr);
    }
    
    updateTaskIds(newArray:Array<number>)
    {
        const arrayJsonStr:string = JSON.stringify(newArray);
        window.localStorage.setItem(DatabaseKeys.TaskIds,arrayJsonStr)
    }
    /**
     * 
     * @param key Project name to attempt to retrieve from storage
     * @returns Array of tasks assigned to project or null if key does not exist
     */
    getTasksForProj(key:string):Array<TaskItem>|null
    {
        const dataInStorage: string|null = window.localStorage.getItem(key);
        if (dataInStorage == null)
        {
            return null;
        }
        const projectTasks:Array<TaskItem> = JSON.parse(dataInStorage);
        return projectTasks;
    }    
    
    
    
    
    
    /*
    
    getTaskMapFromStorage():Map<number,TaskItem>
    {
        // this.taskMap = 
        return JSON.parse(window.localStorage.getItem("Database") || '{}',this.reviver);
    }
    saveTaskMapToStorage(taskMap:Map<number,TaskItem>)
    {
        window.localStorage.setItem("Database",JSON.stringify(taskMap,this.replacer));
    }
    reviver(key:any, value:any)
    {
        if(typeof value === 'object' && value !== null) {
        if (value.dataType === 'Map') {
            const map = new Map(value.value);
            for (const [k, v] of value.value) {
                // Create a real TaskItem instance
                // TODO Just got rid of label description
                const task = Object.assign(new TaskItem(0), v); // Default constructor args
                map.set(Number(k), task);
            }
            return map;
        }
        }
        return value;
    }
    // From https://stackoverflow.com/questions/16261119/typescript-objects-serialization
    // Possible efficiency loss
    replacer(key:any,value:any)
    {
        if(value instanceof Map) {
            return {
                dataType: 'Map',
                value: Array.from(value.entries()), // or with spread: value: [...value]
            };
            } else {
            return value;
            }
    }
    */

}
