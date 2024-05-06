import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {RealCreateWorkoutComponent} from "../shared/real-create-workout/real-create-workout.component";

const routes: Routes = [
  { path: '', component: RealCreateWorkoutComponent }]
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class ExercisePageRoutingModule { }
