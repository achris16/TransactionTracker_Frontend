import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.url.subscribe((url) => { 
      this.currentRoute = url[0].path;
    });

    this.route.params.subscribe((data) => {
      console.log('params data ', data);
      if (data.message) {
        this.errorMessage = data.message;
        this.showErrorMessage = true;
      }
      if (data.successMessage) {
        this.successMessage = data.successMessage;
        this.showSuccessMessage = true;
      }
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
            this.router.navigate(['/home']);
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
            this.router.navigate(['/login', { successMessage: 'You have successfully registered. Please login.' }]);
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
