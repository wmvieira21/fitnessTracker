import { Component, OnInit } from '@angular/core';
import { TrainingService } from './service/training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css'],
})
export class TrainingComponent {
  constructor(public trainingService: TrainingService) {}
}
