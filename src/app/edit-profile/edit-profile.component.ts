import { Component, Input, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { AuthService, UserService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { DialogRef } from '@angular/cdk/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    CommonModule,
    MatDialogModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss'
})
export class EditProfileComponent implements OnInit {

  @Input() userDetails = { Username: '', Email: '', Birthday: '' }

  public user : any
  constructor (
    private router : Router,
    private auth : AuthService,
    private userData : UserService,
    public dialog : MatDialog,
    public dialogRef : DialogRef,
    private snackBar : MatSnackBar
  
  ){}
  ngOnInit(): void {
    this.getUser()
  }
  
    getUser() : void {
      this.user = this.auth.getUser()
    }
    saveChanges(): void {
      if (this.user) {
        this.userData.editUser(this.user.Username, this.userDetails).subscribe({
          next: (response) => {
            this.snackBar.open(response.message, 'OK', { duration: 5000 });
            this.userData.updateUser(response.user)
            this.dialogRef.close()
          },
          error: (err) => {
            const errorMessage = err.message || "error";
            console.log(err)
            this.snackBar.open(errorMessage, 'OK', { duration: 5000 });
          }
        });

      } else {
        this.snackBar.open('User data not available', 'OK', { duration: 5000 });
      }
    }
    handleCancel() : void {
      this.dialogRef.close()
    }
    
    // handleDeregister(): void {
    //   const snackBarRef = this.snackBar.open(
    //     'Are you sure you want to deregister? This action cannot be undone.',
    //     'OK',
    //     {
    //       duration: 8000, // Keep the snackbar open until the user clicks "OK"
    //     }
    //   );
    
    //   snackBarRef.onAction().subscribe(() => {
    //     this.userData.deleteUser(this.user.Username).subscribe({
    //       next: (response) => {
    //         alert(response.message);
    //         localStorage.removeItem('user');
    //         localStorage.removeItem('token');
    //         this.dialogRef.close();
    //         this.router.navigate(['welcome']);
    //       },
    //       error: (error) => {
    //         console.error('Deletion failed', error);
    //       }
    //     });
    //   });
    // }
    
    
    handleLogout() : void {
      this.auth.removeToken()
      this.auth.removeUser()
      this.dialogRef.close()
      this.router.navigate(['welcome'])
    }
}
