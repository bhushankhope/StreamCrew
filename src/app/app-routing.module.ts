import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { VideoComponent } from './components/video/video.component';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { StartsessionComponent } from './components/startsession/startsession.component'

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  {path:'startsession/:sessionId', component: StartsessionComponent},
  { path: 'player', component:VideoPlayerComponent},
  { path: 'video', component: VideoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ApproutingModule { }
