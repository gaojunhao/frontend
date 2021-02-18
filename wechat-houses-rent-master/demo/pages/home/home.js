var that
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
            // 获取设备高度
            condquyu: '',
            condditie: '',
            condweizhi: '不限',
            condprice: '不限',
            condroomtype: '不限',
            condzulintype: '不限',
            appHeight: '',

            // 筛选导航栏数据
            msgList: [
                { key: 1, name: '位置'},
                { key: 2, name: '价格'},
                { key: 3, name: '房型'},
                { key: 4, name: '租赁方式'}
            ],
            // 判断导航栏列表是否显示
            meunShow: [
                { isShows: true },
                { isShows: true },
                { isShows: true },
                { isShows: true }
            ],
    
            // 区域数据
            // 西安市区
            areaLise: [
                { id: 0, name: '不限' },
                { id: 1, name: '地铁' },
                { id: 2, name: '区域' }
            ],
            // 市区街道
            row_ditie: [{id: 1, name: '1号线'}, {id: 2, name: '2号线'}, {id: 3, name: '3号线'}, {id: 4, name: '4号线'}, {id: 5, name: '5号线'}, {id: 6, name: '6号线'}, {id: 7, name: '7号线'}, {id: 8, name: '8号线'}, {id: 9, name: '9号线'}, {id: 10, name: '10号线'}, {id: 11, name: '11号线'}, {id: 12, name: '12号线'}, {id: 13, name: '13号线'}, {id: 14, name: '14号线'}, {id: 15, name: '15号线'}, {id: 16, name: '16号线'}, {id: 17, name: '17号线'}, {id: 18, name: '浦江线'}],
            row_quyu: [{id: 1, name: '黄浦'}, {id: 2, name: '静安'}, {id: 3, name: '长宁'}, {id: 4, name: '普陀'}, {id: 5, name: '徐汇'}, {id: 6, name: '浦东'}, {id: 7, name: '杨浦'}, {id: 8, name: '虹口'}, {id: 9, name: '宝山'}, {id: 10, name: '闵行'}, {id: 11, name: '松江'}, {id: 12, name: '嘉定'}, {id: 13, name: '青浦'}, {id: 14, name: '奉贤'}, {id: 15, name: '崇明'}, {id: 16, name: '金山'}],
    
            // 区域模块市区街道隐藏/显示
            rowShow: [
                { isShows: true },
                { isShows: true },
                { isShows: true },
            ],
    
            // 区域右侧是否显示
            rigShow: true,
    
            // 售价
            price: [
                { id: 1, name: '不限' },
                { id: 2, name: '1千以下' },
                { id: 3, name: '1 - 2千' },
                { id: 4, name: '2 - 3千' },
                { id: 5, name: '3 - 4千' },
                { id: 6, name: '4 - 5千' },
                { id: 7, name: '5 - 6千' },
                { id: 8, name: '6 - 7千' },
                { id: 9, name: '7千以上' },
            ],
    
            // 房间型号
            roomModel: [
                { id: 1, name: '不限' },
                { id: 2, name: '一室' },
                { id: 3, name: '二室' },
                { id: 4, name: '三室' },
                { id: 5, name: '四室' },
                { id: 6, name: '五室以上' }
            ],
            rentType: [
              { id: 1, name: '不限' },
              { id: 2, name: '整租' },
              { id: 3, name: '合租' }
          ],
    houses: [],
    all_houses: [],
    down: 0,
    up: 99999,
    keyword: '',
    showRent: 0,
    itemcnt: 0,
    ident: 'host',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    that.getDatacond()
    var now_time = new Date()     
    console.log(now_time.toLocaleDateString() + " " + now_time.getUTCHours() + ":" + now_time.getUTCMinutes() + ":" + now_time.getUTCSeconds())
  },

  onShow: function () {
    this.setData({
      ident: app.globalData.ident
    })
  },
  

  /*
   * 获取初始列表数据
   */
  getData: function () {
    this.data.itemcnt = 0
    that.setData({
      houses: [],
    })
    wx.showLoading({
      title: '加载中',
    })

    var url = "http://www.semmy.fun/springmvc/getAllhouses?itemcnt=" + this.data.itemcnt
    wx.request({
      url: url,
      success(res) {
        console.log(res.data)
        var arr = res.data
		
        for (var i = 0; i < arr.length; i++) {
          var simg = arr[i]['img']
          var endimg = arr[i]['img'].length
          arr[i]['img'] = simg.substring(0, endimg).split(',')
        }
		
        that.setData({
          houses: arr,
          //houses: [{"status":"待租", "ads":"semmy小屋","maxg":"3","type":["带厨房","带卫生间"], "rent":"2000"}],
          //itemcnt: arr.length
          itemcnt: 0
        })
        wx.stopPullDownRefresh();
        wx.hideLoading({})
      }
    })
  },

  getDatacond: function () {
    var quyu = this.data.condquyu;
    var ditie = this.data.condditie;
    var weizhi = this.data.condweizhi;
    var price = this.data.condprice;
    var roomtype = this.data.condroomtype;
    var zulintype = this.data.condzulintype;

    var data_quyu = ''
    var data_ditie = ''
    var data_weizhi = ''
    var data_price = ''
    var data_roomtype = ''
    var data_zulintype = ''
    if (weizhi == '不限'){
      data_quyu = ''
      data_ditie = ''
      data_weizhi = ''
    }
    if (quyu != ''){
      data_quyu = '&quyu=' + quyu
      data_ditie = ''
      data_weizhi = ''
    }
    if (ditie != ''){
      data_quyu = ''
      data_ditie = '&ditie=' + ditie
      data_weizhi = ''
    }
    if (price != '不限'){
      if (price == '1千以下'){
        data_price = '&rent=1'
      } else if (price == '1 - 2千'){
        data_price = '&rent=2'
      } else if (price == '2 - 3千'){
        data_price = '&rent=3'
      } else if (price == '3 - 4千'){
        data_price = '&rent=4'
      } else if (price == '4 - 5千'){
        data_price = '&rent=5'
      } else if (price == '5 - 6千'){
        data_price = '&rent=6'
      } else if (price == '6 - 7千'){
        data_price = '&rent=7'
      } else if (price == '7千以上'){
        data_price = '&rent=8'
      }
    }
    if (roomtype != '不限'){
        data_roomtype = '&fangjiantype=' + roomtype
    }
    if (zulintype != '不限'){
      data_zulintype = '&zulintype=' + zulintype
    }
    this.data.itemcnt = 0
    that.setData({
      houses: [],
    })
    wx.showLoading({
      title: '加载中',
    })
  
    var url = "http://www.semmy.fun/springmvc/getAllhouses?itemcnt=" + this.data.itemcnt + data_weizhi + data_ditie + data_quyu + data_price + data_roomtype + data_zulintype
    console.log(url)
    wx.request({
      url: url,
      success(res) {
        console.log(res.data)
        var arr = res.data
        for (var i = 0; i < arr.length; i++) {
          //arr[i].rent = arr[i].rent.toFixed(2)
          var simg = arr[i]['img']
          var endimg = arr[i]['img'].length
          arr[i]['img'] = simg.substring(0, endimg).split(',')
        }
    
        that.setData({
          houses: arr,
          //houses: [{"status":"待租", "ads":"semmy小屋","maxg":"3","type":["带厨房","带卫生间"], "rent":"2000"}],
          //itemcnt: arr.length
          itemcnt: 0
        })
        wx.stopPullDownRefresh();
        wx.hideLoading({})
      }
    })
  },
  /**
   * item 点击
   */
  onItemClick: function (event) {
    if(!this.data.meunShow[0].isShows || !this.data.meunShow[1].isShows || !this.data.meunShow[2].isShows || !this.data.meunShow[3].isShows) {
      // 循环data中设置的meunShow
      for (var n = 0; n < this.data.meunShow.length; n++){
        // 拼接 ，使我们可以获取到menuShow里面每一个isSHows
        var menuSrcs = "meunShow[" + n + "].isShows";
            // 初始化，每次点击时先全部隐藏，但是重复点击不会隐藏
            this.setData({
                [menuSrcs]: true
            });
    };
    } else {
    var id = event.currentTarget.dataset.id;
    console.log(id);
    wx.navigateTo({
      url: "../homeDetail/homeDetail?id=" + id
    })
  }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading(); //在标题栏中显示加载
    that.getDatacond();
    wx.hideNavigationBarLoading();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var temp = that.data.houses;
    this.data.itemcnt = this.data.itemcnt + 5
    var quyu = this.data.condquyu;
    var ditie = this.data.condditie;
    var weizhi = this.data.condweizhi;
    var price = this.data.condprice;
    var roomtype = this.data.condroomtype;
    var zulintype = this.data.condzulintype;

    var data_quyu = ''
    var data_ditie = ''
    var data_weizhi = ''
    var data_price = ''
    var data_roomtype = ''
    var data_zulintype = ''
    if (weizhi == '不限'){
      data_quyu = ''
      data_ditie = ''
      data_weizhi = ''
    }
    if (quyu != ''){
      data_quyu = '&quyu=' + quyu
      data_ditie = ''
      data_weizhi = ''
    }
    if (ditie != ''){
      data_quyu = ''
      data_ditie = '&ditie=' + ditie
      data_weizhi = ''
    }
    if (price != '不限'){
      if (price == '1千以下'){
        data_price = '&rent=1'
      } else if (price == '1 - 2千'){
        data_price = '&rent=2'
      } else if (price == '2 - 3千'){
        data_price = '&rent=3'
      } else if (price == '3 - 4千'){
        data_price = '&rent=4'
      } else if (price == '4 - 5千'){
        data_price = '&rent=5'
      } else if (price == '5 - 6千'){
        data_price = '&rent=6'
      } else if (price == '6 - 7千'){
        data_price = '&rent=7'
      } else if (price == '7千以上'){
        data_price = '&rent=8'
      }
    }
    if (roomtype != '不限'){
        data_roomtype = '&fangjiantype=' + roomtype
    }
    if (zulintype != '不限'){
      data_zulintype = '&zulintype=' + zulintype
    }
    wx.showLoading({
      title: '加载中',
    })
  
    var url = "http://www.semmy.fun/springmvc/getAllhouses?itemcnt=" + this.data.itemcnt + data_weizhi + data_ditie + data_quyu + data_price + data_roomtype + data_zulintype
    console.log(url)
    wx.request({
      url: url,
      success(res) {
        var arr = res.data
        console.log(arr)
        if (arr.length == 0) { // 没有新数据
          wx.showToast({
            title: '没有更多数据了',
          })
        } else {
        for (var i = 0; i < arr.length; i++) {
          //arr[i].rent = arr[i].rent.toFixed(2)
          var simg = arr[i]['img']
          var endimg = arr[i]['img'].length
          arr[i]['img'] = simg.substring(0, endimg).split(',')
        }
        var hs = temp.concat(arr) // 将获取的新数据拼接到原列表上
        that.setData({
          houses: hs,
          //houses: [{"status":"待租", "ads":"semmy小屋","maxg":"3","type":["带厨房","带卫生间"], "rent":"2000"}],
          //itemcnt: arr.length
          itemcnt: that.data.itemcnt
        })
        wx.hideLoading({})
      }
      }
    })
  },

  onReachBottombak: function () {
    var temp = that.data.houses;
    // 获取后面二十条
    this.data.itemcnt = this.data.itemcnt + 5
    console.log(this.data.itemcnt)
    wx.showLoading({
      title: '加载中',
    })
    var url = "http://www.semmy.fun/springmvc/getAllhouses?itemcnt=" + this.data.itemcnt
    wx.request({
      url: url,
      success(res) {
        if (res.data.length == 0) { // 没有新数据
          wx.showToast({
            title: '没有更多数据了',
          })
        } else {
          var arr = res.data
          for (var i = 0; i < arr.length; i++) { // 对数据处理
            if (arr[i].ads.length > 30) {
              arr[i].ads = arr[i].ads.substring(0, 28) + " …"
            }

            var s = arr[i]['type']

            var end = arr[i]['type'].length
            if (arr[i]['type'].length > 12) {
              end = 13
              for (var j = end; j >= 0; j--)
                if (s[j] == '，') {
                  end = j;
                  break;
                }
            }
            arr[i]['type'] = s.substring(0, end).split('，')
            //arr[i].rent = arr[i].rent.toFixed(2)
          var simg = arr[i]['img']
          var endimg = arr[i]['img'].length
          arr[i]['img'] = simg.substring(0, endimg).split(',')
          }
          var hs = temp.concat(arr) // 将获取的新数据拼接到原列表上
          that.setData({ // 更新渲染页面
            houses: hs,
            itemcnt: that.data.itemcnt
          })
          wx.hideLoading({})
        }
      }
    })
  },

  OnSearchInput: function (e) {
    var s = e.detail.value
    s.replace('%', '')
    s.replace('_', '') // 删除sql的通配符
    that.setData({
      keyword: s
    })
  },

  OnUpInput: function (e) {
    that.setData({
      up: e.detail.value
    })
  },

  OnDownInput: function (e) {
    that.setData({
      down: e.detail.value
    })
  },

  OnSearchClick: function (e) {
    console.log("OnSearchClick")
    wx.navigateTo({
      url: "../search/search"
    })
  },

  OnAddressClick: function (e) {
    console.log("OnAddressClick")
    wx.navigateTo({
      url: "../address/address"
    })
  },

  OnCheckChange: function (e) {
    var t = this.data.showRent
    this.setData({
      showRent: 1 - t
    })
  },
  

  OnPostHouseClick: function (e) {
    wx.navigateTo({
      url: '../post_house/post_house',
    })
  },
    // 筛选导航栏事件
    menuClick: function(e){
      // 获取通过wxml  data-hi="{{ idx }}" 传过来的索引
      var menuNum = e.currentTarget.dataset.hi;

      // 拼接 ，使我们可以获取到menuShow里面每一个isSHows
      var menuSrc = "meunShow[" + menuNum + "].isShows";

      // 循环data中设置的meunShow
      for (var n = 0; n < this.data.meunShow.length; n++){
          // 拼接 ，使我们可以获取到menuShow里面每一个isSHows
          var menuSrcs = "meunShow[" + n + "].isShows";
          // 解决重复点击不能隐藏的问题
          if (n != menuNum){
              // 初始化，每次点击时先全部隐藏，但是重复点击不会隐藏
              this.setData({
                  [menuSrcs]: true
              });
          };
      };

      // 给当前点击的去反data中设置的meunShow，使之显示， 只写此处只会显示不能隐藏
      this.setData({
          [menuSrc]: !this.data.meunShow[e.currentTarget.dataset.hi].isShows
      });
  },

  // 区域列表事件
  rowClick: function(e){
      // 限制第一个 '不限' 不能点击
      if (e.currentTarget.dataset.hi == 0){
        this.data.condweizhi = '不限'
        this.data.condquyu = ''
        this.data.condditie = ''
        this.getDatacond();
        for (let i = 0; i < this.data.areaLise.length; i++) {
          if (this.data.areaLise[i].id == 0) {
            //当前点击的位置为true即选中
            this.data.areaLise[i].checked = true;
          }
          else {
            this.data.areaLise[i].checked = false;
          }
        }
      var menuSrc = "meunShow[0].isShows";
        this.setData({
          areaLise: this.data.areaLise,
          [menuSrc]: true
      });
      for (let i = 0; i < this.data.row_ditie.length; i++) {
        this.data.row_ditie[i].checked = false;
    }
    this.setData({
      row_ditie: this.data.row_ditie
    });
    for (let i = 0; i < this.data.row_quyu.length; i++) {
      this.data.row_quyu[i].checked = false;
  }
  this.setData({
    row_quyu: this.data.row_quyu
  });
    };
      if (e.currentTarget.dataset.hi != 0){
        for (let i = 0; i < this.data.areaLise.length; i++) {
          if (this.data.areaLise[i].id == e.currentTarget.dataset.hi) {
            //当前点击的位置为true即选中
            this.data.areaLise[i].checked = true;
          }
          else {
            this.data.areaLise[i].checked = false;
          }
        }
        this.setData({
          areaLise: this.data.areaLise
        });
          // 获取wxml  data-hi="{{ index }}" 传过来的索引
          var rowNum = e.currentTarget.dataset.hi;
          // 同筛选导航栏事件，因第一个为不限不可点击， 所以减一
          var rowSrc = "rowShow[" + ( rowNum - 1 ) + "].isShows";
          // 隐藏所有的三级菜单
          for (var m = 0; m < this.data.rowShow.length; m++){
              var rowSrcs = "rowShow[" + m + "].isShows";
              this.setData({
                  [rowSrcs]: true
              });
          };
          // 同上
          this.setData({
              rigShow: false,
              [rowSrc]: !this.data.rowShow[e.currentTarget.dataset.hi].isShows
          });
      };
  },
ditieClick: function(e){
        var rowNum = e.currentTarget.dataset.hi;
        this.data.condweizhi = ''
        this.data.condquyu = ''
        this.data.condditie = this.data.row_ditie[rowNum-1].name
        this.getDatacond();
        for (let i = 0; i < this.data.row_ditie.length; i++) {
          if (this.data.row_ditie[i].id == rowNum) {
            //当前点击的位置为true即选中
            this.data.row_ditie[i].checked = true;
          }
          else {
            this.data.row_ditie[i].checked = false;
          }
        }
        this.setData({
          row_ditie: this.data.row_ditie,
        })
        for (let i = 0; i < this.data.row_quyu.length; i++) {
            this.data.row_quyu[i].checked = false;
        }
        this.setData({
          row_quyu: this.data.row_quyu
        });
        var menuSrc = "meunShow[0].isShows";
        this.setData({
          [menuSrc]: true
      });
},
quyuClick: function(e){
        var rowNum = e.currentTarget.dataset.hi;
        this.data.condweizhi = ''
        this.data.condquyu = this.data.row_quyu[rowNum-1].name
        this.data.condditie = ''
        this.getDatacond();
        for (let i = 0; i < this.data.row_quyu.length; i++) {
          if (this.data.row_quyu[i].id == rowNum) {
            //当前点击的位置为true即选中
            this.data.row_quyu[i].checked = true;
          }
          else {
            this.data.row_quyu[i].checked = false;
          }
        }
        this.setData({
          row_quyu: this.data.row_quyu,
        })
        for (let i = 0; i < this.data.row_ditie.length; i++) {
          this.data.row_ditie[i].checked = false;
      }
      this.setData({
        row_ditie: this.data.row_ditie
      });
        var menuSrc = "meunShow[0].isShows";
        this.setData({
          [menuSrc]: true
      });
},
priceClick: function(e){
  var rowNum = e.currentTarget.dataset.hi;
  this.data.condprice = this.data.price[rowNum-1].name;
  this.getDatacond();
  for (let i = 0; i < this.data.price.length; i++) {
    if (this.data.price[i].id == rowNum) {
      //当前点击的位置为true即选中
      this.data.price[i].checked = true;
    }
    else {
      this.data.price[i].checked = false;
    }
  }
  this.setData({
    price: this.data.price,
  })
  var menuSrc = "meunShow[1].isShows";
  this.setData({
    [menuSrc]: true
});
},
roomModelClick: function(e){
  var rowNum = e.currentTarget.dataset.hi;
  this.data.condroomtype = this.data.roomModel[rowNum-1].name;
  this.getDatacond();
  for (let i = 0; i < this.data.roomModel.length; i++) {
    if (this.data.roomModel[i].id == rowNum) {
      //当前点击的位置为true即选中
      this.data.roomModel[i].checked = true;
    }
    else {
      this.data.roomModel[i].checked = false;
    }
  }
  this.setData({
    roomModel: this.data.roomModel,
  })
  var menuSrc = "meunShow[2].isShows";
  this.setData({
    [menuSrc]: true
});
},
rentTypeClick: function(e){
  var rowNum = e.currentTarget.dataset.hi;
  this.data.condzulintype = this.data.rentType[rowNum-1].name;
  this.getDatacond();
  for (let i = 0; i < this.data.rentType.length; i++) {
    if (this.data.rentType[i].id == rowNum) {
      //当前点击的位置为true即选中
      this.data.rentType[i].checked = true;
    }
    else {
      this.data.rentType[i].checked = false;
    }
  }
  this.setData({
    rentType: this.data.rentType,
  })
  var menuSrc = "meunShow[3].isShows";
  this.setData({
    [menuSrc]: true
});
},
})