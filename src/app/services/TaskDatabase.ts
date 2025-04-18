import { TaskItem } from "./TaskItem";

export class TaskDatabase
{
    private taskMap:Map<string,Array<TaskItem>>;
    private taskIds:Array<number>;


    constructor()
    {
        // No local storage available
        this.taskMap = new Map<string,Array<TaskItem>>;
        this.taskIds = new Array<number>;
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
    addToMap(task:TaskItem,project:string="NoProject"):void
    {
        console.log(`Pre add`);
        console.log(this.taskMap);
        
        
        // TODO Might have to make a shallow copy of array
        //list to update
        const taskArray:Array<TaskItem> = this.getVal(project);
        //Local update
        taskArray.push(task);
        //Push update to localstorage 
        console.log(`Post add`);
        console.log(this.taskMap);
        
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


}