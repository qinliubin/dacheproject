
const app = getApp()
 
Page({
  data: {
    username: '',
    password: ''
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onShow: function () {
    // 生命周期函数--监听页面显示
    
  },
  onLoad: function () {
   
  },
 
 
  // 获取输入账号 
  usernameInput: function (e) {
    this.setData({
      username: e.detail.value
    })
  },
 
  // 获取输入密码 
  passwordInput: function (e) {
    this.setData({
      password: e.detail.value
    })
  },
 
  // 登录处理
  login: function () {
    var that = this;
    if (this.data.username.length == 0 || this.data.password.length == 0) {
      wx.showToast({
        title: '账号或密码不能为空',
        icon: 'none',
        duration: 2000
      })
    } else {
      var that = this
      wx.request({
        url: 'http://49.234.64.182:86/index.php/applet/FALogin/login',
        // url: 'http://tp6.com/index.php/applet/FALogin/login', 
        data: {
          phone:that.data.username,
          pwd:that.data.password
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
                  wx.setStorage({
                    data: that.data.phone,
                    key: 'FAUserAcc',
                  }),
                  wx.navigateTo({
                    url: '/pages/home/home',
                  })
                },1500)
              }
            })
          } else {
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 1500
            })
          }
        }
      })
    }
  }
})
