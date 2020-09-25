//index.js
//获取应用实例
var QQMapWX=require('../../utils/qqmap-wx-jssdk');
var qqmapsdk = new QQMapWX({
  key: 'KUKBZ-U6DWK-KMSJP-ASOB6-XXR7F-YKB5G'
});
const app = getApp()

Page({
    data: {
      screenWidth:'',//屏幕的宽度
      screenHeight:'',//屏幕的高度
     mapid:'loactionMap',
      multiIndex:[0,0,0],
      startDate:'现在出发 >',
      multiArray: [['今天', '明天', '后天'], [0, 1, 2, 3, 4, 5, 6], [0, 10, 20,30,40,50]],
      windowHeight: '',
      windowWidth:'',
      nav:'',
      distance:'',//距离
      duration:'',//持续时间
      polyline:[],
      // points:[],
      address:'',
      arriver:'',
    mapCtx: null,
    longitude: '',
    latitude: '',
    Newlongitude: '',
    newlatitude: '',
    markers: [],
    hasMarkers:true,
    searchLoadingStatus: 0,
    //当前选中纬度信息
    currentLocationInfo: {
      longitude: 0,
      latitude: 0
    },

    navData:[{
            id:'0',
            text:'快车',
        },{
          id:'1',
            text:'出租车',
        },{
          id:'2',
            text:'顺风车',
        },{
          id:'3',
            text:'专车',
        },{
          id:'4',
            text:'代驾',
        },{
          id:'5',
            text:'优惠来了',
        }
    ],
        motto: 'Hello World',
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        currentTab: 0,
        navScrollLeft: 0
    },
    regionChange: function (e) {
        var that = this;
        var changeType = e.type;
      },
      amapGetRegeo: function (longitude, latitude) {
        var that = this;
        myAmapFun.getRegeo({
          location: longitude + ',' + latitude,
          success: function (data) {
            if (data != null && data.length > 0) {
              that.setData({
                textData: {
                  name: data[0].desc,
                  desc: data[0].regeocodeData.formatted_address
                },
                currentLocationInfo: {
                  longitude: longitude,
                  latitude: latitude
                }
              });
              //console.log(that);
            }
            that.setData({
              searchLoadingStatus: 0
            });
          }
        })
      },
      onReady: function (e) {
        var that = this;
        // 使用 wx.createMapContext 获取 map 上下文
        that.mapCtx = wx.createMapContext('loactionMap', this);
      },
    //事件处理函数
    onLoad: function (options) {
        var that = this;
        that.authorAddress();
        // that.setMapSize();
        // that.getShareLocation(options);

        var arr=this.data.navData;
        this.setData({
          nav:arr[0].text
        })
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        } else if (this.data.canIUse) {
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
        wx.getSystemInfo({
            success: (res) => {
              console.log(res)
                this.setData({
                    pixelRatio: res.pixelRatio,
                    windowHeight: res.windowHeight,
                    windowWidth: res.windowWidth,
                    screenWidth:res.screenWidth,
                    screenHeight:res.screenHeight
                })
            },
        })  
        // wx.getLocation({
        //   type: 'gcj02',
        //   success(res) {
        //     console.log('res', res)
        //     that.setData({
        //       latitude: res.latitude,
        //       longitude: res.longitude
        //     })
        //   },
        //   fail: function() {
      
        //   }
        // })   
         
    },
    getStartLocal:function(){
       // 实例化API核心类
      //  qqmapsdk = new QQMapWX({
      //    key: '4ZRBZ-7F7RP-JUODB-L6SF6-ZWW2S-H7FBV'//腾讯地图的key
      //  });
          this.moveToLocation();
    },
    //上车位置选点  起点
  moveToLocation: function (e) {
    var that = this;
    //打开地图选择位置
    wx.chooseLocation({
      success: function (res) {
        app.globalData.lat = res.latitude,
        app.globalData.lng = res.longitude;
        console.log(res.latitude,res.longitude)
        //临时存储起点的经纬度
        wx.setStorageSync('latStart', {
          lat:res.latitude,
          lng:res.longitude
        })
        that.setData({
          address:res.name,
          markers:[{
            id:1,
            iconPath:'../img/start.png',
            latitude:res.latitude,
            longitude:res.longitude,
            width:50,
            height:50
          }],
          points:[{
            latitude:res.latitude,
            longitude:res.longitude,
          }]
        })
        console.log(res)
        //选择地点之后返回的结果
      },
      fail: function (err) {
        console.log(err)
      }
    });
    //如果起点位置为空
    
  },

  getStopLocal:function(){
      // 实例化API核心类
      // qqmapsdk = new QQMapWX({
      //   key: '4ZRBZ-7F7RP-JUODB-L6SF6-ZWW2S-H7FBV'//腾讯地图的key
      // });
         this.arriverLocation();
  },
  //目的地选点 终点
  arriverLocation: function () {3
    var that = this;
    wx.chooseLocation({
      success: function (res) {
        app.globalData.lat = res.latitude,
        app.globalData.lng = res.longitude;
        console.log(res.latitude,res.longitude)
        wx.setStorageSync('latStop', {
          lat:res.latitude,
          log:res.longitude
        })
        // const arr
        var markers=that.data.markers;
        markers.push({
          id:2,
            iconPath:'../img/stop.png',
            latitude:res.latitude,
            longitude:res.longitude,
            width:40,
            height:40
        })
        console.log(that.data.markers);
        var points=that.data.points;
        points.push({
            latitude:res.latitude,
            longitude:res.longitude,
        })
        that.setData({
          arriver:res.name,
          markers:markers,
          points:points
        })
       
        //选择地点之后返回的结果
      },
      fail: function (err) {
        console.log(err)
      }
    });
  },
  drawPolyline(self,color){
    return {
      origin: this.data.longitude + ',' + this.data.latitude,
      destination: this.data.Newlongitude + ',' + this.data.newlatitude,
      success(data) {
        var points = [];
        if (data.paths && data.paths[0] && data.paths[0].steps) {
          var steps = data.paths[0].steps;
          for (var i = 0; i < steps.length; i++) {
            var poLen = steps[i].polyline.split(';');
            for (var j = 0; j < poLen.length; j++) {
              points.push({
                longitude: parseFloat(poLen[j].split(',')[0]),
                latitude: parseFloat(poLen[j].split(',')[1])
              })
            }
          }
        }
        self.setData({
          distance: data.paths[0].distance,
          duration: parseInt(data.paths[0].duration/60),
          polyline: [{
            points: points,
            color: color,
            width: 6,
            arrowLine: true
          }]
        });
      }
    }
  },
    //用户地理位置授权
  authorAddress:function(){
    var that = this;
    that.getCurrentLocation('gcj02', function (res) {
      console.log(res);
      that.setData({
        longitude: res.longitude,
        latitude: res.latitude
      });
    });
  },
  //初始化当前位置
  getCurrentLocation: function (typeCode, succFun) {
    var that = this;
    wx.getLocation({
      type: typeCode,
      success: function (res) {
        return succFun(res);
      },
      fail:function(res){
        wx.openSetting({
          success: function (data) {
            console.log(4444)
            console.log(data);
            that.authorAddress();
          },
          fail: function () {
            console.info("设置失败返回数据");
          }
        });
      }
    })
  },
//回到用户的地理位置
localAddress:function(){
  
    // let id=this.data.mapid;
    // console.log(id)
    
    const mpCtx = wx.createMapContext("loactionMap");
    mpCtx.moveToLocation();
    console.log(1)
},
      

//点击导航栏显示
    switchNav(event){
        var cur = event.currentTarget.dataset.current; 
        let nav;
        var arr=this.data.navData;
        for(var i=0;i<arr.length;i++){
          if(cur==arr[i].id){
            nav=arr[i].text
          }
        }
        // console.log(nav);
        //每个tab选项宽度占1/5
        var singleNavWidth = this.data.windowWidth-100 / 5;
        //tab选项居中                            
        this.setData({
            navScrollLeft: (cur - 2) * singleNavWidth,
            nav:nav
        })      
        if (this.data.currentTab == cur) {
            return false;
        } else {
            this.setData({
                currentTab: cur
            })
        }
    },
    //滑动导航栏
    switchTab(event){
        let nav='';
        let cur = event.detail.current;
        let arr=this.data.navData
        for(var i=0;i<arr.length;i++){
          // console.log(arr[i])
          if(cur==arr[i].id){
            nav=arr[i].text
          }
        }
        // console.log(nav)
        var singleNavWidth = this.data.windowWidth -100/ 5;
        console.log(singleNavWidth)
        this.setData({
            currentTab: cur,
            navScrollLeft: (cur - 2) * singleNavWidth,
            nav:nav

        });
    },
  onReady:function(){
      
  },
  // 回调函数事件  点击叫车按钮，进行规划路线
  driving:function(){
    let that=this;
    //起点的经纬度
    let latStart=wx.getStorageSync('latStart').lat;
    let lngStart=wx.getStorageSync('latStart').lng;

    //终点的经纬度
    let latStop=wx.getStorageSync('latStop').lat;
    let lngStop=wx.getStorageSync('latStop').log;

    //两点之间的距离
    // qqmapsdk.calculateDistance({
    //   to: [{
    //     latitude: latStart,
    //     longitude: lngStart
    //   }, {
    //     latitude: latStop,
    //     longitude: lngStop
    //   }],
    //   success: function (res) {
    //     console.log(res, '两点之间的距离：', res.result.elements[1].distance);
    //     that.setData({
    //       resultDistance: res.result.elements[1].distance + '米'
    //     });
    //   },
    //   fail: function (res) {
    //     console.log(res);
    //   },
    //   complete: function (res) {
    //     console.log(res);
    //   }
    // });

console.log(latStop,lngStop)
    //网络请求腾讯地图的路线规划
    let opt={
         url: 'https://apis.map.qq.com/ws/direction/v1/driving/?from='+latStart+','+lngStart+'&to='+latStop+','+lngStop+'&key=KUKBZ-U6DWK-KMSJP-ASOB6-XXR7F-YKB5G',
         method:'GET',
         dataType:'json',
        success:function(res){
            let ret=res.data
            console.log(res)
            if(ret.status!=0) return;
            let coors=ret.result.routes[0].polyline,
            pl=[];
            //坐标解压（返回的点串坐标，通过前向差分进行压缩）
            let kr=1000000;
            for(let i=2;i<coors.length;i++){
              coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr;
            }
            //将解压后的坐标放入点串数组pl中
            for (let i = 0; i < coors.length; i += 2) {
              pl.push({
                latitude: coors[i],
                longitude: coors[i + 1]
              })
            }
            //设置polyline属性，将路线显示出来
        that.setData({
            polyline: [{
              points: pl,
              color: '#FF0000DD',
              width: 4
            }]
         })
        }
    }
    wx.request(opt)
  },
 
  reback:function(){
    var that=this
    that.setData({
      arriver:''
    })
    url:'pages/index/index'
  },
  pickerTap:function() {
    var date = new Date();
    var currentHours = date.getHours();//当前的时针
    var currentMinute = date.getMinutes();//当前的分钟
    var monthDay = ['今天','明天','后天'];
    var hours = [];
    var minute = [];

    var minuteIndex;
    if (currentMinute > 0 && currentMinute <= 10) {
      minuteIndex = 10;
    } else if (currentMinute > 10 && currentMinute <= 20) {
      minuteIndex = 20;
    } else if (currentMinute > 20 && currentMinute <= 30) {
      minuteIndex = 30;
    } else if (currentMinute > 30 && currentMinute <= 40) {
      minuteIndex = 40;
    } else if (currentMinute > 40 && currentMinute <= 50) {
      minuteIndex = 50;
    } else {
      minuteIndex = 60;
    }

    if (minuteIndex == 60) {
      // 时
      for (var i = currentHours+1; i < 24; i++) {
        hours.push(i);
      }

      // 分
      for (var i = 0; i < 60; i += 10) {
        minute.push(i);
      }

    } else {
      // 时
      for (var i = currentHours; i < 24; i++) {
        hours.push(i);
      }

      // 分
      for (var i = minuteIndex; i < 60; i += 10) {
        minute.push(i);
      }
 }

   

    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
   };
    data.multiArray[0] = monthDay;
    data.multiArray[1] = hours;
    data.multiArray[2] = minute;
    this.setData(data);
},
//多列选择器中，列的值改变时触发的事件
bindMultiPickerColumnChange:function(e) {
  var date = new Date();//获取当前的时间

  var that = this;

  var monthDay = ['今天', '明天','后天'];
  var hours = [];
  var minute = [];

  var currentHours = date.getHours();//当前的时针
  var currentMinute = date.getMinutes();//当前的分钟

  var data = {
    multiArray: this.data.multiArray,
    multiIndex: this.data.multiIndex
  };
  // 把选择的对应值赋值给 multiIndex
  data.multiIndex[e.detail.column] = e.detail.value;

  // 然后再判断当前改变的是哪一列,如果是第1列改变
  if (e.detail.column === 0) {
    // 如果第一列滚动到第一行
    if (e.detail.value === 0) {

      that.loadData(hours, minute);
      
    } else {
      that.loadHoursMinute(hours, minute);
    }

    data.multiIndex[1] = 0;
    data.multiIndex[2] = 0;

    // 如果是第2列改变
  } else if (e.detail.column === 1) {

    // 如果第一列为今天
    if (data.multiIndex[0] === 0) {
      if (e.detail.value === 0) {
        that.loadData(hours, minute);
      } else {
        that.loadMinute(hours, minute);
      }
      // 第一列不为今天
    } else {
      that.loadHoursMinute(hours, minute);
    }
    data.multiIndex[2] = 0;

    // 如果是第3列改变
  } else {
    // 如果第一列为'今天'
    if (data.multiIndex[0] === 0) {

      // 如果第一列为 '今天'并且第二列为当前时间
      if(data.multiIndex[1] === 0) {
        that.loadData(hours, minute);
      } else {
        that.loadMinute(hours, minute);
      }
    } else {
      that.loadHoursMinute(hours, minute);
    }
  }
  data.multiArray[1] = hours;
  data.multiArray[2] = minute;
  this.setData(data);
},

loadData: function (hours, minute) {
  var date = new Date();
  var currentHours = date.getHours();//当前的时针
  var currentMinute = date.getMinutes();//当前的分钟

  var minuteIndex;
  if (currentMinute > 0 && currentMinute <= 10) {
    minuteIndex = 10;
  } else if (currentMinute > 10 && currentMinute <= 20) {
    minuteIndex = 20;
  } else if (currentMinute > 20 && currentMinute <= 30) {
    minuteIndex = 30;
  } else if (currentMinute > 30 && currentMinute <= 40) {
    minuteIndex = 40;
  } else if (currentMinute > 40 && currentMinute <= 50) {
    minuteIndex = 50;
  } else {
    minuteIndex = 60;
  }

  if (minuteIndex == 60) {
    // 时
    for (var i = currentHours + 1; i < 24; i++) {
      hours.push(i);
    }
    // 分
    for (var i = 0; i < 60; i += 10) {
      minute.push(i);
    }
  } else {
    // 时
    for (var i = currentHours; i < 24; i++) {
      hours.push(i);
    }
    // 分
    for (var i = minuteIndex; i < 60; i += 10) {
      minute.push(i);
    }
  }
},

loadHoursMinute: function (hours, minute){
  // 时
  for (var i = 0; i < 24; i++) {
    hours.push(i);
  }
  // 分
  for (var i = 0; i < 60; i += 10) {
    minute.push(i);
  }
},

loadMinute: function (hours, minute) {
  var date = new Date();
  var currentHours = date.getHours();//当前的时针
  var currentMinute = date.getMinutes();//当前的分钟
  var minuteIndex;
  if (currentMinute > 0 && currentMinute <= 10) {
    minuteIndex = 10;
  } else if (currentMinute > 10 && currentMinute <= 20) {
    minuteIndex = 20;
  } else if (currentMinute > 20 && currentMinute <= 30) {
    minuteIndex = 30;
  } else if (currentMinute > 30 && currentMinute <= 40) {
    minuteIndex = 40;
  } else if (currentMinute > 40 && currentMinute <= 50) {
    minuteIndex = 50;
  } else {
    minuteIndex = 60;
  }

  if (minuteIndex == 60) {
    // 时
    for (var i = currentHours + 1; i < 24; i++) {
      hours.push(i);
    }
  } else {
    // 时
    for (var i = currentHours; i < 24; i++) {
      hours.push(i);
    }
  }
  // 分
  for (var i = 0; i < 60; i += 10) {
    minute.push(i);
  }
},
//多列选择器，列的值改变时触发的事件
bindStartMultiPickerChange:function(e){
  console.log(e.detail.value)
  this.setData({
    multiIndex:e.detail.value,
    
  })
}


})