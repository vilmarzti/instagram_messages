import { Injectable } from '@angular/core';
import { ReplaySubject, Observable, BehaviorSubject } from 'rxjs';
import { ChatLog } from '../chat/chat-log';

@Injectable({
  providedIn: 'root'
})
export class ConverstationService {
  private _chatlogs: ChatLog[] = []
  private _owner: string;
  private _chatLogSubject = new ReplaySubject<ChatLog>();
  private _ownerSubject = new BehaviorSubject<string>('');

  public getChatLogObservable(): Observable<ChatLog>{
    return this._chatLogSubject.asObservable();
  }

  public getOwnerObservable(): Observable<string>{
    return this._ownerSubject.asObservable();
  }

  public getChatLog(id: number){
    return this._chatlogs.find( elem => elem.id == id);
  }

  public getChatLogLength(): number{
    return this._chatlogs.length;
  }

  public getOwner(): string{
    return this._owner;
  }

  public handleJSON(text: string){
    let cls: ChatLog[] = []
    cls = JSON.parse(text);
    let index = 0;
    for(let cl of cls){
      cl.id = index
      this._chatlogs.push(cl);
      this._chatLogSubject.next(cl);
      index++;
    }
    this._owner = this.findOwner(this._chatlogs);
    this._ownerSubject.next(this._owner);
    this.cleanParticipants();
  }

  private findOwner(chatlogs: ChatLog[]): string{
    // find participant that is in all chatlogs
    let participant = chatlogs.reduce((cl1, cl2) =>{
      let return_chatlog: ChatLog = {conversation: [], participants: []};
      let matching_elements = []
      for(let participants1 of cl1.participants){
        for(let participants2 of cl2.participants){
          if(participants1 == participants2){
            matching_elements.push(participants1);
          }
        }
      }
      return_chatlog.participants = matching_elements;
      return return_chatlog;
    });
    return participant.participants[0];
  }

  private cleanParticipants(){
    // removes the owner from the paricipants list
    if(this._owner){
      for(let cl of this._chatlogs){
        let idx = cl.participants.indexOf(this._owner);
        if(idx > -1){
          cl.participants.splice(idx, 1);
        }
      }
    }
  }
}
