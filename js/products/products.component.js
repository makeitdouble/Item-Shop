'use strict';

var products = angular.module('products');

products.component('productsList', {
    templateUrl: './js/products/products.template.html',

    controller: ['items', 'cart', 'localCart', '$routeParams', '$scope', '$rootScope', function(items, cart, localCart, $routeParams, $scope, $rootScope){
        var self = this;
        
        $scope.addCart = function(item){
            self.product = cart.add({id: item.id});
            localCart.set(item.id, item);
            $rootScope.$emit('addToCart', item);
        };
        
        self.filter = $routeParams.filter;
        self.products = items.get();
        
        }]
});