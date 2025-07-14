import { TestBed } from '@angular/core/testing';

import { DesignResponsiveObservablesService } from './design-responsive.observables.service';

describe('DesignResponsiveObservablesService', () => {
  let service: DesignResponsiveObservablesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DesignResponsiveObservablesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
