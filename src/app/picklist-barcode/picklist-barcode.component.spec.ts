import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PicklistBarcodeComponent } from './picklist-barcode.component';

describe('PicklistBarcodeComponent', () => {
  let component: PicklistBarcodeComponent;
  let fixture: ComponentFixture<PicklistBarcodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PicklistBarcodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PicklistBarcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
