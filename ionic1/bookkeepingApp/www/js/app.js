// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic',
    'app.charge',
    'app.report',
    'app.menu',
    'ionic-datepicker',
    'pod.services',
    'highcharts-ng',
    'ngCordova'
  ])
  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

        // Don't remove this line unless you know what you are doing. It stops the viewport
        // from snapping when text inputs are focused. Ionic handles this internally for
        // a much nicer keyboard experience.
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        //StatusBar.styleBlackTranslucent 状态栏黑色半透明，电池时间都是白色的，适合深色背景；
        StatusBar.styleDefault();
      }
    });
  })
  .config(function ($stateProvider, $urlRouterProvider, ionicDatePickerProvider) {
    $stateProvider
      .state('app', {
        url: '/app',
        templateUrl: 'views/menu/menu.html',
        controller: 'menuCtrl'
      })
      .state('app.charge', {
        url: '/charge',
        cache: false,
        views: {
          menuContent: {
            templateUrl: 'views/charge/charge.html',
            controller: 'chargeCtrl'
          }
        }
      })
      .state('app.report', {
        url: '/report',
        cache: false,
        views: {
          menuContent: {
            templateUrl: 'views/report/report.html',
            controller: 'reportCtrl'
          }
        }
      })
    $urlRouterProvider.otherwise('/app/charge');
    var datePickerObj = {
      inputDate: new Date(),
      from: new Date(2015, 1, 1),
      to: new Date(),
      setLabel: '确定',
      todayLabel: '今天',
      closeLabel: '关闭',
      mondayFirst: true,
      weeksList: ["日", "一", "二", "三", "四", "五", "六"],
      monthsList: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
      showTodayButton: true,
      dateFormat: 'yyyy-MM-dd',
      disabledDates: [],
      disableWeekdays: [],
      templateType: 'popup',
      closeOnSelect: false
    };
    ionicDatePickerProvider.configDatePicker(datePickerObj);
  })
