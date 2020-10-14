import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CarService } from 'src/app/shared/services/car.service'
import { User } from 'src/app/shared/services/models/user';


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
  currentUser: User
  private subs = new Subscription
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private carService: CarService,
    private http: HttpClientModule,
  ) { }

  ngOnInit(): void {
    this.createFormControls()
    this.createForm()
  }


  createFormControls() {
    this.FormValues = {
      bodystyle: ['', Validators.compose([Validators.required])],
      year: ['', Validators.compose([Validators.required])],
      make: ['', Validators.compose([Validators.required])],
      model: ['', Validators.compose([Validators.required])],
      color: ['', Validators.compose([Validators.required])],
      mileage: ['', Validators.compose([Validators.required])],
      purchase_year: ['', Validators.compose([Validators.required])],
      condition: ['', Validators.compose([Validators.required])],
      image: ['', Validators.compose([Validators.required])],
      price: ['', Validators.compose([Validators.required])],
    }
  }

  createForm() {
    this.form = this.fb.group(this.FormValues)
  }

  get f() {
    if (this.form && this.form.controls) {
      return this.form.controls
    }
  }

  submitForm() {
    this.hasError = false
    this.submitting = true
    if (this.form.invalid) {
      this.hasError = true
      this.submitting = false
      return
    }
    const form = this.form.value
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
      price: form.price
    }
    this.subs.add(
      this.carService.importCar(params).subscribe(data => {
        if (data && data.success && data.user) {
          this.submitting = false
          this.router.navigate(['/allcars'])
      }
     })
    )
  }
}
