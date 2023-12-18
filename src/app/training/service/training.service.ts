import { Injectable } from '@angular/core';
import { Exercise } from '../model/exercise.model';
import { BehaviorSubject, Observable, map, of, switchMap } from 'rxjs';
import { inject } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class TrainingService {
  private firestore: Firestore = inject(Firestore);
  private exercisesList: Exercise[] = [];
  private currentExercise: Exercise;

  private completedExercisesList: Exercise[] = [];

  isRuningExercise = new BehaviorSubject(false);
  exercisesListChange = new BehaviorSubject([]);

  fetchAvailablesExercises() {
    const colection = collection(this.firestore, 'availableExercises');

    collectionData(colection, {
      idField: 'id',
    })
      .pipe(
        map((document) => {
          return document.map((exercise) => {
            return {
              id: exercise.id,
              name: exercise['name'],
              duration: exercise['duration'],
              calories: exercise['calories'],
            };
          });
        })
      )
      .subscribe((data) => {
        this.exercisesList = data;
        this.exercisesListChange.next([...this.exercisesList]);
      });

    return this.exercisesList.slice();
  }

  startExercise(id: string) {
    const selectedExercise = this.exercisesList.find((data) => data.id === id);

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
