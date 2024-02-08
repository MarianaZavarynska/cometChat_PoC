import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ConversationListWithMessagesComponent } from './conversation-list-with-messages.component';

describe('ConversationListWithMessagesComponent', () => {
  let component: ConversationListWithMessagesComponent;
  let fixture: ComponentFixture<ConversationListWithMessagesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ConversationListWithMessagesComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ConversationListWithMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
