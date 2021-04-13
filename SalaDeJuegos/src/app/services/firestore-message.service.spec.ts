import { TestBed } from '@angular/core/testing';

import { FirestoreMessageService } from './firestore-message.service';

describe('FirestoreMessageServiceService', () => {
  let service: FirestoreMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirestoreMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
