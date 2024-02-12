import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {CallComponent} from "./call.component";
import {IonicModule} from "@ionic/angular";
import {RouterModule} from "@angular/router";
import {CallRoutingModule} from "./call-routing.module";

@NgModule({
  declarations: [CallComponent],
  imports: [
    CommonModule,
    IonicModule,
    CallRoutingModule
  ],
  exports:[CallComponent]
})
export class CallModule { }
