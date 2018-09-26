import { Component, OnInit } from '@angular/core';
import { AuditAssetRecord } from '../shared/audit-asset.model';
import { AuditAssetRecordService } from '../shared/audit-asset.service';
import { LoaderService } from '../shared/loader.service';
import { UtilityService } from '../shared/utility.service';

import { saveAs } from 'file-saver/FileSaver';
import { SelectItem } from 'ng2-select';

@Component({
  selector: 'audit-asset',
  templateUrl: './audit-asset.component.html',
  styleUrls: ['./audit-asset.component.css']
})
export class AuditAssetComponent implements OnInit {

  // finishedGoods: JSON;
  // interval: any;
  siteMap: Array<Object> = [];
  locationMap: Array<Object> = [];
  sublocationMap: Array<Object> = [];
  auditMap: Array<Object> = [];
  displayData: Array<Object> = [];
  auditId: Array<Object> = [];
  model: AuditAssetRecord;
  createdAuditId: any;
  // location: [SelectItem];

  constructor(
              private utilityService: UtilityService,
              private loaderService: LoaderService,
              private auditassetService: AuditAssetRecordService){
                this.model = new AuditAssetRecord('','','','');
              }

  ngOnInit() {
    this.fetchAuditId();
    // this.fetchLocationLists();
  }

  onSubmit(){
    for(var i=0; i < this.displayData.length; i++)
    {
      // this.displayData = this.displayData.sort(item => { return (item["check"]); } )
      // console.log(this.model["scanbarcode"], this.displayData[i]["BarcodeSerial"]);
      if(this.model["scanbarcode"] == this.displayData[i]["BarcodeSerial"])
      {
        console.log(this.displayData[i]["check"]);
        if(this.displayData[i]["check"] != true)
        {
          this.displayData[i]["check"] = true;
          break;
        }
      }
    }
    this.model["scanbarcode"]='';
  }

  fetchAuditId(){
    this.auditassetService.getAllAuditId().subscribe(
      data => { 
      this.auditId = data; 
      console.log(this.auditId);

      // this.model["scanbarcode"] = this.auditId["AuditID"] + 1;
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
    this.auditassetService.listbySubLocation(this.model.subLocation).subscribe(
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
    this.auditassetService.listbyLocation(this.model.Location).subscribe(
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
    this.auditassetService.listbyLocationandSubLocation(this.model.Location,this.model.subLocation).subscribe(
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
    this.auditassetService.listbySite(this.model.Site).subscribe(
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
    this.auditassetService.listbySubLocationandSite(this.model.subLocation,this.model.Site).subscribe(
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
    this.auditassetService.listbyLocationandSite(this.model.Location,this.model.Site).subscribe(
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
    this.auditassetService.listbySubLocationandSiteandLocation(this.model.subLocation,this.model.Site,this.model.Location).subscribe(
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
      // this.getPart(this.model.Site["Site"]);
    }
    console.log(this.model.Site["Site"]);
	this.fetchLocationLists();
  }

  onChangeLocation(selectedLocation){
    if(this.model.Location != '0'){
     // this.getLocation(this.model.Location["Location"]);
    }
    console.log(this.model.Site["Site"]);
    this.fetchSubLocationLists();
  }

  onChangeSubLocation(selectedSubLocation){
    this.getList();
  }

  onChangeAudit(selectedAuditId){
    this.getAuditDetails();
  }

  getAuditDetails(){
    console.log(this.model.Audit["AuditID"]);
    this.auditassetService.getAuditDetails(this.model.Audit["AuditID"]).subscribe(
      data => { 
      this.auditMap = data; 
      this.model.Site = this.auditMap[0]["AuditSite"];
      this.model.Location = this.auditMap[0]["AuditLocation"];
      this.model.subLocation = this.auditMap[0]["AuditSubLocation"];
      this.getList();
      },
      error => {
        if (error.status === 401) {
        }
        console.log(JSON.stringify(error))
      }
    );
  }

  getList(){
    console.log(this.model.Location);
    this.loaderService.display(true);
    if(this.model.Site === "Select All"){
      if(this.model.Location === "Select All"){
        if(this.model.subLocation === "Select All"){
          this.fetchAll();
        }
        else{
          this.fetchbySubLocation();
        }
      }
      else{
        if(this.model.subLocation === "Select All"){
          this.fetchbyLocation();
        }
        else{
          this.fetchbyLocationandSubLocation();
        }
      }
    }
    else{
      if(this.model.Location === "Select All"){
        if(this.model.subLocation === "Select All"){
          this.fetchbySite();
        }
        else{
          this.fetchbySiteandSubLocation();
        }
      }
      else{
        if(this.model.subLocation === "Select All"){
          this.fetchbySiteandLocation();
        }
        else{
          this.fetchbySiteandLocationandSubLocation();
        }
      }
    }
  }
}
