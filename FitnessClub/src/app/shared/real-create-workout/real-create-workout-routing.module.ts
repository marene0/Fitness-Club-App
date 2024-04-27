import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {RealCreateWorkoutComponent} from "./real-create-workout.component";

const routes: Routes = [
  { path: 'admin', component: RealCreateWorkoutComponent },
]
@NgModule({
  declarations: [ ],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule,
  ]
})
export class RealCreateWorkoutRoutingModule { }
