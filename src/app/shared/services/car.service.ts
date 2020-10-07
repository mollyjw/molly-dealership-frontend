import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Car } from 'src/app/shared/services/models/car'


@Injectable({
  providedIn: 'root'
})
export class CarService {
  private carApi: string;
  constructor(
    private http: HttpClient
  ) {
    this.carApi = `${environment.apiUrl}api/v1/cars`;
  }

  getAllCars(): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.carApi}/index`)
  }
}
