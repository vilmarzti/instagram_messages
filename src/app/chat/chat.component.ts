import { Component, OnInit, HostListener, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { JsonFile } from '../json-file';
import { Router, ActivatedRoute } from '@angular/router'
import { ChatLog } from './chat-log';
import { ConverstationService } from '../selection/converstation.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewInit{
  // initialize empty chatlog
  public chatLog: ChatLog = {participants: [], conversation: []};
  public chatOwner: string = '';
  public chatID: number;
  public numberOfChats: number;
  public showToTop: boolean;
  public showToBottom: boolean;

  @ViewChild('content') contentView: ElementRef;

  private contentHeight: number;

  @HostListener('window:scroll') checkScroll(){
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  }

  constructor(
    private conversationService: ConverstationService,
    private route: ActivatedRoute,
    private hostElement: ElementRef,
    private router: Router) { }

  ngOnInit(): void {
    // get specific chatlog from ChatlogService
    this.route.params.subscribe(params =>{
      this.chatID = +params['id'];
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

    this.numberOfChats = this.conversationService.getChatLogLength();
  }

  ngAfterViewInit(): void{
    this.contentHeight = this.contentView.nativeElement.offsetHeight;
  }

  public changeChat(n: number){

  }

  public scrollToTop(){
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  public scrollToBottom(){
    window.scroll({
      top: this.contentHeight,
      left: 0,
      behavior: 'smooth'
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
