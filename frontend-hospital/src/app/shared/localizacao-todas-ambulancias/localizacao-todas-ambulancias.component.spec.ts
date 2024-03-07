import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalizacaoTodasAmbulanciasComponent } from './localizacao-todas-ambulancias.component';

describe('LocalizacaoTodasAmbulanciasComponent', () => {
  let component: LocalizacaoTodasAmbulanciasComponent;
  let fixture: ComponentFixture<LocalizacaoTodasAmbulanciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocalizacaoTodasAmbulanciasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocalizacaoTodasAmbulanciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
