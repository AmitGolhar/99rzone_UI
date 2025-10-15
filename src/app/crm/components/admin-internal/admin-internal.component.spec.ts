import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminInternalComponent } from './admin-internal.component';

describe('AdminInternalComponent', () => {
  let component: AdminInternalComponent;
  let fixture: ComponentFixture<AdminInternalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminInternalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminInternalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
