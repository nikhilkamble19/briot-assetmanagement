import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ReportComponent } from './report/report.component';
import { AuditAssetComponent } from './audit-asset/audit-asset.component';
import { AppRoutingModule } from './app-routing.module';
import { AppConfigModule } from './app-config.module';
import { CustomerService } from './shared/customer.service';
import { FgbarcodeComponent } from './fgbarcode/fgbarcode.component';
import { PicklistBarcodeComponent } from './picklist-barcode/picklist-barcode.component';
import { AddPartComponent } from './add-part/add-part.component';
import { AddLocationComponent } from './add-location/add-location.component';
import { LocationReportComponent } from './location-report/location-report.component';
import { PartService } from './shared/part.service';
import { LocationService } from './shared/location.service';
import { LoaderService } from './shared/loader.service';
import { FinishedGoodService } from './shared/finishedgoods.service';
import { PickListService } from './shared/picklist.service';
import { UtilityService } from './shared/utility.service';
import { AlertComponent } from './directives/alert.component';
import { AlertService } from './shared/alert.service';
import { FinishedGoodRecordService } from './shared/fgrecord.service';
import { AuditAssetRecordService } from './shared/audit-asset.service'
import { PutawayComponent } from './putaway/putaway.component';
import { AutofocusDirective } from './autofocus.directive';
import { PicklistPickingComponent } from './picklist-picking/picklist-picking.component';
import { EditPicklistComponent } from './edit-picklist/edit-picklist.component';
import { DeletePicklistComponent } from './delete-picklist/delete-picklist.component';
import { LoaderComponent } from './loader/loader.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ReportComponent,
    AuditAssetComponent,
    FgbarcodeComponent,
    PicklistBarcodeComponent,
    AddPartComponent,
    AddLocationComponent,
    LocationReportComponent,
    PutawayComponent,
    AutofocusDirective,
    AlertComponent,
    PicklistPickingComponent,
    EditPicklistComponent,
    DeletePicklistComponent,
    LoaderComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppConfigModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    CustomerService,
    LocationService,
    PartService,
    LoaderService,
    FinishedGoodService,
    UtilityService,
    PickListService,
    AlertService,
    FinishedGoodRecordService,
    AuditAssetRecordService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
