import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-word-view',
  imports: [],
  templateUrl: './word-view.component.html',
  styleUrl: './word-view.component.scss'
})
export class WordViewComponent {
    allDictsEnd = "/api/v1/dictionaries"
    constructor(private http:HttpClient){
        this.getDictionaries()
    }

    getDictionaries()
    {
        this.http.get(this.allDictsEnd).subscribe((response)=>{
            console.log(response)
        })
    }
    getWordOfTheDay(dictCode:string)
    {
        const endPoint = this.allDictsEnd+"/"+dictCode+"/"+"wordoftheday";
        this.http.get(endPoint).subscribe((response)=>{
            console.log(response)
        })
    }
}
