// pages/personal/userinfor/userinfor.js
var app = getApp();
Page({
  data: {
    pn:'',
    hiddenmodalname:true,
    hiddenmodalphone:true,
    hiddenmodalnum:true,
    hiddenmodaldriving:true,
    hiddenmodalyears:true,
    buttons: [{text: '取消'}, {text: '确定'}],
    name:'',
    phone:'',
    num:'',
    driving:'',
    years:'',
    textname:'',
    numder:'',
    numbered:'13802028967',
    sex:'女',
    textsex:'',
    FAUser:[],
    HotImgUrls: [
      {
        //头像地址,文字标题,文字内容,图片地址
        head:'http://49.234.64.182:86/static/applet/img/05.jpg',
        url: 'http://49.234.64.182:86/static/applet/img/05.jpg'
      }
    ],
  },


  //姓名
  onHiddenmodalname: function () {
    this.setData({
      hiddenmodalname: !this.data.hiddenmodalname
    })
  },
  cancelHiddenmodalname: function () {
    this.setData({
      hiddenmodalname: true
    });
  },
 //确认
 textHiddenmodalname: function (e) {
    this.setData({
        name: e.detail.value,
    })
  },
  confirmHiddenmodalname: function () {
    var that = this
    wx.request({
      url: 'http://49.234.64.182:86/index.php/applet/FALogin/onName',
      // url: 'http://tp6.com/index.php/applet/FALogin/onName', 
      data: {
        name:this.data.name,
        acc:wx.getStorageSync('FAUserAcc'),
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
                  hiddenmodalname: true,
                  ["FAUser.d_name"]:that.data.name
                })
              },1500)
            }
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 1500,
            success:()=>{
              setTimeout(()=> {
                that.setData({
                  hiddenmodalname: true,
                })
              },1500)
            }
          })
        }
      }
    })
  },
  //手机号
  onHiddenmodalphone: function () {
    this.setData({
      hiddenmodalphone: !this.data.hiddenmodalphone
    })
  },
  cancelHiddenmodalphone: function () {
    this.setData({
      hiddenmodalphone: true
    });
  },
 //确认
  textHiddenmodalphone: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  confirmHiddenmodalphone: function () {
    var that = this
    wx.request({
      url: 'http://49.234.64.182:86/index.php/applet/FALogin/onPhone',
      // url: 'http://tp6.com/index.php/applet/FALogin/onPhone', 
      data: {
        phone:this.data.phone,
        acc:wx.getStorageSync('FAUserAcc'),
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
                wx.setStorageSync('FAUserAcc', that.data.phone)
                that.setData({
                  hiddenmodalphone: true,
                 ["FAUser.d_phone"]:that.data.phone
                })
              },1500)
            }
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 1500,
            success:()=>{
              setTimeout(()=> {
                that.setData({
                  hiddenmodalphone: true,
                })
              },1500)
            }
          })
        }
      }
    })
  },
  //身份证
  onHiddenmodalnum: function () {
    this.setData({
      hiddenmodalnum: !this.data.hiddenmodalnum
    })
  },
  cancelHiddenmodalnum: function () {
    this.setData({
      hiddenmodalnum: true
    });
  },
 //确认
  textHiddenmodalnum: function (e) {
    this.setData({
      num: e.detail.value
    })
  },
  confirmHiddenmodalnum: function () {
    var that = this
    wx.request({
      url: 'http://49.234.64.182:86/index.php/applet/FALogin/onNum',
      // url: 'http://tp6.com/index.php/applet/FALogin/onNum', 
      data: {
        num:this.data.num,
        acc:wx.getStorageSync('FAUserAcc'),
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
                  hiddenmodalnum: true,
                 ["FAUser.d_IDnum"]:that.data.num
                })
              },1500)
            }
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 1500,
            success:()=>{
              setTimeout(()=> {
                that.setData({
                  hiddenmodalnum: true,
                })
              },1500)
            }
          })
        }
      }
    })
  },
  //驾驶证号
  onHiddenmodaldriving: function () {
    this.setData({
      hiddenmodaldriving: !this.data.hiddenmodaldriving
    })
  },
  cancelHiddenmodaldriving: function () {
    this.setData({
      hiddenmodaldriving: true
    });
  },
 //确认
 textHiddenmodaldriving: function (e) {
    this.setData({
      driving: e.detail.value
    })
  },
  confirmHiddenmodaldriving: function () {
    var that = this
    wx.request({
      url: 'http://49.234.64.182:86/index.php/applet/FALogin/onDriving',
      // url: 'http://tp6.com/index.php/applet/FALogin/onDriving', 
      data: {
        driving:this.data.driving,
        acc:wx.getStorageSync('FAUserAcc'),
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
                  hiddenmodaldriving: true,
                  ["FAUser.d_drive"]:that.data.driving
                })
              },1500)
            }
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 1500,
            success:()=>{
              setTimeout(()=> {
                that.setData({
                  hiddenmodaldriving: true,
                })
              },1500)
            }
          })
        }
      }
    })
  },
  //驾龄
  onHiddenmodalyears: function () {
    this.setData({
      hiddenmodalyears: !this.data.hiddenmodalyears
    })
  },
  cancelHiddenmodalyears: function () {
    this.setData({
      hiddenmodalyears: true
    });
  },
 //确认
 textHiddenmodalyears: function (e) {
    this.setData({
      years: e.detail.value
    })
  },
  confirmHiddenmodalyears: function () {
    var that = this
    wx.request({
      url: 'http://49.234.64.182:86/index.php/applet/FALogin/onYears',
      // url: 'http://tp6.com/index.php/applet/FALogin/onYears', 
      data: {
        years:this.data.years,
        acc:wx.getStorageSync('FAUserAcc'),
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
                  hiddenmodalyears: true,
                  ["FAUser.d_driving"]:that.data.years
                })
              },1500)
            }
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 1500,
            success:()=>{
              setTimeout(()=> {
                that.setData({
                  hiddenmodalyears: true,
                })
              },1500)
            }
          })
        }
      }
    })
  },
  //跳转登录页
    bindsign:function(){
      wx.navigateTo({
        url: '../sign/sign',
      })
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
            FAUser:res.data.data
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

  

})