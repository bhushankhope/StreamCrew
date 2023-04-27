import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { FormsModule } from '@angular/forms';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { ApproutingModule } from './app-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { VideoComponent } from './components/video/video.component';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { WebSocketComponent } from './websocket/websocket.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StartsessionComponent } from './components/startsession/startsession.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon'
import { MatTableModule } from '@angular/material/table'
import { MatGridListModule } from '@angular/material/grid-list'

@NgModule({
  declarations: [
    AppComponent,
    VideoPlayerComponent,
    WebSocketComponent,
    LandingPageComponent,
    VideoComponent,
    StartsessionComponent,
    StartsessionComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ApproutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    HttpClientModule,
    MatTabsModule,
    RouterModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatGridListModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
