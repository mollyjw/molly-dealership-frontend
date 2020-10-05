import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/services/models/user';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup
  loginFormValues: any
  submitting = false
  hasError = false
  errorMsg: string
  currentUser: User
  private subs = new Subscription()
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.createLoginControls()
    this.createLoginForm()
  }

  createLoginControls() {
    this.loginFormValues = {
      email: ['', Validators.required],
      password: ['', Validators.required]
    }
  }

  createLoginForm() {
    this.loginForm = this.fb.group(this.loginFormValues)
  }

  submitLoginForm() {
    this.hasError = false
    this.submitting = true
    this.errorMsg = null
    if (this.loginForm.invalid) {
      this.hasError = true
      this.submitting = false
      return
    }
    const form = this.loginForm.value
    const params = { email: form.email, password: form.password }
    this.subs.add(
      this.userService.login(params).subscribe(data => {
        if (data && data.success && data.user) {
          this.currentUser = data.user
          this.submitting = false
          this.router.navigate(['/home'])
        }
      }, error => {
        if (error) {
          this.submitting = false
          this.hasError = true
          this.errorMsg = 'Email and Password combination not recognized.'
        }
      })
    )
  }

  ngOnDestroy() {
    this.subs.unsubscribe()
  }

}

