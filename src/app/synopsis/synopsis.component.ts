import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-synopsis',
  standalone: true,
  imports: [
    MatButtonModule
  ],
  templateUrl: './synopsis.component.html',
  styleUrl: './synopsis.component.scss'
})
export class SynopsisComponent {
  constructor (
    public dialogRef: MatDialogRef<SynopsisComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; genre: any; director: any; description: any; }
  ){console.log('Genre data:', this.data.genre);
    console.log('Director data:', this.data.director);}
    onClose() : void {
      this.dialogRef.close()
    }
  }