export const environment = {
    production: true,

    API_URL: 'https://song-guesser-api-production.up.railway.app',
    OAUTH_CALLBACK_URL: 'http://127.0.0.1:4200/authorized',
    LOGOUT_REDIRECT_TO_URL: 'http://127.0.0.1:4200/login',
    TOKEN_ALLOWED_DOMAINS: [ /song-guesser-api-production.up.railway.app/ ],
    TOKEN_DISALLOWED_DOMAINS: [ /\/oauth2\/token/ ],
    CLIENT_CREDENTIALS: 'Basic ' + process.env['CLIENT_CREDENTIALS']

    
}