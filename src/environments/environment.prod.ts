export const environment = {
    production: true,
    API_URL: 'http://song-guesser-api-dev.us-west-2.elasticbeanstalk.com',
    OAUTH_CALLBACK_URL: 'https://song-guesser.vercel.app/authorized',
    LOGOUT_REDIRECT_TO_URL: 'https://song-guesser.vercel.app/login',
    TOKEN_ALLOWED_DOMAINS: [ /song-guesser-api-dev.us-west-2.elasticbeanstalk.com/ ],
    TOKEN_DISALLOWED_DOMAINS: [ /\/oauth2\/token/ ],
    CLIENT_CREDENTIALS: 'Basic ' + process.env['CLIENT_CREDENTIALS']
}