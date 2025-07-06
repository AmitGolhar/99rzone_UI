import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VillaResellComponent } from './villa-resell.component';

describe('VillaResellComponent', () => {
  let component: VillaResellComponent;
  let fixture: ComponentFixture<VillaResellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VillaResellComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VillaResellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
