import { Component, OnInit } from '@angular/core';
import { ChatLogService } from './chat-log.service';
import { JsonFile } from '../json-file';
import { Router, ActivatedRoute } from '@angular/router'
import { ChatLog } from './chat-log';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  // initialize empty chatlog
  public chatLog: ChatLog = {participants: [], conversation: []};
  constructor(private chatLogService: ChatLogService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // get specific chatlog from ChatlogService
    this.route.params.subscribe(params =>{
      this.chatLog = this.chatLogService.getChatlog(params['id']);
    })
  }

}
