import { Component, OnInit } from '@angular/core';
import { Customer } from '../shared/customer.model';
import { FinishedGoodService } from '../shared/finishedgoods.service';
import { Part } from '../shared/part.model';
import { PartService } from '../shared/part.service';
import { LocationService } from '../shared/location.service';
import { FinishedGoodRecord } from '../shared/fgrecord.model';
import { FinishedGoodRecordService } from '../shared/fgrecord.service';
import { LoaderService } from '../shared/loader.service';
import { UtilityService } from '../shared/utility.service';

import { saveAs } from 'file-saver/FileSaver';
import { SelectItem } from 'ng2-select';

@Component({
  selector: 'location-report',
  templateUrl: './location-report.component.html',
  styleUrls: ['./location-report.component.css']
})
export class LocationReportComponent implements OnInit {

  finishedGoods: JSON;
  interval: any;
  partsMap: Array<Object> = [];
  locationMap: Array<Object> = [];
  parts: Array<Object> = [];
  locations: Array<Object> = [];
  model: FinishedGoodRecord;
  part: [SelectItem];
  location: [SelectItem];

  constructor(private partService: PartService,
              private finishedGoodsService: FinishedGoodService,
              private FinishedGoodService: FinishedGoodService,
              private FinishedGoodRecordService: FinishedGoodRecordService,
              private utilityService: UtilityService,
              private loaderService: LoaderService,
              private locationService: LocationService){
                this.model = new FinishedGoodRecord('','','');
              }

  ngOnInit() {
    this.fetchPartLists();
    this.fetchLocationLists();
  }

  onSubmit(){
    this.loaderService.display(true);
    // console.log(this.model.location_id);
    // console.log(this.model.part_number);
    if(this.model.part_number === '0'){
      this.model.part_number = null;
    }
    if(this.model.location_id === '0'){
      this.model.location_id = null;
    }
    if(this.model.location_id === null  && this.model.part_number != null){
      // this.loaderService.display(true);
      this.fetchFinishedGoodsbypart();
    }
    else if (this.model.part_number === null && this.model.location_id != null) {
      // this.loaderService.display(true);
      this.fetchFinishedGoodsbylocation();
    }
    else if(this.model.location_id === null && this.model.part_number === null){
      // this.loaderService.display(true);
      this.fetchFinishedGoodsbyboth();
    }
    else{
      // this.loaderService.display(true);
      this.fetchFinishedGoods();
    }
  }

  fetchFinishedGoods() {
    
    this.finishedGoodsService.listfinishedgoodsbypartslocation(this.parts["_id"], this.locations["_id"]).subscribe(
      data => {
        console.log(data);
        //this.finishedGoods = data.filter(item => { return (item["location_id"] != null && item["delivered"] != true && item["part"] === this.parts); } );
        //this.finishedGoods = data.filter(item => {return (item["location_id"] != null && item["delivered"] != true);});
        this.finishedGoods = data.filter(item => {return (item["delivered"] != true);});
        console.log(JSON.stringify(this.finishedGoods));
      },
      error => {
        if (error.status === 401) {
          this.loaderService.display(false);
        }
        console.log(JSON.stringify(error))
      },
      () => {
        this.loaderService.display(false);
      }
    );
  }

  fetchFinishedGoodsbyboth(){
    // this.loaderService.display(true);
    this.finishedGoodsService.listfinishedgoods().subscribe(
      data => {
        this.finishedGoods = data.filter(item => { return (item["location_id"] != null && item["delivered"] != true && item["part"] != null); } );
        console.log(JSON.stringify(this.finishedGoods));
      },
      error => {
        if (error.status === 401) {
          this.loaderService.display(false);
        }
        console.log(JSON.stringify(error))
      },
      () => {
        this.loaderService.display(false);
      }
    );
  }

  fetchFinishedGoodsbypart(){
    // this.loaderService.display(true);
    this.finishedGoodsService.listfinishedgoodsbyparts(this.parts["_id"]).subscribe(
      data => {
        this.finishedGoods = data.filter(item => {return (item["location_id"] != null && item["delivered"] != true);});
        console.log(JSON.stringify(this.finishedGoods));
      },
      error => {
        if (error.status === 401) {
          this.loaderService.display(false);
        }
        console.log(JSON.stringify(error))
      },
      () => {
        this.loaderService.display(false);
      }
    );
  }

  fetchFinishedGoodsbylocation(){
    // this.loaderService.display(true);
    this.finishedGoodsService.listfinishedgoodsbylocation(this.locations["_id"]).subscribe(
      data => {
        console.log(data);
        this.finishedGoods = data.filter(item => {return (item["part"] != null && item["delivered"] != true);});
        //console.log(JSON.stringify(this.finishedGoods));
      },
      error => {
        if (error.status === 401) {
          this.loaderService.display(false);
        }
        console.log(JSON.stringify(error))
      },
      () => {
        this.loaderService.display(false);
      }
    );
  }

  fetchPartLists() {
    this.partService.listParts().subscribe(
      data => { 
      this.partsMap = data; 
      console.log(this.partsMap);
      },
      error => {
        if (error.status === 401) {
          //this.router.navigate(['']);
        }
        console.log(JSON.stringify(error))
      }
    );
  }

  fetchLocationLists() {
    this.locationService.listlocations().subscribe(
      data => { 
      this.locationMap = data; 
      console.log(this.locationMap);
      },
      error => {
        if (error.status === 401) {
          //this.router.navigate(['']);
        }
        console.log(JSON.stringify(error))
      }
    );
  }

  getPart(parts: string){
    this.partService.getPart(parts).subscribe(
      data => {
        console.log(JSON.stringify(data))
        this.parts = data;
      },
      error => {
        console.log(JSON.stringify(error))
        this.loaderService.display(false);
        if (error.status === 401) {

        } 
        else {
          var errMessage = JSON.parse(error["_body"]).message;
        }
      },
      () => {
        this.loaderService.display(false);
      }
    );
  }

  getLocation(locations: string){
    this.locationService.getLocation(locations).subscribe(
      data => {
        console.log(JSON.stringify(data))
        this.locations = data;
      },
      error => {
        console.log(JSON.stringify(error))
        this.loaderService.display(false);
        if (error.status === 401) {

        } 
        else {
         var errMessage = JSON.parse(error["_body"]).message;
        }
      },
      () => {
        this.loaderService.display(false);
      }
    );
  }

  onChangePartNumber(selectedPart) {
    if(this.model.part_number != '0'){
      this.getPart(this.model.part_number["_id"]);
    }
    console.log(this.model.part_number["_id"]);
    
  }

  onChangeLocation(selectedLocation){
    if(this.model.location_id != '0'){
     this.getLocation(this.model.location_id["_id"]);
    }
  }

  // onExportToCSV() {

  //   let part_id: string = (this.parts ? this.parts["_id"] : null);
  //   part_id = (part_id === "0") ? "" : part_id;
  //   console.log(part_id);

  //   let location_id: string = (this.locations ? this.locations["_id"] : null);
  //   location_id = (location_id === "0") ? "" : location_id;
  //   console.log(location_id);

  //   this.loaderService.display(true);
  //   this.finishedGoodsService.ExportToCSV(part_id, location_id).subscribe(
  //       response => {
  //         console.log(response.text());
  //         this.saveToFileSystem(response);
  //       },
  //     error => {
  //       if (error.status === 401) {
  //         this.loaderService.display(false);
  //       }
  //       console.log(JSON.stringify(error))
  //     },
  //     () => {
  //       this.loaderService.display(false);
  //     }
  //   );
  // }

  // private saveToFileSystem(response) {
  //   console.log(response);
  //   const contentDispositionHeader: string = response.headers.get('Content-Disposition');
  //   // const contentDispositionHeader: string = response._body;
  //   console.log(response.headers.get('Content-Type'));
  //   const parts: string[] = contentDispositionHeader.split(';');
  //   const filename = parts[1].split('=')[1];
  //   const blob = new Blob([response._body], { type: 'text/csv' });
  //   saveAs(blob, filename);
  // }
}
