import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-authorized',
  templateUrl: './authorized.component.html',
  styleUrls: ['./authorized.component.css']
})
export class AuthorizedComponent implements OnInit {
  
  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute) {}
  
  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      if (params.code) {
        
        
    
        this.auth.gerarAccessToken(params.code, params.state)
          .then(() => {
            this.router.navigate(['musicas']);
          }).catch((error: any) => {
            console.error('Erro ao gerar Access Token com code');
            
          })
      } else {
        this.router.navigate(['/']);
      }
    });

  }
}
