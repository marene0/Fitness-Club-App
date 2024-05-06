import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { GoalService } from '../../core/service/goal.service';
import { Exercise, GoalModel } from '../../core/models/goal.model';
import { AuthService } from '../../core/service/auth.service';
import { ExerciseService } from '../../core/service/exercise.service';
import { EMPTY, Subject, catchError, switchMap, takeUntil } from 'rxjs';
import { StatisticModel } from '../../core/models/statistic.model';
import { StatisticService } from '../../core/service/statistic.service';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.scss'],
})
export class GoalsComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject<void>();

  goals: GoalModel[] = [];
  exercises!: Exercise[];
  data: any;
  documentStyle!: CSSStyleDeclaration;
  goalForm = new FormGroup({
    count: new FormControl(''),
    description: new FormControl(''),
    UserId: new FormControl(''),
    ExerciseId: new FormControl(''),
  });

  constructor(
    private readonly goalService: GoalService,
    private readonly authService: AuthService,
    private readonly exerciseService: ExerciseService,
    private readonly statisticService: StatisticService
  ) {}

  ngOnInit(): void {
    this.loadGoals();
    this.loadExercises();
    this.getGoalsByUserIdAsync();
    this.documentStyle = getComputedStyle(document.documentElement);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  addGoalString(): void {
    this.goals.push({
      Description: '',
      Count: 0,
      UserId: '',
      ExerciseId: '',
      showDropdown: true,
    } as any);
  }

  loadExercises() {
    this.exerciseService
      .getAllExercises()
      .pipe(takeUntil(this.destroy$))
      .subscribe((exercises) => {
        this.exercises = exercises.map((exercise) => ({
          id: exercise.id || '',
          name: exercise.name || '',
        }));
      });
  }

  getGoalsByUserIdAsync(): void {
    this.goalService
      .getGoalsByUserIdAsync()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (goals: GoalModel[]) => {
          this.goals = goals;
        },
        (error) => {
          console.error('Error getting goals:', error);
        }
      );
  }

  loadGoals() {
    this.goalService
      .getGoals()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (goals: GoalModel[]) => {
          this.goals = goals;
        },
        (error) => {
          console.error('Error loading goals:', error);
        }
      );
  }

  addGoal() {
    this.authService
      .getUserId()
      .pipe(
        switchMap((userId) => {
          const selectedDescription: Exercise | null | undefined = this.goalForm
            .value.description as Exercise | null | undefined;
          if (
            !selectedDescription ||
            typeof selectedDescription !== 'object' ||
            !('name' in selectedDescription) ||
            !('id' in selectedDescription)
          ) {
            console.error('Invalid selected description object');
            return EMPTY;
          }
          const countValue = Number(this.goalForm.value.count);
          const newGoal = {
            description: selectedDescription.name,
            count: countValue,
            userId: userId,
            exerciseId: selectedDescription.id,
            showDropdown: false,
          };

          return this.goalService.addGoal(newGoal).pipe(
            catchError((error) => {
              console.error('Error adding goal:', error);
              return EMPTY;
            })
          );
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.loadGoals();
      });
  }

  showStatistic(goalId: string) {
    this.statisticService
      .getStatisticById(goalId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (statistic: StatisticModel[]) => {
          const doneCount = Math.min(statistic[0].percentage, 100);
          const leftCount = 100 - doneCount;
          this.data = {
            labels: ['done', 'left'],
            datasets: [
              {
                data: [doneCount, leftCount],
                backgroundColor: [
                  this.documentStyle.getPropertyValue('--blue-500'),
                  this.documentStyle.getPropertyValue('--yellow-500'),
                ],
                hoverBackgroundColor: [
                  this.documentStyle.getPropertyValue('--blue-400'),
                  this.documentStyle.getPropertyValue('--yellow-400'),
                ],
              },
            ],
          };
        },
        (error) => {
          console.error('Error fetching statistic:', error);
        }
      );
  }

  removeGoal(id: string) {
    this.goalService
      .deleteGoal(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        () => {
          this.loadGoals();
        },
        (error) => {
          console.error('Error deleting goal:', error);
        }
      );
  }
}
