import { Component, OnInit } from '@angular/core';
import { JsonFile } from '../json-file';
import { Router, ActivatedRoute } from '@angular/router'
import { ChatLog } from './chat-log';
import { ConverstationService } from '../selection/converstation.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  // initialize empty chatlog
  public chatLog: ChatLog = {participants: [], conversation: []};
  public chatOwner: string = '';
  constructor(
    private conversationService: ConverstationService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    // get specific chatlog from ChatlogService
    this.route.params.subscribe(params =>{
      this.chatLog = this.conversationService.getChatLog(params['id']);

      // route back to start if chatlog is undefined
      if(this.chatLog == undefined){
        this.router.navigate(['']);
      }

      // order chatlog ascendently
      this.orderChatLog();
    })

    // get owner of chatlog
    this.conversationService.getOwnerObservable().subscribe( owner =>{
      this.chatOwner = owner;
    });
  }

  private orderChatLog(){
    this.chatLog.conversation.sort((msg1, msg2) => {
      if(msg1.created_at === msg2.created_at){
        return 0;
      }else if(msg1.created_at < msg2.created_at){
        return -1;
      }else{
        return 1;
      }
    })
  }

}
