import { Component, OnInit } from '@angular/core';
import { ChatLogService } from '../chat-log.service';
import { ChatLog } from '../chat-log';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.scss']
})
export class SelectionComponent implements OnInit {

  constructor(private chatLogService: ChatLogService) { }
  public folderSelected = false;
  public files: ChatLog[] = [];

  ngOnInit(): void {
    this.chatLogService.getObservable().subscribe( (chatLog) =>{
      this.files.push(chatLog);
    })
  }
  
  public handleFileInput(event: any): void{
    if(event.target && event.target.files){
      this.folderSelected = true;

      for(const file of event.target.files){
        this.readFile(file);
      }
    }
  }

  private readFile(file: File){
    const reader: FileReader = new FileReader();
    reader.onload = (e: ProgressEvent) =>{
      let elem: ChatLog = {fileName: file.name, messages: []};
      this.chatLogService.addChatlog(elem);
    }
    reader.readAsText(file);
  }

}
