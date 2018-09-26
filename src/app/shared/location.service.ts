import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { APP_CONFIG, AppConfig } from '../app-config.module';

@Injectable()
export class LocationService {
  constructor(private http: Http, @Inject(APP_CONFIG) private config: AppConfig) { }

  addLocation(locationJson: any) {
    console.log(JSON.stringify(locationJson));
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post(`${this.config.apiEndpoint}/getallLocations`, locationJson, {headers: headers})
    .map((response: Response) => {
      let location = response.json();
      if (location) {
        // localStorage.setItem('currentUser', JSON.stringify(user));
      }
      return location;
    });
  }

  listlocations() {
    // var headers = new Headers();
    // headers.append('Content-Type', 'application/json');

    // remove user from local storage to log user out
    return this.http.get(`${this.config.apiEndpoint}/getallLocations`)
    .map((response: Response) => {
      let locations = response.json();
      if (locations) {
        // localStorage.setItem('currentUser', JSON.stringify(user));
      }
      return locations;
    });
  }

  getLocation(locationId: string) {
    //console.log(partId);
    var headers = new Headers();

    headers.append('Content-Type', 'application/json');
    return this.http.get(`${this.config.apiEndpoint}/locations/${locationId}`, {headers: headers})
    .map((response: Response) => {
      let location = response.json();
      if (location && location._id) {
        // localStorage.setItem('currentUser', JSON.stringify(user));
      }
      console.log(location);
      return location;
    });
  }
}