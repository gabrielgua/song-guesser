export const environment = {
    production: false,

    API_URL: 'http://localhost:8080',
    OAUTH_CALLBACK_URL: 'http://127.0.0.1:4200/authorized',
    LOGOUT_REDIRECT_TO_URL: 'http://127.0.0.1:4200/login',
    TOKEN_ALLOWED_DOMAINS: [ /localhost:8080/ ],
    TOKEN_DISALLOWED_DOMAINS: [ /\/oauth2\/token/ ],
    CLIENT_CREDENTIALS: 'Basic ' + process.env['CLIENT_CREDENTIALS']
}