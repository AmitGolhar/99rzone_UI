import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VillaRentComponent } from './villa-rent.component';

describe('VillaRentComponent', () => {
  let component: VillaRentComponent;
  let fixture: ComponentFixture<VillaRentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VillaRentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VillaRentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
