import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {MessageActionsComponent} from "./message-actions.component";
import {IonicModule} from "@ionic/angular";

@NgModule({
  declarations: [MessageActionsComponent],
  imports: [CommonModule, IonicModule],
  exports: [MessageActionsComponent],
})
export class MessageActionsModule {}
