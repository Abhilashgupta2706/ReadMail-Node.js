import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private http: HttpClient) { }

  private apiEndPoint: string = "http://localhost:3000/"

  readMail(query: any) {
    return this.http.get(`${this.apiEndPoint}read-email-callback?${query}`);
  }
  readSaveMail(query: any) {
    return this.http.get(`${this.apiEndPoint}read-save-email-callback?${query}`);
  }
}
