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
  constructor(private conversationService: ConverstationService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // get specific chatlog from ChatlogService
    this.route.params.subscribe(params =>{
      this.chatLog = this.conversationService.getChatLog(params['id']);
    })
  }

}
