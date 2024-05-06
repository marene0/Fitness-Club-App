import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TypeOfExerciseBarComponent} from "../../shared/type-of-exercise-bar/type-of-exercise-bar.component";

const routes: Routes = [
    { path: 'type-of-exercise-bar', component: TypeOfExerciseBarComponent }]
@NgModule({
    declarations: [],
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class CreateWorkoutPageRoutingModule { }
