import { AfterViewInit, Component, ElementRef, Input, NgModule, ViewChild } from '@angular/core';
import { VideoJsOptions } from "src/models/videojs-options";
import CustomVideoJsComponent from "./custom-video-js-components";
import "./seek-plugin";
import "./notes-plugin";
import "./sprites-plugin";
import { videoJs } from './videojs';
import { ApiService } from '../services/apiservice.service';
import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { SeekButtonComponent } from './seek-plugin/component';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})

@Injectable({
  providedIn: 'root',
})

export class VideoPlayerComponent implements AfterViewInit {
  @ViewChild('target', { static: true })
  target!: ElementRef;
  @Input() options: VideoJsOptions = {};
  player: any;
  sessionId: string | null='';
  userId: string | null='';
  socket: WebSocketSubject<any>;
  constructor(private apiservice: ApiService) {

   }

  ngOnInit() {
    if (!this.socket || this.socket.closed) {
      this.socket = webSocket('ws://localhost:8001/ws');

      this.socket.subscribe((data: any) => {
        console.log("received message:", data.message);
        let msg = JSON.parse(data.message).message;
        // let seekTime = data.time;
        // console.log('aaa', data.time);
        // console.log("msg", typeof msg)
        if(typeof msg=='string' && msg.includes("start")){
          if(this.player.hasStarted()) 
          {

          } else {
           this.player.play();
          }
        }
        
        if(typeof msg=='string' && msg.includes("play")){
          this.player.play();
        }

        if(typeof msg=='string' && msg.includes("pause")){
          this.player.pause();
        }

        if(typeof msg=='string' && msg.includes("stop")){
          console.log("received stop")
          this.stopSessionClick(true)
        }

        if(typeof msg=='number'){
          console.log("seeked", msg);
          this.player.currentTime(msg);
        }
      });
    }
  }

  ngAfterViewInit(): void {
    CustomVideoJsComponent.registerTitleComponent();
    CustomVideoJsComponent.registerCustomButton();
    this.player = videoJs(this.target.nativeElement, this.options, this.onPlayerReady.bind(this));
    this.player.customSeekButtons({

    });

    this.player.notesButton({});
    this.player.sprites({
      spritesUrl: 'https://storage.googleapis.com/hubert-raymond-webpage/The_Hustler(1961)-sprites-256x144.png'
    });

    this.player.on('play', (e:any) => {
        console.log("playing video")
        let msg = JSON.stringify({
          message: "playing video"
        })
        this.socket.next(msg)
      });

    this.player.on('pause', (e: any) => {
        console.log("player paused video")
        let msg = JSON.stringify({
          message: "paused video"
        })
        this.socket.next(msg)
      });

    this.player.on('seeked', (e: any)=> {
      let tm:string=this.player.currentTime()
        console.log("player seeked video")
        let msg = JSON.stringify({
          message: tm
        })
        this.socket.next(msg)
    });
  }

  onPlayerReady() {
    console.log('Player is ready.');
    this.player.addChild('TitleBar', { text: '' });
    this.player.addChild('CustomButton');
  }

  public stopSessionClick(fromSocket: boolean = false) {
    console.log("Recived stop:", fromSocket)
    this.sessionId = window.localStorage.getItem("sessionId")
    this.userId = window.localStorage.getItem("userName")
    if(!fromSocket){
      let msg = JSON.stringify({
        message: "stop video"
      })
      this.socket.next(msg)
    }
    this.apiservice.stopSession(this.sessionId, this.userId).subscribe((data: any)=> {
      console.log(data)
      this.sessionId = window.localStorage.getItem("sessionId");
      this.userId = window.localStorage.getItem("userName");
      window.localStorage.clear()
    })

}

// public timeToSeconds(time: number): number {
//   const [hours, minutes, seconds] = time.split(':').map(Number);
//   return hours * 3600 + minutes * 60 + seconds;
// }

}
