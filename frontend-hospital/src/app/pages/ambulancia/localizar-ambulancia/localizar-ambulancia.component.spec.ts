import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalizarAmbulanciaComponent } from './localizar-ambulancia.component';

describe('LocalizarAmbulanciaComponent', () => {
  let component: LocalizarAmbulanciaComponent;
  let fixture: ComponentFixture<LocalizarAmbulanciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocalizarAmbulanciaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocalizarAmbulanciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
