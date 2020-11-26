// pages/post_house/post_house.js
var that
const app = getApp()
var uploadImage = require('../../utils/uploadFile.js'); 
var util = require('../../utils/util.js');

Page({

  data: {
    img_count: 0,
    imgs: [],
    img_paths: '',
    ads: '',
    type: '',
    maxg: '0',
    rent: '0.00',
    abled: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
  },


  OnAdsInput: function (e) {
    this.setData({
      ads: e.detail.value
    })
  },

  OnTypeInput: function (e) {
    this.setData({
      type: e.detail.value
    })
  },

  OnMaxgInput: function (e) {
    this.setData({
      maxg: e.detail.value
    })
  },

  OnRentInput: function (e) {
    this.setData({
      rent: e.detail.value
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
          img_count: imgs.length,
          imgs: imgs
        })
      }
    })
    console.log(that.data.imgs)
  },

  RemoveImg: function (event) {
    var position = event.currentTarget.dataset.index;
    this.data.imgs.splice(position, 1);
    // 渲染图片
    this.setData({
      imgs: this.data.imgs,
      img_count: this.data.img_count - 1
    })
  },

  OnPostClick: function (e) {
    var rent = this.data.rent
    var x = rent.split('.')
    var that = this
    console.log(x)

    if(parseInt(rent)>99999 || parseInt(rent)<=0){
      wx.showToast({
        title: '租金范围为 0 ~ 99999',
        icon: 'none'
      })
      return
    }
    
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
    if(this.data.img_count==0)
    {
      wx.showToast({
        title: '请附带至少一张预览图',
        icon: 'none'
      })
      return
    }
    this.data.type = this.data.type.replace(',','，')
    this.data.ads = this.data.ads.replace('\n',' ')
    wx.showLoading({
      title: '处理中……',
    })
    this.setData({
      abled: false
    })
    var tmp_img_paths = ''
    for (var i = 0; i < that.data.imgs.length; i++) {
      //显示消息提示框
      wx.showLoading({
        title: '上传中' + (i + 1),
        mask: true
      })

  uploadImage(that.data.imgs[i], i, '12345678912'+'/imgs/',
  function (result) {
    console.log("======上传成功图片地址为：", result);
    tmp_img_paths = tmp_img_paths + result + ','
    console.log(tmp_img_paths)
  },
  
  function (result) {
    console.log("======上传失败======", result);
    //做你具体的业务逻辑操作
    wx.showToast({
      title: '图片上传失败！',
      icon: 'none'
    })
    wx.hideLoading()
    that.setData({
      abled: true
    })
    return
  }
)  
    }
    for (var i = 0; i < that.data.imgs.length; i++) {
        if (i == (that.data.imgs.length-1))
          that.data.img_paths = that.data.img_paths + "https://semmy-1258231127.cos.ap-shanghai.myqcloud.com/19817582544/img/" + i + ".jpg"
        else
          that.data.img_paths = that.data.img_paths + "https://semmy-1258231127.cos.ap-shanghai.myqcloud.com/19817582544/img/" + i + ".jpg" + ","
    }
    wx.request({
      url: "http://www.semmy.cn/springmvc/sethouses",
      method: 'post',
      data: {
        //phone: app.globalData.phone,
        phone: '12345678912',
        ads: this.data.ads,
        maxg: this.data.maxg,
        type: this.data.type,
        rent: this.data.rent,
        img: that.data.img_paths,
        img_count: this.data.img_count,
        status: "待租"
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        var id = res.data.substring(0, res.data.length - 2)
        console.log(id)
        if (id == 'error') {
          wx.showToast({
            title: '数据库系统错误！',
            icon: 'none'
          })
          return
        }
        setTimeout(function () {
          wx.navigateBack()
        }, 2000)
        wx.showToast({
          title: '发布成功！',
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

  }

})