import { Component, OnInit } from '@angular/core';
import { Customer } from '../shared/customer.model';
import { FinishedGoodService } from '../shared/finishedgoods.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  finishedGoods: JSON;
  interval: any;

  constructor(
    private finishedGoodsService: FinishedGoodService
  ) { }

  ngOnInit() {
    this.fetchFinishedGoods();
  }

  fetchFinishedGoods() {
    this.finishedGoodsService.listfinishedgoods().subscribe(
      data => {
         // console.log(data);
        console.log('data-refreshed');
        if (data != null) {
           this.finishedGoods = data;
        }
      },
      error => {
        if (error.status === 401) {
        }
        console.log(JSON.stringify(error))
      }
    );
  }
}
