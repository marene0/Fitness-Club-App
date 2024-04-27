import {Component, OnDestroy, OnInit} from '@angular/core';
import { WorkoutService } from "../../core/service/workout.service";
import { WorkoutModel } from "../../core/models/workout.model";
import {Subject, switchMap, takeUntil} from "rxjs";
import {userWorkoutModel} from "../../core/models/userWorkout.model";
import {AuthService} from "../../core/service/auth.service";
import {ComplexityType} from "../../core/models/complexityType.model";
import {BodyType} from "../../core/models/exerciseType.model";
@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.scss']
})
export class WorkoutComponent implements OnDestroy {
  destroy$: Subject<void> = new Subject<void>();
  workouts  :WorkoutModel[] = [] ;
  constructor(
    private workoutService: WorkoutService,
    private authService: AuthService
    ) {}
  ngOnInit(): void {
    this.GetAllWorkoutsAsync();
  }
  loadWorkouts() {
    this.workoutService.GetAllWorkoutsAsync()
  }
  GetAllWorkoutsAsync(): void {
    this.workoutService.GetAllWorkoutsAsync()
      .pipe(takeUntil(this.destroy$)).subscribe({
      next: (workouts: WorkoutModel[]) => {
        this.workouts = workouts;
      },
      error: (error) => {
        console.error('Помилка при отриманні тренувань:', error);
      }
    })
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
  getBogyType(value: BodyType): string | null{
    switch (value) {
      case BodyType.Legs:
        return 'Legs'
      case BodyType.Arms:
        return 'Arms'
      case BodyType.FullBody:
        return 'FullBody'
      case BodyType.Back:
        return 'Back'
      case BodyType.Stretching:
        return 'Stretching'
      case BodyType.Cardio:
        return 'Cardio'
      default:
        return null;
    }
  }
  removeWorkout(id: string) {
    this.workoutService.deleteWorkout(id)
      .pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.loadWorkouts();
    }, error => {
      console.error('Помилка при видаленні workout:', error);
    });
  }
  doneWorkout(workoutId: string): void {
    this.authService.getUserId()
      .pipe(
        takeUntil(this.destroy$),
        switchMap(userIdModels => {
          const firstUserIdModel = userIdModels[0];
          if (firstUserIdModel) {
            const userId = firstUserIdModel.id;
            const userWorkoutData: userWorkoutModel = {
              userId: userId,
              workoutId: workoutId
            };
            return this.workoutService.doneUserWorkout(userWorkoutData);
          } else {
            throw new Error('User ID not found');
          }
        })
      )
      .subscribe(
        response => {
          console.log('User workout done successfully:', response);
        },
        error => {
          console.error('Failed to mark user workout as done:', error);
        }
      );
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

