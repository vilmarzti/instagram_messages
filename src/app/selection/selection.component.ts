import { Component, OnInit } from '@angular/core';
import { JsonFileService } from '../json-file.service';
import { JsonFile } from '../json-file';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.scss']
})
export class SelectionComponent implements OnInit {

  constructor(private fileService: JsonFileService) { }
  public folderSelected = false;
  public files: JsonFile[] = [];

  ngOnInit(): void {
    // get a local copy of the chatlogs
    this.fileService.getObservable().subscribe( file => {
      this.files.push(file)
    })
  }
  
  public handleFileInput(event: any): void{
    // if a folder is selected -> read all the files
    // and give them to chat-log-service
    if(event.target && event.target.files){
      this.folderSelected = true;

      for(const file of event.target.files){
        if(file.name.split('.').pop() === 'json'){
          this.readFile(file);
        }
      }
    }
  }

  private readFile(file: File){
    const reader: FileReader = new FileReader();
    // give them to the chatlog
    reader.onload = (e: ProgressEvent) =>{
      this.fileService.addFile(file.name, reader.result.toString());
    }
    // read file
    reader.readAsText(file);
  }
}
