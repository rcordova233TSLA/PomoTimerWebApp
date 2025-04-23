import { TestBed } from '@angular/core/testing';

import { WordFetcherService } from './word-fetcher.service';

describe('WordFetcherService', () => {
  let service: WordFetcherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WordFetcherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
