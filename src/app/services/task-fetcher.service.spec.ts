import { TestBed } from '@angular/core/testing';

import { TaskFetcherService } from './task-fetcher.service';

describe('TaskFetcherService', () => {
  let service: TaskFetcherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskFetcherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
