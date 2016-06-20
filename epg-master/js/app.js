/***
Metronic AngularJS App Main Script
***/

/* Metronic App */
var MetronicApp = angular.module("MetronicApp", [
    "ui.router", 
    "ngSanitize",
    "ngResource",
    "ngAnimate",
    "ngDialog",
    "cfp.hotkeys",
    'angular-carousel-3d',
    'vjs.video',
    'pascalprecht.translate'
]); 

MetronicApp.config(['$translateProvider', function ($translateProvider) {
  $translateProvider.translations('en', {
    'Direct': 'Live',
    'Configuration': 'Configuration',
    'Demain':'Tomorrow',
    'RechercheC':'Search by channel',
    'RechercheP':'Search by program',
    'Aujourd':'Today',
    'config':'Configuration Parameter',
    'langage':'Language'  
  });
 
  $translateProvider.translations('fr', {
    'Direct': 'Direct',
    'Configuration': 'Configuration',
    'Demain':'Demain',
    'RechercheC':'Rechercher selon la chaine',
    'RechercheP':'Rechercher selon le programe',
    'Aujourd':'Aujourd hui',
    'config':'Paramètre de Configuration',
    'langage':'Langage'  
  });
 
  $translateProvider.preferredLanguage('en');
}]);

/*MetronicApp.config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    
    $httpProvider.defaults.useXDomain = true;
$httpProvider.defaults.withCredentials = true;
delete $httpProvider.defaults.headers.common["X-Requested-With"];
$httpProvider.defaults.headers.common["Accept"] = "application/json";
$httpProvider.defaults.headers.common["Content-Type"] = "application/json";
    
    }
]);*/



