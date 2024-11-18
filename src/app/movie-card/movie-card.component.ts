import { Component, OnInit } from '@angular/core';
import { AuthService, MovieService, UserService } from '../fetch-api-data.service';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';
import { SynopsisComponent } from '../synopsis/synopsis.component';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [
    MatIconModule,
    MatCardModule,
    CommonModule,
    MatDialogModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss',
})
export class MovieCardComponent implements OnInit {
  public user: any;
  public favoriteMovies: any[] = [];
  public allMovies: any[] = [];
  public favoriteMovieList: any[] = [];
  public noFavoriteMovies = false

  constructor(
    private router: Router,
    private auth: AuthService,
    private userData: UserService,
    public movieData: MovieService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getAllMovies();
  }
  getAllMovies(): void {
    this.movieData.getAllMovies().subscribe((resp: any) => {
      this.allMovies = resp;
      this.getFavoriteMovies();
    });
  }

  getFavoriteMovies(): void {
    this.user = this.auth.getUser();
    if (this.user && this.user.FavoriteMovies) {
      this.favoriteMovies = this.user.FavoriteMovies;
      this.noFavoriteMovies = this.favoriteMovies.length === 0;
      this.filterFavoriteMovies()
    } else {
      console.log('No favorite movies available for the user.');
      this.noFavoriteMovies = true;

    }
  }

  filterFavoriteMovies(): void {
    if (this.allMovies.length && this.favoriteMovies.length) {
      this.favoriteMovieList = this.allMovies.filter(movie =>
        this.favoriteMovies.includes(movie.id)
      );
     
    }
  }
  addFavoriteMovie(movieId: string): void {
    this.userData.addFavoriteMovie(this.user?.Username, movieId).subscribe((resp: any) => {
      console.log("Movie added to favorites:", resp);
      this.favoriteMovies.push(movieId);
      this.snackBar.open('Added to Favorites', "Ok", {
        duration: 2000
      });
      this.filterFavoriteMovies();
    })
  }
  openGenreDialog(movie: any): void {
    this.dialog.open(GenreComponent, {
      data: {
        title: movie.title,
        genre: movie.genre
      },

      width: '800px'
    })
  }
  openDirectorDialog(movie: any): void {
    this.dialog.open(DirectorComponent, {
      data: {
        title: movie.title,
        genre: movie.genre,
        director: movie.director
      },
      width: '800px'
    });
  }
  openSynopsisDialog(movie: any): void {
    this.dialog.open(SynopsisComponent, {
      data: {
        title: movie.title,
        genre: movie.genre,
        description: movie.description
      },
      width: '800px'
    });
  }

}
