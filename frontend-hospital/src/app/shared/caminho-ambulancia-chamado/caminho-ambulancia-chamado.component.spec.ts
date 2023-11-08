import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaminhoAmbulanciaChamadoComponent } from './caminho-ambulancia-chamado.component';

describe('CaminhoAmbulanciaChamadoComponent', () => {
  let component: CaminhoAmbulanciaChamadoComponent;
  let fixture: ComponentFixture<CaminhoAmbulanciaChamadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaminhoAmbulanciaChamadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaminhoAmbulanciaChamadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
