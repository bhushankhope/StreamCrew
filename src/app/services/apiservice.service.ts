import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8001';

  constructor(private http: HttpClient) { }

  //{message, sessionToken}
  createSession(movName: string): Observable<any> {
    return this.http.post(this.apiUrl+`/startStream/${movName}`,'');
  }
}
