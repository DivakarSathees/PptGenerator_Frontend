import { TestBed } from '@angular/core/testing';

import { Ppt } from './ppt';

describe('Ppt', () => {
  let service: Ppt;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Ppt);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
