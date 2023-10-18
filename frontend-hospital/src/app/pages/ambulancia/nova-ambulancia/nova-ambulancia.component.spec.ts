import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovaAmbulanciaComponent } from './nova-ambulancia.component';

describe('NovaAmbulanciaComponent', () => {
  let component: NovaAmbulanciaComponent;
  let fixture: ComponentFixture<NovaAmbulanciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NovaAmbulanciaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NovaAmbulanciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
