import { DatabaseKeys } from "./TaskDatabase";
export interface TaskProperties
{
    id:number
    // TODO Change back to mandatory in constructor?
    label:string|null;
    description:string|null;
    projectName:string;
}
export class TaskItem implements TaskProperties
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