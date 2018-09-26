import { Component, OnInit } from '@angular/core';
import { AuditAssetRecord } from '../shared/audit-asset.model';
import { AuditAssetRecordService } from '../shared/audit-asset.service';
import { LoaderService } from '../shared/loader.service';
import { UtilityService } from '../shared/utility.service';
import { AlertService } from '../shared/alert.service';

@Component({
  selector: 'app-picklist-barcode',
  templateUrl: './picklist-barcode.component.html',
  styleUrls: ['./picklist-barcode.component.css']
})
export class PicklistBarcodeComponent implements OnInit {

  // finishedGoods: JSON;
  // interval: any;
  siteMap: Array<Object> = [];
  locationMap: Array<Object> = [];
  sublocationMap: Array<Object> = [];
  displayData: Array<Object> = [];
  auditId: any;
  model: AuditAssetRecord;
  createdAuditId: any;
  // location: [SelectItem];

  constructor(
              private utilityService: UtilityService,
              private loaderService: LoaderService,
              private auditassetService: AuditAssetRecordService,
              private alertService: AlertService){
                this.model = new AuditAssetRecord('','','','');
              }

  ngOnInit() {
    this.fetchSiteLists();
    // this.fetchLocationLists();
  }

  onSubmit(){
    this.auditassetService.newAuditId(this.model.subLocation["SubLocation"],this.model.Site["Site"],this.model.Location["Location"]).subscribe(
      data => { 
      this.createdAuditId = data; 
      console.log(this.createdAuditId);
      this.alertService.success("New Audit created successfully");
      // alert.
      },
      error => {
        if (error.status === 401) {
        }
        console.log(JSON.stringify(error))
      }
    );
    this.model["scanbarcode"]='';
  }

  fetchAuditId(){
    this.auditassetService.getAuditId().subscribe(
      data => { 
      this.auditId = data; 
      console.log(this.auditId["AuditID"]);

      this.model["scanbarcode"] = this.auditId["AuditID"] + 1;
      },
      error => {
        if (error.status === 401) {
        }
        console.log(JSON.stringify(error))
      }
    );
  }

  fetchAll(){
    this.auditassetService.listAll().subscribe(
      data => { 
      this.displayData = data; 
      console.log(this.displayData);
      },
      error => {
        if (error.status === 401) {
        }
        console.log(JSON.stringify(error))
      }
    );
  }

  fetchbySubLocation(){
    this.auditassetService.listbySubLocation(this.model.subLocation["SubLocation"]).subscribe(
      data => { 
      this.displayData = data; 
      console.log(this.displayData);
      },
      error => {
        if (error.status === 401) {
        }
        console.log(JSON.stringify(error))
      }
    );
  }

  fetchbyLocation(){
    this.auditassetService.listbyLocation(this.model.Location["Location"]).subscribe(
      data => { 
      this.displayData = data; 
      console.log(this.displayData);
      },
      error => {
        if (error.status === 401) {
        }
        console.log(JSON.stringify(error))
      }
    );
  }

  fetchbyLocationandSubLocation(){
    this.auditassetService.listbyLocationandSubLocation(this.model.Location["Location"],this.model.subLocation["SubLocation"]).subscribe(
      data => { 
      this.displayData = data; 
      console.log(this.displayData);
      },
      error => {
        if (error.status === 401) {
        }
        console.log(JSON.stringify(error))
      }
    );
  }

  fetchbySite(){
    this.auditassetService.listbySite(this.model.Site["Site"]).subscribe(
      data => { 
      this.displayData = data; 
      console.log(this.displayData);
      },
      error => {
        if (error.status === 401) {
        }
        console.log(JSON.stringify(error))
      }
    );
  }

  fetchbySiteandSubLocation(){
    this.auditassetService.listbySubLocationandSite(this.model.subLocation["SubLocation"],this.model.Site["Site"]).subscribe(
      data => { 
      this.displayData = data; 
      console.log(this.displayData);
      },
      error => {
        if (error.status === 401) {
        }
        console.log(JSON.stringify(error))
      }
    );
  }

  fetchbySiteandLocation(){
    this.auditassetService.listbyLocationandSite(this.model.Location["Location"],this.model.Site["Site"]).subscribe(
      data => { 
      this.displayData = data; 
      console.log(this.displayData);
      },
      error => {
        if (error.status === 401) {
        }
        console.log(JSON.stringify(error))
      }
    );
  }

  fetchbySiteandLocationandSubLocation(){
    this.auditassetService.listbySubLocationandSiteandLocation(this.model.subLocation["SubLocation"],this.model.Site["Site"],this.model.Location["Location"]).subscribe(
      data => { 
      this.displayData = data; 
      console.log(this.displayData);
      },
      error => {
        if (error.status === 401) {
        }
        console.log(JSON.stringify(error))
      }
    );
  }

  

  fetchSiteLists() {
    this.auditassetService.listSite().subscribe(
      data => { 
      this.siteMap = data; 
      console.log(this.siteMap);
      },
      error => {
        if (error.status === 401) {
        }
        console.log(JSON.stringify(error))
      }
    );
  }

  fetchLocationLists() {
    this.auditassetService.listlocations().subscribe(
      data => { 
      this.locationMap = data; 
      console.log(this.locationMap);
      },
      error => {
        if (error.status === 401) {
        }
        console.log(JSON.stringify(error))
      }
    );
  }

  fetchSubLocationLists() {
    this.auditassetService.listsublocations().subscribe(
      data => { 
      this.sublocationMap = data; 
      console.log(this.sublocationMap);
      },
      error => {
        if (error.status === 401) {
        }
        console.log(JSON.stringify(error))
      }
    );
  }

  onChangeSite(selectedSite) {
    if(this.model.Site != '0'){
    }
    console.log(this.model.Site["Site"]);
  this.fetchLocationLists();
  }

  onChangeLocation(selectedLocation){
    if(this.model.Location != '0'){
    }
    console.log(this.model.Site["Site"]);
    this.fetchSubLocationLists();
  }

  onChangeSubLocation(selectedSubLocation){
    this.fetchAuditId();
  }

  // getList(){
  //   console.log(this.model.Location["Location"]);
  //   this.loaderService.display(true);
  //   if(this.model.Site["Site"] === undefined){
  //     if(this.model.Location["Location"] === undefined){
  //       if(this.model.subLocation["SubLocation"] === undefined){
  //         this.fetchAll();
  //       }
  //       else{
  //         this.fetchbySubLocation();
  //       }
  //     }
  //     else{
  //       if(this.model.subLocation["SubLocation"] === undefined){
  //         this.fetchbyLocation();
  //       }
  //       else{
  //         this.fetchbyLocationandSubLocation();
  //       }
  //     }
  //   }
  //   else{
  //     if(this.model.Location["Location"] === undefined){
  //       if(this.model.subLocation["SubLocation"] === undefined){
  //         this.fetchbySite();
  //       }
  //       else{
  //         this.fetchbySiteandSubLocation();
  //       }
  //     }
  //     else{
  //       if(this.model.subLocation["SubLocation"] === undefined){
  //         this.fetchbySiteandLocation();
  //       }
  //       else{
  //         this.fetchbySiteandLocationandSubLocation();
  //       }
  //     }
  //   }
  // }
}
