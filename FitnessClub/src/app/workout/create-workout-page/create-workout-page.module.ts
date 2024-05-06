import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TypeOfExerciseBarComponent} from "../../shared/type-of-exercise-bar/type-of-exercise-bar.component";
import {CreateWorkoutPageRoutingModule} from "./create-workout-page-routing.module";
import {HeaderModule} from "../../shared/header/header.module";
import {CalendarModule} from "primeng/calendar";
import {PaginatorModule} from "primeng/paginator";
@NgModule({
  declarations: [
   TypeOfExerciseBarComponent,
  ],
  imports: [
    CommonModule,
    CreateWorkoutPageRoutingModule,
    ReactiveFormsModule,
    HeaderModule,
    FormsModule,
    CalendarModule,
    PaginatorModule
  ],
    exports: [
        TypeOfExerciseBarComponent,
    ]
})
export class CreateWorkoutPageModule { }
