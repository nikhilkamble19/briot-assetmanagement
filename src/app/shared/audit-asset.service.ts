import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { APP_CONFIG, AppConfig } from '../app-config.module';

@Injectable()
export class AuditAssetRecordService {
	constructor(private http: Http, @Inject(APP_CONFIG) private config: AppConfig) { }

  listAll() {
    return this.http.get(`${this.config.apiEndpoint}/getallAsset`)
    .map((response: Response) => {
      let parts = response.json();
      if (parts) {
      }
      return parts;
    });
  }

	listSite() {
    return this.http.get(`${this.config.apiEndpoint}/getallSite`)
    .map((response: Response) => {
      let parts = response.json();
      if (parts) {
      }
      return parts;
    });
  }

	listlocations() {
    return this.http.get(`${this.config.apiEndpoint}/getallLocations`)
    .map((response: Response) => {
      let locations = response.json();
      if (locations) {
      }
      return locations;
    });
  }

  listsublocations() {
    return this.http.get(`${this.config.apiEndpoint}/getallSubLocations`)
    .map((response: Response) => {
      let locations = response.json();
      if (locations) {
      }
      return locations;
    });
  }

  listlocationforSite(site) {
    return this.http.get(`${this.config.apiEndpoint}/getallLocationsforSite`,{params :{Site:site}})
    .map((response: Response) => {
      let locations = response.json();
      if (locations) {
      }
      return locations;
    });
  }

  listbySubLocation(sublocation) {
    return this.http.get(`${this.config.apiEndpoint}/getbySublocation`,{params :{SubLocation:sublocation}})
    .map((response: Response) => {
      let locations = response.json();
      if (locations) {
      }
      return locations;
    });
  }

  listbyLocation(location) {
    return this.http.get(`${this.config.apiEndpoint}/getbylocation`,{params :{Location:location}})
    .map((response: Response) => {
      let locations = response.json();
      if (locations) {
      }
      return locations;
    });
  }

  listbySite(site) {
    return this.http.get(`${this.config.apiEndpoint}/getbysite`,{params :{Site:site}})
    .map((response: Response) => {
      let locations = response.json();
      if (locations) {
      }
      return locations;
    });
  }

  listbyLocationandSubLocation(location,sublocation) {
    return this.http.get(`${this.config.apiEndpoint}/getbylocationandsublocation`,{params :{Location:location, SubLocation: sublocation}})
    .map((response: Response) => {
      let locations = response.json();
      if (locations) {
      }
      return locations;
    });
  }

  listbyLocationandSite(location,site) {
    return this.http.get(`${this.config.apiEndpoint}/getbylocationandsublocation`,{params :{Location:location, Site: site}})
    .map((response: Response) => {
      let locations = response.json();
      if (locations) {
      }
      return locations;
    });
  }

  listbySubLocationandSite(sublocation,site) {
    return this.http.get(`${this.config.apiEndpoint}/getbysublocationandsite`,{params :{SubLocation:sublocation, Site: site}})
    .map((response: Response) => {
      let locations = response.json();
      if (locations) {
      }
      return locations;
    });
  }

  listbySubLocationandSiteandLocation(sublocation,site,location) {
    return this.http.get(`${this.config.apiEndpoint}/getbysublocationandsiteandlocation`,{params :{SubLocation:sublocation, Site: site, Location:location}})
    .map((response: Response) => {
      let locations = response.json();
      if (locations) {
      }
      return locations;
    });
  }

  getAuditId() {
    return this.http.get(`${this.config.apiEndpoint}/getAuditID`)
    .map((response: Response) => {
      let locations = response.json();
      if (locations) {
      }
      return locations;
    });
  }

  newAuditId(sublocation,site,location) {
    return this.http.get(`${this.config.apiEndpoint}/insertAudit`,{params :{SubLocation:sublocation, Site: site, Location:location}})
    .map((response: Response) => {
      let locations = response.json();
      if (locations) {
      }
      return locations;
    });
  }

  getAllAuditId() {
    return this.http.get(`${this.config.apiEndpoint}/getallAuditID`)
    .map((response: Response) => {
      let locations = response.json();
      if (locations) {
      }
      return locations;
    });
  }

  getAuditDetails(auditID) {
    return this.http.get(`${this.config.apiEndpoint}/getAuditDetails`,{params:{AuditID:auditID}})
    .map((response: Response) => {
      let locations = response.json();
      if (locations) {
      }
      return locations;
    });
  }
}