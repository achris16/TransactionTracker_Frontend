import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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

  constructor(private http: HttpClient) { }
  
  setJWT(token: string) { this.jwtToken = token; }

  getJWT() { return this.jwtToken; }

  postLoginAPI(data: AuthModel) {
    return this.http.post(`${this.BASE_URL}${this.AUTH_API.LOGIN}`, data);
  }

}
