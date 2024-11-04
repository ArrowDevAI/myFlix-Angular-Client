import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-genre',
  standalone: true,
  imports: [
    MatButtonModule
  ],
  templateUrl: './genre.component.html',
  styleUrl: './genre.component.scss'
})
export class GenreComponent {
  constructor (
    public dialogRef: MatDialogRef<GenreComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; genre: any; director: any; }
  ){}
    onClose() : void {
      this.dialogRef.close()
    }
}
