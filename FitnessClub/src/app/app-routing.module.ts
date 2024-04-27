import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './mainPage/home-page/home-page.component';
import {CreateWorkoutPageComponent} from "./createWorkout/create-workout-page/create-workout-page.component";
import {UploadComponent} from "./shared/profile-picture/upload.component";
import {GoalsPageComponent} from "./GoalsPage/goals/goals-page.component";
import {AuthGuard} from "./core/service/AuthGuard.service";
import { NotFoundComponent } from './shared/not-found/not-found.component';

const routes: Routes = [
  {path: '', loadChildren: () => import('./account/account.module').then(module => module.AccountModule)},
  {path: 'account', component: HomePageComponent },
  {path: 'goals', component: GoalsPageComponent},
  {path: 'upload', component: UploadComponent},
  {path: 'create-workout', component: CreateWorkoutPageComponent},
  {path: 'create-exercise', canActivate: [AuthGuard], loadChildren: () => import('./ExercisePage/exercise-page.routing.module').then(module => module.ExercisePageRoutingModule)},
  {path: '422', component: NotFoundComponent},
  {path: '404', component: NotFoundComponent},
  {path: '**', redirectTo: '404'}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
