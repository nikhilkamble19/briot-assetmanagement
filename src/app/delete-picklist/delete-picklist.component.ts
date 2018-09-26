import { Component, OnInit } from '@angular/core';
import { FinishedGood } from '../shared/finishedgoods.model';
import { FinishedGoodService } from '../shared/finishedgoods.service';
import { PickListService } from '../shared/picklist.service';
import { PickList } from '../shared/picklist.model';
import { AlertService } from '../shared/alert.service';
import { LoaderService } from '../shared/loader.service';


@Component({
  selector: 'app-delete-picklist',
  templateUrl: './delete-picklist.component.html',
  styleUrls: ['./delete-picklist.component.css']
})
export class DeletePicklistComponent implements OnInit {
	
	model: PickList;
  picklistMap: Array<Object> = [];
  picklistDisplay: Array<Object> = [];
  picklistData: JSON;

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
       	this.picklistDisplay = data;
       	console.log(this.picklistDisplay);
       	var json: JSON = JSON.parse('{}');
        json["picklist_id"] = null;

        this.picklistData = json;
        //this.fetchPickLists();
      },
      error => {
       	if (error.status === 401) {
         	//this.router.navigate(['']);
       	}
      	console.log(JSON.stringify(error));
    	}
   	);
 	}

 	onSubmit(){
 		for(var i = 0; i<this.picklistDisplay.length; i++)
 		{
 			console.log(this.picklistDisplay[i]["_id"]);
 			//var picklist_id: JSON = null;
 			this.finishedGoodService.updatefinishedgoods(this.picklistDisplay[i]["_id"], this.picklistData).subscribe(
      	data => {
      		console.log(data);
      	},
      	error => {
       		console.log(JSON.stringify(error));
    		}
    	);
    	console.log(this.picklistData);
 		}
 		console.log(this.model.display_name["_id"]);
 		this.pickListService.deletepicklist(this.model.display_name["_id"]).subscribe(
 			data => {
 				console.log(data);
 			},
 			error => {
 				console.log(JSON.stringify(error));
 			}
 		);
 		this.fetchPickLists();
 	}
}
