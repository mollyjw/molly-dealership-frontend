import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/shared/services/car.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(
    private carService: CarService,
    private storageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.setEmailInStorage()
  }

  setEmailInStorage() {
    this.storageService.setItem('myEmail', 'molly@g.com')
  }

}
