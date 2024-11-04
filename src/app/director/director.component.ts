import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-director',
  standalone: true,
  imports: [
    MatButtonModule
  ],
  templateUrl: './director.component.html',
  styleUrl: './director.component.scss'
})
export class DirectorComponent {
constructor (
  public dialogRef: MatDialogRef<DirectorComponent>,
  @Inject(MAT_DIALOG_DATA) public data: { title: string; genre: any; director: any; }
){}
  onClose() : void {
    this.dialogRef.close()
  }
}