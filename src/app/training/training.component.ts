import { Component, OnInit } from '@angular/core';
import { TrainingService } from './service/training.service';
import { Store } from '@ngrx/store';
import { TrainingState } from './store/training.reducer';
import { Observable } from 'rxjs';
import { getIsRunningExercise } from './store/training.selector';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css'],
})
export class TrainingComponent implements OnInit {
  isRunningExercise$: Observable<boolean>;

  constructor(public store: Store<TrainingState>) {}

  ngOnInit(): void {
    this.isRunningExercise$ = this.store.select(getIsRunningExercise);
  }
}
