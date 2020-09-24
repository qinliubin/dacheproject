// pages/personal/order/order.js
const app = getApp()
Page({
  data: {
    // tab切换  
    currentTab: 0,
    dateuser:[],
    // 商品内容数据
    carts: [
      { 
      "id": 1, 
      imgurl: '../../../img/shangpin.jpg', 
      time:'2020-9-20 12:00:32',
      type1: '厦门软件园二期', 
      type2: '厦门湖里后埔', 
      state:'已付款',
    },{ 
      "id": 2, 
      imgurl: '../../../img/shangpin.jpg', 
      time:'2020-9-20 12:00:32',
      type1: '厦门软件园二期', 
      type2: '厦门湖里后埔', 
      state:'待付款'
    },{ 
      "id": 3, 
      imgurl: '../../../img/shangpin.jpg', 
      time:'2020-9-20 12:00:32',
      type1: '厦门软件园二期', 
      type2: '厦门湖里后埔', 
      state:'已评价'
    },{ 
      "id": 4, 
      imgurl: '../../../img/shangpin.jpg', 
      time:'2020-9-20 12:00:32',
      type1: '厦门软件园二期', 
      type2: '厦门湖里后埔', 
      state:'待付款'
    },
    ],
  },
  /** * 滑动切换tab  */
  bindChange: function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });
  },
  /** * 点击tab切换  */
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    /** * 获取系统信息  */
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          clientHeight: res.windowHeight
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (app.globalData.currentLocation == '') {
      this.setData({
        currentTab: 0
      });
    } else {
      var i = app.globalData.currentLocation;
      this.setData({
        currentTab: i
      });
    }
  },
 
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
 
  },
 
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
 
  },
 
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
 
  },
 
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
 
  },
 
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
 
  },
  toDetail:function(e){
    console.log(e.currentTarget.dataset.index);
    wx.setStorage({
      data: e.currentTarget.dataset.index,
      key: 'key',
    })
    let index = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: './details/details?index='+index,
    })
  }

  })

