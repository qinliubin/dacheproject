// pages/personal/order/details/details.js
const app = getApp()
var count = 0;
Page({
  data: {
    show:false,//控制下拉列表的显示隐藏，false隐藏、true显示
    selectData:[{
      id:'1',
      text1:'起步价',
      text2:'含时长6小时，含里程3公里',
      money:'10元'
    },
    {
      id:'2',
      text1:'里程费',
      text2:'起步里程(3公里)，普通时段(7公里)',
      money:'15元'
    },
    {
      id:'3',
      text1:'时长费',
      text2:'起步时长(8分钟),普通时段(5分钟)',
      money:'10元'
    },
    {
      id:'3',
      text1:'优惠价',
      // text2:'起步时长(8分钟),普通时段(5分钟)',
      money:'10元'
    }
    //  '起步价','里程费','时长费','优惠卷抵扣'
    ],//下拉列表的数据
    index:0,//选择的下拉列表下标，
    showder:false,
    one_1: '',
    two_1: '',
    one_2: 0,
    two_2: 5,
    setInter:'',
    num:1,
    datauser:[]
  },
  startSetInter: function(){
    var that = this;
    //将计时器赋值给setInter
    that.data.setInter = setInterval(
        function () {
            var numVal = that.data.num + 1;
            that.setData({ num: numVal });
            console.log('setInterval==' + that.data.num);
        }
      , 2000);   
  },
  // 点击下拉显示框
  selectTap(){
    this.setData({
      show: !this.data.show,
      showder:!this.data.showder
    });
  },
  in_xin:function(e){
    var in_xin = e.currentTarget.dataset.in;
    var one_2;
    if (in_xin === 'use_sc2'){
      one_2 = Number(e.currentTarget.id);
    } else {
      one_2 = Number(e.currentTarget.id) + this.data.one_2;
    }
    this.setData({
      one_2: one_2,
      two_2: 5 - one_2
    })
  },
  // 点击下拉列表
  onLoad: function (options) {
  //  console.log(options);
   var value=wx.getStorageSync('key');
  //  console.log(value);
   this.setData({
    datauser:value
   })
  }
})