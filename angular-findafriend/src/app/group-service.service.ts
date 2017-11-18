import { Injectable } from '@angular/core';
import { Group } from './group';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class GroupServiceService {

  constructor(private http: HttpClient) { }

  private url = '127.0.0.1:8000/heroes';  // URL to web api

  getGroups():Observable<Group[]>{
  	return this.http.get<Group[]>(this.url);
  	//Parse JSON
  }

}
