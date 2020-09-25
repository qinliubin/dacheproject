<template>
  <div class="con">
      <div class="logo">
      <img src="../../../static/images/logo.png"  style="height: 50px;">
      <div style="font-size: 25px;">番茄</div>
    </div>
    <video  loop="loop"  autoplay="autoplay "  muted="muted">
      <source src="/i/movie.ogg" type="video/ogg" />
      <source src="https://img-ys011.didistatic.com/static/didiglobal/didi-home-video0626.mp4" type="video/mp4" />
    </video>
    <div class="register-wrapper">
      <div id="register">
        <p class="title">注册</p>
        <el-form
          :model="ruleForm2"
          status-icon
          :rules="rules2"
          ref="ruleForm2"
          label-width="0"
          class="demo-ruleForm"
        >
          <el-form-item prop="tel">
            <el-input v-model="ruleForm2.tel" auto-complete="off" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item prop="smscode" class="code">
            <el-input v-model="ruleForm2.smscode" placeholder="验证码"></el-input>
            <el-button type="primary" :disabled='isDisabled' @click="sendCode">{{buttonText}}</el-button>
          </el-form-item>
          <el-form-item prop="pass">
            <el-input type="password" v-model="ruleForm2.pass" auto-complete="off" placeholder="输入密码"></el-input>
          </el-form-item>
          <el-form-item prop="checkPass">
            <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="确认密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm2')" style="width:100%;">注册</el-button>
            <p class="login" @click="gotoLogin">已有账号？立即登录</p>
            <span class="chongzhi"  @click="chong">重置</span>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'zhuce',
    data () {
      // <!--验证手机号是否合法-->
      let checkTel = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入手机号码'))
        } else if (!this.checkMobile(value)) {
          callback(new Error('手机号码不合法'))
        } else {
          callback()
        }
      }
      //  <!--验证码是否为空-->
      let checkSmscode = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入手机验证码'))
        } else {
          callback()
        }
      }
      // <!--验证密码-->
      let validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass')
          }
          callback()
        }
      }
      // <!--二次验证密码-->
      let validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        code:'',
        ruleForm2: {
          pass: '',
          checkPass: '',
          tel: '',
          smscode: ''
        },
        rules2: {
          pass: [{ validator: validatePass, trigger: 'change' }],
          checkPass: [{ validator: validatePass2, trigger: 'change' }],
          tel: [{ validator: checkTel, trigger: 'change' }],
          smscode: [{ validator: checkSmscode, trigger: 'change' }]
        },
        buttonText: '发送验证码',
        isDisabled: false, // 是否禁止点击发送验证码按钮
        flag: true
      }
    },
    methods: {
      // <!--发送验证码-->
      sendCode () {
        let tel = this.ruleForm2.tel
        if (this.checkMobile(tel)) {
          let time = 60
          this.buttonText = '已发送'
          this.isDisabled = true
          if (this.flag) {
            this.flag = false
            let timer = setInterval(() => {
              time--
              this.buttonText = time + ' 秒'
              if (time === 0) {
                clearInterval(timer)
                this.buttonText = '重新获取'
                this.isDisabled = false
                this.flag = true
              }
            }, 1000)
          }
          //手机验证码发送
          this.$axios
            .get('/applet/aliyun/aliyun?phone='+tel)
            .then(function (error) {
              this.code = error.data;
              // console.log(error.data);
            })
            .catch(function (error) { // 请求失败处理
              console.log(error);

          })
        }
      },
      // <!--提交注册-->
      submitForm () {
        if(this.ruleForm2.smscode === this.code){
          this.$axios.post('/home/login/zhuce', {params: {
              tel: this.ruleForm2.tel,
              smscode: this.ruleForm2.smscode,
              pass: this.ruleForm2.pass
            }}).then((response) => {
              this.$alert('注册成功')
            this.$router.push({path: '/home/login'})
          })
        }else {
          this.$alert('验证码错误')
        }

      },
      // <!--进入登录页-->
      gotoLogin () {
        this.$router.push({
          path: '/home/login'
        })
      },
      // 验证手机号
      checkMobile (str) {
        let re = /^1\d{10}$/
        if (re.test(str)) {
          return true
        } else {
          return false
        }
      },
      chong () {
        this.$refs.ruleForm2.resetFields()
      }
    }
  }
</script>

<style scoped>
  .loading-wrapper {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: #aedff8;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .register-wrapper img {
    position: absolute;
    z-index: 1;
  }
  .register-wrapper {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
  }
  #register {
    max-width: 340px;
    margin: 90px auto;
    background: #fff;
    padding: 20px 40px;
    border-radius: 10px;
    position: relative;
    z-index: 9;
    background-color:rgba(255,255,255,0.3);
  }
  .title {
    font-size: 26px;
    line-height: 50px;
    font-weight: bold;
    margin: 10px;
    text-align: center;
    color:#fa96b5;
  }
  .el-form-item {
    text-align: center;
  }
  .login {
    margin-top: 10px;
    font-size: 14px;
    line-height: 22px;
    color: #fa96b5;
    cursor: pointer;
    text-align: left;
    text-indent: 8px;
    width: 160px;
  }
  .login:hover {
    color: #2c2fd6;
  }
  .code >>> .el-form-item__content {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .code button {
    margin-left: 20px;
    width: 140px;
    text-align: center;
  }
  .el-button--primary:focus {
    background: #fa96b5;
    border-color: #fa96b5;
    color: #fff;
  }
  .con{
    width:100%;
    position:absolute;
    left:0;
    bottom:0;
    font-family:"Josefin Slab","Myriad pro",serif;
    top:0px;
  }
  .logo{
    content: attr(data-icon);
    color: #fff;
    font-size: 20px;
    text-align: center;
    position: absolute;
    left: 3%;
    top: 3%;
}
  .chongzhi{
    margin-top: 10px;
    color: #fa96b5;
    cursor: pointer;
    position: absolute;
    top: 31px;
    left: 232px;
  }
  .chongzhi:hover {
    color: #2c2fd6;
  }
</style>
