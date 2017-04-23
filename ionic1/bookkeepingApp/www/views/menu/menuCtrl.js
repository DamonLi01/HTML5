angular.module('app.menu', [])
  .controller('menuCtrl', ['$scope', 'Records', '$state', 'Classif', '$ionicPopup', '$cordovaToast', function ($scope, Records, $state, Classif, $ionicPopup, $cordovaToast) {
    $scope.rData = function () {
      $scope.data = Records.get();
      $scope.classif = Classif.all();
      console.log($scope.data.length);
      if ($scope.data.length == 0) {
        var alertPopup = $ionicPopup.alert({
          title: '随机数据添加成功'
        });
        //$cordovaToast.showShortCenter('随机数据添加成功');
        for (var i = 0; i < 20; i++) {
          $scope.class = Math.floor(Math.random() * 2);
          var class_a = $scope.classif[0].length;
          var class_b = $scope.classif[1].length;
          var fromTime = new Date(2016, 11, 20).getTime();
          var toTime = new Date().getTime();
          $scope.subClass = function () {
            var num = 0;
            if ($scope.class == 0) {
              num = Math.floor(Math.random() * class_a);
            }
            if ($scope.class == 1) {
              num = Math.floor(Math.random() * class_b);
            }
            return num;
          }
          var data = {
            id: Date.now(),
            class: $scope.class,
            subClass: $scope.subClass(),
            value: Math.floor(Math.random() * (1000 - 100) + 100),
            date: Math.ceil(Math.random() * (toTime - fromTime) + fromTime)
          }
          Records.add(data);
          $state.go('app.charge', {})
        }
      } else {
        var alertPopup = $ionicPopup.alert({
          title: '随机数据添加失败'
        });
        //$cordovaToast.showShortCenter('随机数据添加失败');
      }
    }
    $scope.cData = function () {
      $scope.data = Records.get();
      var confirmPopup = $ionicPopup.confirm({
        title: '确认框',
        template: '警告！！清空所有数据！！',
        okText: '删除',
        okType: 'button-assertive',
        cancelText: '取消',
        cancelType: 'button-default'
      });
      confirmPopup.then(function (res) {
        if (res) {
          Records.del(0, $scope.data.length);
          //$cordovaToast.showShortCenter('清空数据成功');
          $scope.data = Records.get();
        }
      });
    }
  }])
