import { Component, OnInit } from '@angular/core';
import { EMPTY } from 'rxjs';
import { ApiService } from '../../services/apiservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {
  sessionId: string = "";
  userName: string= "";
  movieName: string =  "Hustler";
  isButtonClicked: boolean = true;
  constructor(private readonly apiservice: ApiService,  private router: Router) { }

  buttonClick() {
    this.isButtonClicked = false;
  }

  createSessionClick(movieName: string, userName: string) {
    this.apiservice.createSession(movieName, userName).subscribe((data: any)=> {
      console.log(data)
      this.sessionId = data.sessionToken;
      window.localStorage.setItem("userName",userName)
      window.localStorage.setItem("sessionId",data.sessionToken)
      this.router.navigate(['startsession', data.sessionToken]);
    })
  }

  joinSessionClick(sessionid: string, username: string) {
    this.apiservice.joinSession(username, sessionid).subscribe((data: any)=> {
      console.log(data)
      this.sessionId = sessionid;
      this.userName = username;
      window.localStorage.setItem("userName",username)
      window.localStorage.setItem("sessionId",sessionid)
      this.router.navigate(['startsession', this.sessionId]);
    })
  }
}
