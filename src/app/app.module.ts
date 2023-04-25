import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { FormsModule } from '@angular/forms';
import { WebSocketComponent } from './components/websocket/websocket.component';

@NgModule({
  declarations: [
    AppComponent,
    VideoPlayerComponent, 
    WebSocketComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
