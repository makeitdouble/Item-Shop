'use strict';

var products = angular.module('products');

products.component('productsList', {
    templateUrl: './js/products/products.template.html',

    controller: ['items', 'cart', 'localCart', '$routeParams', '$scope', '$rootScope', function(items, cart, localCart, $routeParams, $scope, $rootScope){

        $scope.addCart = function(item){
            cart.add({id: item.id});
            localCart.set(item.id, item);
            $rootScope.$emit('addToCart', item);
        };
        
        $scope.filter = $routeParams.filter;
        $scope.items = items.getItems();
        
        }]
});