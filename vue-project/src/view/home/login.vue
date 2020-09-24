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
        <p class="title">登陆</p>
        <el-form
          ref="form"
          :model="form"
          :rules="ruleForm"
          status-icon
          label-width="0px"
          class="loginForm">

          <el-form-item prop="name">
            <el-input type="text" v-model="form.name" auto-complete="off" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" v-model="form.password" auto-complete="off" placeholder="输入密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="homeBut" type="primary" plain @click="submit('form')" :loading="logining">登录</el-button>
            <el-button class="loginBut" type="primary" plain @click="resetForm()">重置</el-button>
          </el-form-item>
        </el-form>

      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: 'login',
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
        // <!--验证密码-->
        let validatePass = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入密码'))
          } else {
            if (this.form.checkPass !== '') {
              this.$refs.form.validateField('checkPass')
            }
            callback()
          }
        }
        return {
          logining: false,
          form: {
            name: '',
            password: ''
          },
          ruleForm: {
            name: [{ validator: checkTel, trigger: 'change' }],
            password: [{ validator: validatePass, trigger: 'change' }]
          }
        }
      },
      methods: {
        submit () {
          this.$axios.post('/home/login/login', {params: {
              acc: this.form.name,
              pwd: this.form.password
            }}).then((response) => {
              if (response.data.code === '10001') {
                this.$alert('登录成功')
                this.$router.push({path: '/home/homeindex'})
              } else {
                alert('登录失败')
              }
          })
        },
        resetForm () {
          this.$refs.form.resetFields()
        },
        // 验证手机号
        checkMobile (str) {
          let re = /^1\d{10}$/
          if (re.test(str)) {
            return true
          } else {
            return false
          }
        }
      }
    }
</script>

<style scoped>
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
  .register-wrapper {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
  }
  #register {
    max-width: 340px;
    margin: 166px auto;
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
  .el-button--primary:focus {
    background: #fa96b5;
    border-color: #fa96b5;
    color: #fff;
  }
  .el-button--primary {
    color: #FFF;
    background-color: #409EFF;
    border-color: #409EFF;
  }
</style>
