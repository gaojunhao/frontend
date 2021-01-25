var that
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
            // 获取设备高度
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
                { id: 0, name: '地铁' },
                { id: 1, name: '区域' }
            ],
            // 市区街道
            rowLise: {
                row_ditie: { id: 0, name: ['1号线', '2号线', '3号线', '4号线', '5号线', '6号线', '7号线', '8号线', '9号线', '10号线', '11号线', '12号线', '13号线', '14号线', '15号线', '16号线', '17号线', '浦江线'] },
                row_quyu: { id: 1, name: ['黄浦', '静安', '长宁', '普陀', '徐汇', '浦东', '杨浦', '虹口', '宝山', '闵行', '松江', '嘉定', '青浦', '奉贤', '崇明', '金山'] }
            },
    
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
                { id: 0, name: '不限' },
                { id: 1, name: '1千以下' },
                { id: 2, name: '1 - 2千' },
                { id: 3, name: '2 - 3千' },
                { id: 4, name: '3 - 4千' },
                { id: 5, name: '4 - 5千' },
                { id: 6, name: '5 - 6千' },
                { id: 7, name: '6 - 7千' },
                { id: 8, name: '7千以上' },
            ],
    
            // 房间型号
            roomModel: [
                { id: 0, name: '不限' },
                { id: 1, name: '一室' },
                { id: 2, name: '二室' },
                { id: 3, name: '三室' },
                { id: 4, name: '四室' },
                { id: 5, name: '五室以上' }
            ],
            rentType: [
              { id: 0, name: '整租' },
              { id: 1, name: '合租' }
          ],
    houses: [],
    all_houses: [],
    down: 0,
    up: 99999,
    keyword: '',
    showRent: 0,
    itemcnt: 0,
    ident: 'host'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    that.getData()
    this.setData({
      ident: app.globalData.ident
    })
    var now_time = new Date()
    
    console.log(now_time.toLocaleDateString() + " " + now_time.getUTCHours() + ":" + now_time.getUTCMinutes() + ":" + now_time.getUTCSeconds())
	
	
    var cnt = 0
    if (app.globalData.ident == 'host') { // 查询房主是否有新的看房请求
      wx.request({
        url: "你的服务器链接",
        success(res) {
          console.log(res.data)
          cnt = res.data
          if (cnt > 0) {
            wx.showTabBarRedDot({
              index: 2,
            })
          } else {
            wx.hideTabBarRedDot({
              index: 2,
            })
          }
        }
      })

    } 
    else { // 查询租赁者是否有新的看房记录
      wx.request({
        url: "你的服务器链接",
        success(res){
          if(res.data==1) // 有
          {
            wx.showTabBarRedDot({
              index: 2,
            })
          } else { // 无
            wx.hideTabBarRedDot({
              index: 2,
            })
          }
        }
      })
    }

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
    var id = event.currentTarget.dataset.id;
    console.log(id);
    wx.navigateTo({
      url: "../homeDetail/homeDetail?id=" + id
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading(); //在标题栏中显示加载
    that.getData();
    wx.hideNavigationBarLoading();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
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
      var menuSrc = "meunShow[0].isShows";
        this.setData({
          [menuSrc]: true
      });
    };
      if (e.currentTarget.dataset.hi != 0){
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
        console.log(rowNum);
        var menuSrc = "meunShow[0].isShows";
        this.setData({
          [menuSrc]: true
      });
},
quyuClick: function(e){
        var rowNum = e.currentTarget.dataset.hi;
        console.log(rowNum);
        var menuSrc = "meunShow[0].isShows";
        this.setData({
          [menuSrc]: true
      });
},
priceClick: function(e){
  var rowNum = e.currentTarget.dataset.hi;
  console.log(rowNum);
  var menuSrc = "meunShow[1].isShows";
  this.setData({
    [menuSrc]: true
});
},
roomModelClick: function(e){
  var rowNum = e.currentTarget.dataset.hi;
  console.log(rowNum);
  var menuSrc = "meunShow[2].isShows";
  this.setData({
    [menuSrc]: true
});
},
rentTypeClick: function(e){
  var rowNum = e.currentTarget.dataset.hi;
  console.log(rowNum);
  var menuSrc = "meunShow[3].isShows";
  this.setData({
    [menuSrc]: true
});
},
})