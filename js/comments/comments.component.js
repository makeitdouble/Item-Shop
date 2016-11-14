'use strict';

var comments = angular.module('comments');

comments.component('commentsList', {
    templateUrl: './js/comments/comments.template.html',

    controller: ['comments','$routeParams', '$scope', function(comments, $routeParams, $scope){

        $scope.message = "No comments yet.";
        comments.getComments({id: $routeParams.id}).$promise.then(function(data){
            delete data.$promise;
            delete data.$resolved;
            if (data.length > 0){
                $scope.comments = data;
                $scope.message = "";
            }
        });
    }]
});

comments.directive('tree', function recurveDirective(){
    return {
        templateUrl: './js/comments/comments.template.html',
        scope: {
            comments: '='
        }
    }
});