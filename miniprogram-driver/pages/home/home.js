Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    currentIndex: 0,
    modalmask:true,
    IDnum:'',
    drive:'',
    driving:'',
    phone:'',
  },
  onLoad: function () {
    var value = wx.getStorageSync('FAUserAcc');
    //判断是否登录
    if (value=='') {
      wx.navigateTo({
        url: '/pages/register/register',
      })
    } else {
      var that = this;
      wx.request({
        url: 'http://49.234.64.182:86/index.php/applet/FALogin/onLoadphone',
        // url: 'http://tp6.com/index.php/applet/FALogin/onLoadphone', 
        data: {
          phone:value
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success (res) {
          if (res.data.code==1001) {
            that.setData({
              modalmask:true
            })
          } else {
            that.setData({
              modalmask:false
            })
          }
        }
      })
    }
  },
  IDnum: function (e) {
    this.setData({
      IDnum: e.detail.value
    })
  },
  drive: function (e) {
    this.setData({
      drive: e.detail.value
    })
  },
  driving: function (e) {
    this.setData({
      driving: e.detail.value
    })
  },
  //资料提交
  insubmit:function(e){
    var that=this;
    if(this.data.IDnum.length == 0||this.data.drive.length == 0||this.data.driving.length == 0){
      wx.showToast({
        title: '请填写好资料！',
        icon: 'none',
        duration: 1500
      })
    }else(
      wx.request({
        url: 'http://49.234.64.182:86/index.php/applet/FALogin/modifiedData',
        // url: 'http://tp6.com/index.php/applet/FALogin/modifiedData', 
        data: {
          phone:wx.getStorageSync('FAUserAcc'),
          IDnum:this.data.IDnum,
          drive:this.data.drive,
          driving:this.data.driving,
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success (res) {
          if (res.data.code==1001) {
            wx.showToast({
              title: res.data.msg,
              icon: 'success',
              duration: 1500,
              success:()=>{
                setTimeout(()=> {
                  that.setData({
                    modalmask:false
                  })
                },1500)
              }
            })
          }
        }
      })
    )
  },
//个人中心
  onPersonalCenter:function(){
    wx.navigateTo({
      url: '/pages/personal/personal',
    })
  },
  //活动中心
  onActivityCenter:function(){
    wx.navigateTo({
      url: '/pages/activityCenter/activityCenter',
    })
  },
  //swiper切换时会调用
  pagechange: function (e) {
    if ("touch" === e.detail.source) {
      let currentPageIndex = this.data.currentIndex
      currentPageIndex = (currentPageIndex + 1) % 3
      this.setData({
        currentIndex: currentPageIndex
      })
    }
  },
  //用户点击tab时调用
  titleClick: function (e) {
    let currentPageIndex =
      this.setData({
        //拿到当前索引并动态改变
        currentIndex: e.currentTarget.dataset.idx
      })
  }
 
})