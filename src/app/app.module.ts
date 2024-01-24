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


@NgModule({
  declarations: [AppComponent, LoginComponent, SignUpComponent, ChatsComponent, ConversationsWithMessagesDemoComponent],
  imports: [BrowserModule, CometChatConversationsWithMessages, IonicModule.forRoot(), AppRoutingModule, FormsModule, CometChatIncomingCall],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
