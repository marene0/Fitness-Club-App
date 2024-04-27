import { Component,  OnInit } from '@angular/core';
import {StatisticService} from "../../core/service/statistic.service";
import { StatisticModel } from '../../core/models/statistic.model';
@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss']
})
export class StatisticComponent implements OnInit {
  data: any;
  documentStyle!: CSSStyleDeclaration;
  constructor(private statisticService: StatisticService) {
  }
  ngOnInit() {
    this.documentStyle = getComputedStyle(document.documentElement);
    const textColor = this.documentStyle.getPropertyValue('--text-color');
  }
}
