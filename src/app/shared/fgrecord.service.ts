import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { APP_CONFIG, AppConfig } from '../app-config.module';

@Injectable()
export class FinishedGoodRecordService {
  constructor(private http: Http, @Inject(APP_CONFIG) private config: AppConfig) { }

  addfinishedgoodsrecord(finshedgoodsrecordjson: any) {
    console.log(JSON.stringify(finshedgoodsrecordjson));
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post(`${this.config.apiEndpoint}/fgrecords`, finshedgoodsrecordjson, {headers: headers})
    .map((response: Response) => {
      let finshedgoodsrecordjson = response.json();
      if (finshedgoodsrecordjson) {
        // localStorage.setItem('currentUser', JSON.stringify(user));
      }
      console.log(finshedgoodsrecordjson);
      return finshedgoodsrecordjson;
    });
  }

  listfinishedgoodsrecord() {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    // remove user from local storage to log user out
    return this.http.get(`${this.config.apiEndpoint}/fgrecords`, {headers: headers})
    .map((response: Response) => {
      let finshedgoodsrecordjson = response.json();
      if (finshedgoodsrecordjson) {
        // localStorage.setItem('currentUser', JSON.stringify(user));
      }
      return finshedgoodsrecordjson;
    });
  }

  getFinishGoodrecord(finshgoodsrecordId: string) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    // remove user from local storage to log user out
    return this.http.get(`${this.config.apiEndpoint}/fgrecords/${finshgoodsrecordId}`, {headers: headers})
    .map((response: Response) => {
      let finshedgoodsrecordjson = response.json();
      if (finshedgoodsrecordjson && finshedgoodsrecordjson._id) {
        // localStorage.setItem('currentUser', JSON.stringify(user));
      }
      console.log(finshedgoodsrecordjson);
      return finshedgoodsrecordjson;
    });
  }  
}