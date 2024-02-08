import { RouterModule, Routes } from '@angular/router';
import {NgModule} from "@angular/core";

import {JsAudioRecorderComponent} from "./js-audio-recorder.component";

const routes: Routes = [
  { path: '', component: JsAudioRecorderComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JsAudioRecorderRoutingModule { }
