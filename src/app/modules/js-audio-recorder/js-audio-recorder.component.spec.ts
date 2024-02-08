import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { JsAudioRecorderComponent } from './js-audio-recorder.component';

describe('JsAudioRecorderComponent', () => {
  let component: JsAudioRecorderComponent;
  let fixture: ComponentFixture<JsAudioRecorderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ JsAudioRecorderComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(JsAudioRecorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
