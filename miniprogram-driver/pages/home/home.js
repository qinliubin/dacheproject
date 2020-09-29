const app = getApp()
var uploadImage = require('../../utils/uploadFile.js');
var util = require('../../utils/util.js');

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
    tempFilePaths1: '',
    tempFilePaths2: ''
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
  //身份证
  IDnum: function () {
    var that = this;
    wx.chooseImage({
      count: 9, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        var nowTime = util.formatTime(new Date());

        //支持多图上传
        for (var i = 0; i < res.tempFilePaths.length; i++) {
           //显示消息提示框
           wx.showLoading({
              title: '上传中' + (i + 1) + '/' + res.tempFilePaths.length,
              mask: true
           })

           //上传图片
           //你的域名下的/cbb文件下的/当前年月日文件下的/图片.png
           //图片路径可自行修改
           uploadImage(res.tempFilePaths[i], 'cbb/' + nowTime + '/',
              function (result) {
                wx.request({
                  url: 'http://49.234.64.182:86/index.php/applet/IDcard/IDcard',
                  // url: 'http://tp6.com/index.php/applet/IDcard/IDcard', 
                  data: {
                    img:result
                  },
                  header: {
                    'content-type': 'application/json' // 默认值
                  },
                  success (res) {
                    var str=typeof(res.data)=='string'
                    if (str==true) {
                      wx.showToast({
                        title: '上传失败，请上传身份证！',
                        icon: 'none',
                        duration: 1500,
                      })
                    } else {
                      that.setData({
                        tempFilePaths1:tempFilePaths,
                        IDnum:res.data.Data.FrontResult.IDNumber
                      })
                    }
                  }
                })
                 wx.hideLoading();
              }, function (result) {
                wx.showToast({
                  title: '上传失败，请上传身份证！',
                  icon: 'none',
                  duration: 1500,
                })
                 console.log("======上传失败======", result);
                 wx.hideLoading()
              }
           )
        }
      }
    })
  },
 
  drive: function (e) {
    var that = this;
    wx.chooseImage({
      count: 9, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        var nowTime = util.formatTime(new Date());

        //支持多图上传
        for (var i = 0; i < res.tempFilePaths.length; i++) {
           //显示消息提示框
           wx.showLoading({
              title: '上传中' + (i + 1) + '/' + res.tempFilePaths.length,
              mask: true
           })

           //上传图片
           //你的域名下的/cbb文件下的/当前年月日文件下的/图片.png
           //图片路径可自行修改
           uploadImage(res.tempFilePaths[i], 'cbb/' + nowTime + '/',
              function (result) {
                wx.request({
                  url: 'http://49.234.64.182:86/index.php/applet/DrivingLicence/DrivingLicence',
                  // url: 'http://tp6.com/index.php/applet/DrivingLicence/DrivingLicence', 
                  data: {
                    img:result
                  },
                  header: {
                    'content-type': 'application/json' // 默认值
                  },
                  success (res) {
                    var str=typeof(res.data)=='string'
                    if (str==true) {
                      wx.showToast({
                        title: '上传失败，请上传驾驶证！',
                        icon: 'none',
                        duration: 1500,
                      })
                    } else {
                      var stmp=res.data.Data.FaceResult.IssueDate
                      var jyear=stmp.slice(0,4)
                      var time = new Date();
                      time.setTime(time.getTime());
                      var year=time.getFullYear();
                      var num=year-jyear;
                      that.setData({
                        tempFilePaths2:tempFilePaths,
                        drive:res.data.Data.FaceResult.LicenseNumber,
                        driving:num
                      })
                    }
                  }
                })
                 wx.hideLoading();
              }, function (result) {
                wx.showToast({
                  title: '上传失败，请上传驾驶证！',
                  icon: 'none',
                  duration: 1500,
                })
                 console.log("======上传失败======", result);
                 wx.hideLoading()
              }
           )
        }
      }
    })
  },
  //资料提交
  insubmit:function(e){
    var that=this;
    if(this.data.IDnum.length == 0||this.data.drive.length == 0||this.data.driving.length == 0){
      wx.showToast({
        title: '请上传好资料！',
        icon: 'none',
        duration: 1500
      })
    }else if (this.data.IDnum!=this.data.drive) {
      wx.showToast({
        title: '身份证与驾驶证不是同一个人！',
        icon: 'none',
        duration: 1500
      })
    } else (
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