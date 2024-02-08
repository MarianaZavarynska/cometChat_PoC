import { NgModule } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";
import {  } from "@angular/common";
import {MessageHeaderComponent} from "./message-header.component";

@NgModule({
  declarations: [MessageHeaderComponent],
  imports: [CommonModule, DatePipe],
  exports: [MessageHeaderComponent],
  // providers: [DatePipe],
})
export class MessageHeaderModule {}
