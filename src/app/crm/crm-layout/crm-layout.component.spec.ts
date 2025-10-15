import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmLayoutComponent } from './crm-layout.component';

describe('CrmLayoutComponent', () => {
  let component: CrmLayoutComponent;
  let fixture: ComponentFixture<CrmLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrmLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrmLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
