'use strict';

app.controller('UserAdsController',
    function ($scope, userService, notifyService, pageSize) {
        $scope.adsParams = {
            'startPage' : 1,
            'pageSize' : pageSize
        };

        $scope.reloadUserAds = function () {
            userService.getUserAds(
                $scope.adsParams,
                function success(data) {
                    $scope.userAds = data;
                },
                function error(err) {
                    notifyService.showError('Cannot load your ads', err);
                }
            );
        };

        $scope.deactivateAd = function (ad) {
            userService.deactivateAd(
                ad.id,
                function success(data) {
                    notifyService.showInfo("User ad deactivated");
                    ad.status = 'Inactive';
                },
                function error(err) {
                    notifyService.showError('Cannot deactivate your ad', err);
                }
            );
        };

        $scope.publishAgainAd = function (ad) {
            userService.publishAgainAd(
                ad.id,
                function success(data) {
                    notifyService.showInfo("User ad published again for approval");
                    ad.status = 'WaitingApproval';
                },
                function error(err) {
                    notifyService.showError('Cannot publish your ad', err);
                }
            );
        };

        $scope.reloadUserAds();

        $scope.$on('categorySelectionChanged', function (event, selectedCategoryId) {
            $scope.adsParams.categoryId = selectedCategoryId;
            $scope.adsParams.startPage = 1;
            $scope.reloadUserAds();
        });

        $scope.$on('townSelectionChanged', function (event, selectedTownId) {
            $scope.adsParams.townId = selectedTownId;
            $scope.adsParams.startPage = 1;
            $scope.reloadUserAds();
        });
    }
);