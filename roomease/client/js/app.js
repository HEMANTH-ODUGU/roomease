// Angular initialization
angular.module('roomEase', [
  'ui.router',
  'ui.bootstrap',
  'ngAnimate',
])

.config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/signin')

  // create states for each of our views
  var appViews = ['taskSetup', 'createDwelling', 'signin', 'roomieSearch', 'inviteRoomies'];
  appViews.forEach(function(stateName) {
    $stateProvider.state(stateName, {
      url: '/' + stateName.toLowerCase(),
      templateUrl: '/js/controllers/' + stateName + '/' + stateName + '.html',
      controller: stateName + 'Ctrl'
    });
  });
  
  // handle dashboard separately since it has nested views
  $stateProvider
  .state('dashboard', {
    url: '/dashboard',
    abstract: true,
    templateUrl: '/js/controllers/dashboard/dashboard.html',
    controller: 'dashboardCtrl'
  })
  .state('dashboard.yourTasks', {
    url: '', // this is empty so that this state loads by default in the dashboard state
    templateUrl: '/js/controllers/dashboard/yourTasks.html',
    controller: 'yourTasksCtrl'
  })
  .state('dashboard.taskHistory', {
    // url: none, because this is a child/nested state
    templateUrl: '/js/controllers/dashboard/taskHistory.html',
    controller: 'tasksHistoryCtrl'
  })
})
