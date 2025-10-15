import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomSmartComponent } from './custom-smart.component';

describe('CustomSmartComponent', () => {
  let component: CustomSmartComponent;
  let fixture: ComponentFixture<CustomSmartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomSmartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomSmartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
