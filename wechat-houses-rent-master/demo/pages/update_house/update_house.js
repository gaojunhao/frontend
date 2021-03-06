// pages/update_house/update_house.js
const app = getApp()
var that
var uploadImage = require('../../utils/uploadFile.js'); //地址换成你自己存放文件的位置
const env = require('../../utils/config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    showClearBtn: false,
    isWaring: false,
    rent: '',
    zulintype: '整租',
    quyu: '黄浦',
    ditie: '1号线',
    xiaoqu: '',
    louceng: '',
    fangjiantype: '一室',
    dianti: '有', 
    fangjiandaxiao: '',
    sex: '不限',
    fukuantype: '押一付三',
    img_count: 0,
    imgs: [],
    img_paths: '',
    status: '待租',
    abled: true,
    contact: '',
    location: '',
    selectzulin: ['整租', '合租'],
    showquyu:false,//控制下拉列表的显示隐藏，false隐藏、true显示
    showditie:false,//控制下拉列表的显示隐藏，false隐藏、true显示
    showsex:false,//控制下拉列表的显示隐藏，false隐藏、true显示
    showdianti:false,//控制下拉列表的显示隐藏，false隐藏、true显示
    showfukuan:false,//控制下拉列表的显示隐藏，false隐藏、true显示
    showfangxing:false,//控制下拉列表的显示隐藏，false隐藏、true显示
    selectDitie: ['1号线', '2号线', '3号线', '4号线', '5号线', '6号线', '7号线', '8号线', '9号线', '10号线', '11号线', '12号线', '13号线', '14号线', '15号线', '16号线', '17号线', '浦江线'],//下拉列表的数据
    selectquyu: ['黄浦', '静安', '长宁', '普陀', '徐汇', '浦东', '杨浦', '虹口', '宝山', '闵行', '松江', '嘉定', '青浦', '奉贤', '崇明', '金山'],
    selectSex: ['不限', '男', '女'],
    selectdianti: ['有', '无'],
    selectfukuan: ['押一付三', '押一付一'],
    selectfangxing: ['一室', '二室', '三室', '四室', '五室', '五室以上'],
    indexzulin:0,//选择的下拉列表下标
    indexquyu:0,//选择的下拉列表下标
    indexdianti:0,//选择的下拉列表下标
    indexditie:0,//选择的下拉列表下标
    indexsex:0,//选择的下拉列表下标
    indexfukuan:0,//选择的下拉列表下标
    indexfangxing:0,//选择的下拉列表下标
    houseindex:0
  },
  bindzulintypeChange: function(e) {
    this.setData({
      indexzulin: e.detail.value
    })
},
bindquyuChange: function(e) {
    this.setData({
      indexquyu: e.detail.value
    })
},
bindditieChange: function(e) {
    this.setData({
      indexditie: e.detail.value
    })
},
bindfangxingChange: function(e) {
  this.setData({
    indexfangxing: e.detail.value
  })
},
binddiantiChange: function(e) {
  this.setData({
    indexdianti: e.detail.value
  })
},
bindsexChange: function(e) {
  this.setData({
    indexsex: e.detail.value
  })
},
bindfukuanChange: function(e) {
  this.setData({
    indexfukuan: e.detail.value
  })
},
/*
oncontactInput(evt) {
  this.data.contact = evt.detail.value;
  this.setData({
      contact: this.data.contact,
      showClearBtn: !!this.data.contact.length,
      isWaring: false,
  });
},*/
onloucengInput(evt) {
  this.data.louceng = evt.detail.value;
  this.setData({
      louceng: this.data.louceng,
      showClearBtn: !!this.data.louceng.length,
      isWaring: false,
  });
},
onfangjiandaxiaoInput(evt) {
  this.data.fangjiandaxiao = evt.detail.value;
  this.setData({
      fangjiandaxiao: this.data.fangjiandaxiao,
      showClearBtn: !!this.data.fangjiandaxiao.length,
      isWaring: false,
  });
},
onrentInput(evt) {
  this.data.rent = evt.detail.value;
  this.setData({
      rent: this.data.rent,
      showClearBtn: !!this.data.rent.length,
      isWaring: false,
  });
},
/*
onClearcontact() {
  this.setData({
      contact: '',
      showClearBtn: false,
      isWaring: false,
  });
},*/
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log()
    that = this
    this.setData({
      location: options.location,
      id: options.id,
      indexzulin: this.data.selectzulin.indexOf(options.zulintype),
      indexquyu: this.data.selectquyu.indexOf(options.quyu),
      rent: options.rent,
      indexditie: this.data.selectDitie.indexOf(options.ditie),
      xiaoqu: options.xiaoqu,
      louceng: options.louceng,
      indexfangxing: this.data.selectfangxing.indexOf(options.fangjiantype),
      indexdianti: this.data.selectdianti.indexOf(options.dianti),
      fangjiandaxiao: options.fangjiandaxiao,
      indexsex: this.data.selectSex.indexOf(options.sex),
      indexfukuan: this.data.selectfukuan.indexOf(options.fukuantype),
      contact: options.contact,
      img: options.img,
      img_count: options.img_count,
      zulintype: options.zulintype,
      quyu: options.quyu,
      ditie: options.ditie,
      fangjiantype: options.fangjiantype,
      dianti: options.dianti,
      sex: options.sex,
      fukuantype: options.fukuantype,
      houseindex: options.houseindex
    })

    var imgs = this.data.img.split(',')
    //for (var i = 0; i < this.data.pic_cnt; i++)
      //imgs.push(app.globalData.pic_url + '/' + i + '.jpg')
    this.setData({
      imgs: imgs
    })

  },

  UploadImg: function () {
    app.globalData.imgs = that.data.imgs
    app.globalData.houseindex = that.data.houseindex
    wx.chooseImage({
      count: 6 - app.globalData.imgs.length,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        let imgSrc = res.tempFilePaths
        uploadImage(imgSrc[0], new Date().getTime(), app.globalData.phone + '/imgs/' + app.globalData.houseindex + '/',
        function (result) {
          console.log("======上传成功图片地址为：", result);
          app.globalData.imgs = app.globalData.imgs.concat(result)
          console.log(app.globalData.imgs)
          that.setData({
            img_count: app.globalData.imgs.length,
            imgs: app.globalData.imgs
          })
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
    })
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
    if(this.data.xiaoqu=='')
    {
      wx.showToast({
        title: '请填写所在小区',
        icon: 'none'
      })
      return
    }
    if(this.data.louceng==0)
    {
      wx.showToast({
        title: '请填写所在楼层',
        icon: 'none'
      })
      return
    }
    if(isNaN(this.data.louceng)){
      wx.showToast({
        title: '所在楼层请用数字填写',
        icon: 'none'
      })
      return
    }
    if(this.data.fangjiandaxiao==0)
    {
      wx.showToast({
        title: '请填写房间面积',
        icon: 'none'
      })
      return
    }
    if(isNaN(this.data.fangjiandaxiao)){
      wx.showToast({
        title: '房间面积请用数字填写',
        icon: 'none'
      })
      return
    }
    if(this.data.rent==0)
    {
      wx.showToast({
        title: '请填写租金',
        icon: 'none'
      })
      return
    }
    if(isNaN(this.data.rent)){
      wx.showToast({
        title: '租金请用数字填写',
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
    wx.showLoading({
      title: '处理中……',
    })
    this.setData({
      abled: false
    })
      //显示消息提示框
      for (var i = 0; i < that.data.imgs.length; i++) {
          if (i == (that.data.imgs.length-1))
            that.data.img_paths = that.data.img_paths + that.data.imgs[i]
          else
            that.data.img_paths = that.data.img_paths + that.data.imgs[i] + ","
      }
      console.log(that.data.img_paths)
    //location = this.data.location.lat + ',' + this.data.location.lng
    wx.request({
      url: "http://www.semmy.fun/springmvc/updatehouse",
      method: 'post',
      data: {
        id: this.data.id,
        phone: app.globalData.phone,
        rent: this.data.rent,
        zulintype: this.data.selectzulin[this.data.indexzulin],
        quyu: this.data.selectquyu[this.data.indexquyu],
        ditie: this.data.selectDitie[this.data.indexditie],
        xiaoqu: this.data.xiaoqu,
        louceng: this.data.louceng,
        fangjiantype: this.data.selectfangxing[this.data.indexfangxing],
        dianti: this.data.selectdianti[this.data.indexdianti], 
        fangjiandaxiao: this.data.fangjiandaxiao,
        sex: this.data.selectSex[this.data.indexsex],
        fukuantype: this.data.selectfukuan[this.data.indexfukuan],
        contact: this.data.contact,
        img: this.data.img_paths,
        img_count: this.data.img_count,
        status: '待租',
        avasrc: app.globalData.icon,
        location: this.data.location,
        houseindex: this.data.houseindex
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        /*
        if (res.data != 'update house success') {
          wx.showToast({
            title: '数据库系统错误！',
            icon: 'none'
          })
          return
        }*/
        /*setTimeout(function () {
          wx.navigateBack()
        }, 2000)*/
        console.log(res.data)
        setTimeout(
          function () {
            var pages = getCurrentPages()
            var prevPage = pages[pages.length - 3] // 获取上一页
            prevPage.onLoad()
            wx.navigateBack({delta: 2})
          },
          2000
        )
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