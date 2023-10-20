import { TestBed } from '@angular/core/testing';

import { ChamadoService } from './chamado.service';

describe('ChamadoService', () => {
  let service: ChamadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChamadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
