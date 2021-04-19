import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  profileForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]],
  });

  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.profileForm);
    console.log(this.profileForm.value);

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
        }
      );
  }

}
