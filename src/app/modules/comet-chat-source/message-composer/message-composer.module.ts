import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
// import { CometChatSmartReplyPreview } from "../Extensions/CometChat-smart-reply-preview/cometchat-smart-reply-preview.module";
import { PickerModule } from "@ctrl/ngx-emoji-mart";

import {MessageComposerComponent} from "./message-composer.component";
@NgModule({
  declarations: [MessageComposerComponent],
  imports: [
    CommonModule,
    // CometChatSmartReplyPreview,
    PickerModule,
  ],
  exports: [MessageComposerComponent],
})
export class MessageComposerModule {}
