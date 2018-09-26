import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportComponent } from './report/report.component';
import { FgbarcodeComponent } from './fgbarcode/fgbarcode.component';
import { PicklistBarcodeComponent } from './picklist-barcode/picklist-barcode.component';
import { AddPartComponent } from './add-part/add-part.component';
import { AuditAssetComponent } from './audit-asset/audit-asset.component';
import { AddLocationComponent } from './add-location/add-location.component';
import { LocationReportComponent } from './location-report/location-report.component';
import { PutawayComponent } from './putaway/putaway.component';
import { PicklistPickingComponent } from './picklist-picking/picklist-picking.component';
import { EditPicklistComponent } from './edit-picklist/edit-picklist.component';
import { DeletePicklistComponent } from './delete-picklist/delete-picklist.component';
import { LoaderComponent } from './loader/loader.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/audit-asset', pathMatch: 'full' },
  { path: 'report', component: ReportComponent },
  { path: 'fgbarcode', component: FgbarcodeComponent },
  { path: 'picklist-barcode', component: PicklistBarcodeComponent },
  { path: 'audit-asset', component: AuditAssetComponent },
  { path: 'add-part', component: AddPartComponent },
  { path: 'add-location', component: AddLocationComponent },
  { path: 'location-report', component: LocationReportComponent },
  { path: 'putaway', component: PutawayComponent },
  { path: 'picklist-picking', component: PicklistPickingComponent },
  { path: 'edit-picklist', component: EditPicklistComponent },
  { path: 'delete-picklist', component: DeletePicklistComponent },
  { path: 'loader', component: LoaderComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
