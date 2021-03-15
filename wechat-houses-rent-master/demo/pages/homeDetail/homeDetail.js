var that
const app = getApp()
const env = require('./homeDetail.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collectchecked: false,
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
    location: '',
  },

  onLoad: function (option) {
    this.setData({
      id: option.id,
      user_ident: app.globalData.ident,
      user_phone: app.globalData.phone
    })
    that = this
    wx.request({
      url: app.globalData.url + "getonehouse?id=" + option.id,
      success(res) {
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
          xiaoqu: res.data.xiaoqu.substring(0,6),
          louceng: res.data.louceng,
          fangjianshu: res.data.fangjianshu,
          fangjiantype: res.data.fangjiantype,
          dianti: res.data.dianti,
          fangjiandaxiao: res.data.fangjiandaxiao,
          sex: res.data.sex,
          fukuantype: res.data.fukuantype,
          location: res.data.location,
        })
        wx.request({
          url: app.globalData.url + 'containid?id=' + res.data.id + '&phone=' + app.globalData.phone,
          success: function (res) {
            var coll_checked
            if (res.data.result == "true")
              coll_checked = true;
            else
              coll_checked = false;
            that.setData({
              collectchecked: coll_checked
            })
          }
        });

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

  OnMapClick: function () {
    console.log(this.data.location)
    var latitude = this.data.location.split(',')[0]
    var longitude = this.data.location.split(',')[1]
    wx.navigateTo({
      url: '../map/map?latitude=' + latitude + '&longitude=' + longitude,
    })
  },

  OnPhoneClick: function (e) {
    if (!app.globalData.login) {
      wx.navigateTo({
        url: '../authorize/authorize',
      })
      return
    }
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

  onShareAppMessage: function () {

  },



  OnImgClick: function (e) {
    wx.previewImage({
      urls: this.data.img,
      current: e.currentTarget.dataset.idx
    })
  },

  OnCollectClick: function (e) {
    if (!app.globalData.login) {
      wx.navigateTo({
        url: '../authorize/authorize',
      })
      return
    }
    var url_coll
    if (this.data.collectchecked == true){
      url_coll = app.globalData.url + 'delcollect?id=' + this.data.id + '&phone=' + app.globalData.phone;
    } else {
      url_coll = app.globalData.url + 'addcollect?id=' + this.data.id + '&phone=' + app.globalData.phone;
    }
    this.setData({
      collectchecked: !this.data.collectchecked,
    })
    wx.request({
      url: url_coll,
      success: function (res) {
          console.log("收藏/取消收藏房屋成功！");
      }
  });
  },

  OnReqClick: function (e) {
    if (!app.globalData.login) {
      wx.navigateTo({
        url: '../authorize/authorize',
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
      wx.navigateTo({
        url: '../authorize/authorize',
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
    wx.request({
      url: app.globalData.url + "getonehousebyphone?phone=" + app.globalData.phone,
      success(res) {
        wx.navigateTo({
          url: '../update_house/update_house?rent=' + res.data.rent + '&zulintype=' + res.data.zulintype + '&quyu=' + res.data.quyu + '&ditie=' + res.data.ditie + '&xiaoqu=' + res.data.xiaoqu + '&louceng=' + res.data.louceng + '&fangjiantype=' + res.data.fangjiantype + '&dianti=' + res.data.dianti + '&fangjiandaxiao=' + res.data.fangjiandaxiao + '&sex=' + res.data.sex + '&fukuantype=' + res.data.fukuantype + '&contact=' + res.data.contact + '&img=' + res.data.img + '&img_count=' + res.data.img_count,
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
    if (!app.globalData.login) {
      wx.navigateTo({
        url: '../authorize/authorize',
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