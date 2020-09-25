const app = getApp()
Page({
  data: {
    userInfo: {},
    motto: 'Hello World',
    hasUserInfo: false,
    username:'',
    touuurl:'',
    show:false,
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
    let that = this;
    var value=wx.getStorageSync('userAcc');
    wx.request({
      url: 'http://11.com/index.php/applet/Personal/userinfor',
      data:{
        u_acc:value,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        // console.log(res.data);
        console.log(res.data.data);
        // console.log(res.data.data.u_name);
        if(res.data.code==2002){
          wx.setStorage({
            data: res.data.data,
            key: 'user',
          });
          that.setData({
            touuurl:res.data.data.u_img,
            username:res.data.data.u_name,
          });
        }
      }
    })
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
        url: './order/order' 
      })
  },
  completed: function () {
    app.globalData.currentLocation = 4,
      wx.navigateTo({ 
        url: './order/order' 
      })
  },

})
