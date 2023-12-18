import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { TrainingService } from '../service/training.service';
import { Exercise } from '../model/exercise.model';
import { Form, FormGroup, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css'],
})
export class NewTrainingComponent implements OnDestroy {
  exercises: Exercise[];
  exercisesListChange: Subscription;

  constructor(private trainingService: TrainingService) {
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

  ngOnDestroy(): void {
    this.exercisesListChange.unsubscribe();
  }
}
