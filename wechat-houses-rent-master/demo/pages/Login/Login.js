// pages/Login/Login.js
const env = require('../../utils/config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    pswd: '',
    ident: "1"
  },

  passwordInput: function (e) {
    this.setData({
      pswd: e.detail.value
    });
  },

  phoneInput: function (e) {
    this.setData({
      phone: e.detail.value
    });
  },

  identChange: function (e) {
    this.setData({
      ident: e.detail.value
    });
  },

  loginclick: function (e) {
    var app = getApp()
    var ident = ''
    if (this.data.ident == '1') ident = 'guest'
    else ident = 'host'

    if (this.data.phone.length == 0 || this.data.pswd.length == 0) {
      wx.showToast({
        title: '请输入账号和密码',
        icon: 'none'
      })
      return;
    }

    var url = 'http://www.semmy.fun/springmvc/login?phone=' + this.data.phone + "&pswd=" + this.data.pswd + "&ident=" + this.data.ident

    wx.showToast({
      title: '请稍等',
      icon: 'loading',
      duration: 10000
    })
    var that = this
    wx.request({
      url: url,
      success(res) {
        console.log(res.data)
        var s = res.data.split(' ')[0]
        if (s == '1') {
          app.globalData.phone = that.data.phone
          app.globalData.name = res.data.split(' ')[1]
          app.globalData.ident = ident
          app.globalData.login = true
          app.globalData.icon = res.data.split(' ')[2]
          app.globalData.pic_url = env.uploadImageUrl + that.data.phone + '/imgs'
          var pages = getCurrentPages()
          var prevpage = pages[pages.length - 2]
          prevpage.onLoad()
          setTimeout(function () {
            wx.navigateBack({})
          }, 1500)

          wx.showToast({
            title: '登录成功',
          })

          console.log(app.globalData.name)
        } else if (s == '-1') {
          wx.showToast({
            title: '数据库系统错误！',
            icon: 'none'
          })
        } else {
          wx.showToast({
            title: '用户名或密码错误！',
            icon: 'none'
          })
        }
      }
    })
    console.log(url)
  },

  register_click: function (e) {
    wx.navigateTo({
      url: '../register/register',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})