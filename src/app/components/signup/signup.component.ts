import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/services/models/user';
import { UserService } from 'src/app/shared/services/user.service';
import { MustMatch } from './must-match-validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {
  signupForm: FormGroup
  signupFormValues: any
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
    this.createSignupControls()
    this.createSignupForm()

  }

  createSignupControls() {
    this.signupFormValues = {
      firstName: ['', Validators.compose([Validators.required])],
      lastName: ['', Validators.compose([Validators.required])],
      nickName: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(10)])],
      passwordConfirmation: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(10)])]
    }
  }

  createSignupForm() {
    this.signupForm = this.fb.group(this.signupFormValues, { validator: MustMatch('password', 'passwordConfirmation')})
  }

  // getter method for form controls
  get sf() {
    if (this.signupForm && this.signupForm.controls) {
      return this.signupForm.controls
    }
  }

  submitSignupForm() {
    this.hasError = false
    this.submitting = true
    if (this.signupForm.invalid) {
      this.hasError = true
      this.submitting = false
      return
    }
    const signupForm = this.signupForm.value
    const params = {
      first_name: signupForm.firstName,
      last_name: signupForm.lastName,
      nickname: signupForm.nickName,
      email: signupForm.email,
      password: signupForm.password,
      password_confirmation: signupForm.passwordConfirmation
    }
    this.subs.add(
      this.userService.signup(params).subscribe(data => {
        if (data && data.success && data.user) {
          this.currentUser = data.user
          this.submitting = false
          this.router.navigate(['/home'])
        }
      }, error => {
        if (error) {
          console.log(error)
          this.submitting = false
          this.errorMsg = 'User already exists'
        }
      })
    )
  }

  cancelSignupForm() {
    this.signupForm.reset()
  }

  ngOnDestroy() {
    this.subs.unsubscribe()
  }

}

