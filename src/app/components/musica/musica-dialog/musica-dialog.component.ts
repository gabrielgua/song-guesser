import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface MusicaData {
  id: any;
  nome: any;
}

@Component({
  selector: 'app-musica-dialog',
  templateUrl: './musica-dialog.component.html',
  styleUrls: ['./musica-dialog.component.css']
})
export class MusicaDialogComponent {

  constructor(
    public dialogForm: MatDialogRef<MusicaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MusicaData
  ) {}

  onNoClick(): void {
    this.dialogForm.close();
  }

}
