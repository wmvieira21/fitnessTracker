import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { TrainingService } from '../service/training.service';
import { Exercise } from '../model/exercise.model';
import { Form, FormGroup, NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { getIsLoading } from 'src/app/shared/ngrx/ui.selector';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css'],
})
export class NewTrainingComponent implements OnInit {
  exercises: Exercise[];
  exercisesListChange: Subscription;
  isLoading$: Observable<boolean>;

  constructor(
    private trainingService: TrainingService,
    private store: Store<AppState>
  ) {
    trainingService.fetchAvailablesExercises();

    this.exercisesListChange = trainingService.exercisesListChanged.subscribe(
      (data) => {
        this.exercises = data;
      }
    );
  }

  onStartNewTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select(getIsLoading);
  }
}
