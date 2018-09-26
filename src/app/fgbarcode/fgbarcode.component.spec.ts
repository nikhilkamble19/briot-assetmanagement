import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FgbarcodeComponent } from './fgbarcode.component';

describe('FgbarcodeComponent', () => {
  let component: FgbarcodeComponent;
  let fixture: ComponentFixture<FgbarcodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FgbarcodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FgbarcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
