import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditAssetComponent } from './audit-asset.component';

describe('AuditAssetComponent', () => {
  let component: AuditAssetComponent;
  let fixture: ComponentFixture<AuditAssetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditAssetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
