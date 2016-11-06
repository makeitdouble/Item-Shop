'use strict';
var shopApp = angular.module('shopApp');


shopApp.factory('item', ['$resource', function($resource){
    return $resource('item.php?:option', {}, {
        get: {
            method: 'GET',
            params:{option: "get"},
            isArray: true
        }
    });
}]);


shopApp.factory('cart', ['$resource', function($resource){
    return $resource('cart.php?:option', {}, {
        add:{
            method: 'GET',
            params: {option: "add"},
            isArray: false
        },
        get:{
            method: 'GET',
            params: {option: "get"},
            isArray: true
        }
    });
}]);


shopApp.factory('localCart', ['$window', function($window){

        return {
            set: function(key, item) {

                if (!$window.sessionStorage[key])
                {
                    item.quantity = item.quantity || 1;
                    var str = JSON.stringify(item);
                    $window.sessionStorage[key] = str;
                }else{
                    var obj = JSON.parse($window.sessionStorage[key]);
                    var q = +obj.quantity
                    obj.quantity = q + 1;
                    var str = JSON.stringify(obj);
                    $window.sessionStorage[key] = str;
                }
                
            },
            
            get: function(id) {
                return $window.sessionStorage[id];
            },

            length: function(){
                return $window.sessionStorage.length;
            },

            getAll: function(){
                var arr = [];
                for (var item in $window.sessionStorage)
                {
                    arr.push(JSON.parse($window.sessionStorage[item]));
                }
                return arr;
            },
            
            quantity: function(){
                var quantity = 0;
                for (var item in $window.sessionStorage)
                {
                    var i = JSON.parse($window.sessionStorage[item]);
                    var q = +i.quantity;
                    quantity += q;
                }
                return quantity;
            },

            totalPrice: function(){
                var value = 0;
                for (var item in $window.sessionStorage)
                {
                    var temp = JSON.parse($window.sessionStorage[item]);
                    value += (+temp.price * +temp.quantity);
                }
                return value;
            },

            clear : function() {
                $window.sessionStorage.clear();
                $window.localStorage.clear();
                console.log('____________all clear___________');
            }
        }
}]);