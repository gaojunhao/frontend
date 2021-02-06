var that
const app = getApp()
const env = require('./homeDetail.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_phone: '',
    user_ident: 'host',
    id: '',
    phone: '',
    ads: '',
    rent: 0.00,
    type: '',
    name: '',
    hads: '',
    hphone: '',
    zulintype: '',
    quyu: '',
    ditie: '',
    xiaoqu: '',
    louceng: '',
    fangjianshu: '',
    dianti: '',
    fangjiandaxiao: '',
    sex: '',
    fukuantype: '',
  },

  onLoad: function (option) {
    this.setData({
      
      id: option.id,
      user_ident: app.globalData.ident,
      user_phone: app.globalData.phone
    })
    that = this
    wx.request({
      url: "http://www.semmy.fun/springmvc/getonehouse?id=" + option.id,
      success(res) {
        console.log(res.data)
        console.log(res.data.avasrc)
        var endimg = res.data.img.length
        //console.log(res.data.img.substring(0, endimg).split(',')[0])
        var imgs = []
        for (var i = 0; i < res.data.img_count; i++) {
          imgs.push(res.data.img.substring(0, endimg).split(',')[i])
        }

        that.setData({
          img: imgs,
          id: res.data.id,
          rent: res.data.rent,
          ads: res.data.ads,
          hname: res.data.name,
          hads: res.data.ads,
          hphone: res.data.phone,
          pic_cnt: res.data.img_count,
          avaurl: res.data.avasrc,
          zulintype: res.data.zulintype,
          quyu: res.data.quyu,
          ditie: res.data.ditie,
          xiaoqu: res.data.xiaoqu,
          louceng: res.data.louceng,
          fangjianshu: res.data.fangjianshu,
          fangjiantype: res.data.fangjiantype,
          dianti: res.data.dianti,
          fangjiandaxiao: res.data.fangjiandaxiao,
          sex: res.data.sex,
          fukuantype: res.data.fukuantype,
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


  OnPhoneClick: function (e) {
    wx.showActionSheet({
      itemList: ['呼叫', '添加联系人'],
      success: function (res) {
        console.log("点击电话 res：", res)
        if (res.tapIndex == 0) { //直接呼叫
          wx.makePhoneCall({
            phoneNumber: that.data.hphone,
            success: function (res_makephone) {
              console.log("呼叫电话返回：", res_makephone)
            }
          })
        } else if (res.tapIndex == 1) { //添加联系人
          wx.addPhoneContact({
            firstName: that.data.hname,
            mobilePhoneNumber: that.data.hphone,
            success: function (res_addphone) {
              console.log("电话添加联系人返回：", res_addphone)
            }
          })
        }
      }
    })

  },

  OnImgClick: function (e) {
    wx.previewImage({
      urls: this.data.img,
      current: e.currentTarget.dataset.idx
    })
  },

  OnReqClick: function (e) {
    if (!app.globalData.login) {
      wx.showToast({
        title: '您尚未登录！',
        icon: 'none'
      })
      return
    }
    if (app.globalData.ident == 'host') {
      wx.showToast({
        title: '只有租赁者才可以发起看房请求',
        icon: 'none'
      })
      return
    }
    if (app.globalData.phone == this.data.hphone) {
      wx.showToast({
        title: '不可以向自己发起看房请求',
        icon: 'none'
      })
      return
    }
    var url = "你的服务器链接"
    console.log(url)
    wx.request({
      url: url,
      success(res) {
        wx.showToast({
          title: '请求已发送',
        })
      },
      fail(res) {
        wx.showToast({
          title: '系统错误！',
          icon: 'none'
        })
      }
    })
  },

  OnRentClick: function (e) {
    if (!app.globalData.login) {
      wx.showToast({
        title: '您尚未登录！',
        icon: 'none'
      })
      return
    }
    if (this.data.status == '已出租') {
      wx.showToast({
        title: '该房屋已出租',
        icon: 'none'
      })
      return
    }
    wx.navigateTo({
      url: '../register_rentout/register_rentout?hid=' + this.data.id + "&ads=" + this.data.ads,
    })
  },

  OnUserClick: function (e) {
    wx.navigateTo({
      url: '../user_info/user?ident=host&phone=' + this.data.hphone,
    })
  },

  OnEditClick: function (e) {
    if (!app.globalData.login) {
      wx.showToast({
        title: '您尚未登录！',
        icon: 'none'
      })
      return
    }
    console.log(this.data.img)
    var img_str = ''
    for (var i = 0; i < this.data.img.length; i++) {
      if(i == this.data.img.length-1)
        img_str = img_str + this.data.img[i]
      else
        img_str = img_str + this.data.img[i] + ','
    }
    wx.navigateTo({
      url: '../update_house/update_house?id=' + this.data.id + '&ads=' + this.data.ads + '&type=' + this.data.types + '&pic_cnt=' + this.data.pic_cnt + '&img_str=' + img_str,
    })
  },

  OnDeleteClick: function (e) {
    app.globalData.id = this.data.id
    app.globalData.phone = this.data.user_phone
    if (!app.globalData.login) {
      wx.showToast({
        title: '您尚未登录！',
        icon: 'none'
      })
      return
    }
    if (this.data.status == '已租出') {
      wx.showToast({
        title: '不能删除已租出的房屋',
        icon: 'none'
      })
      return
    }
    wx.showModal({
      title: '删除',
      content: '确认删除该房屋？',
      success(res) {
        if (res.confirm) {
          wx.showLoading({
            title: '处理中',
          })
          console.log(app.globalData.url)
          wx.request({
            url: app.globalData.url + 'deletehouse?id=' + app.globalData.id + '&phone=' + app.globalData.phone,
            success(res) {
              console.log("delete house...")
              console.log(res)
              console.log(res.data)
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