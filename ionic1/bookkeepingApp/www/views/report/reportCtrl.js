angular.module('app.report', [])
  .controller('reportCtrl', ['$scope', '$ionicSlideBoxDelegate', 'Records', function ($scope, $ionicSlideBoxDelegate, Records) {
    $scope.nextSlide = function (index) { // 统计报表slide的点击事件
      $ionicSlideBoxDelegate.slide(index);
    }
    //console.log($scope.data)
    $scope.type = ['支出', '收入'];
    $scope.gather = Records.gather();
    $scope.refresh = function () { //下拉刷新
      //处理代码写在这里
      $scope.gather = Records.gather();
      $scope.$broadcast('scroll.refreshComplete');
    };
    $scope.chartPieConfig = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: '历年支出分析'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
            style: {
              color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
            }
          }
        }
      },
      series: [{
        name: '历年支出',
        colorByPoint: true,
        data: $scope.gather.pie[0].data
      }]
    }
    $scope.chartPieConfig_now = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: '今年支出分析'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
            style: {
              color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
            }
          }
        }
      },
      series: [{
        name: '今年支出',
        colorByPoint: true,
        data: $scope.gather.pie[1].data
      }]
    }
    $scope.barChart = {
      chart: {
        type: 'column'
      },
      title: {
        text: '每月盈余'
      },
      xAxis: {
        categories: [
          '1月',
          '2月',
          '3月',
          '4月',
          '5月',
          '6月',
          '7月',
          '8月',
          '9月',
          '10月',
          '11月',
          '12月'
        ],
        crosshair: true
      },
      yAxis: {
        // min: 0,
        title: {
          text: '金额 ¥ 元'
        }
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0
        }
      },
      series: $scope.gather.bar

    }
  }])
