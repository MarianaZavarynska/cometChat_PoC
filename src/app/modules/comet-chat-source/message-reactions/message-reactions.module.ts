import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {MessageReactionsComponent } from "./message-reactions.component";
import { PickerModule } from "@ctrl/ngx-emoji-mart";
import { EmojiModule } from "@ctrl/ngx-emoji-mart/ngx-emoji";

@NgModule({
  declarations: [MessageReactionsComponent],
  imports: [CommonModule, PickerModule, EmojiModule],
  exports: [MessageReactionsComponent],
})
export class MessageReactionsModule {}
