import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { APP_CONFIG, AppConfig } from '../app-config.module';

@Injectable()
export class PickListService {
  constructor(private http: Http, @Inject(APP_CONFIG) private config: AppConfig) { }

  addpicklist(picklistjson: any) {
    console.log(JSON.stringify(picklistjson));
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post(`${this.config.apiEndpoint}/picklists`, picklistjson, {headers: headers})
    .map((response: Response) => {
      let picklistjson = response.json();
      if (picklistjson) {
        // localStorage.setItem('currentUser', JSON.stringify(user));
      }
      console.log(picklistjson);
      return picklistjson;
    });
  }

  listpicklist() {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    // remove user from local storage to log user out
    return this.http.get(`${this.config.apiEndpoint}/picklists`, {headers: headers})
    .map((response: Response) => {
      let picklist = response.json();
      if (picklist) {
        // localStorage.setItem('currentUser', JSON.stringify(user));
      }

      return picklist;
    });
  }

  getpicklist(picklistjson: string) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    
    // remove user from local storage to log user out
    return this.http.get(`${this.config.apiEndpoint}/picklist/${picklistjson}`, {headers: headers})
    .map((response: Response) => {
      let picklistjson = response.json();
      if (picklistjson && picklistjson._id) {
        // localStorage.setItem('currentUser', JSON.stringify(user));
      }
      console.log(picklistjson);
      return picklistjson;
    });
  }

  deletepicklist(picklistjson: string) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log(`${this.config.apiEndpoint}/picklists?_id=${picklistjson}/`);
    // remove user from local storage to log user out
    return this.http.delete(`${this.config.apiEndpoint}/picklists/${picklistjson}`, {headers: headers})
    .map((response: Response) => {
      let picklistjson = response.json();
      if (picklistjson && picklistjson._id) {
        // localStorage.setItem('currentUser', JSON.stringify(user));
      }
      console.log(picklistjson);
      return picklistjson;
    });
  }

  updatepicklist(picklistId: string, Json: JSON) {
     var headers = new Headers();
     headers.append('Content-Type', 'application/json');

    // remove user from local storage to log user out
    return this.http.put(`${this.config.apiEndpoint}/picklists/${picklistId}`, Json, {headers: headers})
    .map((response: Response) => {
      return response.json();
    });
  }
}