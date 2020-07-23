import { TestBed } from '@angular/core/testing';

import { ChatLogService } from './chat-log.service';

describe('ChatLogService', () => {
  let service: ChatLogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatLogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
