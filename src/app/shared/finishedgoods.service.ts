import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { APP_CONFIG, AppConfig } from '../app-config.module';

@Injectable()
export class FinishedGoodService {
  constructor(private http: Http, @Inject(APP_CONFIG) private config: AppConfig) { }

  addfinishedgoods(finishedgoodsjson: any) {
    console.log(JSON.stringify(finishedgoodsjson));
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post(`${this.config.apiEndpoint}/finishedgoods`, finishedgoodsjson, {headers: headers})
    .map((response: Response) => {
      let finishedgoodsjson = response.json();
      if (finishedgoodsjson) {
        // localStorage.setItem('currentUser', JSON.stringify(user));
      }
      console.log(finishedgoodsjson);
      return finishedgoodsjson;
    });
  }

  listfinishedgoods() {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    // remove user from local storage to log user out
    return this.http.get(`${this.config.apiEndpoint}/finishedgoods`, {headers: headers})
    .map((response: Response) => {
      let finishedgoods = response.json();
      if (finishedgoods) {
        // localStorage.setItem('currentUser', JSON.stringify(user));
      }
      return finishedgoods;
    });
  }

  getFinishGood(finishgoodsId: string) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

     // remove user from local storage to log user out
     return this.http.get(`${this.config.apiEndpoint}/finishedgoods/${finishgoodsId}`, {headers: headers})
     .map((response: Response) => {
        let finishgoodJson = response.json();
        if (finishgoodJson && finishgoodJson._id) {
          // localStorage.setItem('currentUser', JSON.stringify(user));
        }
        console.log(finishgoodJson);
        return finishgoodJson;
    });
  }

  getFinishGoodWithBarcode(barcode: string) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.get(`${this.config.apiEndpoint}/finishedgoods?barcode=${barcode}`, {headers: headers})
    .map((response: Response) => {
      return response.json();
    });
  }

  updatefinishedgoods(finishgoodsId: string, Json: JSON) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    // remove user from local storage to log user out
    return this.http.put(`${this.config.apiEndpoint}/finishedgoods/${finishgoodsId}`, Json, {headers: headers})
    .map((response: Response) => {
      return response.json();
    });
  }

  listfinishedgoodsbyparts(partId: string) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    // remove user from local storage to log user out
    return this.http.get(`${this.config.apiEndpoint}/finishedgoods?part=${partId}`, {headers: headers})
    .map((response: Response) => {
      return response.json();
    });
  }

  listfinishedgoodsbylocation(locationId: string) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    // remove user from local storage to log user out
    return this.http.get(`${this.config.apiEndpoint}/finishedgoods?location_id=${locationId}`, {headers: headers})
    .map((response: Response) => {
      return response.json();
    });
  }

  listfinishedgoodsbypicklist(picklistId: string) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    // remove user from local storage to log user out
    return this.http.get(`${this.config.apiEndpoint}/finishedgoods?picklist_id=${picklistId}`, {headers: headers})
    .map((response: Response) => {
      return response.json();
    });
  }

  listfinishedgoodsbypartslocation(partId: string, locationId: string) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    // remove user from local storage to log user out
    return this.http.get(`${this.config.apiEndpoint}/finishedgoods?part=${partId}&location_id=${locationId}`, {headers: headers})
    .map((response: Response) => {
      return response.json();
    });
  }

  ExportToCSV(part_id: string, location_id: string) {
    var parameters = "";

    if (part_id && part_id.length > 0) {
      parameters = parameters + "part=" + part_id + "&";
    }
    else{
      parameters = parameters + "part!=" + "null" + "&";
    }

    if (location_id && location_id.length > 0) {
      parameters = parameters + "location_id=" + location_id;
    }
    else{
      parameters = parameters + "location_id!=" + "null";
    }
    // parameters = parameters + "&sortByKey=" + "-created";

    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http
    .get(`${this.config.apiEndpoint}/finishedgoods/exporttocsv?${parameters}`, { headers: headers })
  }
}