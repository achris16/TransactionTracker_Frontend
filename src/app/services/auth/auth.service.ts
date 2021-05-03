import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface AuthModel {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  BASE_URL = 'http://localhost:5000/api/v1/';
  AUTH_API = {
    LOGIN: 'login',
    REGISTER: 'register'
  };

  private jwtToken: string = '';
  loginSubject = new Subject();


  constructor(private http: HttpClient) { }
  
  setJWT(token: string) { 
    this.loginSubject.next(Boolean(token));
    localStorage.setItem('transactionTrackerJWT', token);
    this.jwtToken = token;
  }

  getJWT() { 
    if (!this.jwtToken && localStorage.getItem('transactionTrackerJWT')) {
      this.jwtToken = localStorage.getItem('transactionTrackerJWT') as string;
    }
    return this.jwtToken;
  }

  postLoginAPI(data: AuthModel) {
    return this.http.post(`${this.BASE_URL}${this.AUTH_API.LOGIN}`, data);
  }
  
  postRegisterAPI(data: AuthModel) {
    return this.http.post(`${this.BASE_URL}${this.AUTH_API.REGISTER}`, data);
  }
}
