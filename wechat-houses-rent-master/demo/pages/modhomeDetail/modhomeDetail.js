var that
const app = getApp()
const env = require('./modhomeDetail.js');
Page({
  data: {
    user_phone: '',
    id: '',
    phone: '',
    rent: 0,
    type: '',
    name: '',
    zulintype: '',
    quyu: '',
    ditie: '',
    xiaoqu: '',
    louceng: '',
    fangjianshu: '',
    dianti: '',
    fangjiandaxiao: '',
    fangjiantype: '',
    sex: '',
    fukuantype: '',
    location: '',
    avasrc: '',
    img: '',
  },

  onLoad: function (option) {
    that = this
    this.setData({
      id: option.id,
      user_phone: app.globalData.phone
    })
    wx.request({
      url: app.globalData.url + "getonehouse?id=" + option.id,
      success(res) {
        var endimg = res.data.img.length
        var imgs = []
        for (var i = 0; i < res.data.img_count; i++) {
          imgs.push(res.data.img.substring(0, endimg).split(',')[i])
        }
        
        that.setData({
          img: imgs,
          id: res.data.id,
          rent: res.data.rent,
          avasrc: res.data.avasrc,
          zulintype: res.data.zulintype,
          quyu: res.data.quyu,
          ditie: res.data.ditie,
          xiaoqu: res.data.xiaoqu.substring(0,5),
          louceng: res.data.louceng,
          fangjianshu: res.data.fangjianshu,
          fangjiantype: res.data.fangjiantype,
          dianti: res.data.dianti,
          fangjiandaxiao: res.data.fangjiandaxiao,
          sex: res.data.sex,
          fukuantype: res.data.fukuantype,
          location: res.data.location,
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

  onShareAppMessage: function () {

  },



  OnImgClick: function (e) {
    wx.previewImage({
      urls: this.data.img,
      current: e.currentTarget.dataset.idx
    })
  },

    OnEditClick: function (e) {
      wx.request({
        url: app.globalData.url + "getonehousebyphone?phone=" + app.globalData.phone,
        success(res) {
          wx.navigateTo({
            url: '../update_house/update_house?id=' + res.data.id + '&rent=' + res.data.rent + '&zulintype=' + res.data.zulintype + '&quyu=' + res.data.quyu + '&ditie=' + res.data.ditie + '&xiaoqu=' + res.data.xiaoqu + '&louceng=' + res.data.louceng + '&fangjiantype=' + res.data.fangjiantype + '&dianti=' + res.data.dianti + '&fangjiandaxiao=' + res.data.fangjiandaxiao + '&sex=' + res.data.sex + '&fukuantype=' + res.data.fukuantype + '&contact=' + res.data.contact + '&img=' + res.data.img + '&img_count=' + res.data.img_count + '&location=' + res.data.location + '&houseindex=' + res.data.houseindex + '&poster=' + res.data.poster,
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
  
    OnDeleteClick: function (e) {
      app.globalData.id = this.data.id
      app.globalData.phone = this.data.user_phone
      wx.showModal({
        title: '删除',
        content: '确认删除该房屋？',
        success(res) {
          if (res.confirm) {
            wx.showLoading({
              title: '处理中',
            })
            wx.request({
              url: app.globalData.url + 'deletehouse?id=' + app.globalData.id + '&phone=' + app.globalData.phone,
              success(res) {
                if (res.data == 0) {
                  setTimeout(
                    function () {
                      var pages = getCurrentPages()
                      var prevPage = pages[pages.length - 2] // 获取上一页
                      prevPage.onLoad()
                      wx.navigateBack({})
                    },
                    2000
                  )
                  wx.showToast({
                    title: '删除成功',
                  })
                  app.globalData.housenum = app.globalData.housenum-1
                } else {
                  wx.showToast({
                    title: '系统错误！',
                    icon: 'none'
                  })
                }
  
              }
            })
            //wx.hideLoading()
          }
        }
      })
    }
})