import { Component, Input } from '@angular/core';
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
import { EditProfileComponent } from '../edit-profile/edit-profile.component';

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
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

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
  editProfileDialog() : void {
    this.dialog.open(EditProfileComponent, {
      width: '500px'
    });
    this.dialogRef.close()
  }
    getUser() : void {
      this.user = this.auth.getUser()
    }
 
    handleLogout() : void {
      this.auth.removeToken()
      this.auth.removeUser()
      this.dialogRef.close()
      this.router.navigate(['welcome'])
    }
}
