import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {GetGoalModel, GoalModel} from '../models/goal.model';
import { environment} from "../../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class GoalService {
  private readonly apiUrl: string = `${environment.apiAddress}/Goal`;
  private readonly apiUrlGet: string = `${environment.apiAddress}/Goal/user`
  private readonly apiUrlExerciseGetAll: string = `${environment.apiAddress}/Exercise`;
  constructor(private http: HttpClient) { }
  getGoals(): Observable<GoalModel[]> {
    return this.http.get<GoalModel[]>(this.apiUrlGet);
  }
   GetGoalsByUserIdAsync(): Observable<GoalModel[]> {
    return this.http.get<GoalModel[]>(this.apiUrlGet);
  }
  addGoal( goal: GetGoalModel): Observable<GetGoalModel> {
    return this.http.post<GetGoalModel>(this.apiUrl, goal);
  }
  deleteGoal(id: string): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
