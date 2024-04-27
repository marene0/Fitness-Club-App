import {Component, OnDestroy, OnInit} from '@angular/core';
import {ExerciseService} from '../../core/service/exercise.service';
import {Exercise, ExerciseModel, ExerciseResponse} from '../../core/models/exercise.model';
import {WorkoutService} from "../../core/service/workout.service";
import {PostWorkoutModel, WorkoutModel} from "../../core/models/workout.model";
import {BodyType} from '../../core/models/exerciseType.model';
import {ComplexityType} from "../../core/models/complexityType.model";
import {PaginatorState} from "primeng/paginator";
import {AuthService} from "../../core/service/auth.service";
import {HttpClient} from "@angular/common/http";
import { Observable, Subject, takeUntil } from 'rxjs';
import { UserIdModel } from '../../core/models/UserId.model';
@Component({
  selector: 'app-type-of-exercise-bar',
  templateUrl: './type-of-exercise-bar.component.html',
  styleUrls: ['./type-of-exercise-bar.component.scss']
})
export class TypeOfExerciseBarComponent implements OnDestroy {
  destroy$: Subject<void> = new Subject<void>();
  exercises: ExerciseModel[] = [];
  selectedBodyType: BodyType = BodyType.Legs;
  workout: ExerciseModel[] = [];
  workoutName: string = '';
  workoutDate: Date | null = null;
  date: Date | undefined;
  workouts: WorkoutModel[] = [];
  first: number  = 0;
  rows: number  = 3;
  totalRecords: number = 0;
  onPageChange(event: PaginatorState) {
    this.first = event.first !== undefined ? event.first : 0;
    this.rows = event.rows !== undefined ? event.rows : 3;
    let page = this.first / this.rows
    this.filterExercisesByBodyType(this.selectedBodyType, page, this.rows)
  }
  constructor(
    private readonly exerciseService: ExerciseService,
    private readonly workoutService: WorkoutService,
    private readonly authService: AuthService,
    private readonly http: HttpClient,
  ) { }
  ngOnInit(): void { }
  loadWorkouts() {
    this.workoutService.GetAllWorkoutsAsync().subscribe(workouts => {
      this.workouts = workouts;
    });
  }
  getAllExercises(): void {
    this.exerciseService.getAllExercises()
      .pipe(takeUntil(this.destroy$)).subscribe(
      (exercises: ExerciseModel[]) => {
        this.exercises = exercises;
        this.totalRecords = exercises.length;
      },
      (error) => {
        console.error('Помилка при отриманні вправ:', error);
      }
    );
  }
  isDefined(value: any): boolean {
    return value !== null && value !== undefined;
  }
  filterExercisesByBodyType(bodyType: BodyType, page: number, size: number): void {
    this.selectedBodyType = bodyType;
    this.exerciseService.getExercisesByType(BodyType[bodyType], page, size)
      .pipe(takeUntil(this.destroy$)).subscribe(
      (response: ExerciseResponse) => {
        this.exercises = response.items;
        this.totalRecords = response.totalCount;
      },
      (error) => {
        console.error(`Помилка при отриманні вправ за типом ${bodyType}:`, error);
      }
    );
  }
  addExerciseToWorkout(exercise: ExerciseModel): void {
    this.workout.push(exercise);
  }
  removeExerciseFromWorkout(index: number): void {
    this.workout.splice(index, 1);
  }
  saveWorkout(): void {
    const userIdObservable: Observable<UserIdModel[]> = this.authService.getUserId();
    userIdObservable
      .pipe(takeUntil(this.destroy$)).subscribe(
      (userIdData: UserIdModel[]) => {
        const userId: string = userIdData[0].id;
        const newWorkout: Exercise[] = [];
        for (const exercise of this.workout) {
          const exerciseToAdd: Exercise = {
            exerciseId: exercise.id,
            time: exercise.time,
            name: exercise.name,
            caloriesLost: exercise.caloriesLost,
            complexity: exercise.complexity,
            type: exercise.type,
            id: exercise.id,
            countOfExercise: exercise.countOfExercise,
            ownerId: userId,
          };
          newWorkout.push(exerciseToAdd);
        }
        const workoutData: PostWorkoutModel = {
          name: this.workoutName,
          date: this.workoutDate ? this.workoutDate : new Date(),
          ownerId: userId,
          workoutPicture: 'string',
          Exercises: newWorkout.map(exercise => ({
            exerciseId: exercise.exerciseId,
            time: exercise.time,
            name: exercise.name,
            countOfExercise: exercise.countOfExercise,
            caloriesLost: exercise.caloriesLost,
            complexity: exercise.complexity,
            type: exercise.type,
            id: exercise.id,
          }))
        };
        this.workoutService.saveWorkout(workoutData).subscribe(
          (response) => {
            console.log('Тренування збережено успішно:', response);
          },
          (error) => {
            console.error('Помилка при збереженні тренування:', error);
          }
        );
      },
      (error) => {
        console.error('Помилка при отриманні userId:', error);
      }
    );
  }
  getComplexityType(value: number): string {
    switch (value) {
      case ComplexityType.Easy:
        return 'Easy';
      case ComplexityType.Medium:
        return 'Medium';
      case ComplexityType.Hard:
        return 'Hard';
      default:
        return 'undefined';
    }
  }
  protected readonly BodyType = BodyType;
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
