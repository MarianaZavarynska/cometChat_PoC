import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ConversationListItemComponent} from "./conversation-list-item.component";

@NgModule({
  declarations: [ConversationListItemComponent],
  imports: [CommonModule],
  exports: [ConversationListItemComponent],
})
export class ConversationListItemModule { }
