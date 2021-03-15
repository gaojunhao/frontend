var that
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
            // 获取设备高度
            appHeight: '',
    houses: [],
    all_houses: [],
    down: 0,
    up: 99999,
    keyword: '',
    showRent: 0,
    itemcnt: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    console.log("##onLoad")
    console.log(options.collect)
    that.getDatacond(options.collect)
    var now_time = new Date()     
    console.log(now_time.toLocaleDateString() + " " + now_time.getUTCHours() + ":" + now_time.getUTCMinutes() + ":" + now_time.getUTCSeconds())
  },

  onShow: function () {

  },

  getDatacond: function (e) {
    that.setData({
      houses: [],
    })
    wx.showLoading({
      title: '加载中',
    })
    console.log("##getDatacond")
   console.log(e)
    var url = app.globalData.url + "gethousebyid?id=" + e
    console.log(url)
    wx.request({
      url: url,
      success(res) {
        var arr = res.data
        console.log(arr)
        for (var i = 0; i < arr.length; i++) {
          //arr[i].rent = arr[i].rent.toFixed(2)
          var simg = arr[i]['img']
          var endimg = arr[i]['img'].length
          arr[i]['img'] = simg.substring(0, endimg).split(',')
        }
    
        that.setData({
          houses: arr,
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
})