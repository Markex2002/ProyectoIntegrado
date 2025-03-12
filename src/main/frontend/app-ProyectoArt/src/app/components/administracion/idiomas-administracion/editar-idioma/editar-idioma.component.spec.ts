import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarIdiomaComponent } from './editar-idioma.component';

describe('EditarIdiomaComponent', () => {
  let component: EditarIdiomaComponent;
  let fixture: ComponentFixture<EditarIdiomaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarIdiomaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarIdiomaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
