// pages/update_house/update_house.js
const app = getApp()
var that
var uploadImage = require('../../utils/uploadFile.js'); //地址换成你自己存放文件的位置
const { formatTime } = require('../../utils/util.js');
var util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    abled: true,
    img_str: '',
    img_paths: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    this.setData({
      rent: options.rent,
      zulintype: options.zulintype,
      quyu: options.quyu,
      ditie: options.ditie,
      xiaoqu: options.xiaoqu,
      louceng: options.louceng,
      fangjiantype: options.fangjiantype,
      dianti: options.dianti,
      fangjiandaxiao: options.fangjiandaxiao,
      sex: options.sex,
      fukuantype: options.fukuantype,
      contact: options.contact,
      img: options.img,
      img_count: options.img_count,
    })

    var imgs = this.data.img.split(',')
    //for (var i = 0; i < this.data.pic_cnt; i++)
      //imgs.push(app.globalData.pic_url + '/' + i + '.jpg')
    this.setData({
      imgs: imgs,
      imgs_ori: imgs
    })

  },

  UploadImg: function () {
    var imgs = that.data.imgs
    wx.chooseImage({
      count: 6 - imgs.length,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        let imgSrc = res.tempFilePaths
        imgs = imgs.concat(imgSrc)
        that.setData({
          pic_cnt: imgs.length,
          imgs: imgs
        })
      }
    })
    console.log("##uploadimg##")
    console.log(that.data.imgs)
  },

  RemoveImg: function (event) {
    var position = event.currentTarget.dataset.index;
    this.data.imgs.splice(position, 1);
    // 渲染图片
    this.setData({
      imgs: this.data.imgs,
      pic_cnt: this.data.pic_cnt - 1
    })
    console.log("##RemoveImg##")
    console.log(that.data.imgs)
  },

  updateClick: function (e) {
    var rent = this.data.rent
    if (rent == undefined) {
      wx.showToast({
        title: '请输入正确的金额格式',
        icon: 'none'
      })
      return
    }
    var x = rent.split('.')
    console.log(x)
    if (x.length > 2) {
      wx.showToast({
        title: '请输入正确的金额格式',
        icon: 'none'
      })
      return
    }
    if (x.length == 2 && (x[1].length > 2 || x[1].length == 0)) {
      wx.showToast({
        title: '请输入正确的金额格式',
        icon: 'none'
      })
      return
    }
    if (x[0].length == 0) {
      wx.showToast({
        title: '请输入正确的金额格式',
        icon: 'none'
      })
      return
    }
    if (this.data.ads == '' || this.data.maxg == '' || this.data.rent == '') {
      wx.showToast({
        title: '请输入完整信息',
        icon: 'none'
      })
      return
    }
    if (this.data.pic_cnt == 0) {
      wx.showToast({
        title: '请附带至少一张预览图',
        icon: 'none'
      })
      return
    }
    this.data.type = this.data.type.replace(',', '，')
    this.data.ads = this.data.ads.replace('\n', ' ')
    wx.showLoading({
      title: '处理中……',
    })
    this.setData({
      abled: false
    })
    for (var i = 0; i < that.data.imgs.length; i++) {
      //显示消息提示框
      wx.showLoading({
        title: '上传中' + (i + 1),
        mask: true
      })
      //console.log(that.data.imgs[i].split('.'))
      //if (that.data.imgs[i] == that.data.imgs_ori[i])
      if (that.data.imgs[i].split('.')[0] == "https://sanmizufang")
        continue
      var now_time =  new Date().getTime()
      uploadImage(that.data.imgs[i], now_time, app.globalData.phone+'/imgs/',
        function (result) {
          console.log("======上传成功图片地址为：", result);
          //做你具体的业务逻辑操作

        },
        function (result) {
          console.log("======上传失败======", result);
          //做你具体的业务逻辑操作
          wx.showToast({
            title: '图片上传失败！',
            icon: 'none'
          })
          wx.hideLoading()
          this.setData({
            abled: true
          })
          return
        }
      )
      that.data.imgs[i] = app.globalData.pic_url + '/' + now_time + '.jpg'
    }
    for (var i = 0; i < that.data.imgs.length; i++) {
        if (i == (that.data.imgs.length-1))
          that.data.img_paths = that.data.img_paths + that.data.imgs[i]
        else
          that.data.img_paths = that.data.img_paths + that.data.imgs[i] + ","
    }
    
    console.log(that.data.img_paths)
    wx.request({
      //url: app.globalData.url + 'update_house?ads=' + encodeURI(this.data.ads) + '&type=' + encodeURI(this.data.type) + '&rent=' + this.data.rent + '&piccnt=' + this.data.pic_cnt + '&maxg=' + this.data.maxg + '&hid=' + this.data.id + 'img_paths=' + this.data.img_paths,
      url: app.globalData.url + 'updatehouse',
      method: 'post',
      data: {
        //phone: app.globalData.phone,
        phone: app.globalData.phone,
        ads: this.data.ads,
        maxg: this.data.maxg,
        type: this.data.type,
        rent: this.data.rent,
        img: this.data.img_paths,
        img_count: this.data.pic_cnt,
        status: "待租",
        avasrc: app.globalData.icon
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if (res.data == -1) {
          wx.showToast({
            title: '数据库系统错误！',
            icon: 'none'
          })
          return
        }
        var id = that.data.id
        console.log("start...")
        console.log(id)
        
        setTimeout(function () {
          var pages = getCurrentPages()
          wx.navigateTo({
            url: "../homeDetail/homeDetail?id=" + id
          })
          /*wx.navigateBack({
            delta: 1
          })*/
          //var prevPage = pages[pages.length - 2]
          //prevPage.onLoad()
        }, 2000)

        wx.showToast({
          title: '修改成功！',
        })
      },
      fail(res) {
        wx.showToast({
          title: '发布失败！',
          icon: 'none'
        })
        console.log(res)
        this.setData({
          abled: true
        })
      }
    })

  },


})