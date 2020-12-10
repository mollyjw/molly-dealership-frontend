import { AuthorizationHeaderService } from './shared/services/authorization-header.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { UserService } from './shared/services/user.service';
import { CarService } from './shared/services/car.service';
import { LocalStorageService } from './shared/services/local-storage.service'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SignupComponent } from './components/signup/signup.component';
import { AllcarsComponent } from './components/cars/allcars/allcars.component';
import { CarCardComponent } from './components/cars/allcars/car-card/car-card.component';
import { faAngleLeft, faAngleRight, faArrowRight, faCarSide, faCircle, faEdit, faEye, faEyeSlash, faHome, faKey, faPen, faPlus, faSearch, faSignInAlt, faSignOutAlt, faSpinner, faStar, faStarHalfAlt, faTrashAlt, faUpload, faUser, faUserPlus, faVideo } from '@fortawesome/free-solid-svg-icons';
import { ImportComponent } from './components/cars/import/import.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    SignupComponent,
    AllcarsComponent,
    CarCardComponent,
    ImportComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
  ],
  providers: [
    UserService,
    LocalStorageService,
    { provide: HTTP_INTERCEPTORS,
    useClass: AuthorizationHeaderService,
    multi: true},
    CarService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    private library: FaIconLibrary
  ) {
    this.library.addIcons(faHome, faSpinner, faAngleLeft, faAngleRight, faPlus, faStar, faStarHalfAlt, faArrowRight, faUpload, faVideo, faEdit, faPen, faTrashAlt, faSearch, faUser, faKey, faEye, faEyeSlash, faSignInAlt, faSignOutAlt, faUserPlus, faCircle, faCarSide)
  }
}
