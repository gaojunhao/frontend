// miniprogram/pages/me/me.js
var app = getApp();
//var that
Page({

  actioncnt: function () {
    wx.showActionSheet({
      itemList: ['群聊', '好友', '朋友圈'],
      success: function (res) {
        console.log(res.tapIndex)
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
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
    console.log(app.globalData.name)
    that.setData({
      name: app.globalData.name,
      login: app.globalData.login,
      avaurl: app.globalData.icon,
    })
  },

  onShow: function (options) {
    var that = this
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
      ident: getApp().globalData.ident,

    })
    var cnt = 0
    if (app.globalData.ident == 'host') {
      wx.request({
        url: "你的服务器链接",
        success(res) {
          console.log(res.data)
          cnt = res.data
          if (cnt > 0) {
            wx.showTabBarRedDot({
              index: 2,
            })
            that.setData({
              new_request: true
            })
          } else {
            wx.hideTabBarRedDot({
              index: 2,
            })
            that.setData({
              new_request: false
            })
          }
        }
      })
    } else {
      wx.request({
        url: "你的服务器链接",
        success(res) {
          if (res.data == 1) {
            wx.showTabBarRedDot({
              index: 2,
            })
            that.setData({
              new_preview: true
            })
          } else {
            wx.hideTabBarRedDot({
              index: 2,
            })
            that.setData({
              new_preview: false
            })
          }
        }
      })
    }
  },

  OnPostHouseClick: function (e) {
    wx.navigateTo({
      url: '../post_house/post_house',
    })
  },
  /**
   * 收藏列表
   */
  onReqClick: function (event) {
    if (!app.globalData.login) {
      wx.showToast({
        title: '您尚未登录！',
        icon: 'none'
      })
      return
    }
    wx.navigateTo({
      url: '../request/request',
    })
  },

  onPrevClick: function (event) {
    if (!app.globalData.login) {
      wx.showToast({
        title: '您尚未登录！',
        icon: 'none'
      })
      return
    }
    wx.navigateTo({
      url: '../preview/preview',
    })
  },

  onOnRentClick: function (e) {
    if (!app.globalData.login) {
      wx.showToast({
        title: '您尚未登录！',
        icon: 'none'
      })
      return
    }
    wx.navigateTo({
      url: '../rentout/rentout',
    })
  },

  onHistoryClick: function (e) {
    if (!app.globalData.login) {
      wx.showToast({
        title: '您尚未登录！',
        icon: 'none'
      })
      return
    }
    wx.navigateTo({
      url: '../history/history',
    })
  },


  clickUser: function (e) {
    if (!app.globalData.login) {
      wx.navigateTo({
        url: '../authorize/authorize',
      })
      return
    }
  /*
    wx.navigateTo({
      url: '../../pages/user_info/user?icon=' + app.globalData.icon,
    })*/
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (event) {
    console.log(event);
  },

  OnEditClick: function (e) {
    var that = this
    if (!app.globalData.login) {
      wx.showToast({
        title: '您尚未登录！',
        icon: 'none'
      })
      return
    }
    wx.request({
      url: "http://www.semmy.fun/springmvc/getonehousebyphone?phone=" + app.globalData.phone,
      success(res) {
        /*
        that.setData({
          rent: res.data.rent,
          zulintype: res.data.zulintype,
          quyu: res.data.quyu,
          ditie: res.data.ditie,
          xiaoqu: res.data.xiaoqu,
          louceng: res.data.louceng,
          fangjiantype: res.data.fangjiantype,
          dianti: res.data.dianti,
          fangjiandaxiao: res.data.fangjiandaxiao,
          sex: res.data.sex,
          fukuantype: res.data.fukuantype,
          contact: res.data.contact,
          img: res.data.img,
          img_count: res.data.img_count,
        })*/
        wx.navigateTo({
          url: '../update_house/update_house?rent=' + res.data.rent + '&zulintype=' + res.data.zulintype + '&quyu=' + res.data.quyu + '&ditie=' + res.data.ditie + '&xiaoqu=' + res.data.xiaoqu + '&louceng=' + res.data.louceng + '&fangjiantype=' + res.data.fangjiantype + '&dianti=' + res.data.dianti + '&fangjiandaxiao=' + res.data.fangjiandaxiao + '&sex=' + res.data.sex + '&fukuantype=' + res.data.fukuantype + '&contact=' + res.data.contact + '&img=' + res.data.img + '&img_count=' + res.data.img_count,
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
      wx.showToast({
        title: '您尚未登录！',
        icon: 'none'
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