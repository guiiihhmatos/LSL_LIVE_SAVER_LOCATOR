import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarMotoristaComponent } from './listar-motorista.component';

describe('ListarMotoristaComponent', () => {
  let component: ListarMotoristaComponent;
  let fixture: ComponentFixture<ListarMotoristaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarMotoristaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarMotoristaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
