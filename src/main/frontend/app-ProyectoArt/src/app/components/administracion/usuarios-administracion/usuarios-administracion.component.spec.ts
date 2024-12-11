import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosAdministracionComponent } from './usuarios-administracion.component';

describe('UsuariosAdministracionComponent', () => {
  let component: UsuariosAdministracionComponent;
  let fixture: ComponentFixture<UsuariosAdministracionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuariosAdministracionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuariosAdministracionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
