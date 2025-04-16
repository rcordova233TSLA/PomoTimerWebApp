import { TestBed } from '@angular/core/testing';

import { StorageSaverService } from './storage-saver.service';

describe('StorageSaverService', () => {
  let service: StorageSaverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageSaverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
