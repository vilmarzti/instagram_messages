import { Component, OnInit } from '@angular/core';
import { ChatLogService } from '../chat-log.service';
import { Router, ActivatedRoute } from '@angular/router'
import { ChatLog } from '../chat-log';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  public chatlog: ChatLog = {fileName:'test', messages: []};
  constructor(private chatService: ChatLogService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.params.subscribe(params =>{
      this.chatlog = this.chatService.getChatlog(params['id']);
    })
  }

}
