import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ChartModule } from 'primeng/chart';
import {StatisticComponent} from "./statistic.component";
@NgModule({
  imports: [
    ChartModule,
    RouterModule.forRoot([{ path: '', component: StatisticComponent }])],
  declarations: [  ],
  bootstrap: [ StatisticComponent ],
  providers: [  ]
})

export class StatisticModule {}
