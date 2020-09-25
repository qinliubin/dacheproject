<template>
  <div class="container">
    <div class="nav">
      <input type="radio" name="radio-set" checked id="nav1">
      <a href="#panel1">下载客户端</a>
      <input type="radio" name="radio-set" id="nav2">
      <a href="#panel2">番茄资讯</a>
      <input type="radio" name="radio-set" id="nav3">
      <a href="#panel3">资料库</a>
      <input type="radio" name="radio-set" id="nav4">
      <a href="#panel4">多重业务</a>
      <input type="radio" name="radio-set" id="nav5">
      <a href="#panel5">更多</a>
      <div class="geren" @click="login">
        <img src="https://website.didiglobal.com/dist/media/menu1.423191ca.svg" alt="">
      </div>
      <div class="scroll">
        <section class="panel" id="panel1">
          <div class="icon">
            <div class="ab">
              <span>番茄出行</span>
              <img src="../../../static/images/logo.png"  class="logoimg">
            </div>
          </div>
          <div class="shiping">
            <video  loop="loop"  autoplay="autoplay "  muted="muted" >
              <source src="/i/movie.ogg" type="video/ogg" />
              <source src="https://img-ys011.didistatic.com/static/didiglobal/didi-home-video0626.mp4" type="video/mp4" />
            </video>
            <div class="kuang">
              <div class="yuanquan">
                <br><br><br>
                <div><h2 style="font-size: 45px;">MORE THAN A<br>JOURNEY</h2></div>
                    <p style="color:white;">番茄一下&nbsp;  美好出行</p>
                <br>
                <h5>下载客户端</h5>

                <img src="https://website.didiglobal.com/dist/img/client-download.7e0109cc.png" style="height: 50px;">
              </div>
            </div>
          </div>
        </section>
        <section class="panel panelColor" id="panel2">
          <div class="icon">
            <div class="ab" style="color:#e23a6e;left: 22%;top:22%;">
              <span>番茄出行</span>
              <img src="../../../static/images/logo.png"  class="logoimg">
            </div>
          </div>
          <div class="shiping">
            <div class="gengduo" style="color:white;">
              资讯列表 >>
            </div>
            <div class="gengduo" style="left: 10%;font-size: 30px;color:white;">资讯  NEWS</div>
            <div class="kuang" style="top:120px;">
              <div class="yuanquan" style="background-color: white;height:450px; width: 450px;">
                <el-carousel :interval="3000" arrow="never" class="yuan" indicator-position="none">
                  <el-carousel-item v-for="item in guanggaoimg" :key="item.id"  class="yuan">
                    <img :src="item.idView"  style="width: 100%;border-radius: 50%;">
                  </el-carousel-item>
                </el-carousel>
              </div>
            </div>
          </div>
        </section>
        <section class="panel" id="panel3" style="background-color: #F5F5F5">
          <div class="icon">
            <div class="ab">
              <span>番茄出行</span>
              <img src="../../../static/images/logo.png"  class="logoimg">
            </div>
          </div>
          <div class="shiping">
            <div class="gengduo">
              查看更多 >>
            </div>
            <div class="gengduo" style="left: 10%;font-size: 30px;">资料库</div>
            <div class="kuang">
              <div class="lunbo">
                <el-carousel :interval="4000" type="card" height="275px">
                  <el-carousel-item v-for="item in imagesbox" :key="item.id"><div>
                    <i @click='checkVideoFun(item.id)'>点此观看视频</i>
<!--                      <el-button @click='checkVideoFun(item.id)'>点此观看视频</el-button>-->
                      <div class='mask' v-if='videoState == true' @click='masksCloseFun'></div>
                      <div class="videomasks" v-if="videoState == true">
                        <video v-bind:src="item.vsrc" controls='controls' autoplay>
                          您的浏览器不支持 video 标签。
                        </video>
                      </div>
                    </div>

                    <img :src="item.idView" class="image">
                  </el-carousel-item>
                </el-carousel>
              </div>
              <div class="yuanquanbian"></div>
            </div>
          </div>
        </section>
        <section class="panel panelColor" id="panel4">
          <div class="icon">
            <div class="ab" style="color:#e23a6e;left: 22%;top:22%;">
              <span>番茄出行</span>
              <img src="../../../static/images/logo.png"  class="logoimg">
            </div>
          </div>
          <div class="shiping">
            <div class="gengduo" style="left: 10%;font-size: 30px;color:white;">多重业务   更多选择</div>
            <div class="kuang">
              <div class="lunbo" style="width: 71%;left: 15%;">
                <el-carousel trigger="click" height="370px" style="border-radius: 20px;" indicator-position="none">
                  <el-carousel-item v-for="item in cheimg" :key="item.id" style="background-color: rgba(0,0,0,0);">
                    <div style="color:white;position: absolute;font-size: 10px;left: 10px;">{{item.neirong}}</div>
                    <img :src="item.idView"  style="width: 75%;margin-top:70px;"  @click="Car">
                  </el-carousel-item>
                </el-carousel>
              </div>
              <div class="yuanquan" style="box-shadow: 5px 5px 5px #888888;"></div>
            </div>
          </div>
        </section>
        <section class="panel" id="panel5"  style="background-color: #F5F5F5">
          <div class="icon">
            <div class="ab">
              <span>番茄出行</span>
              <img src="../../../static/images/logo.png"  class="logoimg">
            </div>
          </div>
          <div class="shiping">
            <div class="phone" style="height: 165px;">
              <div class="kefu" style="margin-left: 4%;height: 165px;">
                <div class="rexian" style="width: 100%;color:#fa96b5">客服热线</div>
                <div class="rexian">
                  司机客服热线 +86 400 0000 666
                </div>
                <div class="rexian">
                  乘客客服热线 +86 400 0000 999
                </div>
                <div class="rexian">
                  代驾客服热线 +86 400 7666 998
                </div>
                <div class="rexian">
                  金融客服热线 +86 400 6080 966
                </div>
                <div class="rexian">
                  司机招募热线 +86 400 0003 000
                </div>
                <div class="rexian">
                  企业用车热线 +86 400 0000 999-9
                </div>
                <div class="rexian">
                  其他业务热线 +86 400 0000 777
                </div>
              </div>
              <div class="kefu" style="height: 165px;">
                <div class="rexian" style="width: 100%;color:#fa96b5">关注我们  &nbsp;    意见反馈</div>
                <div style="height: 45px;width: 100%;margin-top:73px;">
                  <span><img src="../../../static/images/1.svg"></span>
                  <span><img src="../../../static/images/2.svg"></span>
                  <span><img src="../../../static/images/3.svg"></span>
                  <span><img src="../../../static/images/4.svg"></span>
                  <span><img src="../../../static/images/5.svg"></span>
                </div>
              </div>
            </div>
            <div style="border:1px solid black;width: 95%;margin:0px auto;"></div>
            <div class="phone" style="margin-top:10px;">
              <div class="kefu" style="margin-left: 4%;">
                <div class="yewu">
                  <span style="color:#fa96b5">关于番茄</span>
                  <p class="guanyu">关于我们</p>
                  <p class="guanyu">文化与价值观</p>
                  <p class="guanyu">发展历程</p>
                  <p class="guanyu">管理团队</p>
                  <p class="guanyu">社会责任</p>
                </div>
                <div class="yewu">
                  <span style="color:#fa96b5">业务范畴</span>
                  <p class="guanyu">出行服务</p>
                  <p class="guanyu">国际业务</p>
                  <p class="guanyu">金融业务</p>
                </div>
                <div class="yewu">
                  <span style="color:#fa96b5">番茄科技</span>
                  <p class="guanyu">番茄大脑</p>
                  <p class="guanyu">智慧交通</p>
                  <p class="guanyu">番茄安全</p>
                  <p class="guanyu">人工智能实验室</p>
                  <p class="guanyu">自动驾驶</p>
                </div>
                <div class="yewu">
                  <span style="color:#fa96b5">资讯中心</span>
                  <p class="guanyu">资讯</p>
                  <p class="guanyu">博客</p>
                  <p class="guanyu">资料库</p>
                </div>
                <div class="yewu">
                  <span style="color:#fa96b5">联络我们</span>
                  <p class="guanyu">联系我们</p>
                  <p class="guanyu">开发平台</p>
                  <p class="guanyu">司机加盟</p>
                  <p class="guanyu">人才招聘</p>
                  <p class="guanyu">番茄清风  </p>
                </div>
              </div>
              <div class="kefu">
                <div class="rexian" style="width: 100%;color:#fa96b5">客户端下载</div>
                <div class="download-box">
                  <img src="https://website.didiglobal.com/dist/img/client-download.7e0109cc.png">
                  <p>乘客端</p>
                </div>
                <div class="download-box">
                  <img src="https://website.didiglobal.com/dist/img/driver-download.8b517853.png">
                  <p>司机端</p>
                </div>
                <div class="download-box">
                  <img src="../../../static/images/qiye.png" >
                  <p>企业版</p>
                </div>
              </div>
            </div>
              <div style="margin-top:50px;color:#8D8D8D;font-size: 5px;">
              ©<span> 2020-2020 厦门番茄科技有限公司 </span>
                <span  style="margin-right: 5px;">京ICP备12043664号-18</span>
                <span  style="margin-right: 5px;">增值电信许可：京B2-20192416</span>
                <span style="margin-right: 5px;">广播电视节目制作许可：(京）字第15738号</span>
                <br><span>京公网安备 11000002002025号</span>
                <span>违法和不良信息举报电话 01083456200，xinxichuli@didiglobal.com
                  <a href="https://www.12377.cn" target="_blank" rel="noreferrer noopener">网上有害信息举报专区</a>
                  <br>新媒体认证电话 010-8304 9198 仅工作日下午 4-5 点服务</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    name: 'homeindex',
    data () {
      return {
        imagesbox: [
          {id: 0, idView: '../../static/images/img1.png', vsrc: 'http://127.0.0.1:8080/static/video/%E4%B8%80%E9%94%AE%E6%8A%A5%E8%AD%A6.mp4'},
          {id: 1, idView: '../../static/images/img2.png', vsrc: 'http://127.0.0.1:8080/static/video/%E4%B8%80%E9%94%AE%E6%8A%A5%E8%AD%A6.mp4'},
          {id: 2, idView: '../../static/images/img3.png', vsrc: 'http://127.0.0.1:8080/static/video/%E4%B8%80%E9%94%AE%E6%8A%A5%E8%AD%A6.mp4'},
          {id: 3, idView: '../../static/images/img4.png', vsrc: 'http://127.0.0.1:8080/static/video/%E4%B8%80%E9%94%AE%E6%8A%A5%E8%AD%A6.mp4'}
        ],
        cheimg: [
          {id: 0, idView: '../../static/images/che1.png', neirong: '番茄快车\n' + '[ 以快速的响应、实惠的价格，\n' + '为大众提供更高效的服务。]'},
          {id: 1, idView: '../../static/images/che2.png', neirong: '礼橙专车\n' + '[ 致力于高端车型、优质服务，\n' + '为乘客提供品质出行体验。]'},
          {id: 2, idView: '../../static/images/che3.png', neirong: '番茄出租车\n' + '[ 改变传统出租车出行，安全高效，\n' + '提高司机效率，促进行业改革。]'},
          {id: 3, idView: '../../static/images/che4.png', neirong: '番茄顺风车\n' + '[ 践行共享经济的拼车平台，\n' + '每一次顺风出行，低碳减排更环保。]'},
          {id: 4, idView: '../../static/images/che5.png', neirong: '番茄企业版\n' + '[ 提供企业用车和管理方案，\n' + '可通过后台实现行程和费用管控，简化流程，提升效率。]'},
          {id: 5, idView: '../../static/images/che6.png', neirong: '番茄公交\n' + '[ 为用户提供换乘查询、定制路线等，\n' + '一站式多样化出行方案，普惠大众出行。]'},
          {id: 6, idView: '../../static/images/che8.png', neirong: '番茄豪华车\n' + '[ 高端出行服务品牌，选用一线豪华品牌轿车和商务车，\n' + '由经过严格选拔并取得.司务员.的优秀专业司机提供服务。]'}
        ],
        guanggaoimg: [
          {id: 0, idView: '../../static/images/111.jpg'},
          {id: 1, idView: '../../static/images/222.jpeg'},
          {id: 2, idView: '../../static/images/333.jpeg'},
          {id: 3, idView: '../../static/images/444.jpg'},
        ],
        videoSrc: '',
        videoState: false
      }
    },
    methods: {
      Car: function () {
        alert('1')
      },
      login: function () {
        this.$router.push({path: '/home/zhuce'})
      },
      checkVideoFun (videos) {
        this.videoState = true
        this.videoSrc = videos
      },
      masksCloseFun () {
        this.videoState = false
      }
    },
    mounted () {
      window.onload = function () {
        const scroll = document.getElementsByClassName('scroll')[0]
        const panel = document.getElementsByClassName('panel')

        const clientH = window.innerHeight
        scroll.style.height = clientH + 'px'
        for (let i = 0; i < panel.length; i++) {
          panel[i].style.height = clientH + 'px'
        }
        const inputC = document.getElementsByTagName('input')
        const wheel = function (event) {
          let delta = 0
          if (!event) {
            event = window.event
          }
          if (event.wheelDelta) {
            delta = event.wheelDelta / 120
          } else if (event.detail) {
            delta = -event.detail / 3
          }
          if (delta) {
            handle(delta, inputC)
          }
        }
        if (window.addEventListener) {
          window.addEventListener('DOMMouseScroll', wheel, false)
        }
        window.onmousewheel = wheel
      }
      function handle (delta, arr) {
        let num
        for (var i = 0; i < arr.length; i++) {
          if (arr[i].checked) {
            num = i
          }
        }
        if (delta > 0 && num > 0) {
          num--
          arr[num].checked = true
        } else if (delta < 0 && num < 4) {
          num++
          arr[num].checked = true
        }
      }
    }
  }
</script>

<style scoped>

</style>
