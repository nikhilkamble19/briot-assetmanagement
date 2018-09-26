import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPicklistComponent } from './edit-picklist.component';

describe('EditPicklistComponent', () => {
  let component: EditPicklistComponent;
  let fixture: ComponentFixture<EditPicklistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPicklistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPicklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
