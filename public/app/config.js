var API_ENGINE_URL;
var LOGIN_FACEBOOK_LINK;
var SERV_ENV = "local";
var STATUS_COLORS = {new:"label label-info",processing:"label btn-primary btn-xs",completed:"label label-success"}
switch (SERV_ENV) {
    case 'production':
        API_ENGINE_URL = 'http://localhost/serveaseme/index.php/api/';
               API_ENGINE_URL = 'http://52.26.135.69/index.php/api/';

        LOGIN_FACEBOOK_LINK = 'http://serveaseme.local/index.php/auth/facebook';
        break;
    default:
       API_ENGINE_URL = location.origin + '/index.php/api/';
        LOGIN_FACEBOOK_LINK = 'http://serveaseme.local/index.php/auth/facebook';
    
}