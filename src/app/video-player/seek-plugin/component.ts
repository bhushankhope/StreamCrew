// import { error } from 'console';
import { Component, EventEmitter, Output } from '@angular/core';
import { videoJs } from '../videojs';
import { SeekOptions } from "./types";
const Button = videoJs.getComponent('Button');

export class SeekButtonComponent extends Button {
    // @Output() seeked = new EventEmitter<{ currentTime: number, seekDuration: number }>();

    constructor(player: ReturnType<typeof videoJs.player>, options: SeekOptions) {
        super(player, options);
        if (this.options_.forward) {
            this.controlText(this.localize(this.options_.fwdBtnTooltip));
        }
        if (this.options_.backward) {
            this.controlText(this.localize(this.options_.bwdBtnTooltip));
        }
    }

    buildCSSClass() {
        let classes = 'vjs-custom-seek-button'
        if (this.options_.forward) {
            classes = `${classes} seek-forward`;
        }
        if (this.options_.backward) {
            classes = `${classes} seek-backward`;
        }
        // merge our custom and videojs classes together.
        return `${classes} ${super.buildCSSClass()}`;
    }

    handleClick() {
        const currentTime = this.player_.currentTime();
        let seekDuration = 0;
        if (this.options_.forward) {
            seekDuration = this.options_.forward;
            this.player_.currentTime(currentTime + this.options_.forward);
        } else if (this.options_.backward) {
          seekDuration = this.options_.backward;
            this.player_.currentTime(currentTime - this.options_.backward);
        }

        // const data = {
        //   currentTime,
        //   seekDuration
        // }

        // const requestOptions: RequestInit = {
        //   method: 'POST',
        //   body: JSON.stringify(data),
        //   headers: {'Content-type': 'application/json'}
        // };
        // fetch('', requestOptions)
        // .then(response => {
        //   if (!response.ok) {
        //     throw new Error('Failed to send seek request to server');
        //   }
        // })
        // .catch (error => console.error(error));
    }
}
