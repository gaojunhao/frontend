// components/video-button-bar.js
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    toolBarButton: function (e) {
      const { buttontype, buttonname, itemid, url } = e.currentTarget.dataset;
      this.triggerEvent('buttonhandle', { buttontype, buttonname, itemid, url });
    },
    buttonhandle:function(e){
      const { buttontype, buttonname, itemid, url } = e.detail;
      this.triggerEvent('menuTap', { buttontype, buttonname, itemid, url });
    },
  }
})
