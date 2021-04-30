import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  profileForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]],
  });

  currentRoute: string = '';
  showErrorMessage: boolean = false;
  errorMessage: string = '';
  showSuccessMessage: boolean = false;
  successMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.url.subscribe((url) => { 
      this.currentRoute = url[0].path;
    });
  }

  onSubmit() {
    console.log(this.profileForm);
    console.log(this.profileForm.value);

    if (this.currentRoute === 'login') {

      this.authService.postLoginAPI(this.profileForm.value)
        .subscribe(
          (resp: any) => {
            console.log(resp);
            this.authService.setJWT(resp.token);
  
            console.log(this.authService.getJWT());
            // @TODO: Redirect to main page
          },
          (err: any) => {
            console.log(err);
            console.log(err.error.message);
            this.errorMessage = err.error.message;
            this.showErrorMessage = true;
            this.showSuccessMessage = false; 
          
          }
        );
    } else if  (this.currentRoute === 'register') {
      this.authService.postRegisterAPI(this.profileForm.value)
        .subscribe(
          (resp: any) => {
            console.log(resp);
            this.successMessage = resp.message;
            this.showErrorMessage = false;
            this.showSuccessMessage = true;
            // @TODO:redirect to login page
          },
          (err: any) => {
            console.log(err);
            console.log(err.error.message);
            this.errorMessage = err.error.message;
            this.showErrorMessage = true;
            this.showSuccessMessage = false;
          }
        );
    }
  }

}
