import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { CometChatConversationsWithMessages, CometChatIncomingCall } from '@cometchat/chat-uikit-angular';
import {FormsModule} from "@angular/forms";

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {
  LoginComponent,
  ChatsComponent,
  ConversationsWithMessagesDemoComponent,
  SignUpComponent,
} from "./components";
import {SenderAudioMessageModule} from "./modules/comet-chat-source/sender-audio-message/sender-audio-message.module";
import {
  ConversationListWithMessagesModule
} from "./modules/comet-chat-source/conversation-list-with-messages/conversation-list-with-messages.module";
import {JsAudioRecorderModule} from "./modules/js-audio-recorder/js-audio-recorder.module";
import {AudioRecorderModule} from "./modules/audio-recorder/audio-recorder.module";


@NgModule({
  declarations: [AppComponent, LoginComponent, SignUpComponent, ChatsComponent, ConversationsWithMessagesDemoComponent],
  imports: [BrowserModule,
    CometChatConversationsWithMessages,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    CometChatIncomingCall,
    SenderAudioMessageModule,
    ConversationListWithMessagesModule,
    JsAudioRecorderModule,
    AudioRecorderModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
