import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

interface MessageData {
  message: string;
  time?: string;
}

@Injectable({
  providedIn: 'root',
})

export class WebSocketService {
  private socket$!: WebSocketSubject<any>;
  public receivedData: MessageData[] = [];

  public connect(): void {
    if (!this.socket$ || this.socket$.closed) {
      this.socket$ = webSocket('ws://localhost:8001/ws');

      this.socket$.subscribe((data: MessageData) => {
        console.log(data)
        this.receivedData.push(data);
      });
    }
  }

  public sendMessage(message: string) {
    console.log("sending socket message")
    this.socket$.next( message );
  }
}