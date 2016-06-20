/* Setup Rounting For All Pages */
MetronicApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    // Redirect any unmatched url
    $urlRouterProvider.otherwise("/home");

    $stateProvider
        .state('home', {
            url: "/home",
            templateUrl: "views/home.html",
            controller: "HomeCtrl"
        })
        .state('epg', {
            url: "/epg",
            templateUrl: "views/epg.html",
            controller: "EpgCtrl"
        })
        .state('live', {
            url:'/live',
            templateUrl:"views/live.html",
            controller:"LiveCtrl"
        })
        .state('config', {
            url:'/config',
            templateUrl:"views/config.html",
            controller:"ConfigCtrl"
        })
        .state('video', {
            url:'/video',
            templateUrl:"views/video.html",
            controller:"VideoCtrl"
        })
        .state('movie', {
            url:'/movie',
            templateUrl:"views/movie.html",
            controller:"MovieCtrl"
        })


        ;





}]);
