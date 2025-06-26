import { TestBed } from '@angular/core/testing';

import { CrediturData } from './creditur-data';

describe('CrediturData', () => {
  let service: CrediturData;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrediturData);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
