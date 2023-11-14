import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaminhoChamadiAmbulanciaComponent } from './caminho-chamadi-ambulancia.component';

describe('CaminhoChamadiAmbulanciaComponent', () => {
  let component: CaminhoChamadiAmbulanciaComponent;
  let fixture: ComponentFixture<CaminhoChamadiAmbulanciaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CaminhoChamadiAmbulanciaComponent]
    });
    fixture = TestBed.createComponent(CaminhoChamadiAmbulanciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
