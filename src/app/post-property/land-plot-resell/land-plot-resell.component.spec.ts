import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandPlotResellComponent } from './land-plot-resell.component';

describe('LandPlotResellComponent', () => {
  let component: LandPlotResellComponent;
  let fixture: ComponentFixture<LandPlotResellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandPlotResellComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandPlotResellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
