import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

export interface TransactionModel {
  transactionType?: string;
  amount: string;
  description: string;
  created_date?: string;
  updated_date?: string;
}

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  BASE_URL = 'http://localhost:5000/api/v1/';
  TRANSACTION_API = {
    TRANSACTION: 'transaction',
  };
  
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  buildPostTransactionPayload(data: TransactionModel): TransactionModel {
    return {
      transactionType: data.transactionType,
      amount: data.amount,
      description: data.description
    }
  }

  postTransactionAPI(data: TransactionModel) {
    return this.http.post(
      `${this.BASE_URL}${this.TRANSACTION_API.TRANSACTION}`,
       this.buildPostTransactionPayload(data),
       { headers: new HttpHeaders({ 'X-Auth': this.authService.getJWT() }) }
    );
  }
  
  getTransactionAPI() {
    return this.http.get(
      `${this.BASE_URL}${this.TRANSACTION_API.TRANSACTION}`,
       { headers: new HttpHeaders({ 'X-Auth': this.authService.getJWT() }) }
    );
  }
}
