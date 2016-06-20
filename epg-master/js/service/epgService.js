'use strict';

MetronicApp.factory('EpgService',function($resource){
    
    
    var service = {};
		
    service.GetAllChannel=GetAllChannel;
    service.GetScheduled=GetScheduled;
   
    return service;
    
    function GetAllChannel(){

        return $resource('http://nodejs6.azurewebsites.net/api/channels');
    }
    
    function GetScheduled(){
        return $resource('http://localhost\\:5555/api/scheduled?channel=:channel',
                         {channel:'@channel'});
    }
    

    

    
    
});
