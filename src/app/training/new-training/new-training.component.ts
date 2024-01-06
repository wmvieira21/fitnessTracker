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
import { getAvailableExercises } from '../store/training.selector';
import { TrainingState } from '../store/training.reducer';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css'],
})
export class NewTrainingComponent implements OnInit {
  exercises: Observable<Exercise[]>;
  isLoading$: Observable<boolean>;

  constructor(
    private trainingService: TrainingService,
    private store: Store<TrainingState>
  ) {}

  onStartNewTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select(getIsLoading);

    this.trainingService.fetchAvailablesExercises();
    this.exercises = this.store.select(getAvailableExercises);
  }
}
