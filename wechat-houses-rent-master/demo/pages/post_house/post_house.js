// pages/post_house/post_house.js
var that
const app = getApp()
var uploadImage = require('../../utils/uploadFile.js'); 
var util = require('../../utils/util.js');
const env = require('../../utils/config.js');
Page({

  data: {
    img_count: 0,
    imgs: [],
    img_paths: '',
    ads: '',
    type: '',
    maxg: '0',
    rent: '0.00',
    abled: true,
    buttons: [{ id: 1, name: '整租' }, { id: 2, name: '合租' }],
    show:false,//控制下拉列表的显示隐藏，false隐藏、true显示
    showditie:false,//控制下拉列表的显示隐藏，false隐藏、true显示
    showsex:false,//控制下拉列表的显示隐藏，false隐藏、true显示
    selectDitie: ['1号线', '2号线', '3号线', '4号线', '5号线', '6号线', '7号线', '8号线', '9号线', '10号线', '11号线', '12号线', '13号线', '14号线', '15号线', '16号线', '17号线', '浦江线'],//下拉列表的数据
    selectData: ['黄浦', '静安', '长宁', '普陀', '徐汇', '浦东', '杨浦', '虹口', '宝山', '闵行', '松江', '嘉定', '青浦', '奉贤', '崇明', '金山'],
    selectSex: ['不限', '男', '女'],
    index:0//选择的下拉列表下标
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

  // 点击下拉显示框
  selectTap(){
    this.setData({
      show: !this.data.show
    });
  },
  // 点击下拉列表
  optionTap(e){
    let Index=e.currentTarget.dataset.index;//获取点击的下拉列表的下标
    this.setData({
      index:Index,
      show:!this.data.show
    });
  },

    // 点击下拉显示框
    selectTapditie(){
      this.setData({
        showditie: !this.data.showditie
      });
    },
    // 点击下拉列表
    optionTapditie(e){
      let Index=e.currentTarget.dataset.index;//获取点击的下拉列表的下标
      this.setData({
        index:Index,
        showditie:!this.data.showditie
      });
    },

    // 点击下拉显示框
    selectTapsex(){
      this.setData({
        showsex: !this.data.showsex
      });
    },
    // 点击下拉列表
    optionTapsex(e){
      let Index=e.currentTarget.dataset.index;//获取点击的下拉列表的下标
      this.setData({
        index:Index,
        showsex:!this.data.showsex
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
        //其他的位置为false
        this.data.buttons[i].checked = false;
      }
    }
    this.setData({
      buttons: this.data.buttons,
    })
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

  uploadImage(that.data.imgs[i], i, app.globalData.phone+'/imgs/',
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
          that.data.img_paths = that.data.img_paths + env.uploadImageUrl + app.globalData.phone + "/imgs/" + i + ".jpg"
        else
          that.data.img_paths = that.data.img_paths + env.uploadImageUrl + app.globalData.phone + "/imgs/" + i + ".jpg" + ","
    }
    console.log(app.globalData.icon)
    wx.request({
      url: "http://www.semmy.fun/springmvc/sethouses",
      method: 'post',
      data: {
        //phone: app.globalData.phone,
        phone: app.globalData.phone,
        ads: this.data.ads,
        maxg: this.data.maxg,
        type: this.data.type,
        rent: this.data.rent,
        img: that.data.img_paths,
        img_count: this.data.img_count,
        status: "待租",
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