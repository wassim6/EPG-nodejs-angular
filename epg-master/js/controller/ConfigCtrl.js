'use strict';

MetronicApp.controller('ConfigCtrl', function($rootScope, $scope, $http, $state, $translate, EpgService, ngDialog, hotkeys) {
    
    $scope.lang=$translate.use();
    console.log($translate.use());
    
    $scope.newValue = function(val){
        console.log(val);
        $translate.use(val);
    }
    
    
        hotkeys.add({
      combo: 'left',
    description: '',
    callback: function() {
        $scope.lang="fr";
        $translate.use('fr');
    }
    });
    hotkeys.add({
      combo: 'right',
    description: '',
    callback: function() {
        $scope.lang="en";
        $translate.use('en');
    }
  });
    
    
    
    
});


