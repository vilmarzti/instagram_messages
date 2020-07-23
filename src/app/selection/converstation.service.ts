import { Injectable } from '@angular/core';
import { ReplaySubject, Observable } from 'rxjs';
import { ChatLog } from '../chat/chat-log';

@Injectable({
  providedIn: 'root'
})
export class ConverstationService {
  private _chatlogs: ChatLog[] = []
  private _chatLogSubject = new ReplaySubject<ChatLog>();

  public getObservable(): Observable<ChatLog>{
    return this._chatLogSubject.asObservable();
  }

  public getChatLog(id: number){
    return this._chatlogs.find( elem => elem.id == id);
  }

  public handleJSON(text: string){
    let cls: ChatLog[] = []
    cls = JSON.parse(text);
    let index = 1;
    for(let cl of cls){
      cl.id = index
      this._chatlogs.push(cl);
      this._chatLogSubject.next(cl);
      index++;
    }
  }
}
