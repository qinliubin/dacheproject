// pages/personal/userinfor/userinfor.js
var app = getApp();
Page({
  data: {
    pn:'',
    hiddenmodalput:true,
    hiddenmodalnum:true,
    hiddenmodalsex:true,
    name:'',
    textname:'哈哈哈',
    numder:'',
    numbered:'13802028967',
    sex:'女',
    textsex:'',
    HotImgUrls: [
      {
        //头像地址,文字标题,文字内容,图片地址
        head:'http://49.234.64.182:86/static/applet/img/05.jpg',
        url: 'http://49.234.64.182:86/static/applet/img/05.jpg'
      }
    ],
  },
  //姓名
  modalinput: function () {
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput
    })
  },
  cancel: function () {
    this.setData({
      hiddenmodalput: true
    });
  },
 //确认
  nameblur: function (e) {
    this.setData({
        name: e.detail.value
    })
  },
  confirm: function () {
    let name = this.data.name;
    // console.log(name);
    this.setData({
      hiddenmodalput: true,
      textname:name
    })
  },
  //手机号
  bindnumber: function () {
    this.setData({
      hiddenmodalnum: !this.data.hiddenmodalnum
    })
  },
  cancels: function () {
    this.setData({
      hiddenmodalnum: true
    });
  },
 //确认
 numblur: function (e) {
    this.setData({
      number: e.detail.value
    })
  },
  confirms: function () {
    let number = this.data.number;
    // console.log(number);
    this.setData({
      hiddenmodalnum: true,
      numbered:number
    })
  },
  //性别
  bindsex: function () {
    this.setData({
      hiddenmodalsex: !this.data.hiddenmodalsex
    })
  },
  cancelsd: function () {
    this.setData({
      hiddenmodalsex: true
    });
  },
 //确认
 sexblur: function (e) {
    this.setData({
      sex: e.detail.value
    })
  },
  confirmsd: function () {
    let sex = this.data.sex;
    // console.log(sex);
    this.setData({
      hiddenmodalsex: true,
      textsex:sex
    })
  },
  //跳转登录页
    bindsign:function(){
      wx.navigateTo({
        url: '../sign/sign',
      })
    },
  onLoad: function(options) {
    var value=wx.getStorageSync('user');
    console.log(value);
    // var showDialog = getApp().globalData.showDialog
    // console.log( showDialog)
    // // 生命周期函数--监听页面加载
    //  this.setData({
    //    showDialog:showDialog
    //  })
  },

  

})