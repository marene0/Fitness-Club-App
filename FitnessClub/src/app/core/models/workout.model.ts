import { ComplexityType } from "./complexityType.model";
import { Exercise } from "./exercise.model";
import {BodyType} from "./exerciseType.model";

export interface PostWorkoutModel {
  name: string;
  date: Date;
  ownerId: string;
  workoutPicture: string;
  Exercises: PostExerciseModel[];
}

export interface PostExerciseModel {
  exerciseId: string;
  time: number;
  countOfExercise: number;
  type: BodyType;
  caloriesLost: number;
  complexity: ComplexityType;
}

export interface Workout {
  id: string;
  ownerId: string | null;
  date: Date;
  name: string | null;
  workoutPicture: string | null;
  exerciseWorkouts: ExerciseWorkout[] | null;
  userWorkouts: UserWorkout[] | null;
}

export interface ExerciseWorkout {
  workoutId: string;
  exerciseId: string;
  countOfExercise: number;
  time: number;
  order: number;
  workout?: Workout;
  exercise?: Exercise;
  name: string;
}

export interface UserWorkout {
  userId: string;
  workoutId: string;
  user: User;
  workout?: Workout;
}

export interface User {
  id: string;
  profilePicture: string;
  firstName: string;
  lastName: string;
  email: string;
  goals: Goal[];
  ownedWorkouts: Workout[];
  userWorkouts: UserWorkout[];
}

export interface Goal {
  Id: string;
  Description: string;
  Exercise: Exercise;
  UserId: string;
  ExerciseId: string;
  Count: number;
  Date: Date;
  User: User;
}

export interface WorkoutModel {
  id: string;
  date: Date;
  name: string;
 exercises: GetExercises[];
}

export interface GetExercises {
  type: BodyType;
  name: string;
  caloriesLost: number;
  complexity: ComplexityType;
  time: string;
  countOfExercise: number;
}
