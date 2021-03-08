
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
    posterarr: [],
  },

  onLoad: function(options){
    var that = this
    var url = "http://www.semmy.fun/springmvc/getvideo?itemcnt=" + this.data.itemcnt
    wx.request({
      url: url,
      success(res) {
        var dataarr = res.data
        for (var i = 0; i < dataarr.length; i++) {
          that.data.posterarr[i] = dataarr[i].poster
        }
    
        that.setData({
          videoList: that.data.posterarr.map((url, index) => ({ id: index + 1, url }))
        })
      }
    })
  },

  onPlay(e) {
    /*
    var that = this
    console.log(e.detail.activeId)
    console.log(that.data.posterarr)
    if(e.detail.activeId%4 == 0) {
      that.data.itemcnt = that.data.itemcnt + 5
      var dataurl = "http://www.semmy.fun/springmvc/getAllhouses?itemcnt=" + this.data.itemcnt
      wx.request({
        url: dataurl,
        success(res) {
          var dataarr = res.data
          var posterlength = that.data.posterarr.length
          for (var i = 0; i < dataarr.length; i++) {
            that.data.posterarr[i] = dataarr[i].poster
          }
      
          that.setData({
            videoList: that.data.posterarr.map((url, index) => ({ id: index, url: url })),
          })
        }
      })
    }*/
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
    console.log('LoadedMetaData', e)
  },

  swiperchangehandle: function(e){
    const { current, source } = e.detail;
    console.log("swiperchangehandle", current, source);
    if (current == 2) {
      var that = this
      that.data.itemcnt = that.data.itemcnt + 3
      var url = "http://www.semmy.fun/springmvc/getvideo?itemcnt=" + that.data.itemcnt
      wx.request({
        url: url,
        success(res) {
          var dataarr = res.data
          for (var i = 0; i < dataarr.length; i++) {
            that.data.posterarr[i] = dataarr[i].poster
          }
      
          that.setData({
            videoList: that.data.posterarr.map((url, index) => ({ id: index + 1, url }))
          })
        }
      })
    }
  },

  buttonhandle:function(e){
    const { buttontype, buttonname, itemid}=e.detail;
    console.log(buttontype, buttonname, itemid);
    switch (buttontype){
        case "1":
        console.log(buttonname,'调用收藏接口');
        wx.showToast({
          title: '收藏',
          duration:1500
        })
        break;

        case "2":
        console.log(buttonname, '打开发消息弹框或者新页面');
        wx.showToast({
          title: '打开消息框',
          duration: 1500
        })
        break;

        case "3":
        console.log(buttonname,'调用微信分享');
        wx.showToast({
          title: this.data.playerType,
          duration: 1500
        })
        
        break;
    }
  },
})
