import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MusicaDialogComponent, MusicaData } from '../musica-dialog/musica-dialog.component';

@Component({
  selector: 'app-arquivo-dialog',
  templateUrl: './arquivo-dialog.component.html',
  styleUrls: ['./arquivo-dialog.component.css']
})
export class ArquivoDialogComponent {

  file = File;
  nomeArquivo = this.getNomeArquivo();
  fileControl = new FormControl(null, [Validators.required]);

  constructor(
    public dialogForm: MatDialogRef<MusicaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MusicaData
  ) {}

  getFile(event: any) {
    this.file = event.target.files[0];
    this.nomeArquivo = this.file.name;
  }

  onNoClick(): void {
    this.dialogForm.close();
  }

  getNomeArquivo(): string {
    if (this.data.nomeArquivo) {
      return this.data.nomeArquivo;
    } 

    return 'filename.mp3';
  }
}
