import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SenderAudioMessageModule} from "../sender-audio-message/sender-audio-message.module";
import {RouterModule, Routes} from "@angular/router";
import {MessageListComponent} from "./message-list.component";

const routes: Routes = [
  {
    path: '',
    component: MessageListComponent,
  }
];
@NgModule({
  declarations: [MessageListComponent],
  imports: [
    CommonModule,
    SenderAudioMessageModule,
    RouterModule.forChild(routes),
  ],
  exports: [MessageListComponent, RouterModule]
})
export class MessageListModule { }
