import { DatabaseKeys } from "./TaskDatabase";
export class TaskItem
{
    id:number
    // TODO Change back to mandatory in constructor?
    label:string|null = null;
    description:string|null = null;
    projectName:string = DatabaseKeys.NoProject;
    

    constructor(id:number)
    {
        this.id = id
    }
}