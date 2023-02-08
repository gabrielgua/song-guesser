export class Musica {
    id!: number;
    nome!: string;
    diretorio!: string;
    alternativa!: any;
    arquivo: any;
    uploadProgress: number = 0;
    uploading: boolean = false;
}