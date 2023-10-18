import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarAmbulanciaComponent } from './editar-ambulancia.component';

describe('EditarAmbulanciaComponent', () => {
  let component: EditarAmbulanciaComponent;
  let fixture: ComponentFixture<EditarAmbulanciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarAmbulanciaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarAmbulanciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
