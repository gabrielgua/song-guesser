import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface MusicaData {
  id: any;
  nome: any;
  nomeArquivo?: any;
}

@Component({
  selector: 'app-musica-dialog',
  templateUrl: './musica-dialog.component.html',
  styleUrls: ['./musica-dialog.component.css']
})
export class MusicaDialogComponent {

  nome = new FormControl(this.data.nome, [Validators.required]);

  constructor(
    public dialogForm: MatDialogRef<MusicaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MusicaData
  ) {}

  onNoClick(): void {
    this.dialogForm.close();
  }

  isValid(): boolean {
    return this.nome.valid && this.nome.value !== this.data.nome;
  }

}
