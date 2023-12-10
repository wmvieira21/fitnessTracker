import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StopTrainingDialogComponent } from './dialogs/stop-training-dialog/stop-training-dialog.component';
import { TrainingService } from '../service/training.service';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css'],
})
export class CurrentTrainingComponent implements OnInit {
  progressBar: number = 0;
  timer: number = 0;
  trainingName: string = '';

  constructor(
    private dialog: MatDialog,
    private trainingService: TrainingService
  ) {}

  ngOnInit(): void {
    this.startTimer();
    this.trainingName = this.trainingService.getRuningExercise().name;
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
    const step =
      (this.trainingService.getRuningExercise().duration / 100) * 1000;

    this.timer = setInterval(() => {
      this.progressBar = this.progressBar + 1;
      if (this.progressBar >= 100) {
        clearInterval(this.timer);
        this.trainingService.completeExercise();
      }
    }, step);
  }
}
