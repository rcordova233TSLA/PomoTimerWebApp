import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskFetcherService {
	taskMap:Object;
	// Get from local storage
	saveToUnkownProj()
	{
		
	}
	saveToSpecProj()
	{

	}
	getTaskMapFromStorage()
	{
		this.taskMap = JSON.parse(window.localStorage.getItem("Database") || '{}');
	}
	saveTaskMapToStorage()
	{
		window.localStorage.setItem("Database",JSON.stringify(this.taskMap));
	}
	constructor() 
	{
		// Get map from local storage or initialize to empty
		this.taskMap = {};

	}
}
