import { Component, OnInit } from '@angular/core';
import { EMPTY } from 'rxjs';
import { ApiService } from 'src/app/services/apiservice.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {
  sessionId: string = "";
  movieName: string =  "Hustler";
  constructor(private readonly apiservice: ApiService) { }

  createSessionClick(movieName: string) {
    this.apiservice.createSession(movieName).subscribe((data: any)=> {
      console.log(data)
      this.sessionId = data.sessionToken;
    })
  }

  joinSessionClick(sessionId: string) {
    
  }
}
