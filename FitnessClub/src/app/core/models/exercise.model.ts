import {BodyType} from "./exerciseType.model";
import {ComplexityType} from "./complexityType.model";

export interface ExerciseModel {
  name: string;
  type: BodyType;
  caloriesLost: number;
  complexity: ComplexityType;
  order: number;
  count: number;
  id: string;
  exerciseId: string;
  time: number;
  countOfExercise: number;
}

export interface ExerciseResponse {
  items: [ExerciseModel];
  totalCount: number;
}
export interface ExerciseLongResponse {
  items: [ExerciseLongModel];
  totalCount: number;
}

export interface Exercise {
  exerciseId: string;
  countOfExercise: number;
  name: string;
  type: BodyType;
  caloriesLost: number;
  complexity: ComplexityType;
  time: number;
  ownerId: string;
  id: string;
 }

export interface ExerciseLongModel {
  name: string;
  type: string | BodyType;
  caloriesLost: number;
  complexity: string | ComplexityType;
  showDropdown: boolean;
  id: string;
}

export interface AddExerciseLongModel {
  name: string;
  type: string | BodyType;
  caloriesLost: number;
  complexity: string | ComplexityType;
  showDropdown: boolean;

}
