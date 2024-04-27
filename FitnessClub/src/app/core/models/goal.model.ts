export interface Exercise {
  id: string;
  name: string;
}

export  interface GoalModel {
  id: string;
  description: string;
  count: number;
  exerciseId: string;
  userId: string ;
  showDropdown?: boolean;
}

export  interface GetGoalModel {
  Description: string ;
  Count: number;
  ExerciseId: string;
  showDropdown?: boolean;

}
