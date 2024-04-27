import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { StatisticModel } from "../models/statistic.model";
@Injectable({
  providedIn: 'root'
})
export class StatisticService {

  private readonly apiUrl: string = `${environment.apiAddress}/Statistic`;
  constructor(private http: HttpClient) { }
  getStatisticById(goalId: string): Observable<StatisticModel[]> {
    const url = `${this.apiUrl}/${goalId}`;
    return this.http.get<StatisticModel[]>(url);
  }
}
