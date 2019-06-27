import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions } from "@angular/http";
import 'rxjs/add/operator/map';

@Injectable()
export class MapService {
  result: any;

  constructor(private _http: Http) {
  }

  sendData(elem) {
      return fetch('/api/savecoordinates', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(elem)
      })
    }
  getData(){
    return this._http.get('/api/getcoordinates')
      .map(res => res.json());
  }
  list(elem){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.post('/api/places', elem, {headers: headers})
      .map(res => res.json());
  }
}
