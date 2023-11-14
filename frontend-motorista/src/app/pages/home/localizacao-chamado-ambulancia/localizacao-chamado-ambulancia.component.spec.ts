import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalizacaoChamadoAmbulanciaComponent } from './localizacao-chamado-ambulancia.component';

describe('LocalizacaoChamadoAmbulanciaComponent', () => {
  let component: LocalizacaoChamadoAmbulanciaComponent;
  let fixture: ComponentFixture<LocalizacaoChamadoAmbulanciaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LocalizacaoChamadoAmbulanciaComponent]
    });
    fixture = TestBed.createComponent(LocalizacaoChamadoAmbulanciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
