import { RouterModule, Routes } from '@angular/router';
import {NgModule} from "@angular/core";

import {AudioRecorderComponent} from "./audio-recorder.component";

const routes: Routes = [
  { path: '', component: AudioRecorderComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AudioRecorderRoutingModule { }
