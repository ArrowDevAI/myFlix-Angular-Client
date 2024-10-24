import { Component, Input, OnInit } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { UserRegistrationService } from '../fetch-api-data.service';
import {MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss'],
  standalone: true,
  imports: [
  MatInputModule,
  MatCardModule,
  MatFormFieldModule,
  FormsModule, 
  MatDialogModule,
  ],
})
export class UserRegistrationFormComponent implements OnInit {

@Input() userData = {Username: '', Password: '', Email: '', Birthday: ''}

constructor(
  public fetchApiData: UserRegistrationService,
  public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
  public snackBar: MatSnackBar) {}

  ngOnInit(): void {
  }  

  registerUser() : void {
    this.fetchApiData.userRegistration (this.userData).subscribe((result)=>{
      console.log("REGISTERED USER", result)
      this.dialogRef.close();
      this.snackBar.open('User Registration Successful', 'OK', {
        duration: 2000
      });
    });
    }

}
