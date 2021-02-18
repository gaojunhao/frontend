// pages/post_house/post_house.js
var that
const app = getApp()
var uploadImage = require('../../utils/uploadFile.js'); 
var util = require('../../utils/util.js');
const env = require('../../utils/config.js');
Page({

  data: {
    rent: 0,
    zulintype: '',
    quyu: '',
    ditie: '',
    xiaoqu: '',
    louceng: 0,
    fangjiantype: '',
    dianti: '', 
    fangjiandaxiao: 0,
    sex: '',
    fukuantype: '',
    img_count: 0,
    imgs: [],
    img_paths: '',
    status: '',
    abled: true,
    contact: '',
    buttons: [{ id: 1, name: '整租' }, { id: 2, name: '合租' }],
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
    indexquyu:0,//选择的下拉列表下标
    indexdianti:0,//选择的下拉列表下标
    indexditie:0,//选择的下拉列表下标
    indexsex:0,//选择的下拉列表下标
    indexfukuan:0,//选择的下拉列表下标
    indexfangxing:0,//选择的下拉列表下标
    housenum:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    this.data.buttons[0].checked = true;
    this.setData({
      buttons: this.data.buttons,
    });
  },

  containertap(){
    this.setData({
      showquyu:false,//控制下拉列表的显示隐藏，false隐藏、true显示
      showditie:false,//控制下拉列表的显示隐藏，false隐藏、true显示
      showsex:false,//控制下拉列表的显示隐藏，false隐藏、true显示
      showdianti:false,//控制下拉列表的显示隐藏，false隐藏、true显示
      showfukuan:false,//控制下拉列表的显示隐藏，false隐藏、true显示
      showfangxing:false,//控制下拉列表的显示隐藏，false隐藏、true显示
    });
  },

  // 点击下拉显示框
  selectTap(){
    this.setData({
      showditie:false,//控制下拉列表的显示隐藏，false隐藏、true显示
      showsex:false,//控制下拉列表的显示隐藏，false隐藏、true显示
      showdianti:false,//控制下拉列表的显示隐藏，false隐藏、true显示
      showfukuan:false,//控制下拉列表的显示隐藏，false隐藏、true显示
      showfangxing:false,//控制下拉列表的显示隐藏，false隐藏、true显示
      showquyu: !this.data.showquyu
    });
  },
  // 点击下拉列表
  optionTap(e){
    let Index=e.currentTarget.dataset.index;//获取点击的下拉列表的下标
    this.setData({
      indexquyu:Index,
      showquyu:!this.data.showquyu,
      quyu: this.data.selectquyu[Index],
    });
  },

    // 点击下拉显示框
    selectTapditie(){
      this.setData({
        showquyu:false,//控制下拉列表的显示隐藏，false隐藏、true显示
        showsex:false,//控制下拉列表的显示隐藏，false隐藏、true显示
        showdianti:false,//控制下拉列表的显示隐藏，false隐藏、true显示
        showfukuan:false,//控制下拉列表的显示隐藏，false隐藏、true显示
        showfangxing:false,//控制下拉列表的显示隐藏，false隐藏、true显示
        showditie: !this.data.showditie
      });
    },
    // 点击下拉列表
    optionTapditie(e){
      let Index=e.currentTarget.dataset.index;//获取点击的下拉列表的下标
      this.setData({
        indexditie:Index,
        showditie:!this.data.showditie,
        ditie: this.data.selectDitie[Index],
      });
    },

    // 点击下拉显示框
    selectTapsex(){
      this.setData({
        showquyu:false,//控制下拉列表的显示隐藏，false隐藏、true显示
        showditie:false,//控制下拉列表的显示隐藏，false隐藏、true显示
        showdianti:false,//控制下拉列表的显示隐藏，false隐藏、true显示
        showfukuan:false,//控制下拉列表的显示隐藏，false隐藏、true显示
        showfangxing:false,//控制下拉列表的显示隐藏，false隐藏、true显示
        showsex: !this.data.showsex
      });
    },
    // 点击下拉列表
    optionTapsex(e){
      let Index=e.currentTarget.dataset.index;//获取点击的下拉列表的下标
      this.setData({
        indexsex:Index,
        showsex:!this.data.showsex,
        sex: this.data.selectSex[Index],
      });
    },

    // 点击下拉显示框
    selectTapdianti(){
      this.setData({
        showquyu:false,//控制下拉列表的显示隐藏，false隐藏、true显示
        showditie:false,//控制下拉列表的显示隐藏，false隐藏、true显示
        showsex:false,//控制下拉列表的显示隐藏，false隐藏、true显示
        showfukuan:false,//控制下拉列表的显示隐藏，false隐藏、true显示
        showfangxing:false,//控制下拉列表的显示隐藏，false隐藏、true显示
        showdianti: !this.data.showdianti
      });
    },
    // 点击下拉列表
    optionTapdianti(e){
      let Index=e.currentTarget.dataset.index;//获取点击的下拉列表的下标
      this.setData({
        indexdianti:Index,
        showdianti:!this.data.showdianti,
        dianti: this.data.selectdianti[Index],
      });
    },

    // 点击下拉显示框
    selectTapfukuan(){
      this.setData({
        showquyu:false,//控制下拉列表的显示隐藏，false隐藏、true显示
        showditie:false,//控制下拉列表的显示隐藏，false隐藏、true显示
        showsex:false,//控制下拉列表的显示隐藏，false隐藏、true显示
        showdianti:false,//控制下拉列表的显示隐藏，false隐藏、true显示
        showfangxing:false,//控制下拉列表的显示隐藏，false隐藏、true显示
        showfukuan: !this.data.showfukuan
      });
    },
    // 点击下拉列表
    optionTapfukuan(e){
      let Index=e.currentTarget.dataset.index;//获取点击的下拉列表的下标
      this.setData({
        indexfukuan:Index,
        showfukuan:!this.data.showfukuan,
        fukuantype: this.data.selectfukuan[Index],
      });
    },

    // 点击下拉显示框
    selectTapfangxing(){
      this.setData({
        showquyu:false,//控制下拉列表的显示隐藏，false隐藏、true显示
        showditie:false,//控制下拉列表的显示隐藏，false隐藏、true显示
        showsex:false,//控制下拉列表的显示隐藏，false隐藏、true显示
        showdianti:false,//控制下拉列表的显示隐藏，false隐藏、true显示
        showfukuan:false,//控制下拉列表的显示隐藏，false隐藏、true显示
        showfangxing: !this.data.showfangxing
      });
    },
    // 点击下拉列表
    optionTapfangxing(e){
      let Index=e.currentTarget.dataset.index;//获取点击的下拉列表的下标
      this.setData({
        indexfangxing:Index,
        showfangxing:!this.data.showfangxing,
        fangjiantype: this.data.selectfangxing[Index],
      });
    },

  radioButtonTap: function (e) {
    console.log(e)
    let id = e.currentTarget.dataset.id
    console.log(id)
    for (let i = 0; i < this.data.buttons.length; i++) {
      if (this.data.buttons[i].id == id) {
        //当前点击的位置为true即选中
        this.data.buttons[i].checked = true;
      }
      else {
        this.data.buttons[i].checked = false;
      }
    }
    this.setData({
      buttons: this.data.buttons,
    })
    if(this.data.buttons[0].checked){
        this.data.zulintype = '整租';
    }
    else{
        this.data.zulintype = '合租';
    }
  },

  checkButtonTap:function(e){
    console.log(e)
    let id = e.currentTarget.dataset.id
    console.log(id)
    for (let i = 0; i < this.data.buttons.length; i++) {
      if (this.data.buttons[i].id == id) {
        if (this.data.buttons[i].checked == true) {
          this.data.buttons[i].checked = false;
         
        } else {
          this.data.buttons[i].checked = true;
          
        }
      }
    }
   this.setData({
     buttons: this.data.buttons,
    })
    
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

  OncontactInput: function (e) {
    this.setData({
      contact: e.detail.value
    })
  },

  OnloucengInput: function (e) {
    this.setData({
      louceng: e.detail.value
    })
  },

  OnxiaoquInput: function (e) {
    this.setData({
      xiaoqu: e.detail.value
    })
  },

  OnRentInput: function (e) {
    this.setData({
      rent: e.detail.value
    })
  },

  OnfangjiandaxiaoInput: function (e) {
    this.setData({
      fangjiandaxiao: e.detail.value
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
    this.data.housenum = app.globalData.housenum
    console.log("###")
    console.log(this.data.housenum)
    console.log("###")
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
    var tmp_img_paths = ''
    for (var i = 0; i < that.data.imgs.length; i++) {
      //显示消息提示框
      wx.showLoading({
        title: '上传中' + (i + 1),
        mask: true
      })

  uploadImage(that.data.imgs[i], i, app.globalData.phone + '/imgs/' + this.data.housenum + '/',
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
          that.data.img_paths = that.data.img_paths + env.uploadImageUrl + app.globalData.phone + "/imgs/" + this.data.housenum + "/" + i + ".jpg"
        else
          that.data.img_paths = that.data.img_paths + env.uploadImageUrl + app.globalData.phone + "/imgs/" + this.data.housenum + "/" + i + ".jpg" + ","
    }
    wx.request({
      url: "http://www.semmy.fun/springmvc/sethouses",
      method: 'post',
      data: {
        phone: app.globalData.phone,
        rent: this.data.rent,
        zulintype: this.data.zulintype,
        quyu: this.data.quyu,
        ditie: this.data.ditie,
        xiaoqu: this.data.xiaoqu,
        louceng: this.data.louceng,
        fangjiantype: this.data.fangjiantype,
        dianti: this.data.dianti, 
        fangjiandaxiao: this.data.fangjiandaxiao,
        sex: this.data.sex,
        fukuantype: this.data.fukuantype,
        contact: this.data.contact,
        img: that.data.img_paths,
        img_count: this.data.img_count,
        status: '待租',
        avasrc: app.globalData.icon
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
        app.globalData.housenum = app.globalData.housenum+1
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