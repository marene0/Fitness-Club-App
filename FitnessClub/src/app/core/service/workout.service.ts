import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PostWorkoutModel, WorkoutModel } from '../models/workout.model';
import { environment } from '../../../environments/environment';
import {userWorkoutModel} from "../models/userWorkout.model";
@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

  private readonly apiUrlWorkout: string = `${environment.apiAddress}/Workout`;
  private readonly apiUserWorkout: string = `${environment.apiAddress}/UserWorkout`;
  constructor(private http: HttpClient) { }
  GetAllWorkoutsAsync(): Observable<WorkoutModel[]> {
    return this.http.get<WorkoutModel[]>(this.apiUrlWorkout);
  }
  saveWorkout(workout: PostWorkoutModel): Observable<PostWorkoutModel> {
    return this.http.post<PostWorkoutModel>(this.apiUrlWorkout, workout);
  }
  deleteWorkout(id: string): Observable<void> {
    const url = `${this.apiUrlWorkout}/${id}`;
    return this.http.delete<void>(url);
  }
  doneUserWorkout(userWorkout: userWorkoutModel): Observable<userWorkoutModel> {
    return this.http.post<userWorkoutModel>(this.apiUserWorkout, userWorkout);
  }
}
