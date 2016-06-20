'use strict';

MetronicApp.controller('InsideCtrl', function ($scope, ngDialog) {
            
});




MetronicApp.controller('EpgCtrl', function($rootScope, $scope, $http, EpgService, ngDialog, hotkeys) {
    
    
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
    
    
    
        var component_epg = $('[data-component="epg"]');

        if (component_epg.length > 0)
        {
            /*
             * Initialize
             */

            var epg_start = component_epg.data('start');
            var epg_grid = $('.epg-grid', component_epg);
            var epg_grid_scroll = 0;

            if (typeof epg_start !== 'undefined' && epg_start !== '')
            {
                // Scroll the grid to the specified starting point
                scrollEPG(epg_start - 120);
            }

            /**
             * Controls
             */

            var action_prev = $('[data-action="prev"]', component_epg);
            var action_prev_icon = $('.icon', action_prev);
            var action_next = $('[data-action="next"]', component_epg);
            var action_next_icon = $('.icon', action_next);

            /* Previous */
            action_prev.on('click', function (e)
            {
                e.preventDefault();

                scrollEPG(-Math.abs(240));
            });

            /* Next */
            action_next.on('click', function (e)
            {
                e.preventDefault();

                scrollEPG(240);
            });

            var scroll_top = 0;
            var grid_height = epg_grid.height();

            $(window).on('scroll', function ()
            {
                scroll_top = $(window).scrollTop();

                //console.log(scroll_top);

                if (scroll_top >= grid_height)
                {
                    action_prev_icon.css('position', 'relative');
                    action_next_icon.css('position', 'relative');
                }
                else
                {
                    action_prev_icon.css('position', 'fixed');
                    action_next_icon.css('position', 'fixed');
                }
            });
        }

        /**
         * Scroll the EPG grid the specified distance
         */

        function scrollEPG(distance)
        {
            epg_grid_scroll = epg_grid.scrollLeft();

            epg_grid.stop(true, true).animate({
                scrollLeft: epg_grid_scroll + distance
            }, 500);
        }    
    
    
    $scope.x = 0;
    $scope.y = 0;
    
    main.init();
    
     hotkeys.add({
    combo: 'down',
    description: '',
    callback: function() {
        if($scope.y+1<$scope.channels.length)
            $scope.y += 1;
        var y = $(window).scrollTop();  //your current y position on the page
        $(window).scrollTop(y+400);
    }
  });
    hotkeys.add({
      combo: 'up',
    description: '',
    callback: function() {
        if($scope.y-1>-1)
            $scope.y += -1;
        var y = $(window).scrollTop();  //your current y position on the page
        $(window).scrollTop(y-400);
    }
  });
        hotkeys.add({
      combo: 'left',
    description: '',
    callback: function() {
         if($scope.x-1>-1)
      $scope.x += -1;
    scrollEPG(-Math.abs(240));
    }
  });
        hotkeys.add({
      combo: 'right',
    description: '',
    callback: function() {
         if($scope.x+1<50)
             $scope.x += 1;
        scrollEPG(Math.abs(240));
    }
  });
    
    hotkeys.add({
      combo: 'enter',
    description: 'show program detail',
    callback: function() {
		$rootScope.detail = $scope.scheduled[$scope.y][$scope.x];
        var new_dialog = ngDialog.open({
            id: 'fromAService',
            template: 'firstDialogId',
            controller: 'InsideCtrl'
        });
    }
  });
    
    
    
    $scope.scheduled=[];
    
    $rootScope.detail = 'test';

    $scope.open = function(id) {
        $scope.x=id.x;
        $scope.y=id.y;
        $rootScope.detail = id;
        var new_dialog = ngDialog.open({
            id: 'fromAService',
            template: 'firstDialogId',
            controller: 'InsideCtrl'
        });

    };

        
	$http.get('../../channels.json').success(function(data) {
//		data.init.channels.splice(data.init.channels.length, i)
		//$scope.channels = data.init.channels;
		$scope.channels = data.init.channels;
		$scope.taille=data.init.channels.length;
		 for(var i=0;i<$scope.channels.length;i++){
                getSheduled($scope.channels[i].c[0], i);
            }
		
	});

    
    
/*    $scope.channels=EpgService.GetAllChannel().query(function(){
        //console.log($scope.channels.length);
        for(var i=0;i<$scope.channels.length;i++){
                getSheduled($scope.channels[i].c[0], i);
            }

    });*/
    

    function getSheduled(id, i){
        EpgService.GetScheduled().query({
            channel:id
        },function(r){
//            $scope.channels[i].sheduled=r;
//            console.log($scope.channels[i].sheduled);
            r.i=i;
            for(var o=0;o<r.length;o++){
                var a = r[o].s; 
                var b = r[o].s+r[o].m[1]; 

                var absoluteDifference    = (b-a)/60;
                
                r[o].l=absoluteDifference*220/60;
                if(r[o].l<60)
                    r[o].size=9;
                else
                    r[o].size=13;
                r[o].x=o;   
                r[o].y=i;   
            }
            $scope.scheduled.push(r);
            $scope.scheduled.sort(compare);
            
        });
    };
    
    function compare(a,b) {
      if (a.i < b.i)
         return -1;
      if (a.i > b.i)
        return 1;
      return 0;
    }

    
});



var main = {

    init: function ()
    {
        /*
         * Components
         */

        components.epg();
        components.days();
    }
};

/* ==========================================================================
   Components
   ========================================================================== */

var components = {

    /* EPG
       ========================================================================== */

    epg: function ()
    {
        var component_epg = $('[data-component="epg"]');

        if (component_epg.length > 0)
        {
            /*
             * Initialize
             */

            var epg_start = component_epg.data('start');
            var epg_grid = $('.epg-grid', component_epg);
            var epg_grid_scroll = 0;

            if (typeof epg_start !== 'undefined' && epg_start !== '')
            {
                // Scroll the grid to the specified starting point
                scrollEPG(epg_start - 120);
            }

            /**
             * Controls
             */

            var action_prev = $('[data-action="prev"]', component_epg);
            var action_prev_icon = $('.icon', action_prev);
            var action_next = $('[data-action="next"]', component_epg);
            var action_next_icon = $('.icon', action_next);

            /* Previous */
            action_prev.on('click', function (e)
            {
                e.preventDefault();

                scrollEPG(-Math.abs(240));
            });

            /* Next */
            action_next.on('click', function (e)
            {
                e.preventDefault();

                scrollEPG(240);
            });

            var scroll_top = 0;
            var grid_height = epg_grid.height();

            $(window).on('scroll', function ()
            {
                scroll_top = $(window).scrollTop();

                //console.log(scroll_top);

                if (scroll_top >= grid_height)
                {
                    action_prev_icon.css('position', 'relative');
                    action_next_icon.css('position', 'relative');
                }
                else
                {
                    action_prev_icon.css('position', 'fixed');
                    action_next_icon.css('position', 'fixed');
                }
            });
        }

        /**
         * Scroll the EPG grid the specified distance
         */

        function scrollEPG(distance)
        {
            epg_grid_scroll = epg_grid.scrollLeft();

            epg_grid.stop(true, true).animate({
                scrollLeft: epg_grid_scroll + distance
            }, 500);
        }
    },

    /* Days
       ========================================================================== */

    days: function ()
    {
        var component_days = $('[data-component="days"]');

        if (component_days.length > 0)
        {
            var toggle = $('[data-action="toggle"]', component_days);
            var toggle_icon = $('.icon', toggle);
            var icon_down = 'fa-angle-down';
            var icon_up = 'fa-angle-up';

            toggle.on('click', function (e)
            {
                e.preventDefault();

                // Toggle the display of all other items
                $('li[class!="today"]', component_days).toggle();

                // Toggle the class
                if (toggle_icon.hasClass(icon_down))
                {
                    toggle_icon.removeClass(icon_down);
                    toggle_icon.addClass(icon_up);
                }
                else
                {
                    toggle_icon.removeClass(icon_up);
                    toggle_icon.addClass(icon_down);
                }
            });
        }
    }
};