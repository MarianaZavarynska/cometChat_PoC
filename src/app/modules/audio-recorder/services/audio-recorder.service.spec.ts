import { TestBed } from '@angular/core/testing';

import { JsAudioRecorderService } from './js-audio-recorder.service';

describe('JsAudioRecorderService', () => {
  let service: JsAudioRecorderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JsAudioRecorderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
