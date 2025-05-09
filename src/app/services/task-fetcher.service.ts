import { Injectable } from '@angular/core';
import { TaskItem, TaskProperties } from './TaskItem';
import { StorageSaverService } from './storage-saver.service';
import { ChangeType, DatabaseKeys, TaskChange, TaskDatabase } from './TaskDatabase';

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

        this.taskDatabase = new TaskDatabase();
        if (this.taskDatabase.getSizeTaskMap() == 0)
        {
            if (storageSaver.isDataInStorage())
            {
                this.taskDatabase.setTaskIds(storageSaver.getTaskIds());
                console.log("Got task ids from storage");
                this.taskDatabase.setTaskMap(storageSaver.getMapData());
                console.log("Got tasks from storage");
                
            }
        }
	}
    /* 
    Task Add/Edit Functions
    */
    createTask()
    {
        const nextAvailableId = this.taskDatabase.getNextAvailableId();
        console.log(`nextAvailableId: ${nextAvailableId}`);
        
        let newTask:TaskItem = new TaskItem(nextAvailableId);
        //Update used taskIds in local storage
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
    // TODO don't need project param, can use project in Task
    addTask(task:TaskItem):void
    {
        if (task.projectName!=DatabaseKeys.NoProject)
        {
            this.taskDatabase.intializeProjectSub(task.projectName)
        }
        this.taskDatabase.addTask(task);
        // Update project in local storage
        this.storageSaver.updateProject(task.projectName,this.taskDatabase.getTaskForProj(task.projectName)!)
        this.storageSaver.updateTaskIds(this.taskDatabase.getTaskIds()) 
    }

    getAllTasks()
    {
        return this.taskDatabase.getAllTasks();
    }
    deleteTask(task:TaskItem)
    {
        this.taskDatabase.deleteTask(task);
        this.storageSaver.updateProject(task.projectName,this.taskDatabase.getTaskForProj(task.projectName)!)
        this.storageSaver.updateTaskIds(this.taskDatabase.getTaskIds()) 
    }
    updateTask(task:TaskItem,updateObject:TaskProperties)
    {
            // Local Changes
            const change:TaskChange|undefined = this.taskDatabase.updateTaskFields(task,updateObject);
            if (change?.change == ChangeType.PROJECT)
            {
                this.storageSaver.updateProject(change.newVal,this.taskDatabase.getTaskForProj(change.newVal)!);
                this.storageSaver.updateProject(change.oldVal,this.taskDatabase.getTaskForProj(change.oldVal)!);
            }
            // Database changes on active project reference for non project related changes
            // TODO streamline change process
            this.storageSaver.updateProject(task.projectName,this.taskDatabase.getTaskForProj(task.projectName)!);



    }
}
