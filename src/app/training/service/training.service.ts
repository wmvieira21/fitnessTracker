import { Injectable } from '@angular/core';
import { Exercise } from '../model/exercise.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TrainingService {
  availableExercisesList: Exercise[] = [
    { id: 'crounches', name: 'Crounches', duration: 5, calories: 8 },
    { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 10 },
    { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
    { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 },
    { id: 'pull-ups', name: 'Pull Ups', duration: 60, calories: 8 },
  ];

  completedExercisesList: Exercise[] = [];

  private currentExercise: Exercise;

  isRuningExercise = new BehaviorSubject(false);

  getAvailablesExercises() {
    return this.availableExercisesList.slice();
  }

  startExercise(id: string) {
    const selectedExercise = this.availableExercisesList.find(
      (data) => data.id === id
    );

    if (selectedExercise) {
      this.currentExercise = selectedExercise;
      this.isRuningExercise.next(true);
    }
  }

  completeExercise() {
    this.addCompletedExercise();

    this.currentExercise = null;
    this.isRuningExercise.next(false);
  }

  stopExercise(progress: number) {
    this.addCancelledExercise(progress);
    this.isRuningExercise.next(false);
  }

  getRuningExercise() {
    return { ...this.currentExercise };
  }

  getCompletedExercises() {
    return this.completedExercisesList.slice();
  }

  private addCompletedExercise() {
    this.completedExercisesList.push({
      ...this.currentExercise,
      date: new Date(),
      state: 'completed',
    });
  }
  private addCancelledExercise(progress: number) {
    this.completedExercisesList.push({
      ...this.currentExercise,
      date: new Date(),
      duration: Number.parseFloat(
        (this.currentExercise.duration * (progress / 100)).toFixed(2)
      ),
      calories: this.currentExercise.calories * (progress / 100),
      state: 'cancelled',
    });
  }
}
