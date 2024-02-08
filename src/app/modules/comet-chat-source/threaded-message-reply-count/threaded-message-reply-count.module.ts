import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {ThreadedMessageReplyCountComponent} from "./threaded-message-reply-count.component";

@NgModule({
  declarations: [ThreadedMessageReplyCountComponent],
  imports: [CommonModule],
  exports: [ThreadedMessageReplyCountComponent],
})
export class ThreadedMessageReplyCountModule { }
