import { Component, Input, OnInit, Optional } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss'],
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
  providers: [DatePipe,
  ]
})
export class UserRegistrationFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' }

  constructor( 

    private router: Router,
    public fetchApiData: UserRegistrationService,
    @Optional() public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  registerUser(): void {

    this.fetchApiData.userRegistration(this.userData).subscribe({
      next: (result) => {
        this.snackBar.open(result.message, 'OK', { duration: 5000 });
        this.dialogRef.close();
        this.router.navigate(['welcome']);
      },
      error: (error) => {
        const errorMessage = error.message || 'An error occurred. Please try again.';
        this.snackBar.open(errorMessage, 'OK', { duration: 5000 });
      }

    })
  }
}
