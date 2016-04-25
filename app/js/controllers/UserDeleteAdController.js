'use strict';

app.controller('UserDeleteAdController',
    function ($scope, $location, $routeParams, userService, notifyService) {
        $scope.adData = {};
        window.scrollTo(0, 0);

        function getUserAd(id) {
            userService.getUserAdById(
                id,
                function success(data) {
                    $scope.adData = data;
                },
                function error(err) {
                    notifyService.showError('Cannot load user ad', err);
                }
            );
        }

        getUserAd($routeParams.id);

        $scope.deleteAd = function (adData) {
            userService.deleteAd(adData.id,
                function success() {
                    notifyService.showInfo("You have successfully deleted the ad");
                    $location.path('/user/ads');
                },
                function error(err) {
                    notifyService.showError("Deleting the ad failed", err);
                }
            );
        }
    });