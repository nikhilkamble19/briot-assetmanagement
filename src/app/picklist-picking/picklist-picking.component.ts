import { Component, OnInit } from '@angular/core';
import { FinishedGoodService } from '../shared/finishedgoods.service';
import { FinishedGood } from '../shared/finishedgoods.model';
import { PickListService } from '../shared/picklist.service';
import { PickList } from '../shared/picklist.model';
import { AlertService } from '../shared/alert.service';
import { LoaderService } from '../shared/loader.service';

@Component({
  selector: 'app-picklist-picking',
  templateUrl: './picklist-picking.component.html',
  styleUrls: ['./picklist-picking.component.css']
})
export class PicklistPickingComponent implements OnInit {

  model: PickList;
  picklistMap: Array<Object> = [];
  picklistDisplay: Array<Object> = [];
  scanbarCode: string;
  counter: any = 0;
  statusCheck: boolean;
  picklistStatus: JSON;

  constructor(
  private pickListService: PickListService,
  private finishedGoodService: FinishedGoodService,
  private alertService: AlertService) { 
    this.model = new PickList('','','','');
  }

  ngOnInit() {
    this.fetchPickLists();
  }

  fetchPickLists() {
    this.pickListService.listpicklist().subscribe(
      data => {
        this.picklistMap = data;
        console.log(data);
      },
      error => {
        if (error.status === 401) {
          //this.router.navigate(['']);
        }
        console.log(JSON.stringify(error))
      }
    );
  }

  onChangePartNumber(evt) {
    this.counter = 0;
    this.statusCheck = false;
    console.log(this.statusCheck);
    console.log(this.model.display_name["_id"]);
    this.finishedGoodService.listfinishedgoodsbypicklist(this.model.display_name["_id"]).subscribe(
      data => {
        this.picklistDisplay = data;
        console.log(this.picklistDisplay);
      },
      error => {
        if (error.status === 401) {
          //this.router.navigate(['']);
        }
        console.log(JSON.stringify(error))
      }
    );
  }

  onScan(){
    console.log(this.model["scanbarcode"]);
    var json: JSON = JSON.parse('{}');
    json["status"] = 1;

    this.picklistStatus = json;
    
    for(var i=0; i < this.picklistDisplay.length; i++)
    {
      this.picklistDisplay = this.picklistDisplay.sort(item => { return (item["check"]); } )
      //conssole.log(this.pi)
      //console.log(this.picklistDisplay[i].barcode);
      if(this.model["scanbarcode"] === this.picklistDisplay[i]["barcode"])
      {
        if(this.picklistDisplay[i]["check"] != true)
        {
          if(this.statusCheck === false){
            this.statusCheck = true;
            console.log(this.picklistStatus);
            console.log(this.model.display_name["_id"]);
            this.pickListService.updatepicklist(this.model.display_name["_id"], this.picklistStatus).subscribe(
              data => {
                console.log(data);
              },
              error => {
                console.log(JSON.stringify(error));
              }
            );
          }
          this.picklistDisplay[i]["check"] = true;
          if(this.counter < this.picklistDisplay.length)
          {
            ++this.counter;
          }
          break;
        }
      }
      //console.log(this.checkBarcode);
    }
    this.scanbarCode = this.model["scanbarcode"];
    //if(this.scanbarCode === )
    this.model["scanbarcode"]='';
  }

  onSubmit(){
    if(this.counter === this.picklistDisplay.length){
      var json: JSON = JSON.parse('{}');
      json["status"] = 2;
      this.picklistStatus = json;

      this.pickListService.updatepicklist(this.model.display_name["_id"], this.picklistStatus).subscribe(
        data => {
          console.log(data);
        },
        error => {
          console.log(JSON.stringify(error));
        }
      );
    }
  }
}
