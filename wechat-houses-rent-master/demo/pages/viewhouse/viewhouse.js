
const urls = [
  'https://sanmizufang.oss-cn-shanghai.aliyuncs.com/18817573577/video/0/1615102978351.mp4?versionId=CAEQIRiBgMCjrseuwBciIDY5YmQzM2NmNmZiOTRlZjhiNDA4NzIyN2FlNDdiYjgz',
  'https://sanmizufang.oss-cn-shanghai.aliyuncs.com/18817573577/video/0/1615103512432.mp4?versionId=CAEQIRiBgMDJ1NeuwBciIDU0Zjg3ODM5MzliZTQ0YTJiYWFmZDgzNTA5ODZlMjE2',
  'https://sanmizufang.oss-cn-shanghai.aliyuncs.com/18817573577/video/0/1615107597098.mp4?versionId=CAEQIRiBgMDop9SvwBciIDBjMDQwNGY2YjIyYTQ3YzliNWYxNTc0YWI4ZmE5OTc1',
  'http://www.w3school.com.cn/example/html5/mov_bbb.mp4',
  'https://media.w3.org/2010/05/sintel/trailer.mp4',
  'http://www.w3school.com.cn/example/html5/mov_bbb.mp4',
  'https://media.w3.org/2010/05/sintel/trailer.mp4',
  'http://www.w3school.com.cn/example/html5/mov_bbb.mp4'
]

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
