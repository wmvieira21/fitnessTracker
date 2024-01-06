import { Injectable } from '@angular/core';
import { Exercise } from '../model/exercise.model';
import { Observable, Subscription, map, take } from 'rxjs';
import { inject } from '@angular/core';
import {
  Firestore,
  collectionData,
  collection,
  addDoc,
} from '@angular/fire/firestore';
import { UIService } from 'src/app/shared/ui-service';
import { Store } from '@ngrx/store';
import { startLoading, stopLoading } from 'src/app/shared/ngrx/ui.action';
import {
  setAvailableExercises,
  setCompletedExercise,
  startTraining,
  stopTraining,
} from '../store/training.actions';
import { TrainingState } from '../store/training.reducer';
import { getActiveExercise } from '../store/training.selector';

@Injectable({ providedIn: 'root' })
export class TrainingService {
  private firestore: Firestore = inject(Firestore);
  private fbSubs: Subscription[] = [];

  constructor(
    private uiService: UIService,
    private store: Store<TrainingState>
  ) {}

  fetchAvailablesExercises() {
    // this.uiService.loadingTrainingStateChanded.next(true);
    this.store.dispatch(startLoading());

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
        .subscribe(
          (data) => {
            // this.exercisesList = data;
            // this.exercisesListChanged.next([...this.exercisesList]);

            this.store.dispatch(setAvailableExercises({ exercises: data }));

            // this.uiService.loadingTrainingStateChanded.next(false);
            this.store.dispatch(stopLoading());
          },
          (error) => {
            // this.exercisesListChanged.next(null);
            // this.uiService.loadingTrainingStateChanded.next(false);
            this.store.dispatch(setAvailableExercises({ exercises: null }));
            this.store.dispatch(stopLoading());
            this.uiService.openSnackBar(
              'Fetaching exercises failed. Try realoading the page.'
            );
          }
        )
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
        .subscribe(
          (data) => {
            this.store.dispatch(setCompletedExercise({ exercises: data }));
          },
          (error) => {
            this.store.dispatch(setCompletedExercise({ exercises: null }));
            this.uiService.openSnackBar(
              'Fetaching completed exercises failed. Try realoading the page.'
            );
          }
        )
    );
  }

  startExercise(id: string) {
    this.store.dispatch(startTraining({ exerciseId: id }));
  }

  completeExercise() {
    this.addCompletedExercise();
  }

  stopExercise(progress: number) {
    this.addCancelledExercise(progress);
  }

  cancelSubscriptions() {
    this.fbSubs.forEach((sub) => sub.unsubscribe());
  }

  private addCompletedExercise() {
    this.store
      .select(getActiveExercise)
      .pipe(take(1))
      .subscribe((exercise) => {
        if (exercise) {
          this.saveExercise({
            ...exercise,
            date: new Date(),
            state: 'completed',
          });
        }
      });
  }

  private addCancelledExercise(progress: number) {
    this.store
      .select(getActiveExercise)
      .pipe(take(1))
      .subscribe((exercise) => {
        this.saveExercise({
          ...exercise,
          date: new Date(),
          duration: Number.parseFloat(
            (exercise.duration * (progress / 100)).toFixed(2)
          ),
          calories: exercise.calories * (progress / 100),
          state: 'cancelled',
        });
      });
  }

  private saveExercise(exercise: Exercise) {
    const colection = collection(this.firestore, 'finishedExercises');

    addDoc(colection, exercise);

    this.store.dispatch(stopTraining());
  }
}
