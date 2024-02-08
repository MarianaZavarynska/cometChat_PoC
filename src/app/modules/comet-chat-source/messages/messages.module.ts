import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {MessagesComponent} from "./messages.component";
import {MessageComposerModule} from "../message-composer/message-composer.module";
import {MessageHeaderModule} from "../message-header/message-header.module";
import {MessageListModule} from "../message-list/message-list.module";

@NgModule({
  declarations: [MessagesComponent],
  imports: [
    CommonModule,
  MessageHeaderModule,
   MessageComposerModule,
    MessageListModule,
    // CometChatLiveReactions,
  ],
  exports: [MessagesComponent],
})
export class MessagesModule {}
