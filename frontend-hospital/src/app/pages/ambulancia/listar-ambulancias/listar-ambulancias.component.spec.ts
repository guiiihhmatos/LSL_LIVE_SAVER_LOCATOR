import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarAmbulanciasComponent } from './listar-ambulancias.component';

describe('ListarAmbulanciasComponent', () => {
  let component: ListarAmbulanciasComponent;
  let fixture: ComponentFixture<ListarAmbulanciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarAmbulanciasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarAmbulanciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
