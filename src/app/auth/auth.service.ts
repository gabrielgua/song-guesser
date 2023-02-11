import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as CryptoJS from 'crypto-js';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  OAUTH_TOKEN_URL = environment.API_URL + '/oauth2/token';
  OAUTH_AUTHORIZE_URL = environment.API_URL + '/oauth2/authorize';
  JWT_PAYLOAD: any;
  
  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService
  ) { }


  redirectToLogin(): void {
    const state = this.gerarStringAleatoria(40);
    const codeVerifier = this.gerarStringAleatoria(150);

    localStorage.setItem('state', state);
    localStorage.setItem('codeVerifier', codeVerifier);

    const challengeMethod = 'S256';
    const codeChallenge = CryptoJS.SHA256(codeVerifier)
      .toString(CryptoJS.enc.Base64)
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');


    const redirectUri = encodeURIComponent(environment.OAUTH_CALLBACK_URL);
    const clientId = 'song-guesser-angular';
    const scope = 'READ WRITE';
    const resposeType = 'code';

    const params = [
      'response_type=' + resposeType,
      'client_id=' + clientId,
      'state=' + state,
      'scope=' + scope,
      'redirect_uri=' + redirectUri,
      'code_challenge=' + codeChallenge,
      'code_challenge_method=' + challengeMethod 
    ]

    window.location.href = this.OAUTH_AUTHORIZE_URL + '?' + params.join('&');
  }

  gerarAccessToken(code: string, state: string): Promise<any> {
    const stateOld = localStorage.getItem('state');

    if (stateOld !== state) {
      return Promise.reject(null);
    }

    const codeVerifier = localStorage.getItem('codeVerifier')!;
    const payload = new HttpParams()
      .append('grant_type', 'authorization_code')
      .append('code', code)
      .append('redirect_uri', environment.OAUTH_CALLBACK_URL)
      .append('code_verifier', codeVerifier);

    const headers = new HttpHeaders()
      .append('Content_Type', 'application/x-www-form-urlencoded')
      .append('Authorization', environment.CLIENT_CREDENTIALS);

    return firstValueFrom(this.http.post<any>(this.OAUTH_TOKEN_URL, payload, { headers }))
      .then((response: any) => {
        this.armazenarAccessToken(response['access_token']);
        this.armazenarRefreshToken(response['refresh_token']);
        return Promise.resolve();
      }).catch((error: any) => {
        console.error('Erro ao gerar token com code', error);
        return Promise.resolve();
      })
  }

  gerarAccessTokenByRefreshToken(): Promise<any> {
    const headers = new HttpHeaders()
      .append('Content_Type', 'application/x-www-form-urlencoded')
      .append('Authorization', environment.CLIENT_CREDENTIALS);

    const payload = new HttpParams()
      .append('grant_type', 'refresh_token')
      .append('refresh_token', localStorage.getItem('refreshToken')!);

    return firstValueFrom(this.http.post<any>(this.OAUTH_TOKEN_URL, payload, { headers }))
      .then((response: any) => {
        this.armazenarAccessToken(response['access_token']);
        this.armazenarRefreshToken(response['refresh_token']);
        console.log('Novo Access Token gerado com Refresh Token');
        return Promise.resolve();
        
      }).catch((error: any) => {
        console.error('Erro ao gerar o Access Token com o Refresh Token', error);
        return Promise.resolve();
      })
      
    
  }

  public temPermissao(permissao: string): boolean {
    return this.JWT_PAYLOAD && this.JWT_PAYLOAD.authorities.includes(permissao);
  }

  public temQualquerPermissao(permissoes: string[]): boolean {
    for (const permissao of permissoes) {
      if (this.temPermissao(permissao)) {
        return true;
      }
    }

    return false;
  }

  private armazenarAccessToken(token: string) {
    this.JWT_PAYLOAD = this.jwtHelper.decodeToken(token);
    localStorage.setItem('token', token);
  }

  private armazenarRefreshToken(refreshToken: string) {
    localStorage.setItem('refreshToken', refreshToken);
  }

  public logout() {
    this.limparAccessToken();
    localStorage.clear();
    window.location.href = environment.API_URL + '/logout?returnTo=' + environment.LOGOUT_REDIRECT_TO_URL;
  }

  public limparAccessToken() {
    localStorage.removeItem('token');
    this.JWT_PAYLOAD = null;
  }

  public isAcessTokenValido() {
    const token = localStorage.getItem('token');
    return !token || this.jwtHelper.isTokenExpired(token);
  }

  public carregarToken() {
    const token = localStorage.getItem('token');
    if (token) {
      this.armazenarAccessToken(token);
    }
  }

  private gerarStringAleatoria(tamanho: number): string {
    let result = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < tamanho; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return result;
  }

}
