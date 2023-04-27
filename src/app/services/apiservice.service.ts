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
  createSession(movName: string, userName: string): Observable<any> {
    return this.http.post(this.apiUrl+`/Stream/createSession/${movName}/${userName}`,'');
  }

  joinSession(userId: string, sessionId: string) {
    return this.http.post(this.apiUrl+`/Stream/joinSession/${sessionId}/${userId}`,'')
  }

  stopSession(userId: string|null, sessionId: string|null) {
    return this.http.delete(this.apiUrl+`/Stream/${sessionId}/${userId}`)
  }

}
