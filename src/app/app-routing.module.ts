import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WellcomeComponent } from './wellcome/wellcome.component';
import { canActivateTeam } from './auth/guards/auth.guard';

const routes: Routes = [
  { path: '', component: WellcomeComponent },
  {
    path: 'training',
    loadChildren: () =>
      import('./training/training.module').then((m) => m.TrainingModule),
    canMatch: [canActivateTeam],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
