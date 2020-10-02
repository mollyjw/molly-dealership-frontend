import { TestBed } from '@angular/core/testing';

import { AuthorizationHeaderService } from './authorization-header.service';

describe('AuthorizationHeaderService', () => {
  let service: AuthorizationHeaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthorizationHeaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
