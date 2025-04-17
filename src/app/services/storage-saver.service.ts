import { Injectable } from '@angular/core';
import { TaskItem } from "./TaskItem";

@Injectable({
  providedIn: 'root'
})
export class StorageSaverService {

    constructor() { }
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
}
