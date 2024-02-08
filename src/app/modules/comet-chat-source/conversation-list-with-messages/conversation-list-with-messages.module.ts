import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {ConversationListWithMessagesComponent} from "./conversation-list-with-messages.component";
import {MessagesModule} from "../messages/messages.module";
import {MessageThreadModule} from "../message-thread/message-thread.module";
import {ConversationListModule} from "../conversation-list/conversation-list.module";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {
    path: '',
    component: ConversationListWithMessagesComponent,
  }
];

@NgModule({
  declarations: [ConversationListWithMessagesComponent],
  imports: [
    CommonModule,
   MessagesModule,
    MessageThreadModule,
    ConversationListModule, RouterModule.forChild(routes)
  ],
  exports: [ConversationListWithMessagesComponent, RouterModule],
})
export class ConversationListWithMessagesModule {}
