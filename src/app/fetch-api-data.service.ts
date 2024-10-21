import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

const apiUrl = 'https://movieurl-6be02303c42f.herokuapp.com/'

@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {

  constructor(private http: HttpClient) { }

  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
};


@Injectable({
  providedIn: 'root'
})

export class userLoginService {
  constructor(private http: HttpClient) { }

  public userLogin(credentials: any): Observable<any> {
    return this.http.post(apiUrl + 'login', credentials).pipe(catchError(this.handleError));
  }
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
@Injectable({
  providedIn: 'root'
})
export class MovieService{
  constructor(private http : HttpClient){}

  public getAllMovies() : Observable<any>{
    return this.http.get(apiUrl + 'movies').pipe(catchError(this.handleError))
  }
  public getMovieById(movieID :string) : Observable<any> {
    return this.http.get(apiUrl + `movies/${movieID}`).pipe(catchError(this.handleError))
  }
  public getDirector(directorId : string) : Observable <any> {
    return this.http.get(apiUrl + `movies/dirctors/${directorId}`).pipe(catchError(this.handleError))
  }
  public getGenre(genreID: string) : Observable <any> {
    return this.http.get(apiUrl + `movies/genres/${genreID}`).pipe(catchError(this.handleError))
  }
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error(error);
    return throwError(() => new Error('Error: Unable to perform user operations'));
  }
}


@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  public getUser(username: string): Observable<any> {
    return this.http.get(apiUrl + `users/${username}`).pipe(
      catchError(this.handleError)
    );
  }
  public getFavoriteMovies(username: string): Observable<any> {
    return this.http.get(apiUrl + `users/${username}/movies`).pipe(
      catchError(this.handleError)
    );
  }
  public addFavoriteMovie(username: string, movieId: string): Observable<any> {
    return this.http.post(apiUrl + `users/${username}/movies/${movieId}`, {}).pipe(catchError(this.handleError))
  }

  public editUser(username: string, userDetails: any): Observable<any> {
    return this.http.put(apiUrl + `/users/${username}`, userDetails).pipe(catchError(this.handleError))
  }
  public deleteUser(username: string): Observable<any> {
    return this.http.delete(apiUrl + `users/${username}`).pipe(catchError(this.handleError))
  }
  public removeFavoriteMovie(username: string, movieID: string): Observable<any> {
    return this.http.delete(apiUrl + `users/${username}/movies/${movieID}`).pipe(catchError(this.handleError))
  }
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error(error);
    return throwError(() => new Error('Error: Unable to perform user operations'));
  }
}


