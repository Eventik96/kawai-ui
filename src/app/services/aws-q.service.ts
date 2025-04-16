import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AWSQService {
    constructor() {}
    private socket = new WebSocket('ws://seliiuvd09066.seli.gic.ericsson.se:8000/ws/ai');

    webSocketMessages(): Observable<string> {
      return new Observable<string>((observer) => {
        
        this.socket.onmessage = (event) => {
          if(event.data?.login_url) {
            window.open(event.data.login_url);
          } else {
            const arrayBuffer = event.data as ArrayBuffer;
            const text = new TextDecoder('utf-8').decode(arrayBuffer);
            observer.next(text);
          }
          
        };
    
        this.socket.onerror = (err) => {
          observer.error(err);
        };
    
        this.socket.onclose = () => {
          observer.complete();
        };
    
        // cleanup, ha unsubscribe-ölsz
        return () => {
          this.socket.close();
        };
      });
    }



    send(msg: string) {
      this.socket.send(msg);
    }


    
}