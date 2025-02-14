import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Movie } from '../../core/api/models/movie';
import { MoviesService } from '../../core/api/services/movies.service';
import {MatIcon} from '@angular/material/icon';
import {ConfirmDialogComponent} from '../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-movie-list',
  imports: [
    MatIcon
  ],
  template: `
    <div class="container">
      <h2>Movie List</h2>
      <table mat-table [dataSource]="dataSource" class="mat-elevation-z8">
        <!-- Title Column -->
        <ng-container matColumnDef="title">
          <th mat-header-cell *matHeaderCellDef>Title</th>
          <td mat-cell *matCellDef="let movie">{{ movie.title }}</td>
        </ng-container>

        <!-- Actions Column -->
        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef>Actions</th>
          <td mat-cell *matCellDef="let movie">
            <button mat-icon-button (click)="confirmDelete(movie)">
              <mat-icon>delete</mat-icon>
            </button>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>
    </div>
  `
})
export class MovieListComponent implements OnInit {
  displayedColumns = ['title', 'actions'];
  dataSource = new MatTableDataSource<Movie>([]);

  constructor(
    private moviesService: MoviesService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadMovies();
  }

  private loadMovies() {
    this.moviesService.getAllMovies().subscribe({
      next: (movies) => {
        this.dataSource.data = movies;
      },
      error: () => this.showError('Failed to load movies')
    });
  }

  confirmDelete(movie: Movie) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { title: 'Confirm Delete', message: `Delete ${movie.title}?` }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        if (movie.id != null) {
          this.deleteMovie(movie.id);
        }
      }
    });
  }

  private deleteMovie(id: number) {
    this.moviesService.deleteMovie({ id }).subscribe({
      next: () => {
        this.dataSource.data = this.dataSource.data.filter(m => m.id !== id);
        this.snackBar.open('Movie deleted', 'Close', { duration: 3000 });
      },
      error: () => this.showError('Failed to delete movie')
    });
  }

  private showError(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      panelClass: ['error-snackbar']
    });
  }
}
