import { BehaviorSubject, Subject } from "rxjs";
import { TaskItem } from "./TaskItem";
export enum DatabaseKeys{
    All="ALL",
    NoProject = "NOPROJECT",
    TaskIds = "TASKIDS"
}
export class TaskDatabase
{
    private taskMap:Map<string,Array<TaskItem>>;
    private taskIds:Array<number>;
    //TODO Might have to use a behavior subject
    private projectSubjects: Map<string,BehaviorSubject<Array<TaskItem>>>


    constructor()
    {
        // No local storage available
        this.taskMap = new Map<string,Array<TaskItem>>;
        this.taskIds = new Array<number>;
        this.projectSubjects = new Map<string,BehaviorSubject<Array<TaskItem>>>;
        // this.intializeProjectSub(DatabaseKeys.All);
        // this.intializeProjectSub(DatabaseKeys.NoProject);
    }

    /*
    DataStructure fetching
    */
    getSizeTaskMap():number
    {
        return this.taskMap.size;
    }
    /**
     * 
     * @returns copy of taskIds at the snapshot function is called
     */
    getTaskIds():Array<number>
    {
        return [...this.taskIds];
    }
    /**
     * 
     * @param inMap Map of proj:taskLists from localstorage or other source
     */
    setTaskMap(inMap:Map<string,TaskItem[]>)
    {
        this.taskMap = inMap;
        // Restore subjects
        this.restoreSubjects();
        // Update subjects
        this.updateAllSubjects();

    }
    /**
     * 
     * @param inArray Array of taskIds from local storage or other source
     */
    setTaskIds(inArray:Array<number>)
    {
        this.taskIds = inArray;
    }
    /*
    Task Fetching
    */
    getTaskForProj(projectName:string):TaskItem[]|undefined
    {
        if (projectName==DatabaseKeys.All)
        {
            return this.getAllTasks();
        }
        return this.taskMap.get(projectName)
    }
    getTask(id:number): TaskItem | null
    {
        let rv = null;
        let taskFound:boolean = false;
        for (const [key,taskList] of this.taskMap)
        {
            if (!taskFound)
            {
                for (let i=0;i<taskList.length;i++)
                {
                    if (taskList[i].id == id)
                    {
                        taskFound = true;
                        rv = taskList[i];
                        break;
                    }
                }
            }
            else
            {
                break;
            }
        }
        return rv;
    }
    /*
    Task Id operationss
    */
    getMaxId():number
    {
        let rv:number;
        if (this.taskIds.length == 0)
        {
            rv = 0;
        }
        else
        {
            rv = Math.max(...this.taskIds);
        }
        return rv;
    }
    getNextAvailableId():number
    {
        return this.getMaxId()+1;
    }

    /**
     * 
     * @param task TaskItem to add to map and local storage 
     * @param project Project to assign task under, defaults to NoProject
     */
    addTask(task:TaskItem):void
    {
        // console.log(`Pre add`);
        // console.log(this.taskMap);
        
        const projName:string = task.projectName;
        
        // TODO Might have to make a shallow copy of array
        //list to update
        const taskArray:Array<TaskItem> = this.getVal(projName);
        //Local update
        taskArray.push(task);
        // console.log(`Post add`);
        // console.log(this.taskMap);
        
        //Update ids
        this.taskIds.push(task.id);
        // Subject specific update
        this.updateSubject(projName,taskArray)
        // All tasks update subscribers
        this.updateSubject(DatabaseKeys.All,this.getAllTasks());
    }

    getVal(project:string):Array<TaskItem>
    {
        let listToReturn:Array<TaskItem>|undefined = this.taskMap.get(project);
        if (listToReturn == undefined)
        {
            listToReturn= new Array<TaskItem>();
            this.taskMap.set(project,listToReturn)
        }
        return listToReturn;

    }

    getAllTasks():Array<TaskItem>
    {
        let combinedArray:Array<TaskItem>  = []
        for (const [key,taskList] of this.taskMap)
        {
            combinedArray = combinedArray.concat(taskList);
        }
        return combinedArray;
    }
    
    /*
    Subject specific functions
    */
   
    /**
     * 
     * @param project Project to attempt intialization of new subject
     * @returns true if subject does not exist, false if project subject already initialized
     */
    //TODO on referesh, there might be some breaking of the subjects with data is set from storage
    intializeProjectSub(project:string):boolean
    {   
        if(this.projectSubjects.get(project) == undefined)
        {
            const newSubject = new BehaviorSubject<TaskItem[]>([])
            this.projectSubjects.set(project,newSubject);
            return true;
        }
        else
        {
            return false;
        }
    }

    /**
     * 
     * @param project Project to attempt to get subject for
     * @returns subject or undefined if no subject has been initialized
     */
    getSubject(project:string):Subject<Array<TaskItem>> | undefined
    {
        this.intializeProjectSub(project);
        return this.projectSubjects.get(project);
    }

    updateSubject(projectName:string,newVal:TaskItem[])
    {
        this.intializeProjectSub(projectName);
        const projSub = this.projectSubjects.get(projectName)!;
        projSub.next(newVal);
    }
    updateAllSubjects():void
    {
        for (const [project,subject] of this.projectSubjects)
        {
            if (this.getTaskForProj(project) == undefined)
            {
                continue;
            }
            subject.next(this.getTaskForProj(project)!)
        }
    }
    restoreSubjects():void
    {
        //Default
        this.intializeProjectSub(DatabaseKeys.All);
        for (const key of this.taskMap.keys())
        {
            this.intializeProjectSub(key);
        }
    }

}