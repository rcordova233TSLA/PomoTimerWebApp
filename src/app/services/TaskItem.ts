export class TaskItem
{
    id:number
    label:string|null = null;
    description:string|null = null;
    projectName:string|null = null;

    constructor(id:number)
    {
        this.id = id
    }
}