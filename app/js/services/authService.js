'use strict';

app.factory('authService',
    function ($http, baseServiceUrl) {
        return {
            login: function (userData, success, error) {
                var request = {
                    method: 'POST',
                    url: baseServiceUrl + '/api/user/login',
                    data: userData
                };

                $http(request).success(function (data) {
                    sessionStorage['currentUser'] = JSON.stringify(data);
                    success(data);
                }).error(error);
            },

            register: function (userData, success, error) {
                var request = {
                    method: 'POST',
                    url: baseServiceUrl + '/api/user/register',
                    data: userData
                };

                $http(request).success(function (data) {
                    sessionStorage['currentUser'] = JSON.stringify(data);
                    success(data);
                }).error(error);
            },

            logout: function () {
                delete sessionStorage['currentUser'];
            },

            getCurrentUser: function () {
                var user = sessionStorage['currentUser'];
                if(user) {
                    return JSON.parse(sessionStorage['currentUser']);
                }
            },

            isAnonymous: function () {
                return sessionStorage['currentUser'] == undefined;
            },

            isLoggedIn: function () {
                return sessionStorage['currentUser'] != undefined;
            },

            isNormalUser: function () {
                var user = this.getCurrentUser();
                return (user != undefined) && (!user.isAdmin);
            },
            
            isAdmin: function () {
                var user = this.getCurrentUser();
                return (user != undefined) && (user.isAdmin);
            },
            
            getAuthHeaders: function () {
                var headers = {};
                var user = this.getCurrentUser();
                if(user) {
                    headers['Authorization'] = 'Bearer ' + user.access_token;
                }

                return headers;
            }
        }
    }
);