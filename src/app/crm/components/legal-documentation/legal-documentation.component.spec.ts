import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalDocumentationComponent } from './legal-documentation.component';

describe('LegalDocumentationComponent', () => {
  let component: LegalDocumentationComponent;
  let fixture: ComponentFixture<LegalDocumentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LegalDocumentationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LegalDocumentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
