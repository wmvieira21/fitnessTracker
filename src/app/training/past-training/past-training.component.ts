import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Exercise } from '../model/exercise.model';
import { TrainingService } from '../service/training.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css'],
})
export class PastTrainingComponent implements AfterViewInit, OnDestroy {
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

  completedExercisesListChanged: Subscription;

  constructor(private trainingService: TrainingService) {
    this.trainingService.fetchCompletedExercises();

    this.completedExercisesListChanged =
      trainingService.completedExercisesListChanged.subscribe((data) => {
        if (data) {
          this.dataSource.data = data;
        }
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

  ngOnDestroy(): void {
    this.completedExercisesListChanged.unsubscribe();
  }
}
