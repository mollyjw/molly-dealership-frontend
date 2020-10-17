import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { Car } from 'src/app/shared/services/models/car'
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service'



@Injectable({
  providedIn: 'root'
})
export class CarService {
  private carApi: string;
  constructor(
    private router: Router,
    private http: HttpClient,
  ) {
    this.carApi = `${environment.apiUrl}api/v1/vehicles`;
  }

  getAllCars(): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.carApi}/index`);
  }

  importCar(params) {
    return this.http.post<any>(`${this.carApi}/create`, params);
  }

}
