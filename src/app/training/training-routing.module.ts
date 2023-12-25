import { RouterModule, Routes } from '@angular/router';
import { TrainingComponent } from './training.component';
import { canActivateTeam } from '../auth/guards/auth.guard';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: TrainingComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class TrainingRoutingModule {}
