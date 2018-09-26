import { Component } from '@angular/core';
// import { LoaderService } from './shared/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Cosmos PoC';

  showLoader: boolean;

  constructor(
    /*private loaderService: LoaderService*/) {
  }

  ngOnInit() {
      this.showLoader = false;

  }

}
