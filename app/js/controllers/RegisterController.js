'use strict';

app.controller('RegisterController',
    function ($scope, townsService, authService, notifyService) {
        $scope.userData = {townId: null};
        $scope.towns = townsService.getTowns();

        $scope.register = function (userData) {
            authService.register(userData,
                function success() {
                    notifyService.showInfo("You have successfully registered");
                    $location('/login');
                },
                function error(err) {
                    notifyService.showError('User registration failed', err);
                });
        }
    }
);