import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaminhoChamadoAmbulanciaComponent } from './caminho-chamado-ambulancia.component';

describe('CaminhoChamadoAmbulanciaComponent', () => {
  let component: CaminhoChamadoAmbulanciaComponent;
  let fixture: ComponentFixture<CaminhoChamadoAmbulanciaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CaminhoChamadoAmbulanciaComponent]
    });
    fixture = TestBed.createComponent(CaminhoChamadoAmbulanciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
