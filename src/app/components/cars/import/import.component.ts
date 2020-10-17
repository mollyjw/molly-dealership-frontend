import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CarService } from 'src/app/shared/services/car.service'
import { User } from 'src/app/shared/services/models/user';
import { UserService } from 'src/app/shared/services/user.service';


@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss']
})
export class ImportComponent implements OnInit {
  form: FormGroup
  FormValues: any
  submitting = false
  hasError = false
  errorMsg: string
  currentUser: User;
  private subs = new Subscription();
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private carService: CarService,
  ) {
    this.currentUser = this.userService.currentUserValue;
  }

  ngOnInit(): void {
    this.createFormControls();
    this.createForm();
  }


  createFormControls() {
    this.FormValues = {
      bodystyle: ['', Validators.compose([Validators.required])],
      year: [null, Validators.compose([Validators.required])],
      make: ['', Validators.compose([Validators.required])],
      model: ['', Validators.compose([Validators.required])],
      color: ['', Validators.compose([Validators.required])],
      mileage: [null, Validators.compose([Validators.required])],
      purchase_year: [null, Validators.compose([Validators.required])],
      condition: ['', Validators.compose([Validators.required])],
      image: ['', Validators.compose([Validators.required])],
      price: [null, Validators.compose([Validators.required])],
    }
  }

  createForm() {
    this.form = this.fb.group(this.FormValues)
  }


  submitForm() {
    alert('Car was successfully imported!')

    this.hasError = false
    this.submitting = true
    // if (this.form.invalid) {
    //   this.hasError = true
    //   this.submitting = false
    //   return;
    // }
    const form = this.form.value;
    const params = {
      bodystyle: form.bodystyle,
      year: form.year,
      make: form.make,
      model: form.model,
      color: form.color,
      mileage: form.mileage,
      purchase_year: form.purchase_year,
      condition: form.condition,
      image: form.image,
      price: form.price,
    };
    this.subs.add(
      this.carService.importCar(params).subscribe(
        (data) => {
        if (data) {
          this.submitting = true;
          this.router.navigate(['/allcars'])
      }
     }, (error) => {
       if (error) {
         console.log(error);
         this.submitting = false;
         this.hasError = true;
         this.errorMsg = 'There was a problem importing the car. Please try again.'
       }
     }
     )
    );
  }


  cancel() {
    this.form.reset();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
