// pages/personal/order/order.js
const app = getApp()
Page({
 
  /**
  * 页面的初始数据
  */
  data: {
  currtab: 0,
  swipertab: [{ name: '正进行', index: 0 }, { name: '待处理', index: 1 }, { name: '已结束', index: 2 }],
  },
  proceed:[],
  dispose:[],
  finish:[],
  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {
   let currtab = wx.getStorageSync('driverOrders')
   this.setData({
    currtab:currtab
   })
   var that = this
    wx.request({
      // url: 'http://49.234.64.182:86/index.php/applet/FALogin/onLoadOrder',
      url: 'http://tp6.com/index.php/applet/FALogin/onLoadOrder', 
      data: {
        acc:wx.getStorageSync('FAUserAcc'),
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        if (res.data.code==1001) {
          var proceed=res.data.data1;
          var dispose=res.data.data2;
          var finish=res.data.data3;
          that.setData({
            proceed:proceed,
            dispose:dispose,
            finish:finish
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 1500
          })
        }
        var num1=that.data.proceed.length*170.5
        var num2=that.data.dispose.length*170.5
        var num3=that.data.finish.length*170.5
        var arr = [num1,num2,num3,470];
        var max =arr[0];
        for(var i=1; i < arr.length; i++){
          if(max < arr[i]){
            max = arr[i];
          }
        }
        that.setData({
          deviceHeight:max
        })
      }
    })
  },
  /**
  * 生命周期函数--监听页面初次渲染完成
  */
  onReady: function () {
  // 页面渲染完成
  this.getDeviceInfo()
  this.orderShow()
  },
   
  getDeviceInfo: function () {
  let that = this
  wx.getSystemInfo({
  success: function (res) {
  that.setData({
  deviceW: res.windowWidth,
  deviceH: res.windowHeight
  })
  }
  })
  },
   
  /**
  * @Explain：选项卡点击切换
  */
  tabSwitch: function (e) {
  var that = this
  if (this.data.currtab === e.target.dataset.current) {
  return false
  } else {
  that.setData({
  currtab: e.target.dataset.current
  })
  }
  },
   
  tabChange: function (e) {
    var num1=this.data.proceed.length*170.5;
    var num2=this.data.dispose.length*170.5;
    var num3=this.data.finish.length*170.5;
  this.setData({ currtab: e.detail.current })
  this.orderShow(num1,num2,num3)
  },
   
  orderShow: function (num1,num2,num3) {
  let that = this
  switch (this.data.currtab) {
  case 0:
  that.alreadyShow()
  that.setData({
    deviceHeight:num1
  })
  break
  case 1:
  that.waitPayShow()
  that.setData({
    deviceHeight:num2
  })
  break
  case 2:
  that.lostShow()
  that.setData({
    deviceHeight:num3
  })
  break
  }
  },
  alreadyShow: function(){
  
  },
   
  waitPayShow:function(){
  
  },
   
  lostShow: function () {
  
  },
   
   
  /**
  * 生命周期函数--监听页面显示
  */
  onShow: function () {
   
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
   
  }
  })