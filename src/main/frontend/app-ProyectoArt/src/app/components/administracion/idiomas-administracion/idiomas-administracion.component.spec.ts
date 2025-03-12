import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdiomasAdministracionComponent } from './idiomas-administracion.component';

describe('IdiomasAdministracionComponent', () => {
  let component: IdiomasAdministracionComponent;
  let fixture: ComponentFixture<IdiomasAdministracionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdiomasAdministracionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IdiomasAdministracionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
