import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/services/models/user';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  currentUser: User
  private subs = new Subscription
  constructor(
    private userService: UserService
  ) {
    this.currentUser = this.userService.currentUserValue
  }

  ngOnInit(): void {
    this.subscribeToCurrentUser
  }

  subscribeToCurrentUser() {
    this.subs.add( //creates new subs
      this.userService.currentUser.subscribe(user => { //creates the subs to our current user
      if (user) { //checks to see if the logged in user exists
        this.currentUser = user //sets our currentUser value in our component
      } else { //if the current user doesn't exist
        this.currentUser = null //we set the current user as null
      }
    })
   )
  }


  logoutUser() {
    this.userService.logoutUser()
  }

  ngOnDestroy() {
    this.subs.unsubscribe()
  }
}
