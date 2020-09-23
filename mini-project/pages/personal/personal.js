const app = getApp()
Page({
  data: {
    userInfo: {},
    motto: 'Hello World',
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    // orderItems
    orderItems: [
      {
        typeId: 0,
        name: '已付款',
        url: 'bill',
        imageurl: 'http://49.234.64.182:86/static/applet/img/yifu.png',
      },
      {
        typeId: 1,
        name: '待付款',
        url: 'bill',
        imageurl: 'http://49.234.64.182:86/static/applet/img/daifu.png',
      },
      {
        typeId: 2,
        name: '待评价',
        url: 'bill',
        imageurl: 'http://49.234.64.182:86/static/applet/img/daiping.png'
      },
      {
        typeId: 3,
        name: '已评价',
        url: 'bill',
        imageurl: 'http://49.234.64.182:86/static/applet/img/yiping.png'
      }
    ],
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this;
  
  },
  userinfor:function(){
    wx.navigateTo({
      url: './userinfor/userinfor'
    })
  },
  bindorder:function(){
    wx.navigateTo({
      url: './order/order'
    })
  },
  noPay: function () {
    app.globalData.currentLocation = 1,
      wx.navigateTo({
         url: './order/order' 
        })
  },
  noSend: function () {
    app.globalData.currentLocation = 2,
      wx.navigateTo({
        url: './order/order'
      })
  },
  sended: function () {
    app.globalData.currentLocation = 3,
      wx.navigateTo({
        url: './order/order' })
  },
  completed: function () {
    app.globalData.currentLocation = 4,
      wx.navigateTo({ url: './order/order' })
  },

})
