import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GoalsPageComponent} from "./goals-page.component";

const routes: Routes = [
  { path: 'goals', component: GoalsPageComponent },
]
@NgModule({
  declarations: [ ],
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class GoalsRoutingModule { }
