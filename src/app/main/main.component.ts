import { Component, OnInit } from '@angular/core';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../fetch-api-data.service';
import { FavoritesComponent } from '../favorites/favorites.component';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { ProfileComponent } from '../profile/profile.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    MovieCardComponent,
    MatToolbarModule,
    MatIconModule,
    CommonModule,
    MatDialogModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit {
  public user: any;

  constructor (
    private router : Router,
    private auth : AuthService,
    public dialog : MatDialog
  
  ){}
  ngOnInit(): void {
    this.getUser()
  }
  
    getUser() : void {
      this.user = this.auth.getUser()
    }
    openProfileDialog() :void {
this.dialog.open(ProfileComponent),
 {width: '500px'}
    }

    editProfileDialog() : void {
      this.dialog.open(EditProfileComponent, {
        width: '500px'
      });
    }
    
    goToHome() : void {
      this.router.navigate(['main'])
    }
    favoritesDialog(): void {
      this.dialog.open(FavoritesComponent, {
        width: '80%',
        height: '80%'   
      });
    }
    
    
  }
  