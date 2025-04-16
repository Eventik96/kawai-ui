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
          const data = JSON.parse(event.data);
          console.log(data);
          if(data?.login_url) {
            //window.open(data.login_url);
          } else {
            if(data?.text) {
              let text = data?.text.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, '')
              observer.next(text);
            }
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