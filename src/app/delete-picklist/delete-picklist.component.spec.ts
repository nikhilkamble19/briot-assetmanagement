import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePicklistComponent } from './delete-picklist.component';

describe('DeletePicklistComponent', () => {
  let component: DeletePicklistComponent;
  let fixture: ComponentFixture<DeletePicklistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletePicklistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletePicklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
