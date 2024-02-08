import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ThreadedMessageReplyCountComponent } from './threaded-message-reply-count.component';

describe('ThreadedMessageReplyCountComponent', () => {
  let component: ThreadedMessageReplyCountComponent;
  let fixture: ComponentFixture<ThreadedMessageReplyCountComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreadedMessageReplyCountComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ThreadedMessageReplyCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
