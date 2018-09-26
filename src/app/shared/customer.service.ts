import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { APP_CONFIG, AppConfig } from '../app-config.module';

@Injectable()
export class CustomerService {
  constructor(private http: Http, @Inject(APP_CONFIG) private config: AppConfig) { }

  listParts() {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    // remove user from local storage to log user out
    return this.http.get(`${this.config.apiEndpoint}/customers`, {headers: headers})
    .map((response: Response) => {
      let customers = response.json();
      if (customers) {
        // localStorage.setItem('currentUser', JSON.stringify(user));
      }
      return customers;
    });
  }

    // getPart(partId: string) {
    //     var headers = new Headers();
    //     headers.append('Content-Type', 'application/json');

    //     var t = JSON.parse(localStorage.getItem("currentUser"));

    //     if (t != null) {
    //         headers.append("Authorization", "JWT " + t.token);
    //     }

    //     // remove user from local storage to log user out
    //     return this.http.get(`${this.config.apiEndpoint}/parts/${partId}`, {headers: headers})
    //         .map((response: Response) => {
    //             let part = response.json();
    //             if (part && part._id) {
    //                 // localStorage.setItem('currentUser', JSON.stringify(user));
    //             }

    //             return part;
    //         });
    // }

    // updatePart(partId: any, partJson:any) {
    //   var headers = new Headers();
    //   headers.append('Content-Type', 'application/json');

    //   var t = JSON.parse(localStorage.getItem("currentUser"));

    //     if (t != null) {
    //         headers.append("Authorization", "JWT " + t.token);
    //     }

    //   return this.http.put(`${this.config.apiEndpoint}/parts/${partId}`, partJson, {headers: headers})
    //       .map((response: Response) => {
    //             let part = response.json();
    //             if (part && part._id) {
    //                 // localStorage.setItem('currentUser', JSON.stringify(user));
    //             }

    //             return part;
    //         });
    // }
}