angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats,$state) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };


})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats,$state) {
  $scope.chat = Chats.get($stateParams.chatId);

    $scope.go = function () {
      console.log(1)
      $state.go('tab.d2');
    }
})

.controller('AccountCtrl', function($scope,$state) {
  $scope.settings = {
    enableFriends: true
  };
    $scope.go = function () {
      console.log(1);
      $state.go('tab.d2');
    }
})
  .controller('d2Con', function($scope,$state) {
    $scope.go = function () {
      console.log(2);
      $state.go('tab.d3');
    }
  })
.controller('d3Con', function($scope,$state) {
  $scope.go = function () {
    console.log(3);
    $state.go('d4');
  }
})
  .controller('d4Con', function($scope,$state) {
    $scope.go = function () {
      console.log(4);
      $state.go('tab.d3');
    }
  });
