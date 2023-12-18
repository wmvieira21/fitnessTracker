import { Injectable } from '@angular/core';
import { Exercise } from '../model/exercise.model';
import {
  BehaviorSubject,
  Observable,
  Subscription,
  map,
  of,
  switchMap,
} from 'rxjs';
import { inject } from '@angular/core';
import {
  Firestore,
  collectionData,
  collection,
  addDoc,
} from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class TrainingService {
  private firestore: Firestore = inject(Firestore);
  private exercisesList: Exercise[] = [];
  private currentExercise: Exercise;
  private fbSubs: Subscription[] = [];

  isRuningExercise = new BehaviorSubject(false);
  exercisesListChanged = new BehaviorSubject<Exercise[]>([]);
  completedExercisesListChanged = new BehaviorSubject<Exercise[]>([]);

  fetchAvailablesExercises() {
    const collect = collection(this.firestore, 'availableExercises');

    this.fbSubs.push(
      collectionData(collect, {
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
          this.exercisesListChanged.next([...this.exercisesList]);
        })
    );
  }

  fetchCompletedExercises() {
    const collect = collection(this.firestore, 'finishedExercises');

    this.fbSubs.push(
      collectionData(collect, {
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
                date: exercise['date'].toDate(),
                state: exercise['state'],
              };
            });
          })
        )
        .subscribe((data) => {
          this.completedExercisesListChanged.next(data);
        })
    );
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

  cancelSubscriptions() {
    this.fbSubs.forEach((sub) => sub.unsubscribe());
  }

  private addCompletedExercise() {
    this.saveExercise({
      ...this.currentExercise,
      date: new Date(),
      state: 'completed',
    });
  }

  private addCancelledExercise(progress: number) {
    this.saveExercise({
      ...this.currentExercise,
      date: new Date(),
      duration: Number.parseFloat(
        (this.currentExercise.duration * (progress / 100)).toFixed(2)
      ),
      calories: this.currentExercise.calories * (progress / 100),
      state: 'cancelled',
    });
  }

  private saveExercise(exercise: Exercise) {
    const colection = collection(this.firestore, 'finishedExercises');

    addDoc(colection, exercise);
  }
}
