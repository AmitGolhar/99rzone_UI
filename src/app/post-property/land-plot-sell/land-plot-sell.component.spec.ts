import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandPlotSellComponent } from './land-plot-sell.component';

describe('LandPlotSellComponent', () => {
  let component: LandPlotSellComponent;
  let fixture: ComponentFixture<LandPlotSellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandPlotSellComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandPlotSellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
