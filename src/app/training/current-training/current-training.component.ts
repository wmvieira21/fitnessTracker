import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StopTrainingDialogComponent } from './dialogs/stop-training-dialog/stop-training-dialog.component';
import { TrainingService } from '../service/training.service';
import { Store } from '@ngrx/store';
import { TrainingState } from '../store/training.reducer';
import { getActiveExercise } from '../store/training.selector';
import { Exercise } from '../model/exercise.model';
import { take } from 'rxjs';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css'],
})
export class CurrentTrainingComponent implements OnInit {
  progressBar: number = 0;
  timer: number = 0;
  activeExercise: Exercise;
  trainingName: string = '';

  constructor(
    private dialog: MatDialog,
    private trainingService: TrainingService,
    private store: Store<TrainingState>
  ) {}

  ngOnInit(): void {
    this.startTimer();
  }

  onStopTraining() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingDialogComponent, {
      data: {
        progress: this.progressBar,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.startTimer();
      } else {
        this.trainingService.stopExercise(this.progressBar);
      }
    });
  }

  startTimer() {
    this.store
      .select(getActiveExercise)
      .pipe(take(1))
      .subscribe((exercise) => {
        this.activeExercise = exercise;

        this.trainingName = this.activeExercise.name;
        const step = (this.activeExercise.duration / 100) * 1000;

        this.timer = setInterval(() => {
          this.progressBar = this.progressBar + 1;
          if (this.progressBar >= 100) {
            clearInterval(this.timer);
            this.trainingService.completeExercise();
          }
        }, step);
      });
  }
}
