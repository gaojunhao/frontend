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
      code: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.login({
      success: res => {
       console.log('code转换', res.code);
        this.setData({
          code: res.code
        })
      }})
  },

getPhoneNumber: function (e) {
  var ivObj = e.detail.iv
  var telObj = e.detail.encryptedData
  console.log('iv=', ivObj)
  console.log('encryptedData', telObj)
  //------执行Login---------
 
　　　　　　//用code传给服务器调换session_key
wx.request({
  url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wxdf33872822175f36&secret=8a13ec90b1fd2048188bfdbd37fe7004&js_code='+ this.data.code + '&grant_type=authorization_code', //接口地址

  success: function (res) {
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
      app.globalData.login = true;
      app.globalData.phone = res.data.phoneNumber;
      app.globalData.icon = "https://sanmizufang.oss-cn-shanghai.aliyuncs.com/icon/logo.jpg";
      app.globalData.name = res.data.phoneNumber;
      
      wx.request({
        url: "http://www.semmy.fun/springmvc/checkuserbyphone?phone=" + app.globalData.phone,
        success(res) {
          console.log(res.data)
          if(res.data.phone == "null"){
            wx.request({
              url: 'http://www.semmy.fun/springmvc/registeruser',
              method: 'post',
              data: {
                  phone: app.globalData.phone,
                  nickName: app.globalData.phone,
                  avatarUrl: "https://sanmizufang.oss-cn-shanghai.aliyuncs.com/icon/logo.jpg",
                  province: "shanghai",
                  city: "shanghai",
                  collect: '',
              },
              header: {
                  'content-type': 'application/json'
              },
              success: function (res) {
                  console.log("插入小程序登录用户信息成功！");
              }
          })
          }else{
            app.globalData.collect = res.data.collect;
          }
        }
      });
    }
   })
  }
 })
 
    //-----------------是否授权，授权通过进入主页面，授权拒绝则停留在登陆界面
    if (e.detail.errMsg == 'getPhoneNumber:user deny') { //用户点击拒绝
      setTimeout(
        function () {
          var pages = getCurrentPages()
          var prevPage = pages[pages.length - 2] // 获取上一页
          prevPage.onLoad()
          wx.navigateBack({})
        },
        2000
    )
    } else { //允许授权执行跳转
      console.log("允许授权执行跳转")
      setTimeout(
        function () {
          var pages = getCurrentPages()
          var prevPage = pages[pages.length - 2] // 获取上一页
          prevPage.onLoad()
          wx.navigateBack({})
        },
        2000
    )}
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