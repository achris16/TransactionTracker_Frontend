import * as moment from 'moment';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { TransactionService, TransactionModel } from '../services/transaction/transaction.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {
  transactions: Array<TransactionModel> = [];
  currentBalance: string = '0.00';
  modalAction: string = '';
  private currentTranId: string = '';

  transactionForm = this.fb.group({
    transactionType: ['#', [Validators.required]],
    amount: ['', [Validators.required, Validators.min(0.01)]],
    description: ['', [Validators.required, Validators.minLength(2)]],
  });

  constructor(
    private fb: FormBuilder,
    private transactionService: TransactionService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getTransactions();
  }

  getTransactions(): void {
    this.transactionService.getTransactionAPI()
      .subscribe(
        (response: any) => {
          console.log(response);
          this.transactions = response.transactions;
          this.currentBalance = response.total;

          this.transactions.forEach(tran => {
            tran.created_date = moment(tran.created_date).format('MM/DD/YY hh:mm');
            if (tran.updated_date) {
              tran.updated_date = moment(tran.updated_date).format('MM/DD/YY hh:mm');
            }
          });
        }, 
        (err: any) => {
          this.handleTokenError(err);
        }
      );
  }

  onSubmit(): void {
    console.log('onSubmit transactionForm ', this.transactionForm);
    console.log('onSubmit modalAction ', this.modalAction);
    switch (this.modalAction) {
      case 'create':
        this.transactionService.postTransactionAPI(this.transactionForm.value)
          .subscribe(
            (response: any) => {
              this.handleAPIResponse();
            },
            (err: any) => {
              this.handleAPIResponse(err);
            }
          );
        break;
      case 'update':
        this.transactionService.putTransactionAPI(this.currentTranId, this.transactionForm.value)
          .subscribe(
            (response: any) => {
              this.handleAPIResponse();
            },
            (err: any) => {
              this.handleAPIResponse(err);
            }
          );
        break;
      case 'delete':
        this.transactionService.deleteTransactionAPI(this.currentTranId)
          .subscribe(
            (response: any) => {
              this.handleAPIResponse();
            },
            (err: any) => {
              this.handleAPIResponse(err);
            }
          );
        break;
      default:
        break;
    }
  }

  handleAPIResponse(err? :any): void {
    (document.querySelector('.close') as any).click();
    if (err) {
      this.handleTokenError(err);
    }
    this.getTransactions();
  }

  handleTokenError(err: any): void {
    if (err.error.message && (err.error.message as string).toLowerCase().includes('token expired')) {
      this.router.navigate(['/login', { message: err.error.message }]);
    }
  }

  openCreateModal(): void {
    this.modalAction = 'create';
    this.currentTranId = '';
    this.transactionForm.reset({ transactionType: '#' });
    (document.querySelector('#form-modal-button') as any).click();
  }

  openUpdateModal(transaction: TransactionModel): void {
    console.log('openUpdateModal transaction ', transaction);
    let amount, type;
    if (transaction.amount.includes('-')) {
      amount = transaction.amount.substr(1);
      type = 'debit';
    } else {
      amount = transaction.amount;
      type = 'credit';
    }
    this.transactionForm.reset({
      transactionType: type,
      amount: amount,
      description: transaction.description
    });
    this.modalAction = 'update';
    this.currentTranId = transaction.id as string;
    (document.querySelector('#form-modal-button') as any).click();
  }

  openDeleteModal(id: any): void {
    console.log('openDeleteModal id ', id);
    this.modalAction = 'delete';
    this.currentTranId = id as string;
    (document.querySelector('#form-modal-button') as any).click();
  }

}
