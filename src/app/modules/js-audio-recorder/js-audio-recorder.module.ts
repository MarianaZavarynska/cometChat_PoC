import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {JsAudioRecorderComponent} from "./js-audio-recorder.component";
import {JsAudioRecorderRoutingModule} from "./js-audio-recorder-routing.module";
import {IonicModule} from "@ionic/angular";



@NgModule({
  declarations: [JsAudioRecorderComponent],
  imports: [
    CommonModule, JsAudioRecorderRoutingModule, IonicModule,
  ],
  exports:[JsAudioRecorderComponent],
  // providers: [
  //   JsAudioRecorderService
  // ]
})
export class JsAudioRecorderModule { }
