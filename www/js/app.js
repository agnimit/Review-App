myapp = angular.module('ionicApp', ['ionic', 'ngResource']);


myapp.factory('GetData', function ($resource)
  {
      return {
          getg: function ()
          {
              return $resource('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&types=food&name=cruise&key=AIzaSyAvsJwTEgmbLX-eFOc4Asu7A_LVnKUfNd4', null).get();
          }
      }
  });

myapp.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('tabs', {
      url: "/tab",
      abstract: true,
      templateUrl: "tabs.html"
    })
    .state('tabs.home', {
      url: "/home",
      views: {
        'home-tab': {
          templateUrl: "home.html"        
        }
      }
    })
    .state('tabs.add', {
      url: "/add",
      views: {
        'add-tab': {
          templateUrl: "add.html"
        }
      }
    })

   $urlRouterProvider.otherwise("/tab/home");

})


myapp.controller('mainCtrl', function(GetData, $scope, $ionicModal, $http) {
  $scope.appName = "temp";
  $scope.restaurantQuery = {name: ''};
  $scope.check = {temp: ''};
  $ionicModal.fromTemplateUrl('findRestaurant.html', function(modal) {
    $scope.taskModal = modal;
  }, {
    scope: $scope,
    animation: 'slide-in-up'
  });

  $scope.findRest = function() {
    $scope.taskModal.show();
  };

  $scope.closeRest = function() {
    $scope.taskModal.hide();
  };
  $scope.searchRest = function() {
    GetData.getg().$promise.then(
          function (answer)
          {
              console.log(answer);
          });
    // $scope.url = '';
    // $scope.url = 'http://api.locu.com/v1_0/venue/search/?api_key=39e578fa47b65988fda573eb5246a913afa735b1';
    // var temp = $scope.restaurantQuery.name;
    // temp = temp.replace(" ", "&");
    // $scope.url = $scope.url + '&name=' + temp;
    // window.navigator.geolocation.getCurrentPosition(function(position) {
    //     $scope.$apply(function() {
    //       $scope.url = $scope.url + '&location=' + position.coords.latitude + ',' + position.coords.longitude;
    //       console.log($scope.url);
    //       $http({method: 'GET', url: $scope.url }).
    //       success(function(data) {
    //         $scope.restaurantList = data;
    //         console.log(data);
    //       }).
    //       error(function(data) {
    //         console.log(" failed ");
    //       });
    //     });
    // }, function(error) {
    //     alert(error);
    // });
  }
});
