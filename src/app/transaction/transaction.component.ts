import { Component, OnInit } from '@angular/core';
import { TransactionService, TransactionModel } from '../services/transaction/transaction.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {

  transactions: Array<TransactionModel> = [];

  constructor(
    private transactionService: TransactionService
  ) { }

  ngOnInit(): void {
    this.transactionService.getTransactionAPI()
      .subscribe((data: any) => {
        console.log(data);
        this.transactions = data.transactions;
      });
  }

}
