// pages/post/post.js

const app = getApp()
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ident: app.globalData.ident,
    itemcnt: 0
  },

  getData() {
    wx.request({
      url: 'http://www.semmy.fun/springmvc/getAllTips?itemcnt=' + this.data.itemcnt,
      success(res) {
        console.log(res.data)
        var temp = res.data
        for (var i = 0; i < temp.length; i++)
          if (temp[i].text.length > 200)
            temp[i].text = temp[i].text.substring(0, 201) + '...';
        that.setData({
          posts: temp,

        })
        wx.hideLoading({})
        wx.stopPullDownRefresh({})
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    this.setData({
      ident: app.globalData.ident
    })
    wx.showLoading({
      title: '加载中',
    })
    that.getData()
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
    console.log(app.globalData.ident)
    this.setData({
      ident: app.globalData.ident
    })
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

  onItemClick: function (e) {
   /* wx.navigateTo({
      url: '../../pages/post_detail/post_detail?id=' + e.currentTarget.dataset.id,
    })*/
  },

  onPullDownRefresh: function () {
    wx.showNavigationBarLoading(); //在标题栏中显示加载
    that.getData();
    wx.hideNavigationBarLoading();
  },

  onPublishClick: function () {
    if (!app.globalData.login) {
      wx.showToast({
        title: '您尚未登录！',
        icon: 'none'
      })
      return
    }
    wx.navigateTo({
      url: '../publish/publish',
    })
  }

})