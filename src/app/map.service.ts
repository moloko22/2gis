import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions } from "@angular/http";
import 'rxjs/add/operator/map';

@Injectable()
export class MapService {
  result: any;

  constructor(private _http: Http) {
  }

  sendData(elem) {
    let e = {
      lat: 1,
      lng: 300
    };
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.post('/api/task', e, {headers: headers})
  }
  getData(){
    return this._http.get('/api/map')
      .map(res => res.json());
  }
  list(elem){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.post('/api/places', elem, {headers: headers})
      .map(res => res.json());
  }
}
