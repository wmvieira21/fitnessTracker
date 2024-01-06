import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Exercise } from '../model/exercise.model';
import { TrainingService } from '../service/training.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Store } from '@ngrx/store';
import { TrainingState } from '../store/training.reducer';
import { getCompletedExercises } from '../store/training.selector';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css'],
})
export class PastTrainingComponent implements AfterViewInit, OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  dataSource = new MatTableDataSource<Exercise>();

  displayedColumns: string[] = [
    'date',
    'name',
    'calories',
    'duration',
    'state',
  ];

  constructor(
    private trainingService: TrainingService,
    private store: Store<TrainingState>
  ) {}

  ngOnInit(): void {
    this.trainingService.fetchCompletedExercises();
    this.store.select(getCompletedExercises).subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(filter: EventTarget) {
    this.dataSource.filter = (filter as HTMLInputElement).value
      .trim()
      .toLowerCase();
  }
}
