// pages/map/map.js
var markers1 = {
  id: 3,
  latitude: 0,
  longitude: 0,
  iconPath: '../../images/location.png',
}
var allMarkers = [markers1]
Page({

  /**
   * 页面的初始数据 31.122776 121.400753
   */ 

  data: {
    markers: [],
    longitude: 0,
    latitude: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    allMarkers[0].latitude = options.latitude
    allMarkers[0].longitude = options.longitude
    const markers = allMarkers
    const latitude = options.latitude
    const longitude = options.longitude
    this.setData({
      markers,
      latitude,
      longitude,
    })
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