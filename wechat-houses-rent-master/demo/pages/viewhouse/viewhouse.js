
const app = getApp()

//const videoList = urls.map((url, index) => ({ id: index + 1, url }))
Page({
  data: {
    videoList: [],
    itemcnt: 0,
  },

  onLoad: function(options){
    var that = this
    var url = app.globalData.url + "getvideo?itemcnt=" + this.data.itemcnt
    wx.request({
      url: url,
      success(res) {
        var dataarr = res.data
        var posterarr = []
        for (var i = 0; i < dataarr.length; i++) {
          posterarr[i] = dataarr[i].poster
        }
    
        that.setData({
          videoList: posterarr.map((url, index) => ({ id: index + 1, url }))
        })
      }
    })
  },

  onPlay(e) {
  },

  onPause(e) {
    //  console.log('pause', e.detail.activeId)
  },

  onEnded(e) {
  },

  onError(e) {},

  onWaiting(e) {},

  onTimeUpdate(e) {},

  onProgress(e) {},

  onLoadedMetaData(e) {
    //console.log('LoadedMetaData', e)
  },

  swiperchangehandle: function(e){
    const { current, source } = e.detail;
    console.log("swiperchangehandle", current, source);
    if (current == 2) {
      var that = this
      that.data.itemcnt = that.data.itemcnt + 3
      var url = app.globalData.url + "getvideo?itemcnt=" + that.data.itemcnt
      wx.request({
        url: url,
        success(res) {
          var dataarr = res.data
          var posterarr = []
          for (var i = 0; i < dataarr.length; i++) {
            posterarr[i] = dataarr[i].poster
          }
          
          that.setData({
            videoList: posterarr.map((url, index) => ({ id: index + 1, url }))
          })
        }
      })
    }
  },
})
