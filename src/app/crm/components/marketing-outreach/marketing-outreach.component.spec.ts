import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketingOutreachComponent } from './marketing-outreach.component';

describe('MarketingOutreachComponent', () => {
  let component: MarketingOutreachComponent;
  let fixture: ComponentFixture<MarketingOutreachComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketingOutreachComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketingOutreachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
