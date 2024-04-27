import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {AddExerciseLongModel, ExerciseLongModel, ExerciseLongResponse, ExerciseModel, ExerciseResponse} from '../models/exercise.model';
@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  private readonly apiUrlExerciseGetAll: string = `${environment.apiAddress}/Exercise`;
  constructor(private http: HttpClient) { }
  createExercise(exercise: AddExerciseLongModel): Observable<AddExerciseLongModel> {
    return this.http.post<AddExerciseLongModel>(`${this.apiUrlExerciseGetAll}`, exercise);
  }
  getAllExercises(): Observable<ExerciseModel[]> {
    return this.http.get<ExerciseModel[]>(`${environment.apiAddress}/exercise`);
  }
  getAllExercisesLong(): Observable<ExerciseLongModel[]> {
    return this.http.get<ExerciseLongModel[]>(`${environment.apiAddress}/exercise`);
  }
  getExercisesByType(type: string, page: number, size: number): Observable<ExerciseResponse> {
    return this.http.get<ExerciseResponse>(`${environment.apiAddress}/exercise/${type}?page=${page}&size=${size}`);
  }
  getExercisePage(page: number, size: number): Observable<ExerciseLongResponse> {
    return this.http.get<ExerciseLongResponse>(`${environment.apiAddress}/exercise/pagination/?page=${page}&size=${size}`);
  }
  deleteExercise(id: string): Observable<void> {
    const url = `${this.apiUrlExerciseGetAll}/${id}`;
    return this.http.delete<void>(url);
  }
}
