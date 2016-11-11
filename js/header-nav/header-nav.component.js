'use strict';

angular.module('header-nav').component('header', {
    templateUrl: './js/header-nav/header-nav.template.html',

    controller: ['localCart', 'cart', '$scope', '$rootScope', function(localCart, cart, $scope, $rootScope){

        var self = this;
        self.word = "items";

        $rootScope.$on('addToCart', function(){
            collectData();
            if (self.qCart == 1)
            {
                self.word = "item";
            }else{
                self.word = "items";
            }
        });

        if (localCart.length() == 0)
        {
            cart.get().$promise.then(function(data){
                var sqlCart = data;
                for ( var i = 0; i < sqlCart.length; i++)
                {
                    localCart.set(sqlCart[i].id, sqlCart[i]);
                }
                collectData();
            });
        }

        $scope.deleteFromCart = function(id){
            localCart.deleteItem(id);
            cart.deleteItem({id: id});
            collectData();
        };

        $scope.clearCart = function(){
            localCart.clear();
            cart.clear();
            collectData();
        };

        function collectData(){
            self.qCart = localCart.quantity();
            self.totalPrice = localCart.totalPrice();
            self.localItems = localCart.getAll();
            if ( self.qCart > 0){
                $scope.emptyCartMessage = "";
            }else{
                $scope.emptyCartMessage = "Nothing here yet.";
            }
        }

        collectData();
    }]
});