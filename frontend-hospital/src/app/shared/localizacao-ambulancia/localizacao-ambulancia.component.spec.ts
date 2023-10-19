import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalizacaoAmbulanciaComponent } from './localizacao-ambulancia.component';

describe('LocalizacaoAmbulanciaComponent', () => {
  let component: LocalizacaoAmbulanciaComponent;
  let fixture: ComponentFixture<LocalizacaoAmbulanciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocalizacaoAmbulanciaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocalizacaoAmbulanciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
