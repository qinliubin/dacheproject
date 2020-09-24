// pages/login/login.js
const app = getApp() 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    wxloginBox:true,
    accloginBox:true,
    Del:'',
    code:'',
    Rcode:'',
    acc:'',
    pwd:'',
    rpwd:'',
    disabled: false,
    codename: '获取验证码',
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
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

  },
  onlogin:function(){
    this.setData({
      wxloginBox:!this.data.wxloginBox
   })
  },
  oncancel:function(){
    this.setData({
      wxloginBox:!this.data.wxloginBox
   })
  },
  onacc:function(){
    this.setData({
      accloginBox:!this.data.accloginBox,
      wxloginBox:!this.data.wxloginBox
   })
  },
  onacccancel:function(){
    this.setData({
      accloginBox:!this.data.accloginBox,
      wxloginBox:!this.data.wxloginBox
   })
  },
  inputphone(e){
    var Del=e.detail.value
    this.setData({
      Del:Del
    }) 
  },
  inputcode(e){
    var code=e.detail.value
    this.setData({
      code:code
    }) 
  },
  inputacc(e){
    var acc=e.detail.value
    this.setData({
      acc:acc
    }) 
  },
  inputpwd(e){
    var pwd=e.detail.value
    this.setData({
      pwd:pwd
    }) 
  },
  inputrpwd(e){
    var rpwd=e.detail.value
    this.setData({
      rpwd:rpwd
    }) 
  },
  oncode:function(e){
    // console.log(this.data.Del)
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/; 
    if (this.data.Del.length == 0) {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none',
        duration: 1500
      })
      return false;
    } else if (this.data.Del.length < 11) {
      wx.showToast({
        title: '手机号长度有误！',
        icon: 'none',
        duration: 1500
      })
      return false;
    } else if (!myreg.test(this.data.Del)) {
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
        duration: 1500
      })
      var that = this
      var num = 60;
      var timer = setInterval(function () {
        that.setData({
          codename: num + "s"
        })
        num--;
        if (num <= 0) {
          clearInterval(timer);
          that.setData({
            codename: '重新发送',
            disabled: false
          })
        } else {
          that.setData({
            codename: num + "s",
            disabled: true
          })
        }
      }, 1000)
      var thon=this
      wx.request({
        url: 'http://49.234.64.182:86/index.php/applet/aliyun/aliyun',
        // url: 'http://tp6.com/index.php/applet/aliyun/aliyun', 
        data: {
          phone:this.data.Del
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success (res) {
          thon.setData({
            Rcode:res.data
          }) 
        }
      })
    }
  },
  affirm:function(){
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/; 
    if (this.data.Del.length == 0||this.data.Del.length < 11||!myreg.test(this.data.Del)||this.data.code.length == 0) {
      wx.showToast({
        title: '输入格式有误！',
        icon: 'none',
        duration: 1500
      })
    }else{
      if (this.data.Rcode!=this.data.code) {
        wx.showToast({
          title: '验证码错误',
          icon: 'none',
          duration: 1500
        })
      } else {
        var thin=this
        wx.request({
          url: 'http://49.234.64.182:86/index.php/applet/login/login',
          // url: 'http://tp6.com/index.php/applet/login/login',
          data: {
            u_acc:thin.data.Del,
            u_phone:thin.data.Del,
            u_name:thin.data.userInfo.nickName,
            u_img:thin.data.userInfo.avatarUrl,
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
                      data: thin.data.Del,
                      key: 'userAcc',
                    })
                    wx.navigateTo({
                      url: '/pages/personal/personal',
                    })
                  },1500)
                }
              })
            }else{
              wx.showToast({
                title: res.data.msg,
                icon: 'none',
                duration: 1500,
              })
            }
            // console.log(res.data.code)
          }
        })
      }
    }
  },
  accaffirm:function(e){
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/; 
    if (this.data.acc.length == 0) {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none',
        duration: 1500
      })
      return false;
    } else if (this.data.acc.length < 11) {
      wx.showToast({
        title: '手机号长度有误！',
        icon: 'none',
        duration: 1500
      })
      return false;
    } else if (!myreg.test(this.data.acc)) {
      wx.showToast({
        title: '手机号有误！',
        icon: 'none',
        duration: 1500
      })
      return false;
    } else if (this.data.pwd.length == 0) {
      wx.showToast({
        title: '密码不能为空',
        icon: 'none',
        duration: 1500
      })
      return false;
    } else if (this.data.pwd != this.data.rpwd) {
      wx.showToast({
        title: '两次密码不相等',
        icon: 'none',
        duration: 1500
      })
      return false;
    } else{
      var thin=this
      wx.request({
        url: 'http://49.234.64.182:86/index.php/applet/login/login2',
        // url: 'http://tp6.com/index.php/applet/login/login',
        data: {
          u_acc:thin.data.acc,
          u_pwd:thin.data.pwd,
          u_phone:thin.data.acc,
          u_name:thin.data.userInfo.nickName,
          u_img:thin.data.userInfo.avatarUrl,
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
                    data: thin.data.acc,
                    key: 'userAcc',
                  })
                  wx.navigateTo({
                    url: '/pages/personal/personal',
                  })
                },1500)
              }
            })
          }else{
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 1500,
            })
          }
          // console.log(res.data.code)
        }
      })
    }
  },
})