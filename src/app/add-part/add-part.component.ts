import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Part } from '../shared/part.model';
import { PartService } from '../shared/part.service';
import { LoaderService } from '../shared/loader.service';
import { Http, Headers, Response } from '@angular/http';

@Component({
  selector: 'app-add-part',
  templateUrl: './add-part.component.html',
  styleUrls: ['./add-part.component.css']
})
export class AddPartComponent implements OnInit {

  model: Part;

  constructor(private PartService: PartService,
              private router: Router, 
              private loaderService: LoaderService) { 
  }

  ngOnInit() {
    this.model = new Part('', '', '');
  }

  onSubmit(part_number, size, moc, description) {
    var partJson = {
      "part_number": this.model.part_number,
      "description": this.model.description,
      "data_matrix_code": this.model.data_matrix_code,
    };

    console.log(partJson);

    this.loaderService.display(true);
    this.PartService.addPart(partJson).subscribe(
      data => {
        console.log(JSON.stringify(data)); 
      },
      error => {
        console.log(JSON.stringify(error))
        this.loaderService.display(false);
        if (error.status === 401) {
          this.router.navigate(['']);
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
  
  enable() {
    var enableSubmit = ( 
      this.model.part_number && this.model.part_number.length > 0
      && this.model.description && this.model.description.length > 0
    );
  return enableSubmit;
  }
}
