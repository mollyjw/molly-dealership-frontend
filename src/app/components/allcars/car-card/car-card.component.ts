import { Component, Input, OnInit } from '@angular/core';
import { Car } from 'src/app/shared/services/models/car'

@Component({
  selector: 'app-car-card',
  templateUrl: './car-card.component.html',
  styleUrls: ['./car-card.component.scss']
})
export class CarCardComponent implements OnInit {
  @Input() car: Car
  carImg: string
  constructor() { }

  ngOnInit(): void {
  }

}
