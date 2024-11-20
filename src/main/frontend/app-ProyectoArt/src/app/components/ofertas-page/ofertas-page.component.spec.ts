import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfertasPageComponent } from './ofertas-page.component';

describe('OfertasPageComponent', () => {
  let component: OfertasPageComponent;
  let fixture: ComponentFixture<OfertasPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OfertasPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfertasPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
