import {NgModule} from "@angular/core";
import {GoalsComponent} from "../../shared/goals/goals.component";
import {ButtonModule} from "primeng/button";
import {IconFieldModule} from "primeng/iconfield";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PanelModule} from "primeng/panel";
import {DropdownModule} from "primeng/dropdown";
import {HeaderModule} from "../../shared/header/header.module";
import {FileUploadModule} from "primeng/fileupload";
import {StatisticComponent} from "../../shared/statistic/statistic.component";
import {ChartModule} from "primeng/chart";
@NgModule({
  declarations: [
    GoalsComponent,
    StatisticComponent,
    ],
  exports: [
    ButtonModule,
    IconFieldModule,
    GoalsComponent,
    StatisticComponent,
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
  ]
})
export class GoalsPageModule { }
