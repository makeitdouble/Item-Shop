'use strict';

var products = angular.module('products');

products.component('productsList', {
    templateUrl: './js/products/products.template.html',

    controller: ['item', 'cart', 'localCart', '$routeParams', '$scope', '$rootScope', function(item, cart, localCart, $routeParams, $scope, $rootScope){
        var self = this;
        self.filter = $routeParams.filter;
        
        $scope.clear = function(){
            localCart.clear();
            $rootScope.$emit('quantity', localCart.quantity());
            $rootScope.$emit('totalPrice', localCart.totalPrice());
        };
        
        $scope.addCart = function(item){
            self.product = cart.add({id: item.id});
            localCart.set(item.id, item);
            $rootScope.$emit('quantity', localCart.quantity());
            $rootScope.$emit('totalPrice', localCart.totalPrice());
        };
        
        self.filter = $routeParams.filter;
        self.products = item.get();
        
        }
    ]
});