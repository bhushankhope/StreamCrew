import { Component, OnInit } from '@angular/core';
import { VideoJsOptions } from 'src/models/videojs-options';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent {

  videoJsOptions: VideoJsOptions = {
    controls: true,
    loadingSpinner: true,
    height: "480",
    width: "640",
    sources: [
      // {
      // src: 'https://d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8',
      // type: 'application/x-mpegURL'
      // },
      {
      src: 'http://localhost:8001/getContent/The_Hustler(1961)---H264.mpd',
      type: 'application/dash+xml'
      },
    ],
    plugins: {
      seekButtons: {
        forward: 10,
        back: 10
      }
    },
    inactivityTimeout: 0,
    userActions: {
      doubleClick: true, // to toggle full screen on double click
      hotkeys: function (event: any) {

        // `up arrow` key = forward 10 sec
        if (event.which === 38) {
          this.volume(this.volume() + 0.2);
        }

        // `up arrow` key = forward 10 sec
        if (event.which === 40) {
          this.volume(this.volume() - 0.2);
        }

        // `right arrow` key = forward 10 sec
        if (event.which === 39) {
          this.currentTime(this.currentTime() + 10);
        }

        // `left arrow` key = backward 10 sec
        if (event.which === 37) {
          this.currentTime(this.currentTime() - 10);
        }

        // `f` key = toggle full screen
        if (event.which === 70) {
          if (!this.isFullscreen()) {
            this.enterFullWindow();
          } else {
            this.exitFullWindow();
          }
        }

        // `m` key = toggle mute
        if (event.which === 77) {
          if (this.muted()) {
            this.muted(false);
          } else {
            this.muted(true);
          }
        }

        // ` `(space) key = play/pause
        if (event.which === 32) {
          if (this.paused()) {
            this.play();
          } else {
            this.pause();
          }
        }

      }
    }
  };
}
