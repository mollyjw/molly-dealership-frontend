import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/shared/services/car.service';
import { Car } from 'src/app/shared/services/models/car';

@Component({
  selector: 'app-allcars',
  templateUrl: './allcars.component.html',
  styleUrls: ['./allcars.component.scss']
})
export class AllcarsComponent implements OnInit {
  cars: Car[] = []
  constructor(
    private carService: CarService,
  ) { }

  ngOnInit(): void {
    this.retrieveAllCars()

  }

  retrieveAllCars() {
    this.carService.getAllCars().subscribe(cars => {
      if (cars) {
        this.cars = cars
      }
      // debugger
    }, error => {
      if (error) {
        console.log(error)
      }
    })
  }
}
