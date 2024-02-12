import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import {
  LoginComponent,
  ChatsComponent,
  ConversationsWithMessagesDemoComponent,
  SignUpComponent,
  GroupsWithMessagesComponent
} from "./components";
import {CallHomeComponent} from "./components/call-home/call-home.component";
import {CallLoginComponent} from "./components/call-login/call-login.component";

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'audio',
    loadChildren: () => import('./modules/comet-chat-source/sender-audio-message/sender-audio-message.module').then(m => m.SenderAudioMessageModule)
  },
  {
    path: 'conversation/audio',
    loadChildren: () => import('./modules/comet-chat-source/conversation-list-with-messages/conversation-list-with-messages.module').then( m => m.ConversationListWithMessagesModule)
  },
  {
    path: 'audio-recorder',
    loadChildren: () => import('./modules/audio-recorder/audio-recorder.module').then(m => m.AudioRecorderModule)
  },
  {
    path: 'call-audio',
    loadChildren: () => import('./modules/call/call.module').then(m => m.CallModule)
  },
  {
    path: 'call-home',
    component: CallHomeComponent
  },
  {
    path: 'call-login',
    component: CallLoginComponent
  },
  {
    path: '',
    redirectTo: 'call-home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'sign-up',
    component: SignUpComponent
  },
  {
    path: 'chats',
   component: ChatsComponent,
  },
  {
    path: 'conversations-with-messages',
    component: ConversationsWithMessagesDemoComponent
  },
  {
    path: 'groups-with-messages',
    component: GroupsWithMessagesComponent
  },
  {
    path: 'js-audio-recorder',
    loadChildren: () => import('./modules/js-audio-recorder/js-audio-recorder.module').then(m => m.JsAudioRecorderModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
