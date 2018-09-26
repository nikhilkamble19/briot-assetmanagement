import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FinishedGood } from '../shared/finishedgoods.model';
import { LoaderService } from '../shared/loader.service';
import { FinishedGoodService } from '../shared/finishedgoods.service';
import { LocationService } from '../shared/location.service';
import { AlertService } from '../shared/alert.service';

@Component({
  selector: 'app-putaway',
  templateUrl: './putaway.component.html',
  styleUrls: ['./putaway.component.css']
})

export class PutawayComponent implements OnInit {
  
  model: FinishedGood;
  fetchLocation: Array<Object> = [];
  fetchfinishgoods: Array<Object> = [];
  storeArray: Array<Object> = [];
  incrementvariable: any = 0;
  locationBarcode: any;
  locationId: any;
  finishedgoodsId: any;

  constructor(private finishedGoodService: FinishedGoodService,
    private locationService: LocationService,
    private loaderService: LoaderService,
    private alertService: AlertService) {

      this.model = new FinishedGood();
  }

  ngOnInit() {
    this.fetchLocationLists();
  }

  private fetchLocationLists() {
    this.locationService.listlocations().subscribe(
      data => {
        this.fetchLocation = data;
        console.log(this.fetchLocation);
      },
      error => {
        if (error.status === 401) {
          //this.router.navigate(['']);
        }
        console.log(JSON.stringify(error))
      }
    );
  }

  fetchFinishGoods(scanbarcode, locationId) {
    return this.finishedGoodService.getFinishGoodWithBarcode(scanbarcode).subscribe(
      data => {
        console.log(data);
        var fetchfinishgoods = data;
        if (fetchfinishgoods.length > 0) {
          var finishedgoodsId = fetchfinishgoods[0]["_id"];
          var json: JSON = JSON.parse('{}');
          json["location_id"] = locationId;

          this.finishedGoodService.updatefinishedgoods(finishedgoodsId, json).subscribe(
            data => {
              console.log(data);
              this.alertService.success("Finish Goods Updated");
            },
            error => {
              console.log(error);
              this.alertService.error("Finish Goods Not Updated");
            }
          );
        } 
        else {
          this.alertService.error("No finished goes with bar code existed");
        }
      },
      error => {
        console.log(error);
        this.alertService.error("Bar code not recognized");
      }
    );
  }

  onChangePartNumber(evt) {
    var scanbarcode = this.model.scanbarcode;
    this.loaderService.display(true);
    var filteredLocations = this.fetchLocation.filter(element => { return element["barcode"] === scanbarcode } );

    if (filteredLocations.length > 0) {
      console.log('filteredLocations', filteredLocations);
      this.locationBarcode = filteredLocations[0]["barcode"];
      this.locationId = filteredLocations[0]["_id"];
    } 
    else {
      this.fetchFinishGoods(scanbarcode, this.locationId);
    }
    this.loaderService.display(false);
    this.model.scanbarcode = '';
  }
}