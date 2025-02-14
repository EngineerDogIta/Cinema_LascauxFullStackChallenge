import { Routes } from '@angular/router';
import { MovieListComponent } from './movies/movie-list/movie-list.component';
import { MovieFormComponent } from './movies/movie-form/movie-form.component';
import { ScheduleListComponent } from './schedules/schedule-list/schedule-list.component';
import { authGuard } from './core/auth/auth.guard';

export const routes: Routes = [
  { path: 'movies', component: MovieListComponent, canActivate: [authGuard] },
  { path: 'movies/new', component: MovieFormComponent, canActivate: [authGuard] },
  { path: 'movies/:id', component: MovieFormComponent, canActivate: [authGuard] },
  { path: 'schedules', component: ScheduleListComponent, canActivate: [authGuard] },
];
