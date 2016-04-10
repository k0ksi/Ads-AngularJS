'use strict';

app.controller('LoginController',
    function ($scope, $location, authService, notifyService) {
        $scope.login = function (userData) {
            authService.login(userDaata,
                function success() {
                    notifyService.showInfo('Login successful');
                    $location.path('/');
                },
                function error(err) {
                    notifyService.showError('Unable to login', err);
                }
            );
        }
    }
);