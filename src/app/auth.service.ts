import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthService {

  constructor(private _http: Http) {
  }

  signUp(form) {
    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this._http.post('/api/register', form, {headers: headers})
      .map(res => res.json());
  }
}