// src/app/movies/movie-form/movie-form.component.ts
import { Component } from '@angular/core';
import { MoviesService } from '../../core/api/services/movies.service';
import { Movie } from '../../core/api/models/movie';
import {FormsModule} from '@angular/forms';
import {MatFormField} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-movie-form',
  imports: [
    FormsModule,
    MatFormField,
    MatInput,
    MatButton
  ],
  template: `
    <div class="form-container">
      <h2>{{ editingMovie ? 'Edit' : 'New' }} Movie</h2>
      <form (ngSubmit)="onSubmit()">
        <mat-form-field>
          <input matInput [(ngModel)]="movie.title" name="title" placeholder="Title" required>
        </mat-form-field>

        <mat-form-field>
          <textarea matInput [(ngModel)]="movie.description" name="description"
                    placeholder="Description"></textarea>
        </mat-form-field>

        <button mat-raised-button color="primary" type="submit">
          {{ editingMovie ? 'Update' : 'Create' }}
        </button>
      </form>
    </div>
  `
})
export class MovieFormComponent {
  movie: Partial<Movie> = {};
  editingMovie = false;

  constructor(private moviesService: MoviesService) {}

  onSubmit() {
    const operation = this.editingMovie
      ? this.moviesService.updateMovie({ id: this.movie.id!, body: this.movie as Movie })
      : this.moviesService.createMovie({ body: this.movie as Movie });

    operation.subscribe(() => {
      // Handle success
    });
  }
}
