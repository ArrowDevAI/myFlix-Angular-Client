import { Component, Input, OnInit } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AuthService, UserLoginService } from '../fetch-api-data.service';
import {MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss'],
  standalone: true,
  imports: [
  MatInputModule,
  MatCardModule,
  MatFormFieldModule,
  FormsModule, 
  MatDialogModule,
  MatIconModule,
  MatCardModule,
  MatDialogModule,
  MatButtonModule,
  CommonModule
  ],
})
export class UserLoginFormComponent implements OnInit {

@Input() userData = {Username: '', Password: ''}

constructor (
  private router: Router,
  public fetchApiData: UserLoginService,
  public dialogRef: MatDialogRef<UserLoginFormComponent>,
  public auth: AuthService,
  public snackBar: MatSnackBar ) {}

  ngOnInit(): void {
  }  

  // loginUser() : void {
  //   this.fetchApiData.userLogin(this.userData).subscribe((result)=>{
  //     this.auth.setToken(result.token)
  //     this.auth.setUser(result.user)
  //     this.dialogRef.close();
  //     this.snackBar.open('User Login Successful', 'OK', {
  //       duration: 2000
  //     });
  //     this.router.navigate(['main'])
  //   });
  //   }

    loginUser() : void {
   
      this.fetchApiData.userLogin(this.userData).subscribe({
        next: (result) => {
          console.log(result)
          this.auth.setToken(result.token)
          this.auth.setUser(result.user)
          this.dialogRef.close();
          this.router.navigate(['main'])
        },
      
          error: (error) =>  {
            const errorMessage = error.message || 'An error occurred. Please try again.';
            this.snackBar.open(errorMessage, 'OK', { duration: 5000 });
        }
      })
      }
}
