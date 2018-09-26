import { Component, OnInit } from '@angular/core';
import { FinishedGoodService } from '../shared/finishedgoods.service';
import { FinishedGood } from '../shared/finishedgoods.model';
import { PickListService } from '../shared/picklist.service';
import { PickList } from '../shared/picklist.model';
import { AlertService } from '../shared/alert.service';
import { LoaderService } from '../shared/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

	model: PickList;
  picklistMap: Array<Object> = [];
  picklistDisplay: Array<Object> = [];
  scanbarCode: string;
  counter: any = 0;
  statusCheck: boolean;
  picklistStatus: JSON;

  constructor(private pickListService: PickListService,
  private finishedGoodService: FinishedGoodService,
  private alertService: AlertService) { 
  this.model = new PickList('','','','');
  }

  ngOnInit() {
  this.fetchPickLists();
  }

  onChangePartNumber(evt) {
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

  fetchPickLists() {
    this.pickListService.listpicklist().subscribe(
      data => {
        this.picklistMap = data.filter(item => { return (item["status"] === 2);});
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
}
