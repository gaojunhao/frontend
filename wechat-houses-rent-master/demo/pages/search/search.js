// pages/search/search.js
Page({
  data: {
    inputShowed: false,
    inputVal: "",
    searchresult: [],
},
showInput: function () {
    this.setData({
        inputShowed: true
    });
},
hideInput: function () {
    this.setData({
        inputVal: "",
        inputShowed: false
    });
},
clearInput: function () {
    this.setData({
        inputVal: ""
    });
},
inputTyping: function (e) {
  this.setData({
    inputVal: e.detail.value
});
  wx.serviceMarket.invokeService({
    service: "wxc1c68623b7bdea7b",
    api: "poiSearch",
    data: {
      keyword: e.detail.value,
      boundary: "region(上海)"
    }
  }).then(res=>{
    console.log(res.data.data)
    this.setData({
      searchresult: res.data.data
  });
  }).catch(err=>{
    console.error(err)
  })
},


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  clickitem: function (e) {
    var pages = getCurrentPages()
    var prevPage = pages[pages.length - 2] // 获取上一页
    var location = e.currentTarget.dataset.location.lat + ',' + e.currentTarget.dataset.location.lng
    prevPage.setData({
      xiaoqu: e.currentTarget.dataset.title,
      location: location,
    })
    wx.navigateBack({})
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