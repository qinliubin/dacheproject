const app = getApp()
Page({
  data: {
    userInfo: {},
    motto: 'Hello World',
    hasUserInfo: false,
    username:'',
    touuurl:'',
    show:false,
    noPay:'已付款',
    noSend:'待付款',
    sended:'已评价',
    completed:'待评价',
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  onLoad: function () {
    var that = this;
    var value=wx.getStorageSync('FAUserAcc');
    wx.request({
      url: 'http://49.234.64.182:86/index.php/applet/FALogin/personal',
      // url: 'http://tp6.com/index.php/applet/FALogin/personal', 
      data: {
        acc:value,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        if (res.data.code==1001) {
          that.setData({
            touuurl:res.data.data.d_img,
            username:res.data.data.d_name,
          });
        }else{
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 1500
          })
        }
      }
    })
  },
  //个人信息
  userinfor:function(){
    wx.navigateTo({
      url: './userinfor/userinfor'
    })
  },
  //我的订单
  bindorder:function(){
    wx.setStorageSync('driverOrders', 0)
    wx.navigateTo({
      url: './order/order'
    })
  },
  //已付款
  noPay: function () {
    wx.setStorageSync('driverOrders', 0)
      wx.navigateTo({
         url: './order/order' 
        })
  },
  //代付款
  noSend: function () {
    wx.setStorageSync('driverOrders', 1)
      wx.navigateTo({
        url: './order/order'
      })
  },
  //已评价
  sended: function () {
    wx.setStorageSync('driverOrders', 2)
      wx.navigateTo({
        url: './order/order' 
      })
  },

})
