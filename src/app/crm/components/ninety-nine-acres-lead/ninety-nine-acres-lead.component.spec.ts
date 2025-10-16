import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NinetyNineAcresLeadComponent } from './ninety-nine-acres-lead.component';

describe('NinetyNineAcresLeadComponent', () => {
  let component: NinetyNineAcresLeadComponent;
  let fixture: ComponentFixture<NinetyNineAcresLeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NinetyNineAcresLeadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NinetyNineAcresLeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
