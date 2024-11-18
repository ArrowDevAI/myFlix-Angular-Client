import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { DatePipe } from '@angular/common';

const apiUrl = 'https://movieurl-6be02303c42f.herokuapp.com/'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private datePipe : DatePipe
  ) { }

  getToken(): string | null
 {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('token');
    }
    return null;
  }

  setToken(token: string): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('token', token);
    }
  }
getUser(): any {
    if (typeof window !== 'undefined' && window.localStorage) {
      const user = localStorage.getItem('user');
      if (user) {
        const userData = JSON.parse(user);
        const formattedDate = this.datePipe.transform(userData.Birthday, 'yyyy-MM-dd');
        return {
          ...userData,
          Birthday: formattedDate,
        };
      }
    }
    return null;
  }
  setUser(user: any): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }

  removeToken(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('token');
    }
  }
  removeUser(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('user');
    }
  }
  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }
};


@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {

  constructor(private http: HttpClient) { }

  public userRegistration(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'users', userDetails).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Something bad happened; please try again later.';

    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      console.error('Client-side error:', error.error.message);
      errorMessage = error.error.message;
    } else {
      // Server-side error
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body: ${JSON.stringify(error.error)}, ` +
        `Error Message: ${error.error.message}`
      );
      errorMessage = error.error.message || errorMessage; 
    }

    // Return an observable with a user-facing error message
    return throwError(() => new Error(errorMessage));
  }
};

@Injectable({
  providedIn: 'root'
})
export class UserLoginService {
  constructor(private http: HttpClient) { }

  public userLogin(credentials: any): Observable<any> {
    return this.http.post(apiUrl + 'login', credentials).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Something bad happened; please try again later.';

    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      console.error('Client-side error:', error.error.message);
      errorMessage = error.error.message;
    } else {
      // Server-side error
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body: ${JSON.stringify(error.error)}, ` +
        `Error Message: ${error.error.message}`
      );
      errorMessage = error.error.message || errorMessage; 
    }

    // Return an observable with a user-facing error message
    return throwError(() => new Error(errorMessage));
  }
}


@Injectable({
  providedIn: 'root'
})
export class MovieService{
  constructor(
    private authHttpService: AuthService,
    private http : HttpClient){}


  public getAllMovies(): Observable<any> {
    return this.http.get(apiUrl + 'movies', { headers: this.authHttpService.getAuthHeaders() }).pipe(
      
      map((data : any) => {
        return data.map((doc : any) => ({
          id: doc._id,
          title: doc.Title,
          image: doc.ImagePath,
          director: doc.Director,
          description: doc.Description,
          runtime: doc.Runtime,
          genre: doc.Genre
        }));
      }),
      catchError(this.handleError)
    );
  }
  public getMovieById(movieID :string) : Observable<any> {
    return this.http.get(apiUrl + `movies/${movieID}`, {headers: this.authHttpService.getAuthHeaders()}).pipe(catchError(this.handleError))
  }
  public getDirector(directorId : string) : Observable <any> {
    return this.http.get(apiUrl + `movies/dirctors/${directorId}`,{ headers: this.authHttpService.getAuthHeaders() }).pipe(catchError(this.handleError))
  }
  public getGenre(genreID: string) : Observable <any> {
    return this.http.get(apiUrl + `movies/genres/${genreID}`, {headers: this.authHttpService.getAuthHeaders()}).pipe(catchError(this.handleError))
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
  constructor(
    private authService: AuthService,
    private authHttpService : AuthService,
    private http: HttpClient,) { }
    
    public updateUser(updatedUser: any): void {
      localStorage.setItem('user', JSON.stringify(updatedUser));

  }

  public addFavoriteMovie(username: string, movieId: string): Observable<any> {
    return this.http.post(apiUrl + `users/${username}/movies/${movieId}`, {}, { headers: this.authHttpService.getAuthHeaders() })
        .pipe(
            map((response: any) => {
                // Call the updateUser function with the response
                this.updateUser(response);
                return response; // Return the response for further use if needed
            }),
            catchError(this.handleError)
        );
}

  public editUser(username: string, userDetails: any): Observable<any> {
    return this.http.put(apiUrl + `users/${username}`, userDetails, {headers: this.authHttpService.getAuthHeaders()}).pipe(catchError(this.handleError))
  }
  public deleteUser(username: string): Observable<any> {
    return this.http.delete(apiUrl + `users/${username}`, {headers: this.authHttpService.getAuthHeaders()}).pipe(catchError(this.handleError)
  );
  }
  public removeFavoriteMovie(username: string, movieID: string): Observable<any> {
    return this.http.delete(apiUrl + `users/${username}/movies/${movieID}`, {headers: this.authHttpService.getAuthHeaders()}).pipe(
      map((response: any) => {
          // Call the updateUser function with the response
          this.updateUser(response);
          return response; // Return the response for further use if needed
      }),
      catchError(this.handleError)
  );
  }
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error("Handle Error Response: ", error); 
    const errorResponse = {
        status: error.error.status,
        statusText: error.error.statusText,
       message: error.error.message || 'An unknown error occurred'
    };

    return throwError(() => errorResponse);
}
}


