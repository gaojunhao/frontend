// miniprogram/pages/me/me.js
var app = getApp();
//var that
Page({
  /**
   * 页面的初始数据
   */
  data: {
    rent: 0,
    zulintype: '',
    quyu: '',
    ditie: '',
    xiaoqu: '',
    louceng: 0,
    fangjiantype: '',
    dianti: '', 
    fangjiandaxiao: 0,
    sex: '',
    fukuantype: '',
    contact: '',
    img: [],
    img_count: 0,
    new_request: false,
    new_preview: false,
    avaupdate: false,
    login: app.globalData.login
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    if (!app.globalData.login) {
      return
    }
    that.setData({
      name: app.globalData.name,
      login: app.globalData.login,
      avaurl: app.globalData.icon,
    })
  },

  onShow: function (options) {
    if (!app.globalData.login) {
      return
    }
    if (this.data.avaupdate) {
      this.setData({
        avaurl: app.globalData.icon,
        avaupdate: false
      })
    }
    this.setData({
      phone: getApp().globalData.phone,
      name: getApp().globalData.name,
    })
  },

  OnPostHouseClick: function (e) {
    if (!app.globalData.login) {
      wx.navigateTo({
        url: '../authorize/authorize',
      })
      return
    }
    wx.request({
      url: app.globalData.url + "gethousenum?phone=" + app.globalData.phone,
      success(res) {
        if (parseInt(res.data.housenum) == 0){
          wx.navigateTo({
            url: '../post_house/post_house',
          })
        } else {
          wx.showToast({
            title: '仅可发布一套房源，如需修改前往<修改房源>',
            icon: 'none'
          })
          return
        }
      }
    })
  },

  clickUser: function (e) {
    if (!app.globalData.login) {
      wx.navigateTo({
        url: '../authorize/authorize',
      })
      return
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (event) {
    console.log(event);
  },

  oncolllistClick: function (event) {
    var that = this
    if (!app.globalData.login) {
      wx.navigateTo({
        url: '../authorize/authorize',
      })
      return
    }
    wx.request({
      url: app.globalData.url + "getcollect?phone=" + app.globalData.phone,
      success(res) {
        if (res.data.collect == "") {
          wx.showToast({
            title: '未收藏过房源，请先收藏！',
            icon: 'none'
          })
          return
        }
        wx.navigateTo({
          url: "../collectlist/collectlist?collect=" + res.data.collect,
        })
      },
      fail(res) {
        setTimeout(function (e) {
          wx.navigateBack({})
        }, 2000)
        wx.showToast({
          title: '该页面不存在',
          icon: 'none'
        })
        return
      }
    })
  },

  onItemClick: function (event) {
    var that = this
    if (!app.globalData.login) {
      wx.navigateTo({
        url: '../authorize/authorize',
      })
      return
    }
    wx.request({
      url: app.globalData.url + "getonehousebyphone?phone=" + app.globalData.phone,
      success(res) {
        if (res.data.id == -1) {
          wx.showToast({
            title: '未发布过房屋，请先发布！',
            icon: 'none'
          })
          return
        }
        wx.navigateTo({
          url: "../modhomeDetail/modhomeDetail?id=" + res.data.id,
        })
      },
      fail(res) {
        setTimeout(function (e) {
          wx.navigateBack({})
        }, 2000)
        wx.showToast({
          title: '该页面不存在',
          icon: 'none'
        })
        return
      }
    })
  },

  outClick: function () {
    var that = this
    if (!app.globalData.login) {
      wx.navigateTo({
        url: '../authorize/authorize',
      })
      return
    }
    wx.showLoading({
      title: '处理中',
    })
    app.globalData.login = false
    app.globalData.phone = ''
    app.globalData.ident = ''
    wx.clearStorage({})
    setTimeout(
      function () {
        wx.hideLoading({})
        that.setData({
          login: false
        })
      },
      500
    )
    this.onShow()
  }
})