import { Component, OnInit } from '@angular/core';
import { MovieService } from '../fetch-api-data.service';
import {  MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [
    MatCardModule,
    CommonModule,
    MatDialogModule,
  ],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss',
})
export class MovieCardComponent {
  movies : any [] = [];
  
  constructor (
    private router: Router,
    public fetchMovies:MovieService
  ){}

  ngOnInit():void {
    this.getMovies();
  }

getMovies(): void {
  this.fetchMovies.getAllMovies().subscribe((resp:any)=>{
  this.movies = resp;
console.log(this.movies)
return this.movies;
})
}
}
