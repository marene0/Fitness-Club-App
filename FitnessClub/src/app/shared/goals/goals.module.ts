import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { GoalsComponent } from './goals.component';
@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([{ path: '', component: GoalsComponent }])],
  declarations: [  ],
  bootstrap: [ GoalsComponent ],
  providers: [  ]
})
export class GoalsModule {}
