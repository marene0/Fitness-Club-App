import {RouterModule, Routes} from "@angular/router";
import {HeaderForLoginComponent} from "../header-for-login/header-for-login.component";
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {AccountRoutingModule} from "../../account/account-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {PaginatorModule} from "primeng/paginator";

const routes: Routes = [
  {
    component: HeaderForLoginComponent
  }
];

@NgModule({
  declarations: [ ],
  exports: [
    RouterModule,
    PaginatorModule,
  ],
  imports: [
    CommonModule,
    PaginatorModule,
    AccountRoutingModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ]
})
export class RealCreateWorkoutModule { }
