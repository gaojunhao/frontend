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
      wx.showToast({
        title: '您尚未登录！',
        icon: 'none'
      })
      return
    }
    wx.request({
      url: "http://www.semmy.fun/springmvc/gethousenum?phone=" + app.globalData.phone,
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

  getPhoneNumber: function (e) {
    var ivObj = e.detail.iv
    var telObj = e.detail.encryptedData
    console.log('iv=', ivObj)
    console.log('encryptedData', telObj)
    //------执行Login---------
    wx.login({
     success: res => {
      console.log('code转换', res.code);
   
  　　　　　　//用code传给服务器调换session_key
  wx.request({
    url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wxdf33872822175f36&secret=8a13ec90b1fd2048188bfdbd37fe7004&js_code='+ res.code + '&grant_type=authorization_code', //接口地址
  
    success: function (res) {
     console.log("openid=", res.data.openid)
     console.log("session_key=", res.data.session_key)
     console.log("encryptedData=", telObj)
     console.log("iv", ivObj)
     wx.request({
      url: 'http://www.semmy.fun/springmvc/getphone',
      method: 'post',
      data: {
        session_key: res.data.session_key,
        encryptedData: telObj,
        iv: ivObj, 
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
       //phoneObj = res.data.phoneNumber;
       console.log("手机号=", res.data)
       /*wx.setStorage({  //存储数据并准备发送给下一页使用
        key: "phoneObj",
        data: res.data.phoneNumber,
       })*/
      }
     })
    }
   })
   
      //-----------------是否授权，授权通过进入主页面，授权拒绝则停留在登陆界面
      if (e.detail.errMsg == 'getPhoneNumber:user deny') { //用户点击拒绝
       wx.navigateTo({
        url: '../index/index',
       })
      } else { //允许授权执行跳转
        console.log("允许授权执行跳转")
       /*wx.navigateTo({
        url: '../test/test',
       })*/
      }
     }
    });
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
      wx.showToast({
        title: '您尚未登录！',
        icon: 'none'
      })
      return
    }
    wx.request({
      url: "http://www.semmy.fun/springmvc/getcollect?phone=" + app.globalData.phone,
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
      wx.showToast({
        title: '您尚未登录！',
        icon: 'none'
      })
      return
    }
    wx.request({
      url: "http://www.semmy.fun/springmvc/getonehousebyphone?phone=" + app.globalData.phone,
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