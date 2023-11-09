import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovoMotoristaComponent } from './novo-motorista.component';

describe('NovoMotoristaComponent', () => {
  let component: NovoMotoristaComponent;
  let fixture: ComponentFixture<NovoMotoristaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NovoMotoristaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NovoMotoristaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
