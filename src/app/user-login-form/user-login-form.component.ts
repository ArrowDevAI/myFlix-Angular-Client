import { Component, Input, OnInit } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { UserLoginService } from '../fetch-api-data.service';
import {MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

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
  MatDialogModule
  ],
})
export class UserLoginFormComponent implements OnInit {

@Input() userData = {Username: '', Password: ''}

constructor(
  private router: Router,
  public fetchApiData: UserLoginService,
  public dialogRef: MatDialogRef<UserLoginFormComponent>,
  public snackBar: MatSnackBar) {}

  ngOnInit(): void {
  }  

  loginUser() : void {
    this.fetchApiData.userLogin(this.userData).subscribe((result)=>{
      console.log("USER", result)
      
      localStorage.setItem('user', result.user.Username);
      localStorage.setItem('token', result.token)
      
      this.dialogRef.close();
      this.snackBar.open('User Login Successful', 'OK', {
        duration: 2000
      });
    });
    }

}
