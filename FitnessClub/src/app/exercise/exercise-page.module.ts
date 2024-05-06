import {NgModule} from "@angular/core";
import {ButtonModule} from "primeng/button";
import {IconFieldModule} from "primeng/iconfield";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PanelModule} from "primeng/panel";
import {DropdownModule} from "primeng/dropdown";
import {HeaderModule} from "../shared/header/header.module";
import {FileUploadModule} from "primeng/fileupload";
import {ChartModule} from "primeng/chart";
import {RealCreateWorkoutComponent} from "../shared/real-create-workout/real-create-workout.component";
import {PaginatorModule} from "primeng/paginator";
import {RouterModule, Routes} from "@angular/router";
import {ExercisePageComponent} from "./exercise-page.component";
@NgModule({
  declarations: [
    RealCreateWorkoutComponent,
    ExercisePageComponent
  ],
  exports: [
    ButtonModule,
    IconFieldModule,
    RealCreateWorkoutComponent,
    RouterModule
  ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        PanelModule,
        FormsModule,
        DropdownModule,
        HeaderModule,
        FileUploadModule,
        ChartModule,
        PaginatorModule,
    ]
})
export class ExercisePageModule { }
