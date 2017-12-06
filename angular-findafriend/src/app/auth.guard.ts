import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate() {
    let cUser = JSON.parse(localStorage.getItem('cUser'));
    // Check to see if a user has a valid JWT
    if (cUser) {
      if (tokenNotExpired(undefined, cUser['token'])) {
        // If true, it will return true and allow the user to load the home component
        return true;
      }
    }
    // If not, this redirect them to the login page
    this.router.navigate(['/login']);
    return false;
  }

  // canActivate() {
  //   if (localStorage.getItem('currentUser')) {
  //       // logged in so return true
  //       return true;
  //   }

  //   // not logged in so redirect to login page
  //   this.router.navigate(['/login']);
  //   return false;
  // }

}