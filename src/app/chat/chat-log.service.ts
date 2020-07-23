import { Injectable } from '@angular/core';
import { ChatLog } from './chat-log';
import { JsonFileService } from '../json-file.service';
import { JsonFile } from '../json-file';

@Injectable({
  providedIn: 'root'
})
export class ChatLogService {
  private _chatlogs:  ChatLog[] = [];

  constructor(private fileService: JsonFileService) { }

  public getChatlog(id: number){
    let chatLog = this._chatlogs.find(elem => elem.id == id);
    if(chatLog){
      return chatLog;
    }else{
      let file = this.fileService.getFile(id);
      chatLog = this.convertFiletoChatlog(file);
      this._chatlogs.push(chatLog);
      return chatLog;
    }
  }

  private convertFiletoChatlog(file: JsonFile): ChatLog{
    let chatLog: ChatLog;
    chatLog = JSON.parse(file.text)[0];
    chatLog.id = file.id;
    return chatLog;
  }
}
