import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import {
  LoginComponent,
  ChatsComponent,
  ConversationsWithMessagesDemoComponent,
  SignUpComponent,
  GroupsWithMessagesComponent
} from "./components";

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
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
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
