import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.scss']
})
export class SelectionComponent implements OnInit {

  constructor() { }
  public folderSelected = false;
  public files = [];

  ngOnInit(): void {
  }
  
  public handleFileInput(event: any): void{
    if(event.target && event.target.files){
      this.folderSelected = true;

      for(const file of event.target.files){
        this.files.push(file.name)
      }



      console.log(event.target.files);
      const reader: FileReader = new FileReader();
      reader.onload = (e: ProgressEvent) =>{
        console.log(e);
        console.log(reader.result);
      }
      reader.readAsText(event.target.files[0]);
    }
  }

  private readFile(){

  }

}
