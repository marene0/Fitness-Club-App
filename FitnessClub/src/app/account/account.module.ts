import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AccountRoutingModule } from './account-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import {HeaderForLoginComponent} from "../shared/header-for-login/header-for-login.component";
import {RouterModule, Routes } from '@angular/router';
import {ProgressSpinnerModule} from "primeng/progressspinner";

const routes: Routes = [
  { path: '', component: HeaderForLoginComponent }];
@NgModule({
  declarations: [
    HeaderForLoginComponent,
    LoginComponent,
    RegisterComponent,
  ],
    exports: [
      LoginComponent,
      RegisterComponent,
      RouterModule
    ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    ProgressSpinnerModule,
  ]
})
export class AccountModule { }
