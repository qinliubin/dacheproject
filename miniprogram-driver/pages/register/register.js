
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    text: '获取验证码', //按钮文字
    color:'#33FF99',
    currentTime: 61, //倒计时
    disabled: false, //按钮是否禁用
    phone: '', //获取到的手机栏中的值
    VerificationCode: '',
    Code: '',
    NewChanges: '',
    NewChangesAgain: '',
    success: false,
    state: ''
  },
  /**
    * 返回首页
    */
  return_home: function (e) {
    wx.navigateTo({
      url: '/pages/home/home',
    })
 
  },
  // 手机号码
  handleInputPhone: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  //输入验证码
  handleVerificationCode: function (e) {
    this.setData({
      Code: e.detail.value
    })
  },
  //输入密码
  handleNewChanges: function (e) {
    this.setData({
      NewChanges: e.detail.value
    })
  },
  //二次输入密码
  handleNewChangesAgain: function (e) {
    this.setData({
      NewChangesAgain: e.detail.value
    })
 
  },
  //获取验证码
  doGetCode: function () {

    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/; 
    if (this.data.phone.length == 0) {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none',
        duration: 1500
      })
      return false;
    } else if (this.data.phone.length < 11) {
      wx.showToast({
        title: '手机号长度有误！',
        icon: 'none',
        duration: 1500
      })
      return false;
    } else if (!myreg.test(this.data.phone)) {
      wx.showToast({
        title: '手机号有误！',
        icon: 'none',
        duration: 1500
      })
      return false;
    } else {
      wx.showToast({
        title: '验证码已发送',
        icon: 'success',
        duration: 1500,
        success:()=>{
          setTimeout(()=> {
            var that = this
          var num = 60;
          var timer = setInterval(function () {
            that.setData({
              text: num + "s",
              color:'#D9D9D9',
            })
            num--;
            if (num <= 0) {
              clearInterval(timer);
              that.setData({
                text: '重新发送',
                disabled: false,
                color:'#33FF99',
              })
            } else {
              that.setData({
                text: num + "s",
                disabled: true,
                color:'#D9D9D9',
              })
            }
          }, 1000)
          var that=this
          wx.request({
            url: 'http://49.234.64.182:86/index.php/applet/FALogin/FAregister',
            // url: 'http://tp6.com/index.php/applet/FALogin/FAregister', 
            data: {
              phone:that.data.phone
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success (res) {
              if (res.data.code=='1001') {
                wx.showToast({
                  title: res.data.msg,
                  icon: 'none',
                  duration: 1500
                })
              } else {
                wx.request({
                  url: 'http://49.234.64.182:86/index.php/applet/Aliyun/aliyun',
                  // url: 'http://tp6.com/index.php/applet/Aliyun/aliyun', 
                  data: {
                    phone:that.data.phone
                  },
                  header: {
                    'content-type': 'application/json' // 默认值
                  },
                  success (res) {
                    that.setData({
                      VerificationCode:res.data
                    }) 
                  }
                })
              }
            }
          })
          },1500)
        }
      })
    }
  },
  //提交
  submit: function (e) {
    var that = this
    if (this.data.Code == '') {
      wx.showToast({
        title: '请输入验证码',
        icon: 'none',
        duration: 2000
      })
      return
    } else if (this.data.Code != this.data.VerificationCode) {
      wx.showToast({
        title: '验证码错误',
        icon: 'none',
        duration: 2000
      })
      return
    }
    else if (this.data.NewChanges == '') {
      wx.showToast({
        title: '请输入密码',
        icon: 'none',
        duration: 2000
      })
      return
    } else if (this.data.NewChangesAgain != this.data.NewChanges) {
      wx.showToast({
        title: '两次密码不一致',
        icon: 'none',
        duration: 2000
      })
      return
    } else {
      var that = this
      wx.request({
        url: 'http://49.234.64.182:86/index.php/applet/FALogin/register',
        // url: 'http://tp6.com/index.php/applet/FALogin/register', 
        data: {
          phone:that.data.phone,
          pwd:that.data.NewChanges
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success (res) {
          if (res.data.code="1001") {
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
                  that.setData({
                    success: true
                  })
                },1500)
              }
            })
          } else {
            wx.showToast({
              title: res.data.msg,
              icon: 'success',
              duration: 1500
            })
          }
        }
      })
    }
  },
  onlogin:function(e){
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
 
  }
})