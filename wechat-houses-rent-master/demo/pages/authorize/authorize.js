// pages/authorize/authorize.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      //判断小程序的API，回调，参数，组件等是否在当前版本可用。
      canIUse: wx.canIUse('button.open-type.getUserInfo'),
      phone: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;
    // 查看是否授权
    wx.getSetting({
        success: function (res) {
            if (res.authSetting['scope.userInfo']) {
                console.log('shou quanle')
                wx.getUserInfo({
                    success: function (res) {
                        console.log(res.userInfo);
                        //从数据库获取用户信息
                        app.globalData.name = res.userInfo.nickName;
                        app.globalData.icon = res.userInfo.avatarUrl;
                        //app.globalData.province = res.userInfo.province;
                        //app.globalData.city = res.userInfo.city;
                        that.queryUsreInfo();
                        //用户已经授权过
                        app.globalData.login = true;
                        setTimeout(
                            function () {
                              var pages = getCurrentPages()
                              var prevPage = pages[pages.length - 2] // 获取上一页
                              prevPage.onLoad()
                              wx.navigateBack({})
                            },
                            2000
                        )
                    }
                });
            } else {
                console.log('no shou quan')
            }
        }
    })
  },

  OnphoneInput: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  bindGetUserInfo: function (e) {
    if(this.data.phone=='')
    {
      wx.showToast({
        title: '请填写联系方式',
        icon: 'none'
      })
      return
    }
    if(this.data.phone.length!=11)
    {
      wx.showToast({
        title: '联系方式请正确填写,应该为11位数字',
        icon: 'none'
      })
      return
    }
    if(!(/^\d+$/.test(this.data.phone)))
    {
      wx.showToast({
        title: '联系方式请正确填写,应该为11位数字',
        icon: 'none'
      })
      return
    }
    if (e.detail.userInfo) {
        //用户按了允许授权按钮
        var that = this;
        //插入登录的用户的相关信息到数据库
       
        wx.request({
            url: 'http://www.semmy.fun/springmvc/registeruser',
            method: 'post',
            data: {
                phone: that.data.phone,
                nickName: e.detail.userInfo.nickName,
                avatarUrl: e.detail.userInfo.avatarUrl,
                province:e.detail.userInfo.province,
                city: e.detail.userInfo.city,
                collect: '',
            },
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                //从数据库获取用户信息
                //that.queryUsreInfo();
                console.log("插入小程序登录用户信息成功！");
            }
        });
        //授权成功后，跳转进入小程序首页
        app.globalData.login = true;
        app.globalData.name = e.detail.userInfo.nickName;
        app.globalData.icon = e.detail.userInfo.avatarUrl;
        app.globalData.phone = that.data.phone;
        setTimeout(
            function () {
              var pages = getCurrentPages()
              var prevPage = pages[pages.length - 2] // 获取上一页
              prevPage.onLoad()
              wx.navigateBack({})
            },
            2000
          )
          wx.request({
            url: "http://www.semmy.fun/springmvc/gethousenum?phone=" + app.globalData.phone,
            success(res) {
              app.globalData.housenum = parseInt(res.data.housenum)
            }
          })
    } else {
        //用户按了拒绝按钮
        wx.showModal({
            title:'警告',
            content:'您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
            showCancel:false,
            confirmText:'返回授权',
            success:function(res){
                if (res.confirm) {
                    console.log('用户点击了“返回授权”')
                } 
            }
        })
    }
},
//获取用户信息接口
queryUsreInfo: function () {
    wx.request({
        url: 'http://www.semmy.fun/springmvc/getuserphone',
        data: {
            nickName: app.globalData.name,
        },
        success(res) {
            console.log(res.data)
            app.globalData.phone = res.data;
        }
    });
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