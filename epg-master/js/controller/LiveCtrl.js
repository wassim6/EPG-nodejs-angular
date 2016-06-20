'use strict';

MetronicApp.controller('LiveCtrl', function($rootScope, $scope, $http, $state, EpgService, ngDialog, hotkeys) {
    
    
    $http.get('../../channels.json').success(function(data) {
		$scope.channels = data.init.channels;
		//console.log($scope.channels);
	});
    
    $scope.openV = function(c) {
        $rootScope.detail = c;
         var new_dialog = ngDialog.open({
            id: 'fromAService',
            template: 'firstDialogId2',
            controller: 'Inside2Ctrl'
        });

    };

    
    
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

MetronicApp.controller('Inside2Ctrl', function ($rootScope, $scope, ngDialog) {
    var id=$rootScope.detail.c[0];
    var sr='';
    console.log(id);
        if(id==2002){
            sr='rtmp://aljazeeraflashlivefs.fplive.net/aljazeeraflashlive-live/aljazeera_ara_high';
        }
        else if(id==2075){
            sr='rtmp://aljazeeraflashlivefs.fplive.net:1935/aljazeeraflashlive-live/aljazeera_doc_high';
        }
        else if(id==6000){
            sr='rtmp://aljazeeraflashlivefs.fplive.net/aljazeeraflashlive-live/aljazeera_eng_high';
        }
        else if(id==1621){
            sr='';
        }
        else if(id==4058){
            sr='rtmp://109.71.162.112:1935/live/sd.jasminchannel.stream';
        }
        else if(id==4061){
            sr='rtmp://augsburgtv.iptv-playoutcenter.de:1935/augsburgtv/augsburgtv.stream_1';
        }
        else if(id==4066){
            sr='rtmp://streaming.austria24.tv/live/stream_360p';
        }
        else if(id==4053){
            sr='rtmp://62.113.210.250/medienasa-live//BLKonline_high';
        }
    
        $scope.mediaToggle = {
            sources: [
                {
                    src:sr,
                    //src: 'rtmp://aljazeeraflashlivefs.fplive.net/aljazeeraflashlive-live/aljazeera_ara_high',
                    type: 'rtmp/mp4'
                }
            ],
            poster: 'http://tv.sky.com/logo/80/35/skychb'+$rootScope.detail.c[0]+'.png'
        };    
});


/*
rtmp://aljazeeraflashlivefs.fplive.net/aljazeeraflashlive-live/aljazeera_ara_high
rtmp://aljazeeraflashlivefs.fplive.net:1935/aljazeeraflashlive-live/aljazeera_doc_high
rtmp://aljazeeraflashlivefs.fplive.net/aljazeeraflashlive-live/aljazeera_eng_high
rtmp://streamer1.tvdom.tv/stream/Vremja.stream_720p 
rtmp://109.71.162.112:1935/live/sd.jasminchannel.stream
rtmp://augsburgtv.iptv-playoutcenter.de:1935/augsburgtv/augsburgtv.stream_1
rtmp://streaming.austria24.tv/live/stream_360p
rtmp://62.113.210.250/medienasa-live//BLKonline_high


rtmp://fms.daf.tmt.de/live/dafstream100 
rtmp://83.169.58.36/live/DasneueTV
http://dwschiene6-i.akamaihd.net/hls/live/221763/dwschiene6/x6x/playlist6x.m3u8
rtmp://live.opoja.tv:1935/8016/8016


rtmp://www.teledunet.com:1935/live2/teledunet_tv
http://50.97.49.87:1935/apqq22/sky1delsh/playlist.m3u8

*/

