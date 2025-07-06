import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidentialPghostelComponent } from './residential-pghostel.component';

describe('ResidentialPghostelComponent', () => {
  let component: ResidentialPghostelComponent;
  let fixture: ComponentFixture<ResidentialPghostelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResidentialPghostelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResidentialPghostelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
