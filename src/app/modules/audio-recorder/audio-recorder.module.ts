import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AudioRecorderComponent} from "./audio-recorder.component";
import {IonicModule} from "@ionic/angular";
import {AudioRecorderRoutingModule} from "./audio-recorder.routing.module";
import {AudioRecordingService} from "./services/audio-recorder.service";


@NgModule({
  declarations: [AudioRecorderComponent],
  imports: [
    CommonModule,
    IonicModule, IonicModule, AudioRecorderRoutingModule
  ],
  exports: [AudioRecorderComponent],
  // providers: [AudioRecordingService]
})
export class AudioRecorderModule { }
