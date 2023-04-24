import { Component, OnDestroy } from '@angular/core';
import { WebSocketService } from '../../services/websocket.service';

@Component({
  selector: 'web-socket',
  templateUrl: './websocket.component.html',
  styleUrls: ['./websocket.component.css']
})
export class WebSocketComponent implements OnDestroy {
  
  message = '';

  constructor(public webSocketService: WebSocketService) {
    this.webSocketService.connect();
  }

  sendMessage(message: string) {
    this.webSocketService.sendMessage(message);
  }

  ngOnDestroy() {
    this.webSocketService.close();
  }
}