var mainApp = angular.module('mainApp', ['ngRoute', 'ngResource', 'ngCookies','ngMessages',"checklist-model","ngSanitize",'ngCart','ngAnimate', 'ui.bootstrap','ui.router', 'snap']);
var isPublicRoute = function(path) {
    publicPathArray = ['/signup','/login','/forgot-password','/auth/facebook','/auth-token','/about-us'];
    if (location.href.indexOf('auth-token') > -1) {
        return true;
    }
    if (publicPathArray.indexOf(path) > -1) {
        return true;
    } else {
        return false;
    }
};









mainApp.run(['$rootScope', '$location', 'AuthFactory','$cookies', function ($rootScope, $location, Auth,$cookies) {
        
    $rootScope.show_loader = 0;
        $rootScope.enquiry_made = {};
         var history = [];
         $rootScope.statusList = ['new','processing','completed'];

        $rootScope.$on('$routeChangeSuccess', function() {
            history.push($location.$$path);
        });

        $rootScope.back = function () {
            var prevUrl = history.length > 1 ? history.splice(-2)[0] : "/";
            $location.path(prevUrl);
        };
        $rootScope.$on('$stateChangeStart', function (event) {
            
            Auth.syncCookieUser();
            console.log($location.path());
            if (!Auth.isLoggedIn() && !isPublicRoute($location.path())) {
                console.log('DENY');
                $location.path('/login');
            }
            else {
                if (Auth.isLoggedIn() && $location.path() == '/login') {
                    $location.path('/');
                } 
                console.log('ALLOW');
                
               // $cookies.put('enquiry_made', JSON.stringify({items:[]}));

                $rootScope.$emit('syncEnquiryMade');
                
            }
        });
    }]);


