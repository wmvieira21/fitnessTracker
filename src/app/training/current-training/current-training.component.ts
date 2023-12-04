import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StopTrainingDialogComponent } from './dialogs/stop-training-dialog/stop-training-dialog.component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css'],
})
export class CurrentTrainingComponent implements OnInit {
  @Output() stopOngoningExercise = new EventEmitter<void>();
  progressBar: number = 0;
  timer: number = 0;

  constructor(private dialog: MatDialog) {}

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
        this.stopOngoningExercise.emit();
      }
    });
  }

  startTimer() {
    this.timer = setInterval(() => {
      this.progressBar = this.progressBar + 5;
      if (this.progressBar === 100) {
        clearInterval(this.timer);
      }
    }, 1000);
  }
}
