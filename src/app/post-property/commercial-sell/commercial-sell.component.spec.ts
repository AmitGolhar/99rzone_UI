import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommercialSellComponent } from './commercial-sell.component';

describe('CommercialSellComponent', () => {
  let component: CommercialSellComponent;
  let fixture: ComponentFixture<CommercialSellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommercialSellComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommercialSellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
