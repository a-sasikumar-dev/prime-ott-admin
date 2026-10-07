import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoading = false;
  submitted = false;
  loginForm = new FormGroup({
    'email' : new FormControl(null, [Validators.required, Validators.email]),
    'password' : new FormControl(null, Validators.required)
  });
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private loginService : LoginService
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.submitted = false;
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.loginService.validatelogin(this.loginForm.value)
      .pipe(first())
      .subscribe(
        res => {
          this.toastr.success('Login Success');
          this.isLoading = false;
          location.replace("/dashboard");
        },
        error => {
          this.isLoading = false;
          this.toastr.error(error.error.errors[0]['msg']);
        });
    } else {
      this.isLoading = false;
      this.submitted = true;
    }
  }

}
