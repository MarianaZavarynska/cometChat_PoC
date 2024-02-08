import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {SenderAudioMessageComponent} from "./sender-audio-message.component";
import {FormsModule} from "@angular/forms";
import {IonicModule} from "@ionic/angular";
import {MessageActionsModule} from "../message-actions/message-actions.module";
import { MessageReactionsModule} from "../message-reactions/message-reactions.module";
import {ThreadedMessageReplyCountModule} from "../threaded-message-reply-count/threaded-message-reply-count.module";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {
    path: '',
    component: SenderAudioMessageComponent,
  }
];

@NgModule({
  declarations: [SenderAudioMessageComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MessageActionsModule,
    MessageReactionsModule,
    ThreadedMessageReplyCountModule,
    RouterModule.forChild(routes)
  ],
  exports: [SenderAudioMessageComponent, RouterModule],
})
export class SenderAudioMessageModule { }
