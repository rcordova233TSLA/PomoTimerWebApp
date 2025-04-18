import { BehaviorSubject, Subject } from "rxjs";
import { TaskItem } from "./TaskItem";

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
        this.intializeProjectSub("ALL");
        this.intializeProjectSub("NOPROJ");
    }

    /**
     * 
     * @param project Project to attempt intialization of new subject
     * @returns true if subject does not exist, false if project subject already initialized
     */
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
        return this.projectSubjects.get(project);
    }

    /*
    Task Fetching
    */
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

    /*
    Map Operations
    */
    /**
     * 
     * @param task TaskItem to add to map and local storage 
     * @param project Project to assign task under, defaults to NoProject
     */
    addTask(task:TaskItem):void
    {
        console.log(`Pre add`);
        console.log(this.taskMap);
        
        let projName:string;
        if (task.projectName == null)
        {
            projName = "NOPROJ";
        }
        else
        {
            projName = task.projectName;
        }
        
        // TODO Might have to make a shallow copy of array
        //list to update
        const taskArray:Array<TaskItem> = this.getVal(projName);
        //Local update
        taskArray.push(task);
        console.log(`Post add`);
        console.log(this.taskMap);
        
        // Subject specific update
        const projSub = this.projectSubjects.get(projName)!;
        projSub.next(taskArray);
        
        //All tasks update subscribers
        const allTaskSub = this.projectSubjects.get("ALL")!;
        const currentAllTasks = this.getAllTasks();
        allTaskSub.next(currentAllTasks);
        console.log("Sending this array to all ");
        console.log(currentAllTasks);
        
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


}