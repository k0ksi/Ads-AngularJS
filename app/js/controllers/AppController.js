'use strict';

app.controller('AppController',
    function ($scope, authService) {
        $scope.authService = authService;

        $scope.logout = function () {
            authService.logout();
            notifyService.showInfo('You have successfully logged out');
            $location('/');
        }
    }
);