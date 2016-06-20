'use strict';

MetronicApp.controller('HomeCtrl', function($rootScope, $scope, $http, $state, EpgService, ngDialog, hotkeys) {


        var vm = this;

        // SLIDES WITH CAPTIONS
        //===================================
        vm.slides = [
            {'src': 'images/config2.jpg', caption: 'Configuration'},
            {'src': 'images/live2.jpg', caption: 'Live '},
            {'src': 'images/epg2.jpg', caption: 'EPG '} , {'src': 'images/test.png', caption: 'video'},
            {'src': 'images/imdb.png', caption: 'Movie'}      ];

        vm.options = {
            sourceProp: 'src',
            visible: 5,
            perspective: 35,
            startSlide: 2,
            border: 3,
            dir: 'ltr',
            width: 256,
            height: 256,
            space: 220
        };

    $scope.slides=vm.slides;
    $scope.options=vm.options;
    $scope.vm=vm;

    hotkeys.add({
      combo: 'left',
    description: '',
    callback: function() {
        var tmp=vm.options.startSlide;
        if(tmp==0)
            tmp=1;
        else if(tmp==1)
            tmp=2;
        else if(tmp==2)
            tmp=3;
        else if(tmp==3)
            tmp=4;
        else
          tmp=0;
        vm.options = {
            sourceProp: 'src',
            visible: 5,
            perspective: 35,
            startSlide: tmp,
            border: 3,
            dir: 'ltr',
            width: 256,
            height: 256,
            space: 220
        };
        $scope.options=vm.options;
        $scope.vm=vm;

    }
  });
    hotkeys.add({
      combo: 'right',
    description: '',
    callback: function() {
        var tmp=vm.options.startSlide;
        if(tmp==0)
            tmp=4;
        else if(tmp==1)
            tmp=0;
        else if(tmp==2)
            tmp=1;
        else if(tmp==4)
            tmp=3;
        else
            tmp=2;
        vm.options = {
            sourceProp: 'src',
            visible: 5,
            perspective: 35,
            startSlide: tmp,
            border: 3,
            dir: 'ltr',
            width: 256,
            height: 256,
            space: 220
        };
        $scope.options=vm.options;
        $scope.vm=vm;
    }
  });

    hotkeys.add({
      combo: 'enter',
    description: 'enter',
    callback: function() {
        var index=vm.options.startSlide;
        if(index==2){
            $state.go('epg');
        }
        else if(index==1){
            $state.go("live");
        }
        else if(index==0){
            $state.go("config");
        }
        else if(index==3){
            $state.go("video");
        }
        else if(index==4){
            $state.go("movie");
        }
    }
  });


    $scope.selectedClick=function selectedClick(index) {
            console.log('Selected Slide Clicked callback triggered. \n == Slide index is: ' + index + ' ==');
        if(index==2){
            $state.go('epg');
        }
        else if(index==1){
            $state.go("live");
        }
        else if(index==0){
            $state.go("config");
        }
        else if(index==3){
            $state.go("video");
        }
        else if(index==4){
            $state.go("movie");
        }
    }


function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}
function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    var day = today.getDate();
    var month=today.getMonth()+1;
    var year=today.getFullYear();
    // add a zero in front of numbers<10
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('clockbox').innerHTML =year+' / '+month+' / '+day+' - '+ h + ":" + m + ":" + s;
    var t = setTimeout(function () {
        startTime()
    }, 500);
}
startTime();

});
