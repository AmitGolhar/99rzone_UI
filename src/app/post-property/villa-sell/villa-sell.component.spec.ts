import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VillaSellComponent } from './villa-sell.component';

describe('VillaSellComponent', () => {
  let component: VillaSellComponent;
  let fixture: ComponentFixture<VillaSellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VillaSellComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VillaSellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
