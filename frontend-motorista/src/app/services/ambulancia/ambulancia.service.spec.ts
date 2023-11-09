import { TestBed } from '@angular/core/testing';

import { AmbulanciaService } from './ambulancia.service';

describe('AmbulanciaService', () => {
  let service: AmbulanciaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AmbulanciaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
