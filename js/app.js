var app = angular.module('Todos', []);

app.controller('TodoController', ['$scope', 'LocalStorageProvider', function($scope, LocalStorageProvider) {

    $scope.todos = LocalStorageProvider.get();

    $scope.addTodo = function() {
        $scope.todos.push($scope.theTodo);
        LocalStorageProvider.set($scope.todos);
        $scope.theTodo = '';
    };

}]);

app.factory('LocalStorageProvider', function($rootScope) {

    var STORAGE_KEY = 'angular-todo';

    return {

        get: function() {

            var todos = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

            todos = todos.map(function(value, index) {
                value.id = index + 1;
                return value;
            });

            return todos;

        }, // get

        set: function(value) {
            var todos = JSON.stringify(value);
            localStorage.setItem(STORAGE_KEY, value);
        } // set

    }; // return

}); // LocalStorageProvider