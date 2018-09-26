import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Part } from '../shared/part.model';
import { PartService } from '../shared/part.service';
import { FinishedGood } from '../shared/finishedgoods.model';
import { LoaderService } from '../shared/loader.service';
import { FinishedGoodService } from '../shared/finishedgoods.service';
import { UtilityService } from '../shared/utility.service';
import { FinishedGoodRecord } from '../shared/fgrecord.model';
import { FinishedGoodRecordService } from '../shared/fgrecord.service';

@Component({
  selector: 'app-fgbarcode',
  templateUrl: './fgbarcode.component.html',
  styleUrls: ['./fgbarcode.component.css']
})
export class FgbarcodeComponent implements OnInit {
  
  model: FinishedGoodRecord;
  parts: Array<Object> = [];
  partsMap: Array<Object> = [];
  
  constructor(private partService: PartService,
  private loaderService: LoaderService,
  private FinishedGoodService: FinishedGoodService,
  private FinishedGoodRecordService: FinishedGoodRecordService,
  private utilityService: UtilityService) { 
    this.model = new FinishedGoodRecord('','','');
  }

  ngOnInit() {
    this.fetchPartLists();
  }

  onSubmit(){
    var part_json = {
      "part": this.model.part_number["_id"],
      "quantity": this.model.quantity,
      "eachPackQuantity": this.model["eachPackQuantity"],
    };
    this.savePart(part_json);
  }

  savePart(part_json: any){
    console.log(part_json);
    this.loaderService.display(true);
    console.log("Inside");
    this.FinishedGoodRecordService.addfinishedgoodsrecord(part_json).subscribe(
      data => {
        console.log("Inside");
        console.log(data);
        if (data.length == 0) {
          return;
        }
        console.log(data.length);
        for(var i = 0 ; i < data.length; i++)
        {
          var mat:JSON = data[i];
          console.log(mat);
          this.utilityService.printOnZebraPrinterWithParams(mat, "Part Number", "Part Desc.", this.parts["part_number"], this.parts["description"]);
        }
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

  getPart(parts: string){
    //console.log(parts);
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

  onChangePartNumber(selectedPart) {
    this.getPart(this.model.part_number["_id"]); 
  }
}