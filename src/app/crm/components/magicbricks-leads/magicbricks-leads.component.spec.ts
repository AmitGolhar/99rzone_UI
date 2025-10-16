import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MagicbricksLeadsComponent } from './magicbricks-leads.component';

describe('MagicbricksLeadsComponent', () => {
  let component: MagicbricksLeadsComponent;
  let fixture: ComponentFixture<MagicbricksLeadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MagicbricksLeadsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MagicbricksLeadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
