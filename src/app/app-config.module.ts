import { NgModule, InjectionToken } from '@angular/core';
// import { AuditAssetComponent } from './audit-asset/audit-asset.component';

export let APP_CONFIG = new InjectionToken<AppConfig>('app.config');

export class AppConfig {
  apiEndpoint: string;
}

export const APP_DI_CONFIG: AppConfig = {
  apiEndpoint: 'http://192.168.43.7:3000/api'
   // apiEndpoint: 'https://poc-wms-server.herokuapp.com/api'
};

@NgModule({
  providers: [{
    provide: APP_CONFIG,
    useValue: APP_DI_CONFIG
  }],
  // declarations: [AuditAssetComponent],
})
export class AppConfigModule { }
