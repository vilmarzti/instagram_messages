import { Injectable } from '@angular/core';
import { ChatLog } from './chat-log';
import { ReplaySubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatLogService {
  private _chatlogs:  ChatLog[] = [];
  private _chatlogSubject = new ReplaySubject<ChatLog>();

  constructor() { }

  // adds chatlog to the known list
  public addChatlog(c: ChatLog): void{
    // give it an id
    c.id = this._chatlogs.length + 1;

    // create test messages
    // TODO: delete
    c.messages = [
      { sender: 0,
        text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consete"
      },
      { sender: 1,
        text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consete"
      },
      { sender: 1,
        text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consete"
      },
    ]
    this._chatlogs.push(c)
    this._chatlogSubject.next(c);
  }

  public getChatlogs(): ChatLog[]{
    return this._chatlogs;
  }

  public getChatlog(id: number): ChatLog{
    // find chatlog with specific id
    let cl = this._chatlogs.find(chatlog => chatlog.id == id);

    // if found return it
    if (cl){
      return cl;
    }
    // if not found return test-chatlog
    // TODO: delete later
    else{
      return {
        id: id,
        fileName: "test",
        messages: [
          { sender: 0,
            text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consete"
          },
          { sender: 1,
            text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consete"
          },
          { sender: 1,
            text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consete"
          },
        ],
      }
    }
  }

  public getObservable(): Observable<ChatLog>{
    return this._chatlogSubject.asObservable();
  }
}
