import {Component, OnDestroy } from '@angular/core';
import {BodyType} from "../../core/models/exerciseType.model";
import {ComplexityType} from "../../core/models/complexityType.model";
import {HttpClient} from "@angular/common/http";
import {ExerciseService} from "../../core/service/exercise.service";
import {AddExerciseLongModel, ExerciseLongModel, ExerciseLongResponse} from "../../core/models/exercise.model";
import {FormControl, FormGroup} from "@angular/forms";
import {PaginatorState} from "primeng/paginator";
import { Subject, takeUntil } from 'rxjs';
@Component({
  selector: 'app-real-create-workout',
  templateUrl: './real-create-workout.component.html',
  styleUrls: ['./real-create-workout.component.scss']
})
export class RealCreateWorkoutComponent implements OnDestroy {
  exercises: ExerciseLongModel[] = [];
  first: number  = 0;
  rows: number  = 5;
  totalRecords: number = 0;
  destroy$: Subject<void> = new Subject<void>();
  exerciseForm = new FormGroup({
    name: new FormControl(''),
    type: new FormControl(''),
    complexity: new FormControl(''),
    caloriesLost: new FormControl(''),
    ExerciseId: new FormControl(''),
  });
  onPageChange(event: PaginatorState) {
    this.first = event.first !== undefined ? event.first : 0;
    this.rows = event.rows !== undefined ? event.rows : 5;
    let page = this.first / this.rows
    this.filterExercises( page, this.rows)
    this.loadExercises();
  }
  filterExercises( page: number, size: number): void {
    this.exercises = this.exercises;
    this.exerciseService.getExercisePage( page, size).subscribe(
      (response: ExerciseLongResponse) => {
        this.exercises = response.items;
        this.totalRecords = response.totalCount;
      },
      (error) => {
        console.error(`Помилка при отриманні вправ за типом`, error);
      }
    );
  }
  constructor(
    private readonly http: HttpClient,
    private readonly exerciseService: ExerciseService,
  ) {}
  ngOnInit() {
    this.getExercisePage(0, this.rows);
  }
  getExercisePage(page: number, size: number): void {
    this.exerciseService.getExercisePage(page, size).subscribe(
      (response: ExerciseLongResponse) => {
        this.exercises = response.items;
        this.totalRecords = response.totalCount;
      },
      (error) => {
        console.error('Помилка при отриманні вправ:', error);
      }
    );
  }
  addExercise() {
    this.exercises.push({ name: '', id: '', type: BodyType.FullBody, complexity: ComplexityType.Medium, caloriesLost: 0, showDropdown: true });
  }
  loadExercises(): void {
    this.exerciseService.getAllExercisesLong()
      .pipe(takeUntil(this.destroy$))
      .subscribe(exercises => {
        this.exercises = exercises.map(exercise => ({
          id: exercise.id || '',
          name: exercise.name || '',
          type: this.getBogyTypeString(exercise.type) || '',
          caloriesLost: exercise.caloriesLost || 0,
          complexity: this.getComplexityTypeString(exercise.complexity) || '',
          showDropdown: false
        }));
      });
  }
  getBogyTypeString(value: BodyType | string): string | null {
    if (typeof value === 'string') {
      return value;
    }
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
        return 'undefined';
    }
  }
  getBodyTypeOptions(): string[] {
    return [
      this.getBogyTypeString(BodyType.Legs),
      this.getBogyTypeString(BodyType.Arms),
      this.getBogyTypeString(BodyType.FullBody),
      this.getBogyTypeString(BodyType.Back),
      this.getBogyTypeString(BodyType.Stretching),
      this.getBogyTypeString(BodyType.Cardio)
    ].filter(type => type !== null) as string[];
  }
  getComplexityTypeString(value: ComplexityType | string): string | null {
    if (typeof value === 'string') {
      return value;
    }
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
  getComplexityTypeOptions(): string[] {
    return [
      this.getComplexityTypeString(ComplexityType.Easy),
      this.getComplexityTypeString(ComplexityType.Medium),
      this.getComplexityTypeString(ComplexityType.Hard),
    ].filter(type => type !== null) as string[];
  }
  removeExercise(id: string) {
    this.exerciseService.deleteExercise(id)
      .pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.exercises = this.exercises.filter(exercise => exercise.id !== id);
    }, error => {
      console.error('Помилка при видаленні exercise:', error);
    });
  }
  saveExercise() {
    const nameValue = this.exerciseForm.value.name;
    const typeValue = this.exerciseForm.value.type;
    const complexityValue = this.exerciseForm.value.complexity;
    const caloriesLostValue = this.exerciseForm.value.caloriesLost;

    if (typeof typeValue === 'string' && typeof complexityValue === 'string') {
      const bodyTypeEnumValue = this.getBogyType(typeValue);
      const complexityTypeEnumValue = this.getComplexityType(complexityValue);

      const newExercise: AddExerciseLongModel = {
        name: String(nameValue),
        type: bodyTypeEnumValue !== null ? bodyTypeEnumValue : '',
        complexity:  complexityTypeEnumValue !== null ? complexityTypeEnumValue : '',
        caloriesLost: Number(caloriesLostValue),
        showDropdown: false,
      };

      this.exerciseService.createExercise(newExercise)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
        () => {
          console.log('Exercise added successfully');
          this.loadExercises();
        },
        (error) => {
          console.error('Error adding exercise:', error);
        }
      );
    } else {
      console.error('Type value is null or undefined');
    }
  }
  getBogyType(value: string): BodyType | null {
    switch (value) {
      case 'Legs':
        return BodyType.Legs;
      case 'Arms':
        return BodyType.Arms;
      case 'FullBody':
        return BodyType.FullBody;
      case 'Back':
        return BodyType.Back;
      case 'Stretching':
        return BodyType.Stretching;
      case 'Cardio':
        return BodyType.Cardio;
      default:
        return null;
    }
  }
  getComplexityType(value:  string): ComplexityType | null {
    switch (value) {
      case 'Easy':
        return ComplexityType.Easy;
      case 'Medium':
        return  ComplexityType.Medium;
      case 'Hard':
        return ComplexityType.Hard;
      default:
        return null;
    }
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
