var app = angular.module('Todos', []);

app.controller('TodoController', ['$scope', 'LocalStorageProvider', function($scope, LocalStorageProvider) {

    $scope.todos = LocalStorageProvider.get();

    $scope.addTodo = function() {

        var todo = {
            name: $scope.theTodo,
            completed: false,
            id: $scope.todos.length + 1
        };

        $scope.todos.push(todo);
        LocalStorageProvider.set($scope.todos);
        $scope.theTodo = '';

    }; // addTodo

    $scope.delete = function(id) {

        var index = $scope.todos.find(function(item) {
            return item.id = id;
        });

        $scope.todos.splice(index, 1);
        LocalStorageProvider.set($scope.todos);

    }; // delete

}]);

app.factory('LocalStorageProvider', function($rootScope) {

    var STORAGE_KEY = 'angular-todo';

    return {

        get: function() {
            return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        }, // get

        set: function(value) {
            var todos = JSON.stringify(value);
            localStorage.setItem(STORAGE_KEY, todos);
        } // set

    }; // return

}); // LocalStorageProvider