import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { FormsModule } from '@angular/forms';
import { WebSocketComponent } from './components/websocket/websocket.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { ApproutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { VideoComponent } from './components/video/video.component';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [
    AppComponent,
    VideoPlayerComponent,
    WebSocketComponent,
    LandingPageComponent,
    VideoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ApproutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    HttpClientModule,
    MatTabsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
