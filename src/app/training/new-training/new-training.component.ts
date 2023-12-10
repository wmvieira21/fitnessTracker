import { Component, EventEmitter, Output } from '@angular/core';
import { TrainingService } from '../service/training.service';
import { Exercise } from '../model/exercise.model';
import { Form, FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css'],
})
export class NewTrainingComponent {
  exercises: Exercise[];

  constructor(private trainingService: TrainingService) {
    this.exercises = trainingService.getAvailablesExercises();
  }

  onStartNewTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }
}
