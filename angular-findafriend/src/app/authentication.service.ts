import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers } from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

import { contentHeaders } from './headers';
// export const contentHeaders = new Headers();
// contentHeaders.append('Accept', 'application/json');
// contentHeaders.append('Content-Type', 'application/json');


@Injectable()
export class AuthenticationService {

	public endpoint: string = "http://127.0.0.1:8000/api/login/";
//};
  public token: string;
  public username: string;
  private subject = new Subject<any>();



  constructor(private _http: Http) {
  	var cUser = JSON.parse(localStorage.getItem('cUser'));
   	this.token = cUser && cUser.token;
   
   }

   // for login
   login(username: string, password: string): Observable<boolean> {
        let body = JSON.stringify({ username, password });
        return this._http.post(this.endpoint, body, { headers: contentHeaders})
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let token = response.json() && response.json().token;
                if (token) {

                    let cUser = JSON.stringify({ username: username, token: token });

                    // updates observable (changes received by all subscribers to this observable)
                    this.subject.next({
                        username: username,
                        token: token
                    });

                    // set token property
                    this.token = token;
                    this.username = username;

                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('cUser', cUser);

                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            });
    }

    // public token: string;

    // constructor(private http: Http) {
    //     // set token if saved in local storage
    //     var cUser = JSON.parse(localStorage.getItem('cUser'));
    //     this.token = cUser && cUser.token;
    // }

    // login(username: string, password: string): Observable<boolean> {
    //     return this.http.post('/api/login/', JSON.stringify({ username: username, password: password }))
    //         .map((response: Response) => {
    //             // login successful if there's a jwt token in the response
    //             let token = response.json() && response.json().token;
    //             if (token) {
    //                 // set token property
    //                 this.token = token;

    //                 // store username and jwt token in local storage to keep user logged in between page refreshes
    //                 localStorage.setItem('cUser', JSON.stringify({ username: username, token: token }));

    //                 // return true to indicate successful login
    //                 return true;
    //             } else {
    //                 // return false to indicate failed login
    //                 return false;
    //             }
    //         });
    // }

    // for log out
    logout(): void {
        // updates observable (changes received by all subscribers to this observable)
        this.subject.next();

        // clear token remove user from local storage to log user out
        this.token = null;
        // this._http.post("http://127.0.0.1:8000/api/logout/", 'aollarve');
        localStorage.removeItem('cUser');
        console.log("logout");
    }

    // obtain the login status
     getLoginStatus(): Observable<any> {
        let cUser = JSON.parse(localStorage.getItem('cUser'));
        if (cUser) {
            if (tokenNotExpired(undefined, cUser['token'])) {
                this.subject.next({
                        username: cUser['username'],
                        token: cUser['token']
                });
            } else {
                this.subject.next();
            };
        } else {
            this.subject.next();
        };
        return this.subject.asObservable();
    }

}
