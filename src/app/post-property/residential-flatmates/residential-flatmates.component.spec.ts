import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidentialFlatmatesComponent } from './residential-flatmates.component';

describe('ResidentialFlatmatesComponent', () => {
  let component: ResidentialFlatmatesComponent;
  let fixture: ComponentFixture<ResidentialFlatmatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResidentialFlatmatesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResidentialFlatmatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
