import { TestBed } from '@angular/core/testing';

import { PostPropertiesService } from './post-properties.service';

describe('PostPropertiesService', () => {
  let service: PostPropertiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostPropertiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
