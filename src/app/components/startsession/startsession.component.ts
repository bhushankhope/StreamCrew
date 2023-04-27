import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/apiservice.service';
import {interval} from "rxjs/internal/observable/interval"
import { Subscription } from 'rxjs';
import {startWith, switchMap} from "rxjs/operators";
import { WebSocketService } from '../../services/websocket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-startsession',
  templateUrl: './startsession.component.html',
  styleUrls: ['./startsession.component.css']
})
export class StartsessionComponent implements OnInit {
  timeInterval: Subscription;
  sessionid = ''
  users: String[] = []
  displayedColumns: string[] = ['user'];



  constructor(private readonly apiservice: ApiService, private websocketService: WebSocketService, private router: Router, private route: ActivatedRoute) { 
    this.sessionid = this.route.snapshot.params['sessionId'];
  }

  ngOnInit() {
    this.timeInterval = interval(2000)
    .pipe(
      startWith(0),
      switchMap(() => this.apiservice.getUsers(this.sessionid))
    ).subscribe(data => {
      data.forEach((x: string) => {
        if(! this.users.includes(x)){
           this.users.push(x); }
      });
    }); 
  }

   public startsession() {
       this.timeInterval.unsubscribe();
       this.router.navigate(['video']);
   }

}
