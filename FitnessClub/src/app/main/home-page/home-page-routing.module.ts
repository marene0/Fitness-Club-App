import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateWorkoutPageComponent } from '../../workout/create-workout-page/create-workout-page.component';

const routes: Routes = [
  { path: 'create-workout', component: CreateWorkoutPageComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
