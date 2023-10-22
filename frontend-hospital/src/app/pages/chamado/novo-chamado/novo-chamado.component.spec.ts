import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovoChamadoComponent } from './novo-chamado.component';

describe('NovoChamadoComponent', () => {
  let component: NovoChamadoComponent;
  let fixture: ComponentFixture<NovoChamadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NovoChamadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NovoChamadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
