import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SenderAudioMessageModule} from "../sender-audio-message/sender-audio-message.module";
import {MessageThreadComponent} from "./message-thread.component";
import {MessageListModule} from "../message-list/message-list.module";

@NgModule({
  declarations: [MessageThreadComponent],
  imports: [
    CommonModule,
    SenderAudioMessageModule,
    // CometChatReceiverAudioMessageBubble,
    MessageListModule,
  ],
  exports: [MessageThreadComponent],
})
export class MessageThreadModule {}
