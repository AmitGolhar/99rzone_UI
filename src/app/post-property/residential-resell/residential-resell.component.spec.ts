import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidentialResellComponent } from './residential-resell.component';

describe('ResidentialResellComponent', () => {
  let component: ResidentialResellComponent;
  let fixture: ComponentFixture<ResidentialResellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResidentialResellComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResidentialResellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
