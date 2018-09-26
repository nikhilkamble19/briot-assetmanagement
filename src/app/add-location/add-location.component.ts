import { Component, OnInit } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Location } from '../shared/location.model';
import { LocationService } from '../shared/location.service';
import { LoaderService } from '../shared/loader.service';
import { UtilityService } from '../shared/utility.service';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.css']
})
export class AddLocationComponent implements OnInit {

  model: Location;
  locationdata: any;

  constructor(private LocationService: LocationService,
              private router: Router,
              private loaderService: LoaderService,
              private utilityService: UtilityService) { 
  }

  ngOnInit() {
  this.model = new Location('', '', '');
  }

  onSubmit(display_name, description) {
    var locationJson = {
      "display_name": this.model.display_name,
      "description": this.model.description,
    };
    console.log(locationJson);
    this.loaderService.display(true);
    this.LocationService.addLocation(locationJson).subscribe(
      data => {
        console.log(JSON.stringify(data));
        this.locationdata = data;
        // console.log(this.locationdata);
        // console.log(this.locationdata["display_name"], this.locationdata["description"]);
        this.utilityService.printOnZebraPrinterWithParams(data, "Location", "Location Desc.", this.locationdata["display_name"], this.locationdata["description"]);
      },
      error => {
        console.log(JSON.stringify(error))
        this.loaderService.display(false);
        if (error.status === 401) {
          this.router.navigate(['']);
        } else {
          var errMessage = JSON.parse(error["_body"]).message;

        }
      },
      () => {
        this.loaderService.display(false);
      }
    );
  }

  enable() {
    var enableSubmit = (
      this.model.display_name &&
      this.model.display_name.length > 0 &&
      this.model.description &&
      this.model.description.length > 0
    );
    return enableSubmit;
  }
}
