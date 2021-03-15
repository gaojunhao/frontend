// pages/post_house/post_house.js
var that
const app = getApp()
var uploadImage = require('../../utils/uploadFile.js'); 
var uploadVideo = require('../../utils/uploadVideo.js'); 
var util = require('../../utils/util.js');
const env = require('../../utils/config.js');
Page({
  data: {
    poster:"",
    duration: 0,
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
    videos: '',
    video_count: 0,
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
  },

  /**
   * 生命周期函数--监听页面加载
   */
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
onLoad: function (options) {
    that = this;
    this.setData({
      contact: app.globalData.phone
    })
    wx.request({
      url: app.globalData.url + "gethousenum?phone=" + app.globalData.phone,
      success(res) {
        app.globalData.housenum = parseInt(res.data.housenum)
      }
    });
},

UploadVideo: function () {
  console.log("UploadVideo")
  app.globalData.houseindex = app.globalData.housenum
  let that = this
  //1.拍摄视频或从手机相册中选择视频
  wx.chooseVideo({
    sourceType: ['album', 'camera'], // album 从相册选视频，camera 使用相机拍摄
    // maxDuration: 60, // 拍摄视频最长拍摄时间，单位秒。最长支持60秒
    camera: 'back',//默认拉起的是前置或者后置摄像头，默认back
    compressed: true,//是否压缩所选择的视频文件
    success: function(res){
      //console.log(res)
      let tempFilePath = res.tempFilePath//选择定视频的临时文件路径（本地路径）
      let duration = res.duration //选定视频的时间长度
      //let size = parseFloat(res.size/1024/1024).toFixed(1) //选定视频的数据量大小
      // let height = res.height //返回选定视频的高度
      // let width = res.width //返回选中视频的宽度
      that.data.duration = duration
      //console.log(duration)
      if(parseFloat(duration) > 120){
        that.setData({
          duration: 0
        })
        let beyondSize = parseFloat(duration) - 120
        wx.showToast({
          title: '上传的视频时长超出120s，超出'+beyondSize+'MB,请重新上传',
          //image: '',//自定义图标的本地路径，image的优先级高于icon
          icon:'none'
        })
      }else{
        //2.本地视频资源上传到服务器
        //that.uploadFile(tempFilePath)
        console.log(tempFilePath)
        uploadVideo(tempFilePath, new Date().getTime(), app.globalData.phone + '/video/' + app.globalData.houseindex + '/',
        function (result) {
          console.log("junhao", result)
          that.setData({
            poster: result,
            duration: that.data.duration,
          })
        },
        
        function (result) {
          console.log("======上传失败======", result);
          //做你具体的业务逻辑操作
          wx.showToast({
            title: '视频上传失败！',
            icon: 'none'
          })
          wx.hideLoading()
          that.setData({
            abled: true,
            poster: '',
            duration: 0,
          })
          return
        }
      )
      }
    },
    fail: function() {
      // fail
      console.log("上传视频失败")
      that.setData({
        poster: '',
        duration: '',
      })
    },
    complete: function() {
      // complete
    }
  })
},

UploadImg: function () {
  app.globalData.imgs = that.data.imgs
  app.globalData.houseindex = app.globalData.housenum
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

  RemoveVideo: function (event) {
    // 渲染图片
    console.log("RemoveVideo")
    this.setData({
      poster: '',
    })
  },

  OnPostClick: function (e) {
    var that = this;
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
    /*
    if(this.data.contact=='')
    {
      wx.showToast({
        title: '请填写联系方式',
        icon: 'none'
      })
      return
    }
    if(this.data.contact.length!=11)
    {
      wx.showToast({
        title: '联系方式请正确填写,应该为11位数字',
        icon: 'none'
      })
      return
    }
    if(!(/^\d+$/.test(this.data.contact)))
    {
      wx.showToast({
        title: '联系方式请正确填写,应该为11位数字',
        icon: 'none'
      })
      return
    }*/
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

    for (var i = 0; i < that.data.imgs.length; i++) {
        if (i == (that.data.imgs.length-1))
          that.data.img_paths = that.data.img_paths + that.data.imgs[i]
        else
          that.data.img_paths = that.data.img_paths + that.data.imgs[i] + ","
    }
    //var location = this.data.location.lat + ',' + this.data.location.lng
    wx.request({
      url: app.globalData.url + "sethouses",
      method: 'post',
      data: {
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
        img: that.data.img_paths,
        img_count: this.data.img_count,
        status: '待租',
        avasrc: app.globalData.icon,
        location: this.data.location,
        houseindex: app.globalData.houseindex,
        poster: this.data.poster,
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
        /*setTimeout(function () {
          wx.navigateBack()
        }, 2000)*/
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