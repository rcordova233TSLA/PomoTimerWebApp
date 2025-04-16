export class TaskItem
{
    id:number
    label:string
    description:string|null = null;
    projectName:string|null = null;

    constructor(id:number,label:string)
    {
        this.id = id
        this.label = label
    }  
}