import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogadosComponent } from './logados.component';

describe('LogadosComponent', () => {
  let component: LogadosComponent;
  let fixture: ComponentFixture<LogadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogadosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
