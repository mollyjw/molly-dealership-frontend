import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/shared/services/car.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { Car } from 'src/app/shared/services/models/car'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  cars: Car[] = []
  constructor(
    private carService: CarService,
    private storageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    // this.importCar()
    this.setEmailInStorage()
  }

  setEmailInStorage() {
    this.storageService.setItem('myEmail', 'molly@g.com')
  }

  // importCar() {
  //   this.carService.importCar().subscribe(cars => {
  //     if (cars) {
  //       this.cars = cars
  //     }
  //     debugger
  //   }, error => {
  //     if (error) {
  //       console.log(error)
  //     }
  //   })
  // }
}
