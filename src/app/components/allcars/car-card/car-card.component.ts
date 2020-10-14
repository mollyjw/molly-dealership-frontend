import { Component, Input, OnInit, OnChanges } from '@angular/core';
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

  ngOnChanges() {
    if (this.car) {
      this.carImg = this.car.image
    }
  }

  setDefautlPic() {
    this.carImg = 'assets/images/Wheely_Good_Name.jpg'
  }
}
