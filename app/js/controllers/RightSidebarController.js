'use strict';

app.controller('RightSidebarController',
    function ($scope, $route, $rootScope, $location, categoriesService, townsService) {
        var path = $location.path();

        $scope.selectedStatus = null;

        $scope.statusClicked = function (clickedStatus) {
            $scope.selectedStatus = clickedStatus;
            $rootScope.$broadcast('statusSelectionChanged', clickedStatus);
        };

        $scope.categories = categoriesService.getCategories();
        $scope.towns = townsService.getTowns();

        $scope.categoryClicked = function (clickedCategoryId) {
            $scope.selectedCategoryId = clickedCategoryId;
            $rootScope.$broadcast('categorySelectionChanged', clickedCategoryId);
        };

        $scope.townClicked = function (clickedTownId) {
            $scope.selectedTownId = clickedTownId;
            $rootScope.$broadcast('townSelectionChanged', clickedTownId);
        };
    }
);