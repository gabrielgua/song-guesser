import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface AlternativaData {
  id: number;
  nome: string;
  musicaNome?: string;
}

@Component({
  selector: 'app-alternativa-dialog',
  templateUrl: './alternativa-dialog.component.html',
  styleUrls: ['./alternativa-dialog.component.css']
})
export class AlternativaDialogComponent {

  nome = new FormControl(this.data.nome, [Validators.required]);
  remover: boolean = true;

  constructor(
    private dialogForm: MatDialogRef<AlternativaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AlternativaData
  ) {}


  isValid(): boolean {
    return this.nome.valid && this.nome.value != this.data.nome;
  }

  onNoClick(): void {
    this.dialogForm.close();
  }

}
