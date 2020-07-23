import { Component, OnInit } from '@angular/core';
import { ConverstationService } from './converstation.service';
import { JsonFile } from '../json-file';
import { ChatLog } from '../chat/chat-log';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.scss']
})
export class SelectionComponent implements OnInit {

  constructor(private conversationService : ConverstationService) { }
  public chatlogs: ChatLog[] = [];

  ngOnInit(): void {
    // get a local copy of the chatlogs
    this.conversationService.getObservable().subscribe( item =>
      this.chatlogs.push(item)
    )
  }
  
  public handleFileInput(event: any): void{
    if(event.target && event.target.files){
      const reader: FileReader = new FileReader();
      reader.onload = (e: ProgressEvent) => {
        this.conversationService.handleJSON(reader.result.toString());
      }
      reader.readAsText(event.target.files[0]);
    }
  }
}
