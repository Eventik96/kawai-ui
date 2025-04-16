import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/models/message';
import { AWSQService } from 'src/app/services/aws-q.service';

@Component({
  selector: 'app-ai-chat',
  standalone: false,
  templateUrl: './ai-chat.component.html',
  styleUrl: './ai-chat.component.scss'
})
export class AiChatComponent implements OnInit {

  constructor(private q: AWSQService) {}

  messages: Message[] = [];
  newMessage: string;


  ngOnInit(): void {
    this.q.webSocketMessages().subscribe(chunk => {
      if(this.messages.at(-1).dir === 'in') {
        this.messages.at(-1).text += chunk;
      }
     });
  }


  send() {
    if(!this.newMessage) return;
    this.messages.push({text: this.newMessage, dir: 'out'});
    this.messages.push({
      text: '',
      dir: 'in'
    })

    this.q.send(this.newMessage);
    this.newMessage = null;
  }

  sendIfNotShift(event: Event) {
    const keyboardEvent = event as KeyboardEvent;
    if (!keyboardEvent.shiftKey) {
      keyboardEvent.preventDefault();
      this.send();
    }
  }


  


}
