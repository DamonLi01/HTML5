angular.module('app.charge', [])
  .controller('chargeCtrl', [
    '$scope', '$ionicSlideBoxDelegate', 'Classif', 'ionicDatePicker', 'Records', '$state', '$cordovaToast', '$ionicPopup',
    function ($scope, $ionicSlideBoxDelegate, Classif, ionicDatePicker, Records, $state, $cordovaToast, $ionicPopup) {
      $scope.nextSlide = function (index) { //日常记账slide的点击事件
        $ionicSlideBoxDelegate.slide(index);
      };
      $scope.Mode = true;
      $scope.more = true;
      $scope.end_ok = "END";
      $scope.type = ['支出', '收入'];
      $scope.classif = Classif.all();
      console.log($scope.classif);
      $scope.record = {
        class: 0,
        subClass: 0,
        value: '',
        date: Date.now()
      }
      $scope.getRecords = function () { //定义一个函数
        $scope.data = Records.get();
      }
      $scope.getRecords();
      var dateConfig = {
        inputDate: new Date(),
        callback: function (val) {
          if (typeof (val) !== 'undefined') {
            $scope.record.date = val + 79800000;
          }
        }
      }
      $scope.openDatePicker = function () { //日期插件调用
        ionicDatePicker.openDatePicker(dateConfig);
      }
      $scope.click = function (n) { //绑定计算器数字
        if ($scope.record.value.indexOf('.') == -1 || n != ".") {
          if ($scope.record.value.length < 9) {
            $scope.record.value += n;
          }
        }
        if ($scope.record.value > 0.01) {
          $scope.end_ok = "OK";
        }
      }
      $scope.clear = function () { //清空
        $scope.record.value = '';
        $scope.end_ok = "END"
      }
      $scope.backspace = function () { //退格
        var len = $scope.record.value.length;
        $scope.record.value = $scope.record.value.substring(0, len - 1);
        if ($scope.record.value == '') {
          $scope.end_ok = "END"
        }
      }
      $scope.add = function () { //添加
        var data = {
          id: Date.now(),
          class: $scope.record.class,
          subClass: $scope.record.subClass,
          value: $scope.record.value * 1,
          date: $scope.record.date
        }
        if ($scope.record.value != "" && $scope.record.value > 0.01) {
          Records.add(data);
          $scope.getRecords();
        }
        $scope.end_ok = "END"
        $scope.record.value = "";
        //$cordovaToast.showShortCenter('已添加'); //浏览器调试会出错 手机能实现
      }
      $scope.setClass = function (m, n) { //类型
        $scope.record.class = m;
        $scope.record.subClass = n;
      }
      $scope.end = function () { //end键跳转report页面
        $state.go('app.report', {
          dateId: $scope.record.date
        })
      }
      $scope.onHold = function (row) { //长按删除
        var confirmPopup = $ionicPopup.confirm({
          title: '确认框',
          template: '您&nbsp;确&nbsp;定&nbsp;要&nbsp;删&nbsp;除&nbsp;吗&nbsp;?',
          okText: '删除',
          okType: 'button-assertive',
          cancelText: '取消',
          cancelType: 'button-default'
        });
        confirmPopup.then(function (res) {
          if (res) {
            for (var i = 0; i < $scope.data.length; i++) {
              if ($scope.data[i].id == row.id) {
                Records.del(i, 1);
                //$cordovaToast.showShortCenter('已删除');
                $scope.getRecords();
              }
            }
          }
        });
      }
      $scope.refresh = function () { //下拉刷新
        //处理代码写在这里
        $scope.getRecords();
        $scope.$broadcast('scroll.refreshComplete');
      };
      $scope.loadMore = function () {//上拉加载
        $scope.getRecords();
        $scope.more = false;
        //$scope.$broadcast('scroll.infiniteScrollComplete');
      };
    }
  ])
