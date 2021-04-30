// Dependencies
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

// Modules
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { TransactionComponent } from './transaction/transaction.component';

// Services
import { AuthService } from './services/auth/auth.service';
import { TransactionService } from './services/transaction/transaction.service';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    TransactionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    TransactionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
