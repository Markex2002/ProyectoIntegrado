import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistasPageComponent } from './artistas-page.component';

describe('ArtistasPageComponent', () => {
  let component: ArtistasPageComponent;
  let fixture: ComponentFixture<ArtistasPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtistasPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtistasPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
