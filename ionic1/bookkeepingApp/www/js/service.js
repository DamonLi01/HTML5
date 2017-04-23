angular.module('pod.services', [])
  .factory('Classif', function () { //类型数据工厂
    var classif = [
      ["餐饮伙食", "出行交通", "休闲娱乐", "话费网费",
        "生活日用", "服装饰品", "电器家私", "教育培训",
        "育儿养老", "医疗保健", "红包礼金",
        "房租按揭", "善款彩票", "保险投资", "其他支出"
      ],
      ["工资收入", "投资收入", "礼金收入", "其他收入"]
    ];
    return {
      all: function () {
        return classif;
      }
    }
  })
  .filter("collect", function () { //金额过滤器
    return function (data) {
      var total = 0;
      for (var i = 0; i < data.length; i++) {
        // console.log(data[i][1]);
        total += data[i][1];
      }
      return total;
    };
  })
  .filter('cuteZero', function () { //选取非零值
    return function (inData) {
      var arr = [];
      for (var i = 0; i < inData.length; i++) {
        if (inData[i][1] != 0) {
          arr.push(inData[i]);
        }
      }
      arr.sort(function (a, b) {
        return b[1] - a[1];
      })
      return arr;
    }
  })
  .factory('Records', function () { //数据工厂
    var data = [];
    var classif = [
      ["餐饮伙食", "出行交通", "休闲娱乐", "话费网费",
        "生活日用", "服装饰品", "电器家私", "教育培训",
        "育儿养老", "医疗保健", "红包礼金",
        "房租按揭", "善款彩票", "保险投资", "其他支出"
      ],
      ["工资收入", "投资收入", "礼金收入", "其他收入"]
    ];

    function total() { //统计数据数据结构
      var total = {
        pie: [{
            data: []
          },
          {
            data: []
          }
        ],
        bar: [{
            name: '支出',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ]
          },
          {
            name: '收入',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ]
          },
          {
            name: '盈余',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ]
          },
          {
            name: '平均支出',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ]
          },
          {
            name: '平均收入',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ]
          },
          {
            name: '平均盈余',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ]
          }
        ]
      }
      for (var i = 0; i < classif[0].length; i++) {
        total.pie[0].data.push([classif[0][i], 0]); //push[classif[0][i],金额]
        total.pie[1].data.push([classif[0][i], 0]);
      }
      return total;
    };

    function toData(strTimes) { //取整
      return new Date(parseInt(strTimes + '', 10));
    };

    function local() { //读取本地数据
      var Damon_Li = localStorage.Damon_Li;
      if (typeof (Damon_Li) !== 'undefined') {
        data = angular.fromJson(Damon_Li)
      }
    };

    function save() { //保存到本地
      localStorage.Damon_Li = angular.toJson(data);
    };
    return {
      get: function () { //数据
        local();
        return data;
      },
      add: function (arrData) { //添加
        local();
        data.push(arrData);
        save();
        local();//脑子炸了 这个应该是多余的
      },
      del: function (index, number) { //删除
        data.splice(index, number);
        save();
      },
      gather: function () { //report页面数据
        local();
        var arr = total();
        var nThis = (new Date()).getFullYear(); //取今年的年份
        var cs = (new Date()).getMonth(); //取当前月份
        var cy = 0,
          cc = 0;
        for (var i = 0; i < data.length; i++) {
          var curDate = toData(data[i].date); //取整
          var nYear = curDate.getFullYear(); //数据年份
          var nMonth = curDate.getMonth(); //数据月份
          var nClass = data[i].class * 1 //数据主类
          var nSubClass = data[i].subClass * 1; //数据子类
          var value = data[i].value * 1; //数据金额
          if (cy != nYear) {
            cc++;
            cy = nYear;
          }
          //饼图
          if (nClass == 0) { //支出类型数据
            arr.pie[0].data[nSubClass][1] += value;
            if (nYear == nThis) { //今年支出类型数据
              arr.pie[1].data[nSubClass][1] += value;
            }
          }
          //条形图
          arr.bar[nClass + 3].data[nMonth] += value; //历年收入或支出
          arr.bar[5].data[nMonth] += nClass ? value : -value; //历年盈余
          if (nYear == nThis) {
            arr.bar[nClass].data[nMonth] += value; //今年收入或支出
            arr.bar[2].data[nMonth] += nClass ? value : -value; //今年盈余
          }
        }
        //计算平均值
        for (var i = 3; i <= 5; i++) {
          for (j = 0; j < 12; j++) {
            var p = (j > cs) ? cc - 1 : cc;
            if (p > 0) {
              arr.bar[i].data[j] = Math.round(arr.bar[i].data[j] * 100 / cc) / 100;
            }
          }
        }
        return arr;
      }
    }
  })
