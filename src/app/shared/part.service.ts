import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { APP_CONFIG, AppConfig } from '../app-config.module';

@Injectable()
export class PartService {
  constructor(private http: Http, @Inject(APP_CONFIG) private config: AppConfig) { }

  addPart(partjson: any) {
    console.log(JSON.stringify(partjson));
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post(`${this.config.apiEndpoint}/parts`, partjson, {headers: headers})
    .map((response: Response) => {
      let parts = response.json();
      if (parts) {
        // localStorage.setItem('currentUser', JSON.stringify(user));
      }
      return parts;
    });
  }

  listParts() {
    // var headers = new Headers();
    // headers.append('Content-Type', 'application/json');

    // remove user from local storage to log user out
    return this.http.get(`${this.config.apiEndpoint}/getallSite`)
    .map((response: Response) => {
      let parts = response.json();
      if (parts) {
        // localStorage.setItem('currentUser', JSON.stringify(user));
      }
      return parts;
    });
  }

  getPart(partId: string) {
    //console.log(partId);
    var headers = new Headers();

    headers.append('Content-Type', 'application/json');
    return this.http.get(`${this.config.apiEndpoint}/parts/${partId}`, {headers: headers})
    .map((response: Response) => {
      let part = response.json();
      if (part && part._id) {
        // localStorage.setItem('currentUser', JSON.stringify(user));
      }
      console.log(part);
      return part;
    });
  }
}