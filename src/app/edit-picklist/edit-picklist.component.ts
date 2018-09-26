import { Component, OnInit } from '@angular/core';
import { FinishedGood } from '../shared/finishedgoods.model';
import { FinishedGoodService } from '../shared/finishedgoods.service';
import { PickListService } from '../shared/picklist.service';
import { PickList } from '../shared/picklist.model';
import { AlertService } from '../shared/alert.service';
import { LoaderService } from '../shared/loader.service';

@Component({
  selector: 'app-edit-picklist',
  templateUrl: './edit-picklist.component.html',
  styleUrls: ['./edit-picklist.component.css']
})
export class EditPicklistComponent implements OnInit {
	
	model: PickList;
  picklistMap: Array<Object> = [];
  picklistDisplay: Array<Object> = [];
  picklistData: Array<Object> = [];
  partData: JSON;
  selectedAll: any;

  constructor(private pickListService: PickListService,
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
  	console.log(this.model.display_name);
    this.finishedGoodService.listfinishedgoodsbypicklist(this.model.display_name["_id"]).subscribe(
      data => {
       	this.picklistDisplay = data.filter(item => { return (item["part"] != null); } );
       	this.picklistData = data;
       	console.log(this.picklistDisplay);
       	console.log(this.picklistData);
       	var json: JSON = JSON.parse('{}');
        json["picklist_id"]= null;

        this.partData = json;
      },
      error => {
       	if (error.status === 401) {
         	//this.router.navigate(['']);
       	}
      	console.log(JSON.stringify(error));
    	}
   	);
 	}

 	selectAll() {
    for (var i = 0; i < this.picklistDisplay.length; i++) {
      this.picklistDisplay[i]['selected'] = this.selectedAll;
    }
  }

  checkIfAllSelected() {
    this.selectedAll = this.picklistDisplay.every(function(item:any) {
      return item.selected == true;
    })
  } 

  onSubmit(){
  console.log(this.picklistDisplay);
  console.log("Inside Submit");
  	for (var pointer = this.picklistDisplay.length - 1; pointer >= 0; pointer--) {
      if (this.picklistDisplay[pointer]['selected'] === true) {
        this.deleterow(pointer);
        console.log(this.picklistDisplay.length);
      }
    }
  }

  deleterow(i) {
  console.log(this.partData);
    this.finishedGoodService.updatefinishedgoods(this.picklistData[i]["_id"], this.partData).subscribe(
      	data => {
      		console.log(data);
      	},
      	error => {
       		console.log(JSON.stringify(error));
    		}
    	);
    console.log(this.picklistData[i]["_id"]);
    console.log(this.picklistData[i]["part"]);
  }
}
