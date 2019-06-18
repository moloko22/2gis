import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions } from "@angular/http";
import 'rxjs/add/operator/map';

@Injectable()
export class MapService {
  result: any;

  constructor(private _http: Http) {
  }

  sendData(elem) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.post('/api//task', {elem}, {headers: headers})
      .map(res => res.json());
  }
  getData(){
    return this._http.get('/api/map')
      .map(res => res.json());
  }
}
