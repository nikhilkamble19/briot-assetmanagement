import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PicklistPickingComponent } from './picklist-picking.component';

describe('PicklistPickingComponent', () => {
  let component: PicklistPickingComponent;
  let fixture: ComponentFixture<PicklistPickingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PicklistPickingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PicklistPickingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
