import {NgModule} from "@angular/core";
import {CreateWorkoutComponent} from "../shared/create-workout/create-workout.component";
import {ScrollBlockComponent} from "../shared/scroll-block/scroll-block.component";
import {ButtonModule} from "primeng/button";
import {IconFieldModule} from "primeng/iconfield";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PanelModule} from "primeng/panel";
import {HomePageRoutingModule} from "../mainPage/home-page/home-page-routing.module";
import {CarouselModule} from "primeng/carousel";
import {TagModule} from "primeng/tag";
import {DropdownModule} from "primeng/dropdown";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AccordionModule} from "primeng/accordion";
import {UploadComponent} from "./profile-picture.component";
@NgModule({
  declarations: [
    CreateWorkoutComponent,
    UploadComponent
  ],
  exports: [
    ButtonModule,
    IconFieldModule,
    CreateWorkoutComponent,
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
export class ProfilePictureModule { }
