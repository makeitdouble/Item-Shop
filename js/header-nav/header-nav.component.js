'use strict';

angular.module('header-nav').component('header', {
    templateUrl: './js/header-nav/header-nav.template.html',

    controller: ['localCart', 'cart', '$scope', '$rootScope', function(localCart, cart, $scope, $rootScope){
        
        var self = this;
        self.word = "items";
        self.qCart = localCart.quantity();
        self.totalPrice = localCart.totalPrice();
        self.localItems = localCart.getAll();

        $rootScope.$on('quantity', function(event, data){
            self.qCart = data;
            if (self.qCart == 1)
            {
                self.word = "item";
                console.log(self.word);
            }else{
                self.word = "items";
            }
        });

        $rootScope.$on('totalPrice', function(event, data){
            self.totalPrice = data;
            self.localItems = localCart.getAll();
        });

        if (localCart.length() == 0)
        {
            cart.get().$promise.then(function(data){
                var sqlCart = data;
                localCart.clear();
                for ( var i = 0; i < sqlCart.length; i++)
                {
                    localCart.set(sqlCart[i].id, sqlCart[i]);
                }
                self.qCart = localCart.quantity();
                self.totalPrice = localCart.totalPrice();
                self.localItems = localCart.getAll();
            });
        }
    }]
});