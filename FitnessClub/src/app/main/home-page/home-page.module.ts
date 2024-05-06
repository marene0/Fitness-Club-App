import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { CreateWorkoutComponent } from '../../shared/create-workout/create-workout.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HomePageRoutingModule} from "./home-page-routing.module";
import { PanelModule } from 'primeng/panel';
import {ScrollBlockComponent} from "../../shared/scroll-block/scroll-block.component";
import {ButtonModule} from "primeng/button";
import {IconFieldModule} from "primeng/iconfield";
import {TagModule} from "primeng/tag";
import {DropdownModule} from "primeng/dropdown";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {WorkoutComponent} from "../../shared/workout/workout.component";
import {AccordionModule} from "primeng/accordion";
@NgModule({
    declarations: [
      CreateWorkoutComponent,
      ScrollBlockComponent,
      WorkoutComponent
    ],
    exports: [
      ButtonModule,
      IconFieldModule,
      CreateWorkoutComponent,
      ScrollBlockComponent,
      WorkoutComponent
    ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PanelModule,
    HomePageRoutingModule,
    FormsModule,
    CarouselModule,
    TagModule,
    DropdownModule,
    BrowserAnimationsModule,
    AccordionModule
  ]
})
export class HomePageModule { }
