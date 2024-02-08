import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ConversationListComponent} from "./conversation-list.component";
import {ConversationListItemModule} from "../conversation-list-item/conversation-list-item.module";

@NgModule({
  declarations: [ConversationListComponent],
  imports: [
    CommonModule,
    ConversationListItemModule,
  ],
  exports: [ConversationListComponent],
})
export class ConversationListModule { }
