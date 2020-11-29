// pages/post_house/post_house.js
var that
const app = getApp()
var uploadImage = require('../../utils/uploadFile.js'); 
var util = require('../../utils/util.js');
const env = require('../../utils/config.js');


var citys = {
  '北京市': ['市辖区'],
  '天津市': ['市辖区'],
  '河北省': ['石家庄市', '唐山市', '秦皇岛市', '邯郸市', '邢台市', '保定市', '张家口市', '承德市', '沧州市', '廊坊市', '衡水市', '省直辖县级行政区划'],
  '山西省': ['太原市', '大同市', '阳泉市', '长治市', '晋城市', '朔州市', '晋中市', '运城市', '忻州市', '临汾市', '吕梁市'],
  '内蒙古自治区': ['呼和浩特市', '包头市', '乌海市', '赤峰市', '通辽市', '鄂尔多斯市', '呼伦贝尔市', '巴彦淖尔市', '乌兰察布市', '兴安盟', '锡林郭勒盟', '阿拉善盟'],
  '辽宁省': ['沈阳市', '大连市', '鞍山市', '抚顺市', '本溪市', '丹东市', '锦州市', '营口市', '阜新市', '辽阳市', '盘锦市', '铁岭市', '朝阳市', '葫芦岛市'],
  '吉林省': ['长春市', '吉林市', '四平市', '辽源市', '通化市', '白山市', '松原市', '白城市', '延边朝鲜族自治州'],
  '黑龙江省': ['哈尔滨市', '齐齐哈尔市', '鸡西市', '鹤岗市', '双鸭山市', '大庆市', '伊春市', '佳木斯市', '七台河市', '牡丹江市', '黑河市', '绥化市', '大兴安岭地区'],
  '上海市': ['市辖区'],
  '江苏省': ['南京市', '无锡市', '徐州市', '常州市', '苏州市', '南通市', '连云港市', '淮安市', '盐城市', '扬州市', '镇江市', '泰州市', '宿迁市'],
  '浙江省': ['杭州市', '宁波市', '温州市', '嘉兴市', '湖州市', '绍兴市', '金华市', '衢州市', '舟山市', '台州市', '丽水市'],
  '安徽省': ['合肥市', '芜湖市', '蚌埠市', '淮南市', '马鞍山市', '淮北市', '铜陵市', '安庆市', '黄山市', '滁州市', '阜阳市', '宿州市', '六安市', '亳州市', '池州市', '宣城市'],
  '福建省': ['福州市', '厦门市', '莆田市', '三明市', '泉州市', '漳州市', '南平市', '龙岩市', '宁德市'],
  '江西省': ['南昌市', '景德镇市', '萍乡市', '九江市', '新余市', '鹰潭市', '赣州市', '吉安市', '宜春市', '抚州市', '上饶市'],
  '山东省': ['济南市', '青岛市', '淄博市', '枣庄市', '东营市', '烟台市', '潍坊市', '济宁市', '泰安市', '威海市', '日照市', '莱芜市', '临沂市', '德州市', '聊城市', '滨州市', '菏泽市'],
  '河南省': ['郑州市', '开封市', '洛阳市', '平顶山市', '安阳市', '鹤壁市', '新乡市', '焦作市', '濮阳市', '许昌市', '漯河市', '三门峡市', '南阳市', '商丘市', '信阳市', '周口市', '驻马店市', '省直辖县级行政区划'],
  '湖北省': ['武汉市', '黄石市', '十堰市', '宜昌市', '襄阳市', '鄂州市', '荆门市', '孝感市', '荆州市', '黄冈市', '咸宁市', '随州市', '恩施土家族苗族自治州', '省直辖县级行政区划'],
  '湖南省': ['长沙市', '株洲市', '湘潭市', '衡阳市', '邵阳市', '岳阳市', '常德市', '张家界市', '益阳市', '郴州市', '永州市', '怀化市', '娄底市', '湘西土家族苗族自治州'],
  '广东省': ['广州市', '韶关市', '深圳市', '珠海市', '汕头市', '佛山市', '江门市', '湛江市', '茂名市', '肇庆市', '惠州市', '梅州市', '汕尾市', '河源市', '阳江市', '清远市', '东莞市', '中山市', '潮州市', '揭阳市', '云浮市'],
  '广西壮族自治区': ['南宁市', '柳州市', '桂林市', '梧州市', '北海市', '防城港市', '钦州市', '贵港市', '玉林市', '百色市', '贺州市', '河池市', '来宾市', '崇左市'],
  '海南省': ['海口市', '三亚市', '三沙市', '儋州市', '省直辖县级行政区划'],
  '重庆市': ['市辖区', '县'],
  '四川省': ['成都市', '自贡市', '攀枝花市', '泸州市', '德阳市', '绵阳市', '广元市', '遂宁市', '内江市', '乐山市', '南充市', '眉山市', '宜宾市', '广安市', '达州市', '雅安市', '巴中市', '资阳市', '阿坝藏族羌族自治州', '甘孜藏族自治州', '凉山彝族自治州'],
  '贵州省': ['贵阳市', '六盘水市', '遵义市', '安顺市', '毕节市', '铜仁市', '黔西南布依族苗族自治州', '黔东南苗族侗族自治州', '黔南布依族苗族自治州'],
  '云南省': ['昆明市', '曲靖市', '玉溪市', '保山市', '昭通市', '丽江市', '普洱市', '临沧市', '楚雄彝族自治州', '红河哈尼族彝族自治州', '文山壮族苗族自治州', '西双版纳傣族自治州', '大理白族自治州', '德宏傣族景颇族自治州', '怒江傈僳族自治州', '迪庆藏族自治州'],
  '西藏自治区': ['拉萨市', '日喀则市', '昌都市', '林芝市', '山南市', '那曲地区', '阿里地区'],
  '陕西省': ['西安市', '铜川市', '宝鸡市', '咸阳市', '渭南市', '延安市', '汉中市', '榆林市', '安康市', '商洛市'],
  '甘肃省': ['兰州市', '嘉峪关市', '金昌市', '白银市', '天水市', '武威市', '张掖市', '平凉市', '酒泉市', '庆阳市', '定西市', '陇南市', '临夏回族自治州', '甘南藏族自治州'],
  '青海省': ['西宁市', '海东市', '海北藏族自治州', '黄南藏族自治州', '海南藏族自治州', '果洛藏族自治州', '玉树藏族自治州', '海西蒙古族藏族自治州'],
  '宁夏回族自治区': ['银川市', '石嘴山市', '吴忠市', '固原市', '中卫市'],
  '新疆维吾尔自治区': ['乌鲁木齐市', '克拉玛依市', '吐鲁番市', '哈密市', '昌吉回族自治州', '博尔塔拉蒙古自治州', '巴音郭楞蒙古自治州', '阿克苏地区', '克孜勒苏柯尔克孜自治州', '喀什地区', '和田地区', '伊犁哈萨克自治州', '塔城地区', '阿勒泰地区', '自治区直辖县级行政区划'],
  '台湾省': ['台湾'],
  '香港特别行政区': ['香港'],
  '澳门特别行政区': ['澳门']
}
 
module.exports = citys;

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

    
    region: [],
    detailed: '请选择',
    customItem:["全部"],
    clas: 'ccc',

  },

  bindRegionChange: function (e) {
    var that = this
    //为了让选择框有个默认值，
    that.setData({
      clas: ''
    })
　　　//下拉框所选择的值
    console.log('picker发送选择改变，携带值为', e.detail.value)
 
    this.setData({
      //拼的字符串传后台
      detailed: e.detail.value[0] + "," + e.detail.value[1] + "," + e.detail.value[2],
      //下拉框选中的值
      region: e.detail.value
    })
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
      url: "http://www.semmy.cn/springmvc/sethouses",
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